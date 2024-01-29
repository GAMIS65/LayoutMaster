import React, { useState, useEffect } from "react";
import Qwerty from '@/keyboards/qwerty-english-ansi.json'
import Dvorak from '@/keyboards/dvorak-english-ansi.json'
import QwertzSlovak from '@/keyboards/qwertz-slovak-ansi.json'
import { useLayoutStore } from "@/store/useLayoutName";


function LanguageSelection() {
  const [custom, setCustom] = useState(false);

  const {layoutName, setLayoutName, setLayout, layout} = useLayoutStore();

  const handleLayoutChange = (event: any) => {
    const layoutName = event.target.value;
    switch (layoutName) {
      case 'Qwerty ANSI':
        setLayout(Qwerty);
        setLayoutName("qwerty_ansi_english")
        setCustom(false);
        break;
      case 'Qwertz SK ANSI':
        setLayout(QwertzSlovak);
        setLayoutName("qwertz_ansi_slovak")
        break;
      case 'Dvorak ANSI':
        setLayout(Dvorak);
        setLayoutName("dvorak_ansi_english")
        setCustom(false);
        break;
      case 'Vlastný':
        const savedLayout = localStorage.getItem('layout');
        if (savedLayout) {
          try {
            const layout = JSON.parse(savedLayout);
            if (isValidLayout(layout)) {
              setLayout(layout);
              setLayoutName(`${layout.name}_${layout.standard}_${layout.language}`)
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
        setLayout(Qwerty);
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
        setLayout(layout);
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
        <option value="Qwerty ANSI">Qwerty ANSI</option>
        <option value="Qwertz SK ANSI">Qwertz SK ANSI</option>
        <option value="Dvorak ANSI">Dvorak ANSI</option>
        <option value="Vlastný">Vlastný</option>
      </select>
      {custom && <input type="file" onChange={handleFileChange} />}
    </div>
  );
}

export default LanguageSelection;