import { login, logout } from '../../actions/auth'
import { LOGIN, LOGOUT } from '../../actions/types'

test('should generate login action object', () => {
  const user = { uid: 'agdsa7f8g7sda' }
  const action = login(user)
  expect(action).toEqual({
    type: LOGIN,
    user
  })
})

test('should generate logout action object', () => {
  const action = logout()
  expect(action).toEqual({ type: LOGOUT })
})
