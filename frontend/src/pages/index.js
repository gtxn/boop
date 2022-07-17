import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { navigate } from "gatsby";

import $ from "../styles/globals";
import boopLogo from "../assets/images/boopLogo.png";
import Button from "../components/Button";
import RootContext from "../utils/rootContext";

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;

  *:not(:first-child) {
    margin-bottom: 30px;
  }

  *:first-child {
    margin-bottom: 20px;
  }
`;

const Logo = styled.div`
  background-color: ${$.colors.secondary[500]};
  padding: 5px 30px;
  border-radius: ${$.borderRadius.standard};
`;

const startBoop = () => {
  navigate("/create-boop");
};

const joinBoop = () => {
  navigate("/join-boop");
};

const IndexPage = () => {
  const { setRoomInfo, roomInfo } = useContext(RootContext);

  useEffect(() => {
    setRoomInfo({});
  }, []);

  return (
    <>
      <Container>
        <Logo>
          <img src={boopLogo} alt="Boop" />
        </Logo>
        <Button onClick={startBoop}>BOOP creator</Button>
        <Button onClick={joinBoop}>BOOP joiner</Button>
      </Container>
    </>
  );
};

export default IndexPage;
