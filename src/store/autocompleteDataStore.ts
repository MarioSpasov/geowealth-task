import { create } from 'zustand';

export interface HistoryProps {
  text: string;
  id: string;
}

export interface PrefsValuesProps {
  autocompleteName: string;
  stateOrUserToggle: string;
  statesHistory: HistoryProps[];
  usersHistory: HistoryProps[];
}

export interface AutocomlpeteDataStore {
  autocompletePrefs: PrefsValuesProps;

  setAutocompletePrefs: (prefs: PrefsValuesProps) => void;
  setPrefsFromsStorage: (prefs: PrefsValuesProps) => void;
}

enum AutocompleteOptions {
  State = 'State',
  User = 'User',
}

const initialValues = {
  autocompletePrefs: {} as PrefsValuesProps,
};

// Save to local storage
const saveToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const useAutocomlpeteDataStore = create<AutocomlpeteDataStore>(
  (set) => ({
    ...initialValues,

    setAutocompletePrefs: (prefs: PrefsValuesProps) =>
      set((state) => {
        const existingPrefs = state.autocompletePrefs[
          prefs.autocompleteName
        ] || {
          autocompleteName: prefs.autocompleteName,
          stateOrUserToggle: prefs.stateOrUserToggle,
          statesHistory: [],
          usersHistory: [],
        };

        if (prefs.stateOrUserToggle === AutocompleteOptions.State) {
          existingPrefs.statesHistory = [
            ...prefs.statesHistory,
            ...existingPrefs.statesHistory,
          ].slice(0, 10);
        } else {
          existingPrefs.usersHistory = [
            ...prefs.usersHistory,
            ...existingPrefs.usersHistory,
          ].slice(0, 10);
        }

        const updatedPrefs = {
          ...state.autocompletePrefs,
          [prefs.autocompleteName]: { ...existingPrefs },
        };

        // Save to local storage
        saveToLocalStorage('autocompletePrefs', updatedPrefs);

        return {
          autocompletePrefs: updatedPrefs,
        };
      }),

    setPrefsFromsStorage: (prefs: PrefsValuesProps) =>
      set(() => {
        return {
          autocompletePrefs: prefs,
        };
      }),
  })
);
