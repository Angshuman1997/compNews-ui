import React from "react";
import styled from "styled-components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function HeadNews({newsDataHeadline}) {
  const colors = ["#0088FE", "#00C49F", "#e4e716", "#ff4d00"];
  const delay = 4000;

  const [index, setIndex] = React.useState(0);
  const [hovered, setHovered] = React.useState(false);

  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    if (!hovered) {
      resetTimeout();
      timeoutRef.current = setTimeout(
        () =>
          setIndex((prevIndex) =>
            prevIndex === colors.length - 1 ? 0 : prevIndex + 1
          ),
        delay
      );

      return () => {
        resetTimeout();
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, hovered]);

  return (
    <Container>
      <SliderContent indexVal={-index * 100}>
        {colors.map((backgroundColor, index) => (
          <SlideItem
            key={index}
            backgroundColor={backgroundColor}
            onMouseOver={() => {
              setHovered(true);
              setIndex(index);
            }}
            onMouseOut={() => setHovered(false)}
          >
            Hi
          </SlideItem>
        ))}
      </SliderContent>
      <SlideDotContent>
        <button className="arrow" onClick={()=>setIndex(index === 0 ? colors.length - 1 : index-1)}>
          <ArrowBackIosIcon sx={{
            color: 'white'
          }} />
        </button>
        {colors.map((_, idx) => (
          <SlideDotBtn
            key={idx}
            onClick={() => {
              setIndex(idx);
            }}
            onTouchEnd={() => {
              setIndex(idx);
            }}
          >
            <SlideDot active={index === idx} />
          </SlideDotBtn>
        ))}
        <button className="arrow" onClick={()=>setIndex(index === colors.length - 1 ? 0 : index+1)}>
          <ArrowForwardIosIcon sx={{
            color: 'white'
          }} />
        </button>
      </SlideDotContent>
    </Container>
  );
}

export default HeadNews;

const Container = styled.div`
  overflow: hidden;
  margin-top: 4rem;

  @media (max-width: 768px) {
    margin-top: 7rem;
  }
`;

const SliderContent = styled.div`
  white-space: nowrap;
  transition: ease 1000ms;
  transform: ${(props) =>
    props.indexVal ? `translate3d(${props.indexVal}%, 0, 0)` : ""};
`;

const SlideDotContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0 1rem 0;
  button.arrow {
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
  }
`;

const SlideDotBtn = styled.button`
  border: none;
  cursor: pointer;
  padding: 0;
  background: none;
  margin: 0 0.4rem;
`;

const SlideDot = styled.div`
  display: inline-block;
  height: 1.25rem;
  width: 1.25rem;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "#3a3838" : "#c4c4c4")};
  @media screen and (max-width: 800px) {
    height: 0.5rem;
    width: 0.5rem;
  }
`;

const SlideItem = styled.div`
  height: 20rem;
  cursor: pointer;
  @media screen and (max-width: 800px) {
    font-size: 0.8rem;
  }

  @media screen and (min-width: 1500px) {
    height: 40rem;
  }

  @media screen and (max-width: 800px) {
    height: 15rem;
  }

  @media screen and (max-width: 480px) {
    height: 10rem;
  }

  display: inline-block;
  width: 100%;
  border-radius: 0.3rem;
  background: ${(props) =>
    props?.backgroundColor ? props?.backgroundColor : "#ffffff"};
`;