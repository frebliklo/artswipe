import React from 'react'
import posed from 'react-pose'
import styled from 'styled-components'
import { theme } from '../constants'

const PosedContainer = posed.div({
  enter: { scale: 1, opacity: 1 },
  exit: { scale: .4, opacity: 0 }
})

const Container = styled(PosedContainer)`
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  width: 100%;
  height: 100%;
`

const Img = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Title = styled.h3`
  display: block;
  position: absolute;
  top: auto;
  right: auto;
  bottom: 1.2rem;
  left: 1.2rem;
  font-size: 2rem;
  font-weight: 600;
  color: ${theme.color.bg};
  text-shadow: 0 0 2px rgba(0,0,0,.98);
`

const Image = ({ assetId, title, thumb }) => (
  <Container key={assetId}>
    <Title>{title ? title : 'Ingen titel!'}</Title>
    <Img id={assetId} src={thumb} alt={title} />
  </Container>
)

export default Image
