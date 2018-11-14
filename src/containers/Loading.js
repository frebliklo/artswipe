import React from 'react'
import styled from 'styled-components'

import Screen from '../components/Screen'

import { theme } from '../constants'

const LoadingText = styled.h1`
  font-family: ${theme.font};
  font-size: 3.2rem;
  line-height: 1.5;
  color: ${theme.color.mainDark};
  text-align: center;
`

const Loading = () => (
  <Screen>
    <LoadingText>Loading...</LoadingText>
  </Screen>
)

export default Loading
