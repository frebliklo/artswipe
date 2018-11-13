import React from 'react'
import styled from 'styled-components'

import { theme } from '../constants'

const StyledScreen = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  background: ${theme.gradient};
  position: relative;
`

const Screen = ({ children }) => (
  <StyledScreen>
    {children}
  </StyledScreen>
)

export default Screen
