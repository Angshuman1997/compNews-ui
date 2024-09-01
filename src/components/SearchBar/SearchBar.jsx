import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { SearchBox, SearchBtn } from "./SearchBarStyled";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";

const SearchBar = ({ search, handleSearch, handleSearchClose }) => {
  return (
    <SearchBox>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleSearch}
      />
      {search && (
        <CloseBtn onClick={handleSearchClose}>
          <CloseIcon sx={{ color: "black" }} />
        </CloseBtn>
      )}
      <SearchBtn>
        <SearchOutlinedIcon />
      </SearchBtn>
    </SearchBox>
  );
};

export default SearchBar;

const CloseBtn = styled.button`
  padding: 0;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
