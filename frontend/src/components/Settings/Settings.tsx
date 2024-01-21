import LanguageSelection from '../LanguageSelection'
import LetterSelection from '../LetterProgress/LetterSelection/LetterSelection';
import styles from './Settings.module.css'

type SettingsProps = {
    closeSettings: () => void
    changeLayout: React.Dispatch<React.SetStateAction<Keyboard>>; 
    letters: Array<string>,
    currentLetter: string,
    changeLevel: (newLevel: number, layout: Keyboard) => void,
    keyboard: Keyboard
}

function Settings({ closeSettings, changeLayout, letters, currentLetter, changeLevel, keyboard }: SettingsProps) {

    return (
        <>
            <dialog open className={styles.dialog}>
                <div className={styles.close}>
                    <button onClick={closeSettings}>X</button>
                </div>

                <div className={styles["settings-container"]}>
                    <div className={styles.setting}>
                        <p className={styles["setting-name"]}>Rozloženie klávesnice: </p>
                        <LanguageSelection changeLayout={changeLayout} />
                    </div>

                    <div className={styles.setting}>
                        <p>Postup učenia:</p>
                        <div className={styles["progress-container"]}>
                            <LetterSelection changeLevel={changeLevel} letters={letters} currentLetter={currentLetter} keyboard={keyboard}/>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default Settings