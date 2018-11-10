import React, { Component } from 'react'
import posed from 'react-pose'
import styled from 'styled-components'
import axios from 'axios'
import { API_BASE_URL } from '../constants'
import AuthContext from '../context/AuthContext'
import Image from '../components/Image'
import Notification from '../components/Notification'
import RoundButton from '../components/RoundButton'
import { ReactComponent as ThumbUp } from '../assets/thumbs-up.svg'
import { ReactComponent as ThumbDown } from '../assets/thumbs-down.svg'

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

const SwipeContainer = posed.div({
  draggable: 'x'
})

class Main extends Component {
  state = {
    img: {
      asset: '',
      collection: '',
      title: ''
    },
    loading: true,
    newMatch: false
  }

  componentDidMount() {
    const url = `${API_BASE_URL}/culture?user=${this.props.user}`

    axios.get(url)
      .then(res => {
        const { asset, collection, title } = res.data
        this.setState(() => ({
          img: {
            asset,
            collection,
            title
          },
          loading: false
        }))
      })
      .catch(err => console.log(err))
  }

  onOpinion = (user, choice, updateMatches) => {
    const { asset, collection } = this.state.img
    const matchUrl = `${API_BASE_URL}/match?user=${user}`
    const chooseUrl = `${API_BASE_URL}/choose?user=${user}&collection=${collection}&asset=${asset}&choice=${choice}`
    const cultureUrl = `${API_BASE_URL}/culture?user=${user}`

    this.setState(() => ({ loading: true }))

    return axios.get(chooseUrl)
      .then(res => {
        axios.get(matchUrl)
          .then(res => {
            if(res.data.new_matches && res.data.new_matches.length >= 1) {
              this.setState(() => ({ newMatch: true }))
            } else {
              this.setState(() => ({ newMatch: false }))
            }
            axios.get(cultureUrl)
              .then(res => {
                const { asset, collection, title } = res.data
                this.setState(() => ({
                  img: {
                    asset,
                    collection,
                    title
                  }
                }))
                setTimeout(() => {
                  this.setState(() => ({
                    loading: false
                  }))
                }, 1500)
              })
          })
      })
      .catch(err => console.log(err))
  }
  
  render() {
    const { loading, img, newMatch } = this.state

    return (
      <AuthContext.Consumer>
        {({ user, updateMatches }) => (
          <Container>
            <Notification pose={newMatch ? 'show' : 'hide'} />
            <SwipeContainer
              onDragStart={() => console.log('Dragging!!!!')}
              onDragEnd={() => console.log(this)}
            >
              <Image
                asset={img.asset}
                collection={img.collection}
                title={img.title}
                loading={loading ? true : false}
              />
            </SwipeContainer>
            <ButtonContainer>
              <RoundButton dislike onClick={() => this.onOpinion(user, false, updateMatches)}>
                <ThumbDown width={24} height={24} />
              </RoundButton>
              <RoundButton onClick={() => this.onOpinion(user, true, updateMatches)}>
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
