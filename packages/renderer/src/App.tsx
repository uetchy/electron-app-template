import { Box, Stack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import { TitleBar } from "./components/TitleBar";

function App() {
  return (
    <>
      <AppContainer>
        <Stack>
          <TitleBar />
          <Box p="12">Hello</Box>
        </Stack>
      </AppContainer>
    </>
  );
}

export default App;

/**
 * Styled Components
 */

const AppContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
`;
