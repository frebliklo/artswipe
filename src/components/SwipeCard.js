import React, { Component } from 'react'
import posed from 'react-pose'
import { transform } from 'popmotion'
import styled from 'styled-components'

import { ReactComponent as ThumbUp } from '../assets/thumbs-up.svg'
import { ReactComponent as ThumbDown } from '../assets/thumbs-down.svg'

const SwipeableImage = posed.div({
  draggable: 'x',
  dragBounds: { left: -200, right: 200 },
  init: { scale: 1, boxShadow: '0px 2px 15px rgba(0,0,0,0.1)' },
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
  z-index: 200;
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
  max-width: 40rem;
  height: 45rem;
  border-radius: 4px;
  margin-bottom: 2.4rem;
  overflow: hidden;
  background: #FFF;
`

class SwipeCard extends Component {
  _handleDragEnd = () => {
    this.props.onDragEnd()
    console.log(this.props.cardPose)
  }
  
  render() {
    const { onDrag, children, cardPose } = this.props
    return (
      <Card
        pose={cardPose}
        onDragEnd={this._handleDragEnd}
        onValueChange={{ x: onDrag }}
      >
        <RedMask>
          <ThumbDown width={48} height={48} />
        </RedMask>
        <GreenMask>
          <ThumbUp width={48} height={48} />
        </GreenMask>
        {children}
      </Card>    
    )
  }
}

export default SwipeCard
