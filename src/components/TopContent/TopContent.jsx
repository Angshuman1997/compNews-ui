import React from "react";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import SearchBar from "../SearchBar/SearchBar";
import { Container, Logo, LogoText, TopCombo } from "./TopContentStyled";

const TopContent = () => {
  return (
    <Container id="top-content-container">
      <Logo id="logo">
        <LogoText id="logo-text">CompNews</LogoText>
        <NewspaperIcon sx={{ color: "white", fontSize: "1.5rem" }} />
      </Logo>
      <TopCombo id="top-content-combo">
        <SearchBar id="search-bar"/>
      </TopCombo>
    </Container>
  );
};

export default TopContent;
