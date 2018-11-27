import React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { lighten } from 'polished'

import { ReactComponent as DefaultAvatar } from '../assets/avatar.svg'
import { ReactComponent as Chevron } from '../assets/chevron.svg'

import { theme } from '../constants'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,.05), 0 5px 15px rgba(0,0,0,.15);
  background: #FFF;
  margin-bottom: 1.6rem;
  cursor: pointer;
`

const SubContatiner = styled.div`
  flex: 1;
  margin: 0 1.6rem;
`

const Title = styled.h1`
  font-size: 2.4rem;
  color: ${theme.color.fg};
  margin: 0;
`

const Timestamp = styled.p`
  font-size: 1.4rem;
  line-height: 1.6rem;
  color: ${lighten(.2, theme.color.fg)};
`

const Avatar = styled.img`
  display: block;
  width: 5.6rem;
  height: 5.6rem;
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(0,0,0,.2);
`

const Default = styled(DefaultAvatar)`
  width: 5.6rem;
  height: 5.6rem;
`

const Match = ({ match }) => {
  const timestamp = moment.unix(match.createdAt).format('Do MMMM, YYYY')
  
  return (
    <Container>
      {match.avatar ? <Avatar src={match.avatar} /> : <Default />}
      <SubContatiner>
        <Title>{match.name}</Title>
        <Timestamp>{timestamp}</Timestamp>
      </SubContatiner>
      <Chevron width={24} height={24} />
    </Container>
  )
}

export default Match
