export default (initialState, handlers) => {
  if (!initialState) {
    throw new Error('Initial state is required');
  }

  return (state = initialState, action) => {
    if (!action || !action.type) {
      return state;
    }

    const handler = handlers[action.type];
    let newState = handler ? handler(state, action) : state;
    if (!action.type.endsWith('_FAIL')) {
      delete newState.error;
    }
    return newState;
  }
}
