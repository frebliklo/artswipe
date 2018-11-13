import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'

import { addCulture, removeCulture, getCulture, sendChoice } from '../../actions/culture'
import {
  ADD_CULTURE,
  GET_CULTURE_START,
  REMOVE_CULTURE,
  SEND_CHOICE_START
} from '../../actions/types'

import culture from '../fixtures/culture'
import getCultureMock from '../fixtures/getCultureMock'
import getChoiceMock from '../fixtures/getChoiceMock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('test pure function culture actions', () => {
  it('should generate culture object', () => {
    const cultureItem = culture[0]
    const action = addCulture(cultureItem)
    expect(action).toEqual({
      type: ADD_CULTURE,
      culture: culture[0]
    })
  })
  
  it('should setup remove culture object', () => {
    const cultureItem = culture[2]
    const action = removeCulture(cultureItem)
    expect(action).toEqual({
      type: REMOVE_CULTURE,
      culture: culture[2]
    })
  })
})

describe('test asynchronus culture action', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should call ADD_CULTURE_START and ADD_CULTURE after successfully fetching culture', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: getCultureMock
      })
    })

    const expectedActions = [
      { type: GET_CULTURE_START },
      { type: ADD_CULTURE, culture: getCultureMock }
    ]

    const uid = '134n31531'

    const store = mockStore({
      auth: { uid },
      culture: []
    })

    return store.dispatch(getCulture()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should call SEND_SHOICE_START and REMOVE_CULTURE after sending opinion to api', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: getChoiceMock
      })
    })

    const expectedActions = [
      { type: SEND_CHOICE_START },
      { type: REMOVE_CULTURE, culture: culture[0] }
    ]

    const uid = '134n31531'

    const store = mockStore({
      auth: { uid },
      culture: [culture[0]]
    })

    return store.dispatch(sendChoice(true, culture[0])).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
