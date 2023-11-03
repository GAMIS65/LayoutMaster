import styles from './page.module.css'
type LetterDisplayProps = {
  text: string;
  index: number;
}

type DisplayKeyProps = {
  name: string;
  isActive: boolean;
}

function DisplayKey({name, isActive}: DisplayKeyProps) {
  return <div className={`${styles.letter} ${isActive ? styles.active : ''}`}>{name}</div>;
}

function LetterDisplay({ text, index }: LetterDisplayProps) {

  const letters = text.split("");
  console.log(text);
  return (
  <div className={styles["letter-display"]}>

      {text[index-1] && <DisplayKey name={text[index-1]} isActive={false}/> }

      {text[index] && <DisplayKey name={text[index]} isActive={true}/>}
      
      {text[index+1] && <DisplayKey name={text[index+1]} isActive={false}/>}
  </div>
  );
  // return (
  //   <div className={styles["letter-display"]}>
  //     {letters.map((letter, test) => (
  //       <DisplayKey key={test}  name={letter} isActive={index === test}/>
  //     ))}
  //   </div>
  // );
  // return (
  //   <div className={styles["letter"]}>{text}</div>
  // )
}

export default LetterDisplay