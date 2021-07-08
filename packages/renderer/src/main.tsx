import { ChakraProvider } from "@chakra-ui/react";
import { createStore, persist, StoreProvider } from "easy-peasy";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import storeModel from "./store";
import { theme } from "./theme";

const APP_ELEMENT = "#app";

// https://easy-peasy.dev/docs/api/persist.html
const store = createStore(persist(storeModel, { storage: "localStorage" }));

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.querySelector(APP_ELEMENT)
);
