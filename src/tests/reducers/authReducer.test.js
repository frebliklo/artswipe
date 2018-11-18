import authReducer from '../../reducers/authReducer'
import { LOGIN, LOGOUT } from '../../actions/types'

test('should set default state', () => {
  const state = authReducer(undefined, { type: '@@INIT' })
  expect(state).toEqual({})
})

test('should set uid for login', () => {
  const uid = 'sadflkafs72234'
  const action = {
    type: LOGIN,
    user: { uid }
  }
  const state = authReducer(undefined, action)
  expect(state).toEqual({ uid })
})

test('should clear uid for for logout', () => {
  const action = { type: LOGOUT }
  const state = authReducer(undefined, action)
  expect(state).toEqual({})
})
