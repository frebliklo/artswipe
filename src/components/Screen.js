import styled from 'styled-components'
import { theme } from '../constants'

const Screen = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  background: ${theme.gradient};
`

export default Screen
