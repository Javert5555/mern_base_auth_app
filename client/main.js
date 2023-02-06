import React from 'react'
import { hydrate } from 'react-dom'
import App from './App'

// In React, “hydration” is how React “attaches” to existing HTML
// that was already rendered by React in a server environment.
// hydrate in React is used to "attach" React to existing HTML that
// has already been rendered by React in the server environment.
hydrate(<App />, document.getElementById('root'))