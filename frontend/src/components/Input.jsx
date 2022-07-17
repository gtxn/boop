import styled from "styled-components";

import $ from "../styles/globals";

const Input = styled.input`
  border: none;
  border-radius: ${$.borderRadius.standard};
  background-color: ${$.colors.bg[200]};
  transition: 0.3s;
  color: ${$.colors.bg[700]};
  padding: 0 10px;
  font-family: montserrat;

  &:focus {
    outline: none;
    background-color: ${$.colors.bg[300]};
  }
`;

export default Input;
