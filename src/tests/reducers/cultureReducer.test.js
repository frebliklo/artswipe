import cultureReducer from '../../reducers/cultureReducer'
import { ADD_CULTURE, REMOVE_CULTURE, FLUSH_CULTURE } from '../../actions/types'

import culture from '../fixtures/culture'

test('should set default state', () => {
  const state = cultureReducer(undefined, { type: '@@INIT' })
  expect(state).toEqual({active: undefined, all: [], error: null})
})

test('should add culture object to state', () => {
  const item = [culture[0]]
  const state = cultureReducer(undefined, {
    type: ADD_CULTURE,
    culture: item
  })
  expect(state).toEqual({ active: undefined, all: item, error: null })
})

test('should add aditional culture to state', () => {
  const existingState = { active: culture[0], all: [culture[0]], error: null }
  const item = [culture[2]]
  const state = cultureReducer(existingState, {
    type: ADD_CULTURE,
    culture: item
  })
  expect(state).toEqual({ active: culture[2], all: [culture[0],culture[2]], error: null })
})

test('should remove culture from state', () => {
  const existingState = { active: culture[0], all: [culture[0]], error: null }
  const state = cultureReducer(existingState, {
    type: REMOVE_CULTURE,
    culture: culture[0]
  })
  expect(state).toEqual({ active: undefined, all: [], error: null })
})

test('should remove correct culture item from state', () => {
  const existingState = { active: culture[1], all: [culture[1], culture[2], culture[0]], error: null }
  const state = cultureReducer(existingState, {
    type: REMOVE_CULTURE,
    culture: culture[2]
  })
  expect(state).toEqual({ active: culture[0], all: [culture[1], culture[0]], error: null })
})

test('should remove all culture items from state', () => {
  const existingState = { active: culture[1], all: [culture[1], culture[2], culture[0]], error: null }
  const state = cultureReducer(existingState, {
    type: FLUSH_CULTURE,
    culture: []
  })
  expect(state).toEqual({active: undefined, all: [], error: null})
})
