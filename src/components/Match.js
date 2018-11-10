import React from 'react'
import styled from 'styled-components'
import { ReactComponent as Chevron } from '../assets/chevron.svg'
import { theme } from '../constants'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: .8rem 1.6rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,.05), 0 5px 15px rgba(0,0,0,.15);
  background: ${theme.color.offWhite};
  margin-bottom: 1.6rem;
`

const Title = styled.h1`
  font-size: 2.4rem;
  color: ${theme.color.fg};
`

// const Image = styled.img`
//   display: block;
//   height: 100%;
// `

const Match = ({ name }) => (
  <Container>
    <Title>{name}</Title>
    <Chevron width={24} height={24} />
  </Container>
)

export default Match
