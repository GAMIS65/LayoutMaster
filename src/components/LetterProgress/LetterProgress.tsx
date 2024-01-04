import styles from "./LetterProgress.module.css"

type LetterProgressProps = {
    currentLetter: string,
    progress: number
}

function LetterProgress({currentLetter, progress}: LetterProgressProps) {
    return (
        <div className={styles["progress-container"]}>
            <h1>{currentLetter}</h1>
            <p>{progress} / 30</p>
        </div>
    )
}

export default LetterProgress;