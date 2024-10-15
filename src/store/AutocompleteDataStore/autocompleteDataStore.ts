import { create } from "zustand";
import { initialValues } from "./initialValues";
import { AutocomlpeteDataStore } from "./interfaces";

export const useAutocomlpeteDataStore = create<AutocomlpeteDataStore>(
  (set) => ({
    ...initialValues,

    setAutocompletePrefs: (prefs) => {
      set((state) => {
        const updatedPrefs = [...state.autocompletePrefs, prefs];
        localStorage.setItem("autocompletePrefs", JSON.stringify(updatedPrefs));
        return { autocompletePrefs: updatedPrefs };
      });
    },

    setAutocompletePrefsFromStore: (prefs) => {
      localStorage.setItem("autocompletePrefs", JSON.stringify(prefs));
      set({ autocompletePrefs: prefs });
    },

    resetStore: () => {
      localStorage.removeItem("autocompletePrefs");
      set({ ...initialValues });
    },
  })
);
