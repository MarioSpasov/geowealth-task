import React, { useCallback, useEffect, useState, useRef } from 'react';
import throttle from 'lodash/throttle';
import { useFetchUsStates } from '../../hooks/useFetchUsStates.ts';
import { AutocompleteOptions } from '../../types/enums.ts';
import { useFetchGitHubUsers } from '../../hooks/useFetchGitHubUsers.ts';
import { FixedSizeList as List } from 'react-window';

import styles from './InputSearch.module.scss';

interface InputProps {
  typeOfSearch: string;
  onChoose: (typeOfSearch: string, text: string, id: string) => void;
}

interface UsStatesProps {
  name: string;
  abbreviation: string;
}

export default function InputSearch({ typeOfSearch, onChoose }: InputProps) {
  const [searchValueStates, setSearchValueStates] = useState<string>('');
  const [searchValueUsers, setSearchValueUsers] = useState<string>('');
  const [filteredStates, setFilteredStates] = useState<UsStatesProps[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    data: usStates = [],
    isLoading: isStatesLoading,
    isError: isStatesError,
    refetch: refetchStates,
  } = useFetchUsStates();

  const {
    data: gitHubUsers,
    isLoading: isUsersLoading,
    refetch: refetchUsers,
    isFetching: isFetchingUsers,
  } = useFetchGitHubUsers(searchValueUsers);

  useEffect(() => {
    if (
      typeOfSearch === AutocompleteOptions.User &&
      searchValueUsers.trim().length > 0 &&
      !isUsersLoading &&
      !isFetchingUsers
    ) {
      refetchUsers();
    }
    if (
      typeOfSearch === AutocompleteOptions.User &&
      (usStates.length === 0 || filteredStates.length === 0)
    ) {
      refetchStates();
    }
  }, [searchValueUsers, typeOfSearch, filteredStates]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setSearchValueStates('');
    }
  };

  const handleOnType = useCallback(
    throttle((e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value.toLowerCase();
      if (typeOfSearch === AutocompleteOptions.State) {
        setSearchValueStates(value);
        if (value.trim() !== '') {
          const filtered = usStates.filter((state: UsStatesProps) =>
            state.name.toLowerCase().includes(value)
          );
          setFilteredStates(filtered);
        } else {
          setFilteredStates([...usStates]);
        }
      } else if (typeOfSearch === AutocompleteOptions.User) {
        setSearchValueUsers(value);
      }
    }, 500),
    [typeOfSearch, usStates]
  );

  // Render item for react-window List
  const renderRow = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const state = filteredStates[index];
    return (
      <div
        key={`${state.name}-${state.abbreviation}-${index}`}
        style={style}
        className={styles.listItem}
        onClick={() => {
          onChoose(typeOfSearch, state.abbreviation, state.name);
          setSearchValueStates(state.name);
        }}
      >
        {state.name}
      </div>
    );
  };

  // HANDLE USERS SEARCH
  switch (typeOfSearch) {
    case AutocompleteOptions.User:
      return (
        <div className={styles.inputSearchWrapper}>
          <label htmlFor="user-search">
            Search results: {gitHubUsers?.total_count || 0}
          </label>
          <input
            type="search"
            id="user-search"
            name={AutocompleteOptions.User}
            placeholder={`Search for ${typeOfSearch}`}
            onChange={handleOnType}
          />
        </div>
      );

    // HANDLE US STATES SEARCH
    case AutocompleteOptions.State:
      return (
        <div className={styles.inputSearchWrapper}>
          <label htmlFor="state-search">
            Search results: {usStates.length || 0}
          </label>
          <input
            type="search"
            id="state-search"
            name={AutocompleteOptions.State}
            placeholder={`Search for ${typeOfSearch}`}
            onChange={handleOnType}
            value={searchValueStates}
          />
          {filteredStates.length > 0 && searchValueStates.trim() ? (
            <List
              className={styles.searchListWrapper}
              height={150}
              itemCount={filteredStates.length}
              itemSize={35}
              width={300}
            >
              {renderRow}
            </List>
          ) : null}
        </div>
      );

    default:
      return null;
  }
}
