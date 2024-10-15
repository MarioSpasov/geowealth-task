import { useAutocomlpeteDataStore } from "../store/AutocompleteDataStore/autocompleteDataStore";

export const loadPrefsFromLocalStorage = () => {
  const storedPrefs = localStorage.getItem("autocompletePrefs");
  if (storedPrefs) {
    const prefs = JSON.parse(storedPrefs);
    // Instead of calling directly, use Zustand's setState function
    useAutocomlpeteDataStore.setState((state) => ({
      ...state,
      autocompletePrefs: prefs,
    }));
  }
};
