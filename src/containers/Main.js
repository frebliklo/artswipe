import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Image from '../components/Image'
import RoundButton from '../components/RoundButton'
import { ReactComponent as ThumbUp } from '../assets/thumbs-up.svg'
import { ReactComponent as ThumbDown } from '../assets/thumbs-down.svg'
import AuthContext from '../context/AuthContext'
import { API_BASE_URL } from '../constants'

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 50rem;
  padding: 1.6rem;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`

class Main extends Component {
  state = {
    img: {
      src: null,
      asset: null,
      collection: null
    },
  }

  componentDidMount() {
    axios.get(`${API_BASE_URL}/culture`)
      .then(res => {
        this.setState(() => ({
          img: {
            src: res.data.thumb,
            asset: res.data.asset,
            collection: res.data.collection
          }
        }))
      })
      .catch(err => console.log(err))
  }

  onClick = (user, choice) => {
    const { asset, collection } = this.state.img

    const url = `${API_BASE_URL}/choose?user=${user}&collection=${collection}&asset=${asset}&choice=${choice}`

    axios.get(url)
      .then(res => {
        this.setState(() => ({
          img: {
            src: res.data.thumb,
            asset: res.data.asset,
            collection: res.data.collection
          }
        }))
      })
      .catch(err => console.log(err))
  }
  
  render() {
    const { src, collection } = this.state.img

    return (
      <AuthContext.Consumer>
        {({ user }) => (
          <Container>
            <Image
              src={src}
              collection={collection}
              loading={src ? false : true}
            />
            <ButtonContainer>
              <RoundButton dislike onClick={() => this.onClick(user, false)}>
                <ThumbDown width={24} height={24} />
              </RoundButton>
              <RoundButton onClick={() => this.onClick(user, true)}>
                <ThumbUp width={24} height={24} />
              </RoundButton>
            </ButtonContainer>
          </Container>
        )}
      </AuthContext.Consumer>
    )
  }
}

export default Main
