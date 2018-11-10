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

const PosedPlaceholder = posed.p({
  empty: {
    fontSize: '1.6rem',
    y: 0,
    transition: {
      ease: 'anticipate',
      duration: 400
    }
  },
  value: {
    fontSize: '1.2rem',
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

const InputField = styled.input`
  width: 100%;
  font-size: 1.6rem;
  line-height: 1.5;
  padding: .8rem 1.2rem;
  border: none;
  border-radius: 4px;
  background: ${theme.color.offWhite};
  outline: none;
  margin-bottom: 1.6rem;
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
  }

  _onChange = e => {
    this.setState(() => ({ focused: true }))
    this.props.onChange(e)
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
      onChange,
      onBlur,
      value
    } = this.props

    return (
      <Container>
        <Placeholder 
          pose={this.state.focused ? 'value' : 'empty'}
          onClick={this.placeholderClick}
        >
          {placeholder}
        </Placeholder>
        <InputField
          ref={this.inputRef}
          type={type ? type : 'text'}
          onFocus={this._onFocus}
          onChange={this._onChange}
          onBlur={this._onBlur}
          value={value}
        />
      </Container>
    )
  }
}

export default Input
