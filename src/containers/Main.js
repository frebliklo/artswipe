import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Image from '../components/Image'
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

const Main = ({ cultureItems }) => {  
  return (
    <Container>
      {cultureItems.length > 0 ? 
        (<Image
          assetId={cultureItems[0].asset_id}
          title={cultureItems[0].title}
          thumb={cultureItems[0].thumb}
        />)
      : null}
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

const mapStateToProps = (state, props) => ({
  cultureItems: state.culture
})

export default connect(mapStateToProps)(Main)
