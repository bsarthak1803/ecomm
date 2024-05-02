import { ChangeEventHandler, memo, useId } from "react";
import { SearchIcon } from "../../icons/search_icon";
import styles from "./SearchBar.module.css";
import { debounce } from "../../utils/utilMethods";

interface SearchBarProps {
  onSearchHandler: ChangeEventHandler;
}

export const SearchBar = memo(
  ({ onSearchHandler }: SearchBarProps): React.ReactElement => {
    const inputId = useId() + "--input--" + useId();
    const buttonId = useId() + "--button--" + useId();
    return (
      <form role="search" aria-label="plp-search" className={styles.searchBar}>
        <input
          id={inputId}
          type="text"
          placeholder="Search for products here!!"
          onChange={debounce(onSearchHandler, 1000)}
        />
        <button
          id={buttonId}
          aria-label="search button"
          type="submit"
          className={styles.searchIcon}
        >
          <SearchIcon />
        </button>
      </form>
    );
  }
);

SearchBar.displayName = "SearchBar";
