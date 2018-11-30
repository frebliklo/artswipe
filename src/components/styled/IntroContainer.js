import styled from 'styled-components'
import { theme } from '../../constants'

const IntroContainer = styled.div`
  flex: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 40rem;
  background: ${theme.color.white};
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,.25), 0 2px 30px rgba(0,0,0,.15);
  padding: 1.6rem 2.4rem 3.2rem;

  @media (max-width: 600px) {
    flex: 1;
    justify-content: flex-start;
    border-radius: 0;
    box-shadow: none;
  }
`

export default IntroContainer
