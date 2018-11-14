import React from 'react'
import posed from 'react-pose'
import styled from 'styled-components'
import { theme } from '../constants'

const PosedContainer = posed.div({
  enter: { scale: 1, opacity: 1 },
  exit: { scale: .4, opacity: 0 }
})

const Container = styled(PosedContainer)`
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  width: 100%;
  max-width: 40rem;
  height: 45rem;
  border-radius: 4px;
  box-shadow: 0 5px 15px rgba(0,0,0,.15), 0 0 35px rgba(0,0,0,.05);
  margin-bottom: 2.4rem;
  overflow: hidden;
  background: ${props => props.loading ? '#FFF' : 'none'};
  transition: background 150ms ease-in-out;
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
    <Img id={assetId} src={thumb} alt={title} />
    <Title>{title}</Title>
  </Container>
)

export default Image
