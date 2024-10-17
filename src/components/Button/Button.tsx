import React, { useEffect } from 'react';
import Layout from '../Layout/Layout.tsx';
import styles from './Button.module.scss';
import { ButtonProps } from '../../types/interfaces.ts';

export default function Button({ onClick, labelText }: ButtonProps) {
  return (
    <div className={styles.buttonWrapper}>
      <button onClick={onClick}> {labelText}</button>
    </div>
  );
}
