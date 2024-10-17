import React, { useEffect } from 'react';
import Layout from '../../components/Layout/Layout.tsx';
import Autocomplete from '../../components/Autocomplete/Autocomplete.tsx';
import styles from './Dashboard.module.scss';
import { AutocompleteUseage } from '../../types/enums.ts';
import { useAutocomlpeteDataStore } from '../../store/autocompleteDataStore.ts';

export default function Dashboard() {
  const setPrefsFromsStorage = useAutocomlpeteDataStore(
    (state) => state.setPrefsFromsStorage
  );

  useEffect(() => {
    const userPrefsFromStore = localStorage.getItem('autocompletePrefs');
    if (userPrefsFromStore) {
      const parsedPrefs = JSON.parse(userPrefsFromStore);
      setPrefsFromsStorage(parsedPrefs);
    }
  }, []);

  return (
    <Layout>
      <div className={styles.dashboardWrapper}>
        <Autocomplete autocompleteId={AutocompleteUseage.FirstAutoComlpete} />
        <Autocomplete autocompleteId={AutocompleteUseage.SecondAutoComlpete} />
        {/* <Autocomplete id={AutocompleteUseage.ThirdAutoComlpete} /> */}
      </div>
    </Layout>
  );
}
