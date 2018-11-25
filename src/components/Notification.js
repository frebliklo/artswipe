import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import posed from 'react-pose'

import { theme } from '../constants'

import { ReactComponent as Chevron } from '../assets/chevron.svg'

const containerProps = {
  enter: { scale: 1 },
  exit: { scale: 0 }
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

class Notification extends Component {
  state = {
    dragging: false
  }

  handleClick = e => {
    if(this.state.dragging) {
      e.preventDefault()
    }
  } 
  
  render() {
    const { onDrag } = this.props

    return (
      <Container onValueChange={{ y: onDrag }}>
        <MatchLink to="/matches" onClick={this.handleClick}>
          <TextContainer>
            <Title>You have a new match!</Title>
            <SubTitle>Click here to see your matches</SubTitle>
          </TextContainer>
          <Chevron width={24} height={24} />
        </MatchLink>
      </Container>
    )
  }
}

export default Notification
