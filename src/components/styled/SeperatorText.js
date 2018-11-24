import styled from 'styled-components'
import { lighten } from 'polished'

import { theme } from '../../constants'

const SeperatorText = styled.p`
  font-size: 1.4rem;
  line-height: 1.6rem;
  color: ${lighten(0.4, theme.color.fg)};
  text-align: center;
  margin: 2.4rem 0;
`

export default SeperatorText
