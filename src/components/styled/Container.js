import styled from 'styled-components'

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.justify ? props.justify : 'center'};
  align-items: center;
  width: 100%;
  max-width: 50rem;
  margin: 0 auto;
  padding: ${props => props.padding ? props.padding : '1.6rem'};
`

export default Container
