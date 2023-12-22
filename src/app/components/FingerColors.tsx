import styles from '../page.module.css'


function FingerColors() {
    return (
        <div>
            <div className={`${styles["finger-container"]}`}>
                <div className={`${styles.square} ${styles.key} ${styles["pinky-left"]}`}>
                </div>
                <p>Ľavý malíček</p>
            </div>
            <div className={`${styles["finger-container"]}`}>
                <div className={`${styles.square} ${styles.key} ${styles["ring-left"]}`}>
                </div>
                <p>Ľavý prsteník</p></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default FingerColors;