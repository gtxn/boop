import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { navigate } from "gatsby";

import RootContext from "../utils/rootContext";
import BackArrowButton from "../components/BackArrowButton";
import BoopHeader from "../components/BoopHeader";
import JoinForm from "../components/join-boop/JoinForm";

const Container = styled.div`
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

const JoinBoopPage = () => {
  const { socket } = useContext(RootContext);

  const [inputs, setInputs] = useState({
    roomNumber: "",
    username: "",
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

    if (!inputs.roomNumber || !inputs.username) {
      setErrors({
        isErr: true,
        errMsg: "Please fill out all fields",
      });
    } else if (inputs.roomNumber.length !== 6) {
      setErrors({
        isErr: true,
        errMsg: "Room number must be 6 digits long",
      });
    } else if (/^\d+$/.test(inputs.roomNumber) === false) {
      setErrors({
        isErr: true,
        errMsg: "Room number must be digits only",
      });
    } else if (inputs.username.length > 15) {
      setErrors({
        isErr: true,
        errMsg: "Username must be 15 characters or less",
      });
    } else {
      socket.senders.createUser({
        username: inputs.username,
        roomNumber: inputs.roomNumber,
      });
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roomNumber = params.get("roomNumber");
    if (roomNumber) {
      setInputs({
        ...inputs,
        roomNumber,
      });
    }
  }, []);

  return (
    <Container>
      <BoopHeader />

      <JoinForm
        inputs={inputs}
        setInputs={setInputs}
        submitForm={submitForm}
        errors={errors}
      />

      <BackArrowButton
        onClick={() => {
          navigate("/");
        }}
      />
    </Container>
  );
};

export default JoinBoopPage;
