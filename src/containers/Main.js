import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import posed from 'react-pose'
import styled from 'styled-components'

import Container from '../components/styled/Container'
import Image from '../components/Image'
import RoundButton from '../components/RoundButton'
import SwipeCard from '../components/SwipeCard'

import { ReactComponent as ThumbUp } from '../assets/thumbs-up.svg'
import { ReactComponent as ThumbDown } from '../assets/thumbs-down.svg'

import { getCulture } from '../actions/culture'

const PosedContainer = posed(Container)({
  init: { scale: 0, opacity: 0 },
  enter: { scale: 1, opacity: 1 }
})

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`

class Main extends PureComponent {
  state = {
    initialRender: true,
    currentX: 0,
    cardPose: 'init'
  }
  
  componentDidMount() {
    if(this.state.initialRender) {
      this.setState(() => ({ initialRender: false }))
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.cultureItems.length < 2) {
      this.props.getCulture()
    }
  }

  handleDrag = x => {
    this.setState(() => ({ currentX: x }))
  }

  handleDragEnd = () => {
    const { currentX } = this.state
    if(currentX > 100) {
      this.setState(() => ({ cardPose: 'like' }))
    } else if(currentX < -100) {
      this.setState(() => ({ cardPose: 'dislike' }))
    } else {
      this.setState(() => ({ cardPose: 'init' }))
    }
  }

  renderSwipeDeck = items => (
    <SwipeCard onDrag={this.handleDrag} onDragEnd={this.handleDragEnd} cardPose={this.state.cardPose}>
      <Image
        assetId={items[0].asset_id}
        title={items[0].title}
        thumb={items[0].thumb}
      />
    </SwipeCard>
  )

  render() {
    const { cultureItems } = this.props
    const { initialRender } = this.state

    return (
      <PosedContainer pose={initialRender ? 'init' : 'enter'}>
        {cultureItems && this.renderSwipeDeck(cultureItems)}
        <ButtonContainer>
          <RoundButton dislike onClick={() => console.log('dislike')}>
            <ThumbDown width={24} height={24} />
          </RoundButton>
          <RoundButton onClick={() => console.log('like')}>
            <ThumbUp width={24} height={24} />
          </RoundButton>
        </ButtonContainer>
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
