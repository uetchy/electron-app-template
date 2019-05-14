import { remote } from 'electron'
import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import 'react-tippy/dist/tippy.css'
import { Tooltip } from 'react-tippy'

import logo from './logo.svg'

export default function App() {
  const [filePath, setFilePath] = useState('')

  async function openFile() {
    const files = remote.dialog.showOpenDialog({
      properties: ['openFile'],
    })
    setFilePath(files[0])
  }

  return (
    <Container>
      <Header>
        <Logo src={logo} />
        <Tooltip
          title="Open File Dialog"
          position="bottom"
          trigger="mouseenter">
          <Link onClick={openFile}>Explore</Link>
        </Tooltip>
        <p>{filePath}</p>
      </Header>
    </Container>
  )
}

const Container = styled.div`
  text-align: center;
`

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Logo = styled.img`
  animation: ${spinAnimation} infinite 20s linear;
  height: 40vmin;
  pointer-events: none;
`

const Header = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

const Link = styled.button`
  background-color: #61dafb;
  outline: none;
  border: 0;
  padding: 10px 15px;
  cursor: pointer;

  &:hover {
    background-color: #ffffff;
  }
`
