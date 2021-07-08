import { IpcMain, WebContents } from "electron";

// https://github.com/cawa-93/vite-electron-builder/issues/189

type MessageHandlers = {
  [key in IpcRequestKey]: (args: {
    request: IpcRequestPayload<key>;
    reply: ReplyFunction;
    sender: WebContents;
  }) => Promise<void>;
};

export function createHandlers(): MessageHandlers {
  const handlers: MessageHandlers = {
    ping: async ({ request, reply }) => {
      console.log("got ping: " + request);
      reply("pong", Math.random());
    },
  };

  return handlers;
}

export function installHandlers(ipc: IpcMain, handlers: MessageHandlers) {
  for (const [channel, handler] of Object.entries(handlers)) {
    ipc.on(channel, (event, request) => {
      const { reply, sender } = event;
      handler({ request, reply: reply as ReplyFunction, sender });
    });
  }
}
