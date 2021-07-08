/**
 * Ipc Events
 */

interface IpcRequestEvents {
  ping: string;
}

interface IpcResponseEvents {
  pong: number;
}

type IpcRequestKey = keyof IpcRequestEvents;
type IpcRequestPayload<K extends IpcRequestKey> = IpcRequestEvents[K];
type IpcResponseKey = keyof IpcResponseEvents;
type IpcResponsePayload<K extends IpcResponseKey> = IpcResponseEvents[K];

type ReplyFunction = (
  channel: IpcResponseKey,
  payload: IpcResponsePayload<typeof channel>
) => void;
