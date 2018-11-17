import React, { Component } from 'react'
import styled from 'styled-components'

import SwipeCard from './SwipeCard'

const DeckContainer = styled.div`
  flex: 1;
  position: relative;
  width: 100%;
  max-width: 40rem;
  height: 48rem;
  margin-bottom: 2.4rem;
`

const DeckItem = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

class SwipeDeck extends Component {
  render() {
    const { items } = this.props

    return (
      <DeckContainer>
        {items.map(item => (
          <DeckItem key={item.asset_id}>
            <SwipeCard item={item} />
          </DeckItem>
        ))}
      </DeckContainer>
    )
  }
}

export default SwipeDeck
