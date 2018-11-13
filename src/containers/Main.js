import React, { Component } from 'react'
import styled from 'styled-components'

import Image from '../components/Image'
import Notification from '../components/Notification'
import RoundButton from '../components/RoundButton'
import Container from '../components/styled/Container'

import { ReactComponent as ThumbUp } from '../assets/thumbs-up.svg'
import { ReactComponent as ThumbDown } from '../assets/thumbs-down.svg'

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`

class Main extends Component {
  state = {
    loading: false
  }
  
  render() {
    return (
      <Container>
        <Notification pose={this.props.newMatch ? 'show' : 'hide'} />
        <Image
          asset="7458"
          collection="THM"
          title="Some art"
          loading={this.state.loading ? true : false}
        />
        <ButtonContainer>
          <RoundButton dislike onClick={() => console.log('dislike')}>
            <ThumbDown width={24} height={24} />
          </RoundButton>
          <RoundButton onClick={() => console.log('like')}>
            <ThumbUp width={24} height={24} />
          </RoundButton>
        </ButtonContainer>
      </Container>
    )
  }
}

export default Main
