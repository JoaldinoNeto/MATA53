import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
  display: flex;
`;

const Aside = styled.div`
  height: 100%;
  width: 400px;
  background-color: rgba(0, 0, 0, 0.12);
`;

const FormCreateGraph = styled.div`
  display: flex;
  flex-direction: column;

  & > div {
    display: grid;
    grid-template-columns: calc(50% - 8px) calc(50% - 8px);
    grid-gap: 16px;
  }
`;

export { Container, Aside, FormCreateGraph };
