import styled from "styled-components";

export const Main = styled.main`
  position: relative;
  flex: 1;
  height: 100%;
  padding: 1rem;

  @media screen and (max-width: 480px) {
    flex: 1 1;
    padding: 0.5rem;
  }
`;
