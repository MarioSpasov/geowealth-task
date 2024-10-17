import React from 'react';
import styles from './Button.module.scss';
import { ButtonProps } from '../../types/interfaces.ts';

export default function Button({ onClick, labelText }: ButtonProps) {
  return (
    <div className={styles.buttonWrapper}>
      <button onClick={onClick}> {labelText}</button>
    </div>
  );
}
