import styles from '../page.module.css'


function FingerColors() {
    return (
        <div>
            <div>
                <div className={`${styles.square} ${styles.key} ${styles["index-right"]}`}>
                </div>
                <p>Ľavý malíček</p>
            </div>
            <div></div>
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