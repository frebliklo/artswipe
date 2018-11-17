import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import posed from 'react-pose'
import { transform } from 'popmotion'
import styled from 'styled-components'

import { sendChoice } from '../actions/culture'

import Image from './Image'

const { pipe, clamp, interpolate, blendColor } = transform

const SwipeableImage = posed.div({
  label: 'swipeCard',
  draggable: 'x',
  dragBounds: { left: -200, right: 200 },
  enter: { opacity: 0, scale: 0.4 },
  init: { opacity: 1, scale: 1, boxShadow: '0px 2px 5px rgba(0,0,0,0.25)' },
  drag: { opacity: 1, scale: 1.02, boxShadow: '0px 5px 35px rgba(0,0,0,0.5)' },
  like: { x: 300, opacity: 0, scale: 0.6 },
  dislike: { x: -300, opacity: 0, scale: 0.6 },
  dragEnd: {
    transition: { type: 'spring' }
  },
  passive: {
    rotateZ: ['x', interpolate([-200, 0, 200], [-5, 0, 5])]
  }
})

const ColorMask = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

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

class SwipeCard extends PureComponent {
  state = {
    currentX: 0,
    pose: this.props.pose
  }

  componentDidUpdate(prevProps) {
    if(prevProps.pose !== this.props.pose) {
      this.setState({ pose: this.props.pose })
    }
  }
  
  _onDrag = x => {
    this.setState(() => ({ currentX: x }))
  }
  
  _handleDragEnd = () => {
    const { currentX } = this.state
    if(currentX > 75) {
      this.setState(() => ({ pose: 'like' }))
    } else if(currentX < -75) {
      this.setState(() => ({ pose: 'dislike' }))
    } else {
      this.setState(() => ({ pose: 'init' }))
    }
  }

  _onAnimationEnd = (pose, item) => {
    const { onAnimationEnd, sendChoice } = this.props
    console.log(pose)
    if(pose === 'like') {
      onAnimationEnd()
      sendChoice(true, item)
    } else if(pose === 'dislike') {
      onAnimationEnd()
      sendChoice(false, item)
    } else {
      return null
    }
  }

  changePose = pose => {
    console.log('Change pose to:', pose)
  }
  
  render() {
    const { pose } = this.state
    const { item, swipeCard } = this.props
    return (
      <Card
        ref={swipeCard}
        initialPose="enter"
        pose={pose}
        onPoseComplete={pose => this._onAnimationEnd(pose, item)}
        onDragEnd={this._handleDragEnd}
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
