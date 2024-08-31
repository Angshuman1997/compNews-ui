import React from "react";
import PopUpModal from "../PopUpModal/PopUpModal";
import MasonryView from "../MasonryView/MasonryView";
import HeadNews from "../HeadNews/HeadNews";
import CircularProgress from "@mui/material/CircularProgress";

const MainContainer = ({newsData, loading}) => {
  const handleClose = () => {};

  return (
    <React.Fragment>
      <HeadNews />
      <MasonryView itemData={newsData} />
      {loading && <CircularProgress />}
      <PopUpModal
        open={false}
        handleClose={handleClose}
        borderRadius={"1rem"}
        element={<React.Fragment>Hi</React.Fragment>}
      />
    </React.Fragment>
  );
};

export default MainContainer;
