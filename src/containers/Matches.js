import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { theme } from '../constants'
import Match from '../components/Match'
import Container from '../components/styled/Container'

import { getMatchUsers } from '../firebase/db'

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 1.2rem;
  color: ${theme.color.primary};
`

class Matches extends Component {
  state = {
    loading: true,
    matches: []
  }

  async componentDidMount() {
    const matches = []
    await this.props.allMatches.map(async user => {
      const match = await getMatchUsers(user)
      let userAvatar, username
      if(match && match.avatar) {
        userAvatar = match.avatar
      } else {
        userAvatar = null
      }
      if(match && match.firstName && match.lastName) {
        username = `${match.firstName} ${match.lastName}`
      } else {
        username = 'No name'
      }
      await matches.push({
        avatar: userAvatar,
        name: username,
        createdAt: user.createdAt
      })
      await this.setState(() => ({ matches }))
    })
  }

  renderMatches = () => {
    const { matches } = this.state
    return matches.map(match => <Match key={match.user} match={match} />)
  }
  
  render() {
    const { matches } = this.state
    return (
      <Container justify="flex-start" padding="3.2rem 1.6rem">
        <Title>Matches</Title>
        {matches && this.renderMatches()}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  allMatches: state.matches.allMatches
})

export default connect(mapStateToProps)(Matches)
