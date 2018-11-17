import React, { Component } from 'react'
import { connect } from 'react-redux'
import posed from 'react-pose'
import { transform } from 'popmotion'
import styled from 'styled-components'

import { sendChoice } from '../actions/culture'

import Image from './Image'

const SwipeableImage = posed.div({
  label: 'swipeCard',
  draggable: 'x',
  dragBounds: { left: -200, right: 200 },
  init: { scale: 1, boxShadow: '0px 2px 5px rgba(0,0,0,0.01)' },
  drag: { scale: 1.02, boxShadow: '0px 5px 35px rgba(0,0,0,0.5)' },
  like: { x: '75%', opacity: 0, scale: 0.4 },
  dislike: { x: '-75%', opacity: 0, scale: 0.4 },
  dragEnd: {
    transition: { type: 'spring' }
  },
})

const ColorMask = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const { pipe, clamp, interpolate, blendColor } = transform

const RedMask = posed(ColorMask)({
  passive: {
    backgroundColor: ['x', pipe(
      interpolate([-125, 0], [0, 1]),
      clamp(0, 1),
      blendColor('rgba(188,9,48,.5)', 'rgba(255,255,255,0)')
    ), true]
  }
})

const GreenMask = posed(ColorMask)({
  passive: {
    backgroundColor: ['x', pipe(
      interpolate([0, 125], [0, 1]),
      clamp(0, 1),
      blendColor('rgba(255,255,255,0)', 'rgba(0,153,0,0.5)')
    ), true]
  }
})

const Card = styled(SwipeableImage)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  background: #FFF;
`

class SwipeCard extends Component {
  state = {
    currentX: 0,
    cardPose: 'init'
  }
  
  _onDrag = x => {
    this.setState(() => ({ currentX: x }))
  }
  
  _handleDragEnd = item => {
    const { currentX } = this.state
    const { sendChoice } = this.props
    if(currentX > 100) {
      this.setState(() => ({ cardPose: 'like' }))
      sendChoice(true, item)
    } else if(currentX < -100) {
      this.setState(() => ({ cardPose: 'dislike' }))
      sendChoice(false, item)
    } else {
      this.setState(() => ({ cardPose: 'init' }))
    }
  }
  
  render() {
    const { cardPose } = this.state
    const { item } = this.props
    return (
      <Card
        pose={cardPose}
        onDragEnd={() => this._handleDragEnd(item)}
        onValueChange={{ x: this._onDrag }}
      >
        <RedMask />
        <GreenMask />
        <Image
          assetId={item.asset_id}
          title={item.title}
          thumb={item.thumb}
        />
      </Card>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  sendChoice: (choice, culture) => dispatch(sendChoice(choice, culture))
})

export default connect(null, mapDispatchToProps)(SwipeCard)
