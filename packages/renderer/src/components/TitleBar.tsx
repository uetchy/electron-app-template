import styled from "@emotion/styled";
import React from "react";

export const TitleBar: React.FC<{ title?: string }> = ({
  title = document.title,
}) => {
  return <Container>{title}</Container>;
};

// See "main/index.ts"
const inactive = `body.inactive &`;

const Container = styled.div`
  width: 100%;
  height: 40px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* padding: 10px; */

  /* https://www.electronjs.org/docs/api/frameless-window */
  user-select: none;
  -webkit-app-region: drag;

  background: #2a2c2e;
  border-bottom: 1px solid #0d0e0e;
  color: #ebebeb;
  font-size: 10pt;
  font-weight: bold;

  ${inactive} {
    background: #2d2f30;
    color: #808080;
  }
`;
