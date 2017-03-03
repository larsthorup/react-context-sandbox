function lock (state, action) {
  return {
    ...state,
    auth: {}
  }
}

function unlock (state, action) {
  return {
    ...state,
    auth: {
      apikey: action.apikey
    }
  }
}

export function reducer (state = {auth: {}}, action) {
  switch (action.type) {
    case 'LOCK':
      return lock(state, action)
    case 'UNLOCK':
      return unlock(state, action)
    default:
      return state;
  }
}