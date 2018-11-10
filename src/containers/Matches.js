import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { theme, API_BASE_URL } from '../constants'
import Match from '../components/Match'

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  max-width: 50rem;
  padding: 3.2rem 1.6rem;
`

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 1.2rem;
  color: ${theme.color.primary};
`

class Matches extends Component {
  state = {
    matches: []
  }
  
  componentDidMount() {
    const url = `${API_BASE_URL}/match?user=${this.props.user}`

    axios.get(url)
      .then(res => {
        this.setState(() => ({ matches: res.data.all_matches }))
      })
  }

  renderMatches = () => {
    return this.state.matches.map(match => {
      return <Match
        key={match}
        name={match}
      />
    })
  }
  
  render() {
    return (
      <Container>
        <Title>Matches</Title>
        {this.renderMatches()}
      </Container>
    )
  }
}

export default Matches
