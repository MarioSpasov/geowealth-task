import React, { useState, useEffect } from 'react';
import InputSearch from '../../components/InputSearch/InputSearch.tsx';
import StateOrUserToggle from '../StateOrUserToggle/StateOrUserToggle.tsx';
import SearchHistory from '../SearchHistory/SearchHistory.tsx';
import { AutocompleteOptions } from '../../types/enums.ts';
import Button from '../Button/Button.tsx';
import styles from './Autocomplete.module.scss';
import { useAutocomlpeteDataStore } from '../../store/autocompleteDataStore.ts';
import { AutocompleteProps } from '../../types/interfaces.ts';

export default function Autocomplete({ autocompleteId }: AutocompleteProps) {
  const setStateOrUser = useAutocomlpeteDataStore(
    (state) => state.setStateOrUser
  );
  const setAutocompletePrefs = useAutocomlpeteDataStore(
    (state) => state.setAutocompletePrefs
  );
  const autocompletePrefs = useAutocomlpeteDataStore(
    (state) => state.autocompletePrefs
  );
  const setReset = useAutocomlpeteDataStore((state) => state.setReset);

  const [typeOfSearch, setTypeOfSearch] = useState<string>(
    AutocompleteOptions.State
  );

  useEffect(() => {
    if (autocompletePrefs && autocompletePrefs[autocompleteId]) {
      setTypeOfSearch(autocompletePrefs[autocompleteId].stateOrUserToggle);
    }
  }, [autocompletePrefs]);

  const handleResetSearch = () => {
    setReset(autocompleteId);
  };

  const handleSaveToggleValue = (toggleValue: string) => {
    setStateOrUser(autocompleteId, toggleValue);
  };

  const onSubmit = (typeOfSearch: string, text: string, id: string) => {
    if (typeOfSearch === AutocompleteOptions.State) {
      setAutocompletePrefs({
        autocompleteName: autocompleteId,
        stateOrUserToggle: typeOfSearch,
        statesHistory: [{ text: text, id: id }],
        usersHistory: [],
      });
    } else {
      setAutocompletePrefs({
        autocompleteName: autocompleteId,
        stateOrUserToggle: typeOfSearch,
        statesHistory: [],
        usersHistory: [{ text: text, id: id }],
      });
    }
  };

  return (
    <div className={styles.autocompleteWrapper}>
      <div className={styles.autocompleteSection}>
        <InputSearch typeOfSearch={typeOfSearch} onSubmit={onSubmit} />
      </div>
      <div className={styles.autocompleteSection}>
        <StateOrUserToggle
          typeOfSearch={typeOfSearch}
          setTypeOfSearch={setTypeOfSearch}
          handleSaveToggleValue={handleSaveToggleValue}
        />
        <Button onClick={handleResetSearch} labelText="Reset" />
      </div>
      <div className={styles.autocompleteSection}>
        <SearchHistory
          autocompleteName={autocompleteId}
          typeOfSearch={typeOfSearch}
        />
      </div>
    </div>
  );
}
