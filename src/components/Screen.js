import styled from 'styled-components'
import { theme } from '../constants'

const Screen = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  background: ${theme.gradient};
  position: relative;
`

export default Screen
