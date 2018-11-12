import React, { Component } from 'react'
// import posed from 'react-pose'
import styled from 'styled-components'
import Image from '../components/Image'
import Notification from '../components/Notification'
import RoundButton from '../components/RoundButton'
import { ReactComponent as ThumbUp } from '../assets/thumbs-up.svg'
import { ReactComponent as ThumbDown } from '../assets/thumbs-down.svg'

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 50rem;
  margin: 0 auto;
  padding: 1.6rem;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`

// const SwipeContainer = posed.div({
//   draggable: 'x'
// })

class Main extends Component {
  state = {
    loading: false
  }
  // onOpinion = (user, choice, updateMatches) => {
  //   const { asset, collection } = this.state.img
  //   const matchUrl = `${API_BASE_URL}/match?user=${user}`
  //   const chooseUrl = `${API_BASE_URL}/choose?user=${user}&collection=${collection}&asset=${asset}&choice=${choice}`
  //   const cultureUrl = `${API_BASE_URL}/culture?user=${user}`
  
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
