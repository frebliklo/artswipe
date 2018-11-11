import React, { Component } from 'react'
import styled from 'styled-components'
import posed from 'react-pose'
import { theme } from '../constants'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 1.2rem;
`

const PosedPlaceholder = posed.label({
  empty: {
    fontSize: '1.6rem',
    x: 0,
    y: 0,
    transition: {
      ease: 'anticipate',
      duration: 400
    }
  },
  value: {
    fontSize: '1.2rem',
    x: -8,
    y: -30,
    transition: {
      ease: 'anticipate',
      duration: 400
    }
  }
})

const Placeholder = styled(PosedPlaceholder)`
  position: absolute;
  top: .8rem;
  right: auto;
  bottom: auto;
  left: 1.2rem;
  font-size: 1.6rem;
  line-height: 1.5;
  color: ${theme.color.grey};
`

const PosedInputField = posed.input({
  init: { color: 'currentColor' },
  error: { color: theme.color.dislike }
})

const InputField = styled(PosedInputField)`
  width: 100%;
  font-size: 1.6rem;
  line-height: 1.5;
  padding: .8rem 1.2rem;
  border: none;
  border-radius: 4px;
  background: ${theme.color.offWhite};
  outline: none;
`

const PosedError = posed.p({
  init: {
    opacity: 0,
    marginTop: 0,
    marginBottom: 0
  },
  error: {
    opacity: 1,
    marginTop: 4,
    marginBottom: 12
  }
})

const Error = styled(PosedError)`
  font-size: 1.4rem;
  line-height: 1.6rem;
  margin: 0 .8rem;
  color: ${theme.color.dislike};
`

class Input extends Component {
  constructor(props) {
    super(props)

    this.inputRef = React.createRef()

    this.state = {
      focused: false
    }
  }

  componentDidMount() {
    if(this.props.value) {
      this.setState(() => ({ focused: true }))
    }
  }

  placeholderClick = () => {
    this.inputRef.current.focus()
  }

  _onFocus = e => {
    this.setState(() => ({ focused: true }))

    if(this.props.onFocus) {
      this.props.onFocus(e)
    }
  }

  _onChange = e => {
    this.setState(() => ({ focused: true }))
    
    if(this.props.onChange) {
      this.props.onChange(e)
    }
  }

  _onBlur = e => {
    if(!e.target.value) {
      this.setState(() => ({ focused: false }))
    }

    if(this.props.onBlur) {
      this.props.onBlur(e)
    }
  }
  
  render() {
    const {
      type,
      placeholder,
      value,
      id,
      error
    } = this.props

    return (
      <Container pose={error ? 'error' : 'init'}>
        <Placeholder 
          pose={this.state.focused ? 'value' : 'empty'}
          onClick={this.placeholderClick}
          htmlFor={id}
        >
          {placeholder}
        </Placeholder>
        <InputField
          id={id}
          ref={this.inputRef}
          type={type ? type : 'text'}
          onFocus={this._onFocus}
          onChange={this._onChange}
          onBlur={this._onBlur}
          value={value}
        />
        <Error pose={error ? 'error' : 'init'}>{error ? error : 'Required'}</Error>
      </Container>
    )
  }
}

export default Input
