import styled from "styled-components";

export const MultiSizeContainer = styled.div`
  flex: 1;
  height: 100%;
  margin-top: 15px;
  height: auto;
  display: grid;
  overflow-y: auto;
  grid-template-columns: repeat(auto-fill, 280px);
  grid-auto-rows: 10px;
  justify-content: center;
  @media screen and (max-width: 480px) {
    padding: 30px 0px;
    width: unset;
    left: 15px;
  }
  @media screen and (min-width: 515px) and (max-width: 785px) {
    grid-template-columns: repeat(auto-fill, 103%);
  }

  @media screen and (min-width: 786px) and (max-width: 789px) {
    grid-template-columns: repeat(auto-fill, 279px);
  }

  @media screen and (min-width: 790px) and (max-width: 809px) {
    grid-template-columns: repeat(auto-fill, 290px);
  }

  @media screen and (min-width: 1024px) and (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, 405px);
  }

  @media screen and (min-width: 451px) and (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, 400px);
  }

  @media screen and (min-width: 401px) and (max-width: 450px) {
    grid-template-columns: repeat(auto-fill, 350px);
  }

  @media screen and (min-width: 360px) and (max-width: 400px) {
    grid-template-columns: repeat(auto-fill, 325px);
  }

  @media screen and (max-width: 300px) {
    grid-template-columns: repeat(auto-fill, 250px);
  }

  @media screen and (min-width: 1840px) and (max-width: 1901px) {
    grid-template-columns: repeat(auto-fill, calc(51% - 300px));
  }

  @media screen and (min-width: 1440px) and (max-width: 1440px) {
    grid-template-columns: repeat(auto-fill, 307px);
  }

  @media screen and (min-width: 1902px) and (max-width: 2009px) {
    grid-template-columns: repeat(auto-fill, calc(50% - 300px));
  }

  @media screen and (min-width: 2011px) {
    grid-template-columns: repeat(auto-fill, calc(49% - 300px));
  }

  @media screen and (min-width: 2128px) {
    grid-template-columns: repeat(auto-fill, calc(48% - 300px));
  }

  @media screen and (min-width: 2255px) {
    grid-template-columns: repeat(auto-fill, calc(47% - 300px));
  }

  @media screen and (min-width: 2406px) {
    grid-template-columns: repeat(auto-fill, calc(46% - 300px));
  }

  @media screen and (min-width: 2579px) {
    grid-template-columns: repeat(auto-fill, calc(45% - 300px));
  }
`;
