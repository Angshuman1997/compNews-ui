import React from "react";
import MasonryView from "../MasonryView/MasonryView";
import HeadNews from "../HeadNews/HeadNews";
import CircularProgress from "@mui/material/CircularProgress";

const MainContainer = ({newsData, newsDataHeadline, loading}) => {

  return (
    <React.Fragment>
      <HeadNews newsDataHeadline = {newsDataHeadline} />
      <MasonryView itemData={newsData} />
      {loading && <CircularProgress />}
    </React.Fragment>
  );
};

export default MainContainer;
