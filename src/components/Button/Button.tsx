import React, { useEffect } from "react";
import Layout from "../Layout/Layout.tsx";
import styles from "./Button.module.scss";

interface ButtonProps {
  onClick: () => void;
  labelText: string;
}

export default function Button({ onClick, labelText }: ButtonProps) {
  return (
    <div className={styles.buttonWrapper}>
      <button onClick={onClick}> {labelText}</button>
    </div>
  );
}
