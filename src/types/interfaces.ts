export interface AutocomlpeteDataStore {
  autocompletePrefs: PrefsValuesProps;
  triggerReset: boolean;
  setStateOrUser: (autocompleteName: string, stateOrUserToggle: string) => void;
  setAutocompletePrefs: (prefs: PrefsValuesProps) => void;
  setPrefsFromsStorage: (prefs: PrefsValuesProps) => void;
  setReset: (autocompleteName: string) => void;
}

export interface PrefsValuesProps {
  autocompleteName: string;
  stateOrUserToggle: string;
  statesHistory: HistoryProps[];
  usersHistory: HistoryProps[];
}

export interface HistoryProps {
  text: string;
  id: string;
}

export interface AutocompleteProps {
  autocompleteId: string;
}

export interface InputProps {
  typeOfSearch: string;
  onSubmit: (typeOfSearch: string, text: string, id: string) => void;
}

export interface UsStatesProps {
  name: string;
  abbreviation: string;
}

export interface ButtonProps {
  onClick: () => void;
  labelText: string;
}

export interface SearchHistoryProps {
  autocompleteName: string;
  typeOfSearch: string;
}
export interface HistoryListProps {
  text: string;
  id: string;
}
export interface ResetInputProps {
  resetStates: (resetValue: string) => void;
  resetUsers: (resetValue: string) => void;
}
