import styles from './ErrorMessage.module.css'
function ErrorMessage({text}: {text: string}) {
    return (
        <p className={styles.errorMessage}>{text}</p>
    )
}

export default ErrorMessage
