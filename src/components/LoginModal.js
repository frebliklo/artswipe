import React from 'react'
import posed, { PoseGroup } from 'react-pose'
import styled from 'styled-components'

import LoginForm from './LoginForm'
import { ReactComponent as Close } from '../assets/close.svg'

import HelpText from './styled/HelpText'
import IntroContainer from './styled/IntroContainer'
import TextLink from './styled/TextLink'
import Title from './styled/Title'

const Overlay = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.33);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const Backdrop = posed(Overlay)({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
})

const Container = styled(IntroContainer)`
  position: absolute;
`

const Modal = posed(Container)({
  enter: {
    x: 0,
    y: 0,
    opacity: 1,
    delay: 200,
  },
  exit: {
    x: 25,
    y: -50,
    opacity: 0,
    transition: { duration: 150 }
  }
})

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const CloseIcon = styled(Close)`
  width: 2.8rem;
  height: 2.8rem;
  padding: .4rem;
  border-radius: 4px;
  transition: background 175ms ease-in-out;

  &:hover, &:focus {
    background: rgba(0,0,0,.1);
  }

  &:active {
    background: rgba(0,0,0,.25);
  }
`

const LoginModal = ({ visible, dismiss }) => (
  <PoseGroup>
    {
      visible && [
        <Backdrop key="backdrop" onClick={dismiss} />,
        <Modal key="modal">
          <Header>
            <Title>Login</Title>
            <CloseIcon width={24} height={24} onClick={dismiss} />
          </Header>
          <LoginForm />
          <HelpText>
            Don't have an account? <TextLink to="/signup">Sign up here</TextLink>
          </HelpText>
        </Modal>
      ]
    }
  </PoseGroup>
)

export default LoginModal