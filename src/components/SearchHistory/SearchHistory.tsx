import React, { useEffect } from "react";
import Layout from "../Layout/Layout.tsx";
import styles from "./SearchHistory.module.scss";

export default function SearchHistory() {
  return (
    <div className={styles.searchHistoryWrapper}>
      <div className={styles.searchHistoryTitle}>History:</div>
      <div className={styles.searchHistoryContent}></div>
    </div>
  );
}
