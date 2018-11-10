import styled from 'styled-components'
import { theme } from '../constants'

const RoundButton = styled.button`
  border: none;
  border-radius: 50%;
  font-size: 1.6rem;
  font-weight: 600;
  padding: 1.6rem;
  text-transform: uppercase;
  outline: none;
  background: ${props => props.dislike ? theme.color.dislike : theme.color.like};
  color: ${theme.color.offWhite};
  box-shadow: 0 2px 6px ${theme.color.secondary};
`

export default RoundButton
