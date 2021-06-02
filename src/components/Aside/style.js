import styled from "styled-components";

const Aside = styled.div`
  height: 100%;
  width: 400px;
  background-color: rgba(0, 0, 0, 0.12);
  margin-right: 8px;
  padding: 8px;
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

export { Aside, FormCreateGraph };
