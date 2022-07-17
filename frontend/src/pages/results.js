import React, { useEffect, useState, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { navigate } from "gatsby";

import RootContext from "../utils/rootContext";
import LayoutContext from "../utils/layoutContext";
import $ from "../styles/globals";
import BoopHeader from "../components/BoopHeader";
import RoomNumberDisplay from "../components/RoomNumberDisplay";
import Button from "../components/Button";
import BackArrowButton from "../components/BackArrowButton";

const zoomInAnimation = keyframes`
  from {
    transform: scale(0.1);
  }
  to {
    transform: scale(1);
  }
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  position: absolute;
  margin-top: calc(${$.headerheight} + 30px);
  margin-bottom: 30px;
  display: flex;
  height: calc(100% - ${$.headerheight} - ${$.footerheight} - 60px);
  width: 330px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ResultDisplay = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const BoopHasSpoken = styled.div`
  width: 100%;
  color: ${$.colors.bg[100]};
  font-size: ${$.fontSize().h4};
  font-family: montserrat;
  font-weight: 600;
`;

const MysteryBox = styled.div`
  position: relative;
  background-color: ${$.colors.secondary[300]};
  width: 100%;
  height: 300px;
  border-radius: ${$.borderRadius.large};
  padding: 10px;

  color: ${$.colors.bg[100]};
  font-family: montserrat;
  font-size: ${$.fontSize().h4};

  & > span {
    visibility: ${(props) => (props.isDecided ? "hidden" : "visible")};
    position: absolute;
    top: -30px;
    left: 0;
    z-index: 5;

    font-size: ${$.fontSize().h4};
    font-weight: 500;
    font-family: montserrat;

    color: white;
  }

  & > div {
    overflow-y: scroll;
    display: grid;
    grid-column-gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-row-gap: 10px;
    grid-auto-rows: 100px;
  }
`;

const UserBox = styled.div`
  border-radius: 100%;
  width: 90px;
  height: 90px;
  padding: 5px;
  background-color: ${$.colors.primary[100]};
  color: ${$.colors.bg[700]};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60%;
  overflow: hidden;
`;

const ChoiceDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;

  width: 100%;
  height: 100%;
  border-radius: 100%;
  text-align: center;
  font-size: ${$.fontSize().h2};
  background-color: ${$.colors.primary[100]};

  animation: ${zoomInAnimation} 0.3s ease-in-out forwards;
`;

const BoopButton = styled(Button)`
  width: 100%;
`;

const EndButton = styled(Button)`
  width: 100%;
  background-color: ${$.colors.red};
  color: white;
  border-radius: ${$.borderRadius.standard};

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: montserrat;
  font-size: ${$.fontSize().h4};
  font-weight: 600;
`;

const ResultsPage = ({ location }) => {
  const [decisionInfo, setDecisionInfo] = useState({
    isDecided: false,
    decision: "",
  });
  const [decidedUsers, setDecidedUsers] = useState([]);

  const { socket, roomInfo, isAdmin } = useContext(RootContext);
  const { showToast } = useContext(LayoutContext);

  const boopIt = () => {
    socket.senders.comMakeChoice();
  };

  useEffect(() => {
    if (!roomInfo && !roomInfo.roomNumber && !location.state.decidedUsers) {
      navigate("/");
    }

    setDecidedUsers(location.state.decidedUsers);

    socket.newListener("userMakeChoice", ({ username, decidedUsers }) => {
      setDecidedUsers(decidedUsers);
      showToast("User made choice", `${username} made a choice`, "success");
    });

    socket.newListener("comMakeChoice", (data) => {
      setDecisionInfo({
        isDecided: false,
        decision: "",
      });

      const t = setInterval(() => {
        setDecisionInfo({
          isDecided: true,
          decision: data.choice,
        });
        clearInterval(t);
      }, 100);
    });
  }, []);

  return (
    <Container>
      <BoopHeader />

      <Wrapper>
        <RoomNumberDisplay roomNumber={roomInfo.roomNumber} />

        <ResultDisplay>
          {decisionInfo.isDecided && (
            <BoopHasSpoken>BOOP! *The box* has spoken...</BoopHasSpoken>
          )}

          {decidedUsers && (
            <MysteryBox
              isDecided={decisionInfo.isDecided}
              onClick={() => {
                if (decisionInfo.isDecided && isAdmin) {
                  boopIt();
                }
              }}
            >
              <span>Num: {decidedUsers.length}</span>

              {decisionInfo.isDecided ? (
                <ChoiceDisplay>
                  <h2>{decisionInfo.decision}</h2>
                </ChoiceDisplay>
              ) : (
                <div>
                  {decidedUsers.length > 0
                    ? decidedUsers.map((user, index) => (
                        <UserBox key={index}>{user}</UserBox>
                      ))
                    : "Waiting..."}
                </div>
              )}
            </MysteryBox>
          )}

          {isAdmin &&
            (decisionInfo.isDecided ? (
              <EndButton
                onClick={() => {
                  socket.senders.destroyRoom();
                  navigate("/");
                }}
              >
                End
              </EndButton>
            ) : (
              <BoopButton
                onClick={() => {
                  boopIt();
                }}
              >
                BOOP it!
              </BoopButton>
            ))}

          <BackArrowButton
            onClick={() => {
              socket.senders.destroyRoom();
              navigate("/");
            }}
          />
        </ResultDisplay>
      </Wrapper>
    </Container>
  );
};

export default ResultsPage;
