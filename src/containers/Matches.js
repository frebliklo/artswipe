import React, { Component } from 'react'
import styled from 'styled-components'
import { theme } from '../constants'

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: 50rem;
  padding: 1.6rem;
`

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 1.2rem;
  color: ${theme.color.offWhite};
`

class Matches extends Component {
  render() {
    return (
      <Container>
        <Title>Matches</Title>
      </Container>
    )
  }
}

export default Matches
