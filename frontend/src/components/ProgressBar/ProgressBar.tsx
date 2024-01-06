import React from 'react';
import styles from './ProgressBar.module.css'

type ProgressBarProps = {
    value: number,
    maxValue: number
}

const ProgressBar = ({ value, maxValue }: ProgressBarProps) => {
  const percentage = (value / maxValue) * 100;

  return (
    <div className={styles.container}>
      <div style={{width: `${percentage}%`}} className={styles.line}/>
    </div>
  );
};

export default ProgressBar;