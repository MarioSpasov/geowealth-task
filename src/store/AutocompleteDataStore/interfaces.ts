export interface HistoryProps {
  searchedValue: string;
  searchedId: number;
}

export interface PrefsValuesProps {
  autocompleteName: string;
  stateOrUserToggle: boolean;
  statesHistory: HistoryProps[];
  usersHistory: HistoryProps[];
}

export interface AutocomlpeteDataStore {
  autocompletePrefs: PrefsValuesProps[];

  setAutocompletePrefs: (prefs: PrefsValuesProps) => void;
  setAutocompletePrefsFromStore: (prefs: PrefsValuesProps[]) => void;
  resetStore: () => void;
}
