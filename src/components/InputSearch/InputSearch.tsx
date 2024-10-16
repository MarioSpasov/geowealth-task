import React, { useCallback, useEffect, useState } from "react";
import throttle from "lodash/throttle";
import { useFetchUsStates } from "../../hooks/useFetchUsStates.ts";
import { AutocompleteOptions } from "../../types/enums.ts";
import { useFetchGitHubUsers } from "../../hooks/useFetchGitHubUsers.ts";
import { FixedSizeList as List } from "react-window";

import styles from "./InputSearch.module.scss";

interface InputProps {
  typeOfSearch: string;
  onChoose: (typeOfSearch: string, text: string, id: string) => void;
}
interface UsStatesProps {
  name: string;
  abbreviation: string;
}

export default function InputSearch({ typeOfSearch, onChoose }: InputProps) {
  const [searchValueStates, setSearchValueStates] = useState<string>("");
  const [searchValueUsers, setSearchValueUsers] = useState<string>("");
  const [filteredStates, setFilteredStates] = useState<UsStatesProps[]>([]);

  const {
    data: usStates = [],
    isLoading: isStatesLoading,
    isError: isStatesError,
    refetch: refetchStates,
    error: errorStates,
  } = useFetchUsStates();

  const {
    data: gitHubUsers,
    isLoading: isUsersLoading,
    isError: isUsersError,
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
  }, [searchValueUsers, searchValueStates, typeOfSearch, filteredStates]);

  const handleOnType = useCallback(
    throttle((e: React.ChangeEvent<HTMLInputElement>) => {
      let value = "";
      value = e.target.value.toLowerCase();
      if (typeOfSearch === AutocompleteOptions.State) {
        setSearchValueStates(value);
        if (value.trim() !== "") {
          const filtered = usStates.filter((state: any) =>
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
    [typeOfSearch]
  );

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
            Search results: {usStates?.length || 0}
          </label>
          <input
            type="search"
            id="state-search"
            name={AutocompleteOptions.State}
            placeholder={`Search for ${typeOfSearch}`}
            onChange={handleOnType}
          />
          {/* {filteredStates.length === 0 && (
            <span className={styles.error}>No match</span>
          )} */}
          <>
            {/* {isStatesError && (
              <span className={styles.error}>Something went wrong!</span>
            )} */}
            {filteredStates.length && (
              <ul>
                {usStates && usStates.length && searchValueStates && (
                  <div className={styles.searchListWrapper}>
                    <ul>
                      {filteredStates &&
                        filteredStates.map((usState: UsStatesProps) => {
                          return (
                            <li
                              key={`${usState.name}-${usState.abbreviation}`}
                              onClick={() =>
                                onChoose(
                                  typeOfSearch,
                                  usState.abbreviation,
                                  usState.name
                                )
                              }
                            >
                              {usState.name}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                )}
              </ul>
            )}
          </>
        </div>
      );

    default:
      return null;
  }
}
