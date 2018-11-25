import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import posed from 'react-pose'
import styled from 'styled-components'

import SwipeCard from '../components/SwipeCard'

import Container from '../components/styled/Container'
import RoundButton from '../components/styled/RoundButton'

import { ReactComponent as ThumbUp } from '../assets/thumbs-up.svg'
import { ReactComponent as ThumbDown } from '../assets/thumbs-down.svg'

import { getCulture, sendChoice } from '../actions/culture'
import { fetchMatches } from '../actions/matches'

const ImageContainer = styled.div`
  width: 100%;
  max-width: 40rem;
  height: 44rem;
  margin-bottom: 2.4rem;
`

const buttonContainerConfig = {
  init: { scale: 0 },
  enter: { scale: 1 }
}

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`

const ButtonContainer = posed(StyledButtonContainer)(buttonContainerConfig)

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeItem: props.activeItem,
      pose: 'init'
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.cultureItems.length < 1) {
      this.props.getCulture()
    }

    if(prevProps.activeItem !== this.props.activeItem) {
      this.setState(() => ({
        activeItem: this.props.activeItem,
        pose: 'init'
      }))
      this.props.fetchMatches()
    }
  }

  onAnimationEnd = () => {
    this.setState({ activeItem: null })
  }

  handleClick = pose => {
    this.setState({ pose })
  }

  render() {
    const { activeItem, pose } = this.state

    return (
      <Container>
        <ImageContainer>
          {activeItem && <SwipeCard item={activeItem} pose={pose} onAnimationEnd={this.onAnimationEnd} />}
        </ImageContainer>
        <ButtonContainer initialPose="init" pose="enter">
          <RoundButton dislike onClick={() => this.handleClick('dislike')}>
            <ThumbDown width={24} height={24} />
          </RoundButton>
          <RoundButton onClick={() => this.handleClick('like')}>
            <ThumbUp width={24} height={24} />
          </RoundButton>
        </ButtonContainer>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  activeItem: state.culture.active,
  cultureItems: state.culture.all,
  allMatches: state.matches.all
})

const mapDispatchToProps = dispatch => ({
  getCulture: () => dispatch(getCulture()),
  sendChoice: (choice, culture) => dispatch(sendChoice(choice, culture)),
  fetchMatches: () => dispatch(fetchMatches())
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Main)
)
