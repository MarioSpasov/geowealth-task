import React, { useEffect, useState } from "react";
import InputSearch from "../../components/InputSearch/InputSearch.tsx";
import StateOrUserToggle from "../StateOrUserToggle/StateOrUserToggle.tsx";
import SearchHistory from "../SearchHistory/SearchHistory.tsx";
import { AutocompleteOptions } from "../../types/enums.ts";
import Button from "../Button/Button.tsx";
import styles from "./Autocomplete.module.scss";

interface AutocompleteProps {
  id: string;
}
interface SearchValuesProps {
  search: string;
  id: string;
}

export default function Autocomplete({ id }: AutocompleteProps) {
  const [typeOfSearch, setTypeOfSearch] = useState<string>(
    AutocompleteOptions.State || "State"
  );

  const [searchValue, setSearchValue] = useState<SearchValuesProps>({
    search: "",
    id: "",
  });

  const handleResetSearch = () => {
    //Handle reset button
    console.log("id", id);
  };

  const onChoose = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.value.trim()) {
      setSearchValue({
        search: e?.target?.value.trim(),
        id: e?.target?.value.trim(),
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
        <SearchHistory />
      </div>
    </div>
  );
}
