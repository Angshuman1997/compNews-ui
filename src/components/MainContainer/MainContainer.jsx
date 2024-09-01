import React from "react";
import MasonryView from "../MasonryView/MasonryView";
import HeadNews from "../HeadNews/HeadNews";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";

const MainContainer = ({
  newsData,
  search,
  newsDataHeadline,
  extraLoading,
  loading,
}) => {
  if (loading) {
    return (
      <PageLoad className="extra-load">
        <CircularProgress sx={{ color: "white" }} />
      </PageLoad>
    );
  }
  return (
    <React.Fragment>
      {!search && newsDataHeadline && (
        <HeadNews newsDataHeadline={newsDataHeadline} />
      )}
      <MasonryView itemData={newsData} extraTopMargin={search ? true : false} />
      {extraLoading && (
        <ExtraLoad className="extra-load">
          <CircularProgress sx={{ color: "white" }} />
        </ExtraLoad>
      )}
    </React.Fragment>
  );
};

export default MainContainer;

const ExtraLoad = styled.div`
  display: flex;
  justify-content: center;
`;

const PageLoad = styled.div`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  height: 100vh;
  align-items: center;
  overflow: hidden !important;
`;
