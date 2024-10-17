import { create } from 'zustand';
import { AutocomlpeteDataStore, PrefsValuesProps } from '../types/interfaces';

enum AutocompleteOptions {
  State = 'State',
  User = 'User',
}

const initialValues = {
  autocompletePrefs: {} as PrefsValuesProps,
  triggerReset: false,
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

    setStateOrUser: (autocompleteName: string, stateOrUserToggle: string) =>
      set((state) => {
        if (state.autocompletePrefs[autocompleteName]) {
          const updatedPrefs = {
            ...state.autocompletePrefs,
            [autocompleteName]: {
              ...state.autocompletePrefs[autocompleteName],
              stateOrUserToggle: stateOrUserToggle,
            },
          };

          saveToLocalStorage('autocompletePrefs', updatedPrefs);

          return {
            autocompletePrefs: updatedPrefs,
          };
        } else {
          return state;
        }
      }),

    setReset: (autocompleteName: string) =>
      set((state) => {
        const updatedPrefs = {
          ...state.autocompletePrefs,
        };
        updatedPrefs[autocompleteName].statesHistory.length = 0;
        updatedPrefs[autocompleteName].usersHistory.length = 0;
        updatedPrefs[autocompleteName].stateOrUserToggle =
          AutocompleteOptions.State;
        saveToLocalStorage('autocompletePrefs', updatedPrefs);
        state.triggerReset = !state.triggerReset;
        return {
          autocompletePrefs: updatedPrefs,
        };
      }),
  })
);
