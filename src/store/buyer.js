var buyerState = {
    // route switch object
		transition: {
			namespaced: true,
			state: {
				transitionName: '',
				action: []
			},
			mutations: {
				setTransition(state, transition) {
					state.transitionName = transition;
				}
			}
		},
}

export default {
    buyerState,
  }