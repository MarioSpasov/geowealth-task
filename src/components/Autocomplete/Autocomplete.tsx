import React, { useState } from 'react';
import InputSearch from '../../components/InputSearch/InputSearch.tsx';
import StateOrUserToggle from '../StateOrUserToggle/StateOrUserToggle.tsx';
import SearchHistory from '../SearchHistory/SearchHistory.tsx';
import { AutocompleteOptions } from '../../types/enums.ts';
import Button from '../Button/Button.tsx';
import styles from './Autocomplete.module.scss';
import { useAutocomlpeteDataStore } from '../../store/autocompleteDataStore.ts';

interface AutocompleteProps {
  autocompleteId: string;
}
interface SearchValuesProps {
  search: string;
  id: string;
}

export default function Autocomplete({ autocompleteId }: AutocompleteProps) {
  const setAutocompletePrefs = useAutocomlpeteDataStore(
    (state) => state.setAutocompletePrefs
  );

  const userPrefsFromStore = localStorage.getItem('autocompletePrefs');

  const [typeOfSearch, setTypeOfSearch] = useState<string>(
    AutocompleteOptions.State
  );

  const [searchValue, setSearchValue] = useState<SearchValuesProps>({
    search: '',
    id: '',
  });

  const handleResetSearch = () => {
    //Handle reset button
    console.log('id', autocompleteId);
  };

  const onChoose = (typeOfSearch: string, text: string, id: string) => {
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
        <InputSearch typeOfSearch={typeOfSearch} onChoose={onChoose} />
      </div>
      <div className={styles.autocompleteSection}>
        <StateOrUserToggle
          typeOfSearch={typeOfSearch}
          setTypeOfSearch={setTypeOfSearch}
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
