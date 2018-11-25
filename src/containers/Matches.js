import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import axios from 'axios'

import { theme, API_BASE_URL } from '../constants'
import Match from '../components/Match'
import Container from '../components/styled/Container'

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 1.2rem;
  color: ${theme.color.primary};
`

class Matches extends Component {
  renderMatches = () => {
    return this.props.allMatches.map(match => {
      return <Match
        key={match.id}
        name={match.user}
      />
    })
  }
  
  render() {
    return (
      <Container padding="3.2rem 1.6rem">
        <Title>Matches</Title>
        {this.renderMatches()}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  allMatches: state.matches.allMatches
})

export default connect(mapStateToProps)(Matches)
