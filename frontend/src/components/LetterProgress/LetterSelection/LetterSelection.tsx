import styles from "@/components/LetterProgress/LetterSelection/LetterSelection.module.css"

type LetterSelectionProps = {
    letters: Array<string>,
    currentLetter: string,
    changeLevel: (newLevel: number, layout: Keyboard) => void,
    keyboard: Keyboard
}

function LetterSelection({letters, currentLetter, changeLevel, keyboard}: LetterSelectionProps) {
    return (
        <div className={styles["letter-container"]}>
            {letters.map((letter, index) => (
                <button onClick={() => changeLevel(index, keyboard)} key={letter} className={`${styles.letter} ${letter === currentLetter ? styles.active : ""}`}>{letter}</button>

            ))}
        </div>
    )   
}

export default LetterSelection;