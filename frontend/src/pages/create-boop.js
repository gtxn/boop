import React, { useContext, useState } from "react";
import styled from "styled-components";
import { navigate } from "gatsby";

import RootContext from "../utils/rootContext";
import BoopHeader from "../components/BoopHeader";
import BackArrowButton from "../components/BackArrowButton";
import StartForm from "../components/create-boop/StartForm";

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CreateBoopPage = () => {
  const { socket, setIsAdmin } = useContext(RootContext);

  const [inputs, setInputs] = useState({
    topic: "",
    rules: "",
    username: "",
    choicesPerPerson: 0,
  });

  const [errors, setErrors] = useState({
    isErr: false,
    errMsg: "",
  });

  const submitForm = () => {
    setErrors({
      isErr: false,
      errMsg: "",
    });

    if (
      !inputs.topic ||
      !inputs.rules ||
      !inputs.username ||
      !inputs.choicesPerPerson
    ) {
      setErrors({
        isErr: true,
        errMsg: "Please fill out all fields",
      });
    } else if (inputs.choicesPerPerson <= 0 || inputs.choicesPerPerson > 5) {
      setErrors({
        isErr: true,
        errMsg: "Please enter a number between 0 and 5",
      });
    } else if (inputs.username.length > 15) {
      setErrors({
        isErr: true,
        errMsg: "Username must be 15 characters or less",
      });
    } else {
      socket.senders.createAdmin(inputs);
      setIsAdmin(true);
    }
  };

  return (
    <Wrapper>
      <BoopHeader />
      <BackArrowButton
        onClick={() => {
          navigate("/");
        }}
      />

      <StartForm
        inputs={inputs}
        setInputs={setInputs}
        submitForm={submitForm}
        errors={errors}
      />
    </Wrapper>
  );
};

export default CreateBoopPage;
