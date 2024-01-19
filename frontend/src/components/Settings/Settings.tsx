import LanguageSelection from '../LanguageSelection'
import styles from './Settings.module.css'

type SettingsProps = {
    closeSettings: () => void
    changeLayout: React.Dispatch<React.SetStateAction<Keyboard>>; 
}

function Settings({ closeSettings, changeLayout }: SettingsProps) {

    return (
        <>
            <dialog open className={styles.dialog}>
                <div className={styles.setting}>
                    <p>Rozlozenie klavesnice: </p>
                    <LanguageSelection changeLayout={changeLayout} />
                </div>

                <button onClick={closeSettings}>Zatvorit nastavenia</button>
            </dialog>
        </>
    )
}

export default Settings