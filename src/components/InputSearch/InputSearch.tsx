import React, { useCallback, useEffect, useState } from 'react';
import throttle from 'lodash/throttle';
import { useFetchUsStates } from '../../hooks/useFetchUsStates.ts';
import { AutocompleteOptions } from '../../types/enums.ts';
import { useFetchGitHubUsers } from '../../hooks/useFetchGitHubUsers.ts';
import { FixedSizeList as List } from 'react-window';

import styles from './InputSearch.module.scss';
import { InputProps, UsStatesProps } from '../../types/interfaces.ts';

export default function InputSearch({ typeOfSearch, onSubmit }: InputProps) {
  const [searchValueStates, setSearchValueStates] = useState<string>('');
  const [searchValueUsers, setSearchValueUsers] = useState<string>('');
  const [filteredStates, setFilteredStates] = useState<UsStatesProps[]>([]);

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
    }, 50),
    [typeOfSearch, usStates, gitHubUsers]
  );

  const renderRowState = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const state = filteredStates[index];
    return (
      <div
        key={`${state.name}-${state.abbreviation}`}
        style={style}
        className={styles.listItem}
        onClick={() => {
          onSubmit(typeOfSearch, state.abbreviation, state.name);
          setSearchValueStates(state.name);
        }}
      >
        {state.name}
      </div>
    );
  };

  const renderRowUser = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const user = gitHubUsers?.items[index];
    if (!user) return null;

    return (
      <div
        key={`${user.id}-${user.login}`}
        style={style}
        className={styles.listItem}
        onClick={() => {
          onSubmit(typeOfSearch, user.id, user.login);
          setSearchValueUsers(user.login);
        }}
      >
        {user.login}
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
            value={searchValueUsers || ''}
            autoComplete="my-field-name1"
          />
          {isUsersLoading ? (
            <span>Loading...</span>
          ) : gitHubUsers?.items?.length > 0 && searchValueUsers.trim() ? (
            <List
              className={styles.searchListWrapper}
              height={150}
              itemCount={gitHubUsers.items.length}
              itemSize={35}
              width={300}
            >
              {renderRowUser}
            </List>
          ) : (
            <span>No users found</span>
          )}
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
            value={searchValueStates || ''}
          />
          {isStatesLoading ? (
            <span>Loading...</span>
          ) : filteredStates.length > 0 && searchValueStates.trim() ? (
            <List
              className={styles.searchListWrapper}
              height={150}
              itemCount={filteredStates.length}
              itemSize={35}
              width={300}
            >
              {renderRowState}
            </List>
          ) : (
            <span>No states found</span>
          )}
        </div>
      );

    default:
      return null;
  }
}
