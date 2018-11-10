import React, { Component } from 'react'
import styled from 'styled-components'
import { theme } from '../constants'

const InputField = styled.input`
  width: 100%;
  font-size: 1.6rem;
  padding: .4rem 1.2rem;
  border: none;
  border-radius: 4px;
  background: ${theme.color.offWhite};
  outline: none;
  margin-bottom: 1.6rem;
`

class Input extends Component {
  render() {
    const {
      type,
      placeholder,
      onChange,
      onBlur,
      value
    } = this.props

    return (
      <InputField
        type={type ? type : 'text'}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
    )
  }
}

export default Input
