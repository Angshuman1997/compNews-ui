import * as React from "react";
import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";

export default function MasonryView({ itemData }) {
  const [loadingImages, setLoadingImages] = React.useState(
    Array(itemData.length).fill(true)
  );

  React.useEffect(() => {
    const handleResizeObserverError = (e) => {
      if (e.message === "ResizeObserver loop limit exceeded") {
        const resizeObserverErrDiv = document.getElementById(
          "webpack-dev-server-client-overlay-div"
        );
        const resizeObserverErr = document.getElementById(
          "webpack-dev-server-client-overlay"
        );
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute("style", "display: none");
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute("style", "display: none");
        }
      }
    };

    window.addEventListener("error", handleResizeObserverError);

    return () => {
      window.removeEventListener("error", handleResizeObserverError);
    };
  }, []);

  const handleImageLoad = (index) => {
    setLoadingImages((prev) => {
      const updatedLoading = [...prev];
      updatedLoading[index] = false;
      return updatedLoading;
    });
  };

  return (
    <Box sx={{ width: "100%", paddingTop: "0.5rem" }}>
      <Masonry
        columns={{ xs: 1, md: 3, xl: 5 }}
        spacing={2}
        sx={{ margin: "0px" }}
      >
        {itemData.map((item, index) => {
          const { headline, shortDateLastPublished, url } = item;
          const imageUrl = item?.promoImage?.url;

          return (
            <Boxies key={index} onClick={() => window.open(url, "_blank")}>
              <BoxDate>{shortDateLastPublished}</BoxDate>
              {loadingImages[index] && (
                <LoaderBox>
                  <CircularProgress color="inherit" />
                </LoaderBox>
              )}
              <img
                src={`${imageUrl}?w=162&auto=format`}
                srcSet={`${imageUrl}?w=162&auto=format&dpr=2 2x`}
                alt={item.title}
                onLoad={() => handleImageLoad(index)}
                style={{
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4,
                  display: loadingImages[index] ? "none" : "block",
                  width: "100%",
                }}
              />
              <Headline>{headline}</Headline>
            </Boxies>
          );
        })}
      </Masonry>
    </Box>
  );
}

const Boxies = styled.div`
  position: relative;
  color: white;
  border: 2px solid white;
  border-radius: 1rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    background: #3d3a3a;
    z-index: 5;
  }
`;

const BoxDate = styled.div`
  margin: 0 0 0.5rem 0;
  background: rgb(63, 62, 65);
  padding: 0.5rem;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  font-family: sans-serif;
  font-weight: 600;
`;

const LoaderBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 162px;
  width: 100%;
`;

const Headline = styled.div`
  margin-top: 0.5rem;
  font-weight: bold;
  text-align: center;
`;
