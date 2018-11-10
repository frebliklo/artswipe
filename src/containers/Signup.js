import React, { Component } from 'react'
import styled from 'styled-components'
import IntroContainer from '../components/IntroContainer'
import Title from '../components/Title';
import Input from '../components/Input';

class Signup extends Component {
  render() {
    return (
      <IntroContainer>
        <Title>Signup</Title>
        <Input
          placeholder="Username"
          onChange={e => console.log(e)}
        />
      </IntroContainer>
    )
  }
}

export default Signup
