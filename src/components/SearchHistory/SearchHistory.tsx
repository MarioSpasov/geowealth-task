import React, { useEffect, useState } from "react";
import { AutocompleteOptions } from "../../types/enums.ts";
import { useAutocomlpeteDataStore } from "../../store/autocompleteDataStore.ts";
import styles from "./SearchHistory.module.scss";

interface SearchHistoryProps {
  autocompleteName: string;
  typeOfSearch: string;
}
interface HistoryListProps {
  text: string;
  id: string;
}

export default function SearchHistory({
  autocompleteName,
  typeOfSearch,
}: SearchHistoryProps) {
  const autocompletePrefs = useAutocomlpeteDataStore(
    (state) => state.autocompletePrefs[autocompleteName]
  );
  const [historyList, setHistoryList] = useState<HistoryListProps[]>([]);

  useEffect(() => {
    if (autocompletePrefs) {
      if (typeOfSearch === AutocompleteOptions.State) {
        // Only update the history list if the statesHistory has actually changed
        setHistoryList((prev) => {
          const newHistory = [...autocompletePrefs.statesHistory];
          // Compare previous history to avoid unnecessary re-renders
          if (JSON.stringify(prev) !== JSON.stringify(newHistory)) {
            return newHistory;
          }
          return prev;
        });
      } else {
        // Same logic for usersHistory
        setHistoryList((prev) => {
          const newHistory = [...autocompletePrefs.usersHistory];
          if (JSON.stringify(prev) !== JSON.stringify(newHistory)) {
            return newHistory;
          }
          return prev;
        });
      }
    }
  }, [typeOfSearch, autocompletePrefs]);

  if (!historyList || !historyList.length) return null;

  return (
    <div className={styles.searchHistoryWrapper}>
      <div className={styles.searchHistoryTitle}>History:</div>
      <div className={styles.searchHistoryContent}>
        {historyList.map((historyItem, index) => {
          return (
            <div
              className={styles.historyItem}
              key={`${historyItem.id}-${historyItem.text}-${index}`}
            >
              {historyItem.id}
            </div>
          );
        })}
      </div>
    </div>
  );
}
