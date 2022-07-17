import envConfig from "../../envConfig";
import WebSocket from "isomorphic-ws";
import { navigate } from "gatsby";

class Socket {
  constructor() {
    this.initSocket();

    this.listeners = {
      newAdmin: (data) => {
        navigate("/vote", {
          state: data,
        });
      },
      roomInfo: (data) => {
        navigate("/vote", {
          state: data,
        });
      },
      myChoiceMade: (data) => {
        navigate("/results", {
          state: data,
        });
      },
    };
  }

  initSocket() {
    this.socket = new WebSocket(envConfig.wsUrl);

    this.socket.onopen = () => {
      console.log("socket opened");
    };

    this.socket.onmessage = (data) => {
      const { type, message } = JSON.parse(data.data);

      console.log(
        "SOCKET ON MESSAGE",
        type,
        message,
        this.listeners,
        this.listeners[type]
      );
      if (this.listeners[type]) {
        this.listeners[type](message);
      }
    };

    this.senders = {
      createAdmin: ({ username, topic, rules, choicesPerPerson }) => {
        this.socket.send(
          JSON.stringify({
            action: "newAdmin",
            data: {
              username,
              topic,
              rules,
              choicesPerPerson,
            },
          })
        );
      },
      createUser: ({ username, roomNumber }) => {
        this.socket.send(
          JSON.stringify({
            action: "newUser",
            data: {
              username,
              roomNumber,
            },
          })
        );
      },
      vote: ({ choices }) => {
        this.socket.send(
          JSON.stringify({
            action: "userMakeChoice",
            data: {
              choices,
            },
          })
        );
      },
      comMakeChoice: () => {
        this.socket.send(
          JSON.stringify({
            action: "comMakeChoice",
          })
        );
      },
      destroyRoom: () => {
        console.log("sending destroy room");
        this.socket.send(
          JSON.stringify({
            action: "destroyRoom",
          })
        );
      },
    };
  }

  newListener = (type, callback) => {
    this.listeners[type] = callback;
  };
}

export default Socket;
