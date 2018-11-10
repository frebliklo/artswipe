import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import posed from 'react-pose'
import { theme } from '../constants'
import { ReactComponent as Chevron } from '../assets/chevron.svg'

const containerProps ={
  init: { scale: 0 },
  show: { scale: 1 },
  hide: { scale: 0 }
}

const Container = styled(posed.div(containerProps))`
  display: flex;
  position: fixed;
  top: 24px;
  right: auto;
  bottom: auto;
  left: auto;
  justify-content: center;
  align-items: center;
  background: ${theme.color.white};
  z-index: 50;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,.25);
`

const MatchLink = styled(Link)`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 2.4rem;
`

const TextContainer = styled.div`
  margin-right: 2rem;
`

const Title = styled.h1`
  font-size: 2rem;
  color: ${theme.color.fg};
  margin: 0;
`

const SubTitle = styled.h3`
  font-size: 1.6rem;
  color: ${theme.color.secondary};
`

const Notification = ({ pose }) => {
  return (
    <Container pose={pose}>
      <MatchLink to="/matches">
        <TextContainer>
          <Title>Du har et nyt match!</Title>
          <SubTitle>Klik her for at se dine matches</SubTitle>
        </TextContainer>
        <Chevron width={24} height={24} />
      </MatchLink>
    </Container>
  )
}

export default Notification
