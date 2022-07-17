import React, { useState } from "react";
import styled from "styled-components";

import $ from "../../styles/globals";
import Button from "../Button";
import Input from "../Input";
import InputLabel from "../InputLabel";

const Form = styled.div`
  position: absolute;
  margin-top: calc(${$.headerheight} + 30px);
  margin-bottom: 30px;
  display: flex;
  height: calc(100% - ${$.headerheight} - ${$.footerheight} - 60px);
  width: 330px;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const LogBackIntoSession = styled.div`
  color: ${$.colors.bg[200]};
  font-family: montserrat;
  font-size: 20px;
  margin-top: -10%;
  background-color: ${$.colors.bg[600]};
  padding: 10px;
  border-radius: ${$.borderRadius.standard};

  & > a {
    color: ${$.colors.primary[100]};
    text-decoration: underline;
  }
`;

const InputGroup = styled.div``;

const Label = styled(InputLabel)`
  font-size: ${$.fontSize().h4};
`;

const InputBox = styled(Input)`
  width: 310px;
  height: 40px;
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

const StartForm = ({ inputs, setInputs, submitForm, errors }) => {
  return (
    <Form>
      <InputGroup>
        <Label>TOPIC</Label>
        <InputBox
          type="text"
          onChange={(e) => {
            setInputs({ ...inputs, topic: e.target.value });
          }}
          value={inputs.topic}
        />
      </InputGroup>

      <InputGroup>
        <Label>RULES</Label>
        <InputBox
          type="text"
          onChange={(e) => {
            setInputs({ ...inputs, rules: e.target.value });
          }}
          value={inputs.rules}
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

      <InputGroup>
        <Label>CHOICES PER PERSON</Label>
        <InputBox
          type="number"
          onChange={(e) => {
            setInputs({
              ...inputs,
              choicesPerPerson: parseInt(e.target.value),
            });
          }}
          value={inputs.choicesPerPerson}
        />
      </InputGroup>

      <SubmitButton onClick={submitForm}>Start boop</SubmitButton>

      {errors.isErr && <ErrorMsg>{errors.errMsg}</ErrorMsg>}
    </Form>
  );
};

export default StartForm;
