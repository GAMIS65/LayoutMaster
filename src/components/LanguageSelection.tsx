import React, { useState, useEffect } from "react";
import Qwerty from '../languages/english-ansi.json'
import Dvorak from '../languages/dvorak-ansi.json'

type KeyInfo = {
  letter: string[];
  finger: string;
  shift: string;
};

type Row = Record<string, KeyInfo>;

type KeyboardLayout = Record<string, Row>;

type Keyboard = {
  name: string
  "layout-standard": string,
  language: string,
  stages: string[],
  layout: KeyboardLayout 
}

type LanguageSelectionProps = {
  changeLayout: React.Dispatch<React.SetStateAction<Keyboard>>; 
}

function LanguageSelection({changeLayout}: LanguageSelectionProps) {
  const [custom, setCustom] = useState(false);

  const handleLayoutChange = (event: any) => {
    const layoutName = event.target.value;
    switch (layoutName) {
      case 'Qwerty':
        changeLayout(Qwerty);
        setCustom(false);
        break;
      case 'Dvorak':
        changeLayout(Dvorak);
        setCustom(false);
        break;
      case 'Vlastný':
        const savedLayout = localStorage.getItem('layout');
        if (savedLayout) {
          try {
            const layout = JSON.parse(savedLayout);
            if (isValidLayout(layout)) {
              changeLayout(layout);
            } else {
              console.error("Invalid layout structure in localStorage.");
            }
          } catch (error) {
            console.error("Invalid JSON in localStorage.");
          }
        } else {
          console.error("No custom layout found in localStorage.");
        }
        setCustom(true);
        break;
      default:
        changeLayout(Qwerty);
        setCustom(false);
    }
  };

  function isValidLayout(keyboard: Keyboard) {
  if (!keyboard.hasOwnProperty('layout-standard') ||
      !keyboard.hasOwnProperty('language') ||
      !keyboard.hasOwnProperty('stages') ||
      !keyboard.hasOwnProperty('layout')) {
    return false;
  }

  if (typeof keyboard.layout !== 'object') {
    return false;
  }

  for (const row of Object.values(keyboard.layout)) {
    for (const keyInfo of Object.values(row)) {
      if (!keyInfo.hasOwnProperty('letter') ||
          !keyInfo.hasOwnProperty('finger') ||
          !keyInfo.hasOwnProperty('shift')) {
        return false;
      }
    }
  }

  return true;
}

function handleFileChange(event: any) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      // @ts-ignore
      const layout = JSON.parse(event.target.result);
      if (isValidLayout(layout)) {
        changeLayout(layout);
        localStorage.setItem('layout', JSON.stringify(layout));
      } else {
        console.error("Invalid layout structure.");
      }
    } catch (error) {
      console.error("Invalid JSON.");
    }
  };
  reader.readAsText(file);
}

  return (
    <div>
      <select onChange={handleLayoutChange}>
        <option value="Qwerty">Qwerty</option>
        <option value="Dvorak">Dvorak</option>
        <option value="Vlastný">Vlastný</option>
      </select>
      {custom && <input type="file" onChange={handleFileChange} />}
    </div>
  );
}

export default LanguageSelection;