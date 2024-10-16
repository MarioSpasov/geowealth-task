import React from "react";
import Layout from "../../components/Layout/Layout.tsx";
import Autocomplete from "../../components/Autocomplete/Autocomplete.tsx";
import styles from "./Dashboard.module.scss";
import { AutocompleteUseage } from "../../types/enums.ts";

export default function Dashboard() {
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
