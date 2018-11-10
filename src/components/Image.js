import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  max-width: 40rem;
  height: 35rem;
  border-radius: 4px;
  box-shadow: 0 5px 15px rgba(0,0,0,.15), 0 0 35px rgba(0,0,0,.05);
  margin-bottom: 2.4rem;
  overflow: hidden;
`

const Img = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Image = ({ src, alt, loading }) => (
  <Container>
    {loading ? <p>Loading..</p> : <Img src={src} alt={alt} />}
  </Container>
)

export default Image
