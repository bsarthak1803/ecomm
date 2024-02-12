import { ChangeEvent, ChangeEventHandler, memo } from "react";
import { SearchIcon } from "../../icons/search_icon";
import styles from "./SearchBar.module.css";
import { debounce } from "../../utils/utilMethods";

interface SearchBarProps {
  onSearchHandler: ChangeEventHandler;
}

export const SearchBar = memo(({
  onSearchHandler,
}: SearchBarProps): React.ReactElement => {
  return (
    <section className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search for products here!!"
        onChange={debounce(onSearchHandler, 1000)}
      />
      <button aria-label='search button' type="submit" className={styles.searchIcon}>
        <SearchIcon />
      </button>
    </section>
  );
});

SearchBar.displayName = 'SearchBar';