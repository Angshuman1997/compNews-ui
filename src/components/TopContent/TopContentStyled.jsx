import styled from "styled-components";

export const Container = styled.div`
  z-index: 10;
  display: flex;
  width: 100%;
  align-items: center;
  background: transparent;
  position: fixed;

  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const Logo = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  margin-right: 1rem;
  column-gap: 0.2rem;

  @media (max-width: 768px) {
  margin-bottom: 0.5rem;
  }
`;

export const LogoText = styled.div`
  font-weight: 600;
  color: white;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const TopCombo = styled.div`
  display: flex;
  margin-right: 2rem;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  border: 2px solid #ffffff;
  border-radius: 1rem;
  width: 100%;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 1rem;
    width: 90%;
  }
`;
