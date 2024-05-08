"use client"
import React, { useState, useEffect } from "react";
import english from "@/keyboards/qwerty-english-ansi.json"
import Keyboard from "@/components/Keyboard/Keyboard";
import styles from "@/app/editor/page.module.css"
import { useLayoutStore } from "@/store/useLayoutName";
import Link from 'next/link'

function Editor() {
  const [keyboardLayout, setKeyboardLayout] = useState<Keyboard>(english);
  const {layoutName, setLayoutName, setLayout, layout} = useLayoutStore();

  // useEffect(() => {
  //   const stages: string[] = [];
  //   Object.values(keyboardLayout.layout).forEach(row => {
  //     Object.values(row).forEach(key => {
  //       stages.push(...key.letter);
  //     });
  //   });
  //   setKeyboardLayout(prevLayout => ({ ...prevLayout, stages }));
  // }, [keyboardLayout.layout]);

  const handleClick = () => {
    localStorage.setItem('layout', JSON.stringify(keyboardLayout));
    setLayout(keyboardLayout);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, row: string, key: string, index: number) => {
    const newKeyboardLayout = { ...keyboardLayout };
    newKeyboardLayout.layout[row][key].letter[index] = event.target.value;
    setKeyboardLayout(newKeyboardLayout);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>, row: string, key: string, prop: any) => {
    const newKeyboardLayout = { ...keyboardLayout };
    // @ts-ignore
    newKeyboardLayout.layout[row][key][prop] = event.target.value;
    setKeyboardLayout(newKeyboardLayout);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyboardLayout = { ...keyboardLayout };
    newKeyboardLayout.name = event.target.value;
    setKeyboardLayout(newKeyboardLayout);
  };

  const addKey = (row: string) => {
    const newKeyboardLayout = { ...keyboardLayout };
    const newRow = { ...newKeyboardLayout.layout[row] };
    const newKey = Object.keys(newRow).length;
    newRow[newKey] = { letter: ["", "", ""], finger: "", shift: "" };
    newKeyboardLayout.layout[row] = newRow;
    setKeyboardLayout(newKeyboardLayout);
  };

  const removeKey = (row: string, key: string) => {
    const newKeyboardLayout = { ...keyboardLayout };
    delete newKeyboardLayout.layout[row][key];
    setKeyboardLayout(newKeyboardLayout);
  };

  const addRow = () => {
    const newKeyboardLayout = { ...keyboardLayout };
    const newRow = Object.keys(newKeyboardLayout.layout).length;
    newKeyboardLayout.layout[`R${newRow}`] = {};
    setKeyboardLayout(newKeyboardLayout);
  };

  const removeRow = (row: string) => {
    const newKeyboardLayout = { ...keyboardLayout };
    delete newKeyboardLayout.layout[row];
    setKeyboardLayout(newKeyboardLayout);
  };

  return (
    <div className={styles.parent}>
      <div className={styles.left}>
      <label>Názov rozloženia: </label>
      <input
        type="text"
        value={keyboardLayout.name}
        onChange={handleNameChange}
      />
      {Object.keys(keyboardLayout.layout).map((row, index) => (
        <div key={row}>
          <h3>{++index}. riadok</h3>
          {Object.keys(keyboardLayout.layout[row]).map((key) => (
            <div key={key} className={styles.keyContainer}>
              <label>{`${key}: `}</label>
              {keyboardLayout.layout[row][key].letter.map((letter, index) => (
                <input
                  key={index} 
                  type="text"
                  value={letter}
                  onChange={(event) => handleInputChange(event, row, key, index)}
                  className={styles.input}
                />
              ))}
              <select
                value={keyboardLayout.layout[row][key].finger}
                onChange={(event) => handleSelectChange(event, row, key, 'finger')}
                className={styles.select}
              >
                <option value="pinky-left">Ľavý malíček</option>
                <option value="ring-left">Ľavý prsteník</option>
                <option value="middle-left">Ľavý prostredník</option>
                <option value="index-left">Ľavý ukazovák</option>
                <option value="thumb-left">Ľavý palec</option>
                <option value="thumb-right">Pravý palec</option>
                <option value="index-right">Pravý ukazovák</option>
                <option value="middle-right">Pravý prostredník</option>
                <option value="ring-right">Pravý prstenik</option>
                <option value="pinky-right">Pravý malíček</option>
              </select>
              <select
                value={keyboardLayout.layout[row][key].shift}
                onChange={(event) => handleSelectChange(event, row, key, 'shift')}
                className={styles.select}
              >
                <option value="">None</option>
                <option value="left">Ľavý shift</option>
                <option value="right">Pravý shift</option>
              </select>
              <button className={styles.delete} onClick={() => removeKey(row, key)}>X</button>
            </div>
          ))}
            <button onClick={() => addKey(row)}>Pridať klávesu</button>
            <button className={styles.delete} onClick={() => removeRow(row)}>Odstrániť riadok</button>
        </div>
      ))}
      <button onClick={addRow}>Pridať riadok</button>
      </div>
      <div className={styles.right}>
        <>
        <button onClick={handleClick}><h3><Link href={"/"} className={styles.link}>Uloziť rozloženie</Link></h3></button>
          {
            //@ts-ignore
            <Keyboard keyboardLayout={keyboardLayout.layout} text="" currentLetter="" activeAll={true} />
          }
        </>
      </div>
    </div>
  );
}

export default Editor;
