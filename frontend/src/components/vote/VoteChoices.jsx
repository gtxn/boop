import React, { useState, useContext } from "react";
import styled from "styled-components";

import Input from "../Input";
import InputLabel from "../InputLabel";
import Button from "../Button";
import $ from "../../styles/globals";
import RootContext from "../../utils/rootContext";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const InputLabelStyled = styled(InputLabel)`
  font-size: ${$.fontSize().h3};
`;

const InputStyled = styled(Input)`
  width: calc(100% - 20px);
  height: 40px;
`;

const InputGroup = styled.div``;

const SubmitButton = styled(Button)`
  width: 100%;
  height: 60px;
  font-size: ${$.fontSize().h4};
`;

const VoteChoices = ({ choicesPerPerson }) => {
  const [choices, setChoices] = useState([
    ...Array.from(Array(choicesPerPerson)).map(() => ""),
  ]);

  const { socket } = useContext(RootContext);

  const submitChoices = () => {
    console.log(choices);
    socket.senders.vote({ choices });
  };

  return (
    <Wrapper>
      {choices.map((_, i) => (
        <InputGroup>
          <InputLabelStyled key={i}>Choice #{i + 1}</InputLabelStyled>
          <InputStyled
            type="text"
            value={choices[i]}
            onChange={(e) => {
              setChoices([
                ...choices.slice(0, i),
                e.target.value,
                ...choices.slice(i + 1),
              ]);
            }}
          />
        </InputGroup>
      ))}
      <SubmitButton onClick={submitChoices}>Let's Go</SubmitButton>
    </Wrapper>
  );
};

export default VoteChoices;
