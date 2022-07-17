import React, { useState } from "react";
import styled from "styled-components";

import $ from "../../styles/globals";
import Button from "../Button";
import Input from "../Input";
import InputLabel from "../InputLabel";

const Form = styled.div`
  position: absolute;
  margin-top: calc(${$.headerheight} + 50px);
  margin-bottom: 50px;
  display: flex;
  height: calc(100% - ${$.headerheight} - ${$.footerheight} - 100px);
  width: 330px;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const InputGroup = styled.div``;

const Label = styled(InputLabel)`
  font-size: ${$.fontSize().h3};
`;

const InputBox = styled(Input)`
  width: 310px;
  height: 50px;
  font-size: ${$.fontSize().h4};
  color: ${$.colors.bg[700]};
`;

const SubmitButton = styled(Button)`
  width: 100%;
`;

const ErrorMsg = styled.p`
  position: absolute;
  bottom: -20px;
  text-align: left;
  align-self: flex-start;
  color: #ff6969;
  font-size: ${$.fontSize().p};
`;

const JoinForm = ({ inputs, setInputs, submitForm, errors }) => {
  return (
    <Form>
      <InputGroup>
        <Label>ROOM NO.</Label>
        <InputBox
          type="text"
          onChange={(e) => {
            setInputs({ ...inputs, roomNumber: e.target.value });
          }}
          value={inputs.roomNumber}
        />
      </InputGroup>

      <InputGroup>
        <Label>NICKNAME</Label>
        <InputBox
          type="text"
          onChange={(e) => {
            setInputs({ ...inputs, username: e.target.value });
          }}
          value={inputs.username}
        />
      </InputGroup>

      <SubmitButton onClick={submitForm}>Join boop</SubmitButton>

      {errors.isErr && <ErrorMsg>{errors.errMsg}</ErrorMsg>}
    </Form>
  );
};

export default JoinForm;
