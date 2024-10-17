import React, { useEffect, useState } from 'react';
import { AutocompleteOptions } from '../../types/enums.ts';
import { useAutocomlpeteDataStore } from '../../store/autocompleteDataStore.ts';
import styles from './SearchHistory.module.scss';
import {
  HistoryListProps,
  SearchHistoryProps,
} from '../../types/interfaces.ts';

export default function SearchHistory({
  autocompleteName,
  typeOfSearch,
}: SearchHistoryProps) {
  const autocompletePrefs = useAutocomlpeteDataStore(
    (state) => state.autocompletePrefs[autocompleteName]
  );
  const prefs = useAutocomlpeteDataStore((state) => state.autocompletePrefs);
  const [historyList, setHistoryList] = useState<HistoryListProps[]>([]);

  useEffect(() => {
    if (autocompletePrefs) {
      if (typeOfSearch === AutocompleteOptions.State) {
        setHistoryList([...autocompletePrefs.statesHistory]);
      } else if (typeOfSearch === AutocompleteOptions.User) {
        setHistoryList([...autocompletePrefs.usersHistory]);
      }
    }
  }, [typeOfSearch, autocompletePrefs, prefs]);

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
