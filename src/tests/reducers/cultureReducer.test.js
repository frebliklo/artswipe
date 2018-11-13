import cultureReducer from '../../reducers/cultureReducer'
import { ADDCULTURE, REMOVECULTURE } from '../../actions/types'

import culture from '../fixtures/culture'

test('should set default state', () => {
  const state = cultureReducer(undefined, { type: '@@INIT' })
  expect(state).toEqual([])
})

test('should add culture object to state', () => {
  const item = culture[0]
  const state = cultureReducer(undefined, {
    type: ADDCULTURE,
    culture: item
  })
  expect(state).toEqual([item])
})

test('should add aditional culture to state', () => {
  const existingState = [culture[0]]
  const item = culture[2] 
  const state = cultureReducer(existingState, {
    type: ADDCULTURE,
    culture: item
  })
  expect(state).toEqual([culture[0],culture[2]])
})

test('should remove culture from state', () => {
  const existingState = [culture[0]]
  const state = cultureReducer(existingState, {
    type: REMOVECULTURE,
    culture: culture[0]
  })
  expect(state).toEqual([])
})

test('should remove correct culture item from state', () => {
  const existingState = [culture[1], culture[2], culture[0]]
  const state = cultureReducer(existingState, {
    type: REMOVECULTURE,
    culture: culture[2]
  })
  expect(state).toEqual([culture[1],culture[0]])
})
