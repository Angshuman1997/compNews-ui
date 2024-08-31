import styled from "styled-components";

export const Main = styled.main`
  position: relative;
  flex: 1;
  height: 100%;
  padding: 1rem;
  background-image: linear-gradient(230deg, #09090a, #212280);
  background-size: cover;
  background-attachment: fixed;
  @media screen and (max-width: 480px) {
    flex: 1 1;
    padding: 0.5rem;
  }
`;
