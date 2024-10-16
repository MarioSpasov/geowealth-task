import React from 'react';
import styles from './StateOrUserToggle.module.scss';
import { AutocompleteOptions } from '../../types/enums.ts';

export default function StateOrUserToggle({
  typeOfSearch,
  setTypeOfSearch,
  handleSaveToggleValue,
}) {
  const handleToggleClick = () => {
    if (typeOfSearch === AutocompleteOptions.State) {
      setTypeOfSearch(AutocompleteOptions.User);
      handleSaveToggleValue(AutocompleteOptions.User);
    } else {
      setTypeOfSearch(AutocompleteOptions.State);
      handleSaveToggleValue(AutocompleteOptions.State);
    }
  };

  const handleClickState = () => {
    setTypeOfSearch(AutocompleteOptions.State);
    handleSaveToggleValue(AutocompleteOptions.State);
  };

  const handleClickUser = () => {
    setTypeOfSearch(AutocompleteOptions.User);
    handleSaveToggleValue(AutocompleteOptions.User);
  };

  return (
    <div className={styles.toggleWrapper}>
      <p onClick={handleToggleClick}>Searching for:</p>

      <div className={styles.toggleOptions}>
        <p onClick={handleClickState}>{AutocompleteOptions.State}</p>
        <label className={styles.switch}>
          <input
            onChange={handleToggleClick}
            type="checkbox"
            checked={typeOfSearch === AutocompleteOptions.User}
          />
          <span className={styles.slider}></span>
        </label>
        <p onClick={handleClickUser}>{AutocompleteOptions.User}</p>
      </div>
    </div>
  );
}
