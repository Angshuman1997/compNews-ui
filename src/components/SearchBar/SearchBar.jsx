import React from "react";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { SearchBox, SearchBtn } from "./SearchBarStyled";

const SearchBar = () => {
  return (
    <SearchBox>
      <input type="text" placeholder="Search..." />
      <SearchBtn>
          <SearchOutlinedIcon />
      </SearchBtn>
    </SearchBox>
  );
};

export default SearchBar;
