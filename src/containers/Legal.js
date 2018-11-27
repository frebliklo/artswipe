import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

import Container from '../components/styled/Container'

import { theme } from '../constants'

const legalText = `
# Privacy policy

This privacy policy explains how ArtSwipe (“we” or “us”) processes your personal data in connection with the ArtSwipe prototype app.

## 1 - Introduction

It is important to us that your personal data is handled securely and lawfully. This privacy policy (“Privacy Policy”) have been drafted to describe how we collect and process your personal data. We urge you to read the Privacy Policy thoroughly.

## 2 - Data collection

### 2.1 - Personal data

While using our services, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). We ask you to create an account providing your name, email and/or Facebook public information.

### 3 - Use of Data

Your data is used to provide you access to the service and match you with other users. We do not share your data with any third-parties.

### 4 - Data storage

We store your data using [Firebase](http://firebase.com). We automatically delete your data after 1 year or upon request. If you wish to get your personal information and/or get your personal data deleted then request this by email to klovborg@gmail.com

## 5 - Changes To the Privacy Policy

We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.

You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.

If you have any questions about this Privacy Policy, please contact us at klovborg@gmail.com

`

const LegalContainer = styled.div`
  color: ${theme.color.fg};

  h2 {
    margin-bottom: .8rem;
  }

  p {
    margin-bottom: 2.4rem;
  }
`

const Legal = () => (
  <Container>
    <Link to="/">&larr; Go back</Link>
    <LegalContainer>
      <ReactMarkdown source={legalText} />
    </LegalContainer>
  </Container>
)

export default Legal
