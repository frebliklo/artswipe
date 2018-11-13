import configureMockStore from 'redux-mock-store'

import { addCulture, removeCulture } from '../../actions/culture'
import { ADDCULTURE, REMOVECULTURE } from '../../actions/types'

import culture from '../fixtures/culture'

test('should generate culture object', () => {
  const cultureItem = culture[0]
  const action = addCulture(cultureItem)
  expect(action).toEqual({
    type: ADDCULTURE,
    culture: culture[0]
  })
})

test('should setup remove culture object', () => {
  const cultureItem = culture[2]
  const action = removeCulture(cultureItem)
  expect(action).toEqual({
    type: REMOVECULTURE,
    culture: culture[2]
  })
})
