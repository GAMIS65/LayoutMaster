import styles from '../page.module.css'


function FingerColors() {
    const fingers = [
        { class: 'pinky-left', name: 'Ľ malíček' },
        { class: 'ring-left', name: 'Ľ prsteník' },
        { class: 'middle-left', name: 'Ľ prostredník' },
        { class: 'index-left', name: 'Ľ ukazovák' },
        { class: 'thumb-left', name: 'Ľ palec' },
        { class: 'index-right', name: 'P ukazovák' },
        { class: 'middle-right', name: 'P prostredník' },
        { class: 'ring-right', name: 'P prsteník' },
        { class: 'pinky-right', name: 'P malíček' },
    ];

  return (
    <div className={styles["finger-container"]}>
      {fingers.map((finger, index) => (
        <div key={index} className={styles["finger"]}>
          <div className={`${styles.square} ${styles.key} ${styles[finger.class]}`}></div>
          <p>{finger.name}</p>
        </div>
      ))}
    </div>
  );
}

export default FingerColors;