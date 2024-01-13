import styles from "./LetterProgress.module.css"
import ProgressBar from "./ProgressBar/ProgressBar";
import LetterSelection from "./LetterSelection/LetterSelection";

type LetterProgressProps = {
    letters: Array<string>
    currentLetter: string,
    progress: number,
    changeLevel: (newLevel: number, layout: Keyboard ) => void
    keyboard: Keyboard
}

function LetterProgress({letters, currentLetter, progress, changeLevel, keyboard}: LetterProgressProps) {
    return (
        <>
            <div className={styles["progress-container"]}>
                <LetterSelection changeLevel={changeLevel} letters={letters} currentLetter={currentLetter} keyboard={keyboard}/>
            </div>
            <ProgressBar value={progress} maxValue={30}/>
        </>
    )
}

export default LetterProgress;