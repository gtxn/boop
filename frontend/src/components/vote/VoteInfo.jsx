import React from "react";
import styled from "styled-components";

import RoomNumberDisplay from "../RoomNumberDisplay";
import $ from "../../styles/globals";

const VoteInfoWrapper = styled.div`
  width: 100%;
  align-self: flex-start;
`;

// const RoomNumberDisplay = styled.div`
//   background-color: ${$.colors.bg[100]};
//   color: ${$.colors.bg[700]};
//   width: 100%;
//   height: 330px;
//   height: 70px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   border-radius: ${$.borderRadius.standard};
//   font-size: ${$.fontSize().h3};
//   font-family: mochiy;
//   transition: 0.3s;

//   :hover {
//     cursor: pointer;
//     background-color: ${$.colors.bg[300]};
//   }

//   :after {
//     content: "Click to copy invite link";
//     font-size: 10px;
//     font-weight: 400;
//     color: ${$.colors.bg[500]};
//   }
// `;

const TopicDisplay = styled.p`
  font-family: montserrat;
  font-size: ${$.fontSize().h4};
  text-align: left;
  align-self: flex-start;
  color: ${$.colors.bg[100]};

  & > span {
    font-weight: 600;
  }
`;

const RulesDisplay = styled.p`
  font-family: montserrat;
  font-size: ${$.fontSize().p};
  text-align: left;
  align-self: flex-start;
  color: ${$.colors.bg[100]};

  & > span {
    font-weight: 600;
  }
`;

const VoteInfo = ({ roomInfo }) => {
  return (
    <VoteInfoWrapper>
      <RoomNumberDisplay roomNumber={roomInfo.roomNumber} />
      <TopicDisplay>
        <span>Topic</span> -- {roomInfo.topic}
      </TopicDisplay>
      <RulesDisplay>
        <span>Rules</span> -- {roomInfo.rules}
      </RulesDisplay>
    </VoteInfoWrapper>
  );
};

export default VoteInfo;
