import styles from "./LetterProgress.module.css"
import ProgressBar from "../ProgressBar/ProgressBar";

type LetterProgressProps = {
    currentLetter: string,
    progress: number
}

function LetterProgress({currentLetter, progress}: LetterProgressProps) {
    return (
        <>
            <div className={styles["progress-container"]}>
                <h1>{currentLetter}</h1>
            </div>
            <ProgressBar value={progress} maxValue={30}/>
        </>
    )
}

export default LetterProgress;