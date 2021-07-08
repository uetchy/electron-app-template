import React, { useEffect } from "react";

const API = window.electron;

export function useElectron() {
  return API;
}

export function useIpc<K extends IpcResponseKey>(
  channel: K,
  cb: (args: IpcResponsePayload<K>) => void,
  deps?: React.DependencyList
) {
  useEffect(() => {
    const listenerKey = API.onResponse(channel, (args) => cb(args));

    return () => {
      API.removeResponseHandler(channel, listenerKey);
    };
  }, deps);
}

export function sendEvent<K extends IpcRequestKey>(
  event: K,
  payload?: IpcRequestPayload<K>
) {
  API.send(event, payload);
}
