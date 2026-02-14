import SockJS from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";

let stompClient = null;

export const connectBookingSocket = (bookingId, onStatusUpdate) => {
  stompClient = new Client({
    webSocketFactory: () => new SockJS("http://localhost:1200/ws"),
    reconnectDelay: 5000,

    onConnect: () => {
      console.log("WebSocket connected");

      stompClient.subscribe(`/topic/booking/${bookingId}`, (message) => {
        const data = JSON.parse(message.body);
        onStatusUpdate(data);
      });
    },

    onStompError: (frame) => {
      console.error("Broker error:", frame.headers["message"]);
    }
  });

  stompClient.activate();
};

export const disconnectBookingSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
  }
};
