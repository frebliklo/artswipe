import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { theme } from '../../constants'

const TextLink = styled(Link)`
  text-decoration: underline;
  color: ${theme.color.secondary};
  transition: color 140ms ease-in-out;

  &:hover {
    color: ${theme.color.main};
  }

  &:active {
    color: ${theme.color.fg};
  }
`

export default TextLink
