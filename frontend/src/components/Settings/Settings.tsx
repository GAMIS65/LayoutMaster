import LanguageSelection from '../LanguageSelection'
import LetterSelection from '../LetterProgress/LetterSelection/LetterSelection';
import styles from './Settings.module.css'

type SettingsProps = {
    closeSettings: () => void
    letters: Array<string>,
    currentLetter: string,
    changeLevel: (newLevel: number, layout: Keyboard) => void,
    keyboard: Keyboard
    keyCount: number,
    changeKeyCount: (count: number) => void
}

function Settings({ closeSettings, letters, currentLetter, changeLevel, keyboard, keyCount, changeKeyCount }: SettingsProps) {

    return (
        <>
            <dialog open className={styles.dialog}>

                <div className={styles.close}>
                    <button className={styles.closeButton} onClick={closeSettings}>X</button>
                </div>

                <div className={styles.settingsContainer}>

                    <div className={styles.setting}>
                        <p className={styles.settingName}>Rozloženie klávesnice: </p>
                        <LanguageSelection />
                    </div>


                    <div className={styles.setting}>
                        <p>Postup učenia:</p>
                        <div className={styles.progressContainer}>
                            <LetterSelection changeLevel={changeLevel} letters={letters} currentLetter={currentLetter} keyboard={keyboard} />
                        </div>
                    </div>

                    <div className={styles.setting}>
                        <p>Maximálny počet kláves: </p>
                        <input type='number' placeholder={String(keyCount)} onChange={(event) => changeKeyCount(Number(event.target.value))} min={0} />
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default Settings
