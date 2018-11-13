import React from 'react'
import styled from 'styled-components'
import Spinner from './Spinner'
import { theme } from '../constants'

const Container = styled.div`
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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0,0,0,.66);
  z-index: 5;
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
  <Container>
    <Img id={assetId} src={thumb} alt={title} />
    <Title>{title}</Title>
  </Container>
)

export default Image
