import useWebSocket from "react-use-websocket";

const HOST = "ws://105.103.64.87:7001";

export const useRequirementWebsocket = (uri, isShouldReconnect = true) => {
  const { lastJsonMessage } = useWebSocket(`${HOST}${uri}`, {
    onOpen: () => console.log(`Connected to App WS ${uri}`),
    onClose: () => console.log(`Disconnect WS ${uri}`),
    shouldReconnect: () => isShouldReconnect,
    reconnectInterval: 3000
  });

  return { socketData: lastJsonMessage };
};
