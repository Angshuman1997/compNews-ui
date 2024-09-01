import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function HeadNews({ newsDataHeadline }) {
  const delay = 6000;

  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    if (!hovered) {
      resetTimeout();
      timeoutRef.current = setTimeout(
        () =>
          setIndex((prevIndex) =>
            prevIndex === newsDataHeadline.length - 1 ? 0 : prevIndex + 1
          ),
        delay
      );
    }

    return () => resetTimeout();
  }, [index, hovered, newsDataHeadline.length]);

  return (
    <Container>
      <SliderContent indexVal={-index * 100}>
        {newsDataHeadline.map((item, idx) => (
          <SlideItem
            key={idx}
            backgroundImage={item.promoImage.url}
            onMouseOver={() => {
              setHovered(true);
              setIndex(idx);
            }}
            onMouseOut={() => setHovered(false)}
            onClick={() => window.open(item.url, "_blank")}
          >
            <SliderItemtext className="slider-content-text">
              {item.headline}
            </SliderItemtext>
          </SlideItem>
        ))}
      </SliderContent>
      <SlideDotContent>
        <SliderDotContentSub className="slider-dot-sub">
          <ArrowButton
            onClick={() =>
              setIndex(index === 0 ? newsDataHeadline.length - 1 : index - 1)
            }
          >
            <ArrowBackIosIcon sx={{ color: "white" }} />
          </ArrowButton>
          {newsDataHeadline.map((_, idx) => (
            <SlideDotBtn key={idx} onClick={() => setIndex(idx)}>
              <SlideDot active={index === idx} />
            </SlideDotBtn>
          ))}
          <ArrowButton
            onClick={() =>
              setIndex(index === newsDataHeadline.length - 1 ? 0 : index + 1)
            }
          >
            <ArrowForwardIosIcon sx={{ color: "white" }} />
          </ArrowButton>
        </SliderDotContentSub>
      </SlideDotContent>
    </Container>
  );
}

export default HeadNews;

const Container = styled.div`
  overflow: hidden;
  margin-top: 4rem;
  position: relative;
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    margin-top: 7rem;
  }
`;

const SliderContent = styled.div`
  display: flex;
  transition: transform 1s ease;
  transform: ${(props) => `translateX(${props.indexVal}%)`};
  width: 100%;
`;

const SlideItem = styled.div`
  flex: 0 0 100%;
  height: 20rem;
  cursor: pointer;
  border-radius: 0.3rem;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (min-width: 1500px) {
    height: 40rem;
  }

  @media (max-width: 800px) {
    height: 15rem;
  }

  @media (max-width: 480px) {
    height: 10rem;
  }
`;

const SlideDotContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 10px;
  width: 100%;
`;

const SliderDotContentSub = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10rem);
  border-radius: 0.6rem;
`;

const SlideDotBtn = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  margin: 0 0.4rem;
`;

const SlideDot = styled.div`
  height: 1.25rem;
  width: 1.25rem;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "grey" : "black")};
  border: 2px solid black;

  @media (max-width: 800px) {
    height: 0.5rem;
    width: 0.5rem;
  }
`;

const ArrowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #000000;

  &:hover {
    color: #837575;
  }
`;

const SliderItemtext = styled.div`
  color: white;
  font-size: 2rem;
  font-weight: 600;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.2);

  @media (min-width: 1500px) {
    font-size: 4remrem;
  }

  @media (max-width: 800px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;
