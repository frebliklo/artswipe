import React, { Component } from 'react'
import { connect } from 'react-redux'
import posed from 'react-pose'
// import styled from 'styled-components'

import Container from '../components/styled/Container'
// import RoundButton from '../components/RoundButton'
import SwipeDeck from '../components/SwipeDeck'

// import { ReactComponent as ThumbUp } from '../assets/thumbs-up.svg'
// import { ReactComponent as ThumbDown } from '../assets/thumbs-down.svg'

import { getCulture } from '../actions/culture'

const PosedContainer = posed(Container)({
  init: { scale: 0, opacity: 0 },
  enter: { scale: 1, opacity: 1 }
})

// const ButtonContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-around;
//   width: 100%;
// `

class Main extends Component {
  state = {
    initialRender: true
  }
  
  componentDidMount() {
    if(this.state.initialRender) {
      this.setState(() => ({ initialRender: false }))
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.cultureItems.length < 3) {
      this.props.getCulture().then(() => console.log('Got culture!'))
    }
  }

  renderSwipeDeck = items => <SwipeDeck items={items} />

  render() {
    const { cultureItems } = this.props
    const { initialRender } = this.state

    return (
      <PosedContainer pose={initialRender ? 'init' : 'enter'}>
        {this.renderSwipeDeck(cultureItems)}
        {/* ADD THIS IN WHEN FIGURING OUT TO IMPERATIVELY TRIGGER ANIMATION! */}
        {/* <ButtonContainer>
          <RoundButton dislike onClick={() => console.log('dislike')}>
            <ThumbDown width={24} height={24} />
          </RoundButton>
          <RoundButton onClick={() => console.log('like')}>
            <ThumbUp width={24} height={24} />
          </RoundButton>
        </ButtonContainer> */}
      </PosedContainer>
    )
  }
}

const mapStateToProps = (state, props) => ({
  cultureItems: state.culture
})

const mapDispatchToProps = dispatch => ({
  getCulture: () => dispatch(getCulture())
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
