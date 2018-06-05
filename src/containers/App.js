import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import styles from './App.scss'
import ReduxReady from './ReduxReady/ReduxReady.js'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  // ///////////////////////////////
  //  LIFECYCLE HOOKS (METHODS)  //
  // ///////////////////////////////

  // COMPONENT MOUNT

  componentWillMount () {
    console.log('[App.js] componentWillMount')
  }

  componentWillUnmount () {
    // Component is about to get removed => Perform any cleanup work here!
    console.log('[App.js] componentWillUnmount')
  }

  componentDidMount () {
    console.log('[App.js] componentDidMount')
  }

  // COMPONENT UPDATE

  componentWillReceiveProps (nextProps) {
    console.log('[App.js] componentWillReceiveProps', nextProps)
  }

  shouldComponentUpdate (nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate', nextProps, nextState)
    return true
  }

  componentWillUpdate () {
    console.log('[App.js] componentWillUpdate')
  }

  componentDidUpdate () {
    console.log('[App.js] componentDidUpdate')
  }

  // ////////////
  //  HANDLERS //
  // ////////////

  render () {
    console.log('[App.js] render')

    // Uncomment for npm run test
    // return <h1>Dummy test!</h1>

    return (
      <BrowserRouter>
        <Route path='/' exact component={ReduxReady} />
      </BrowserRouter>
    )
  }
}

export default withStyles(styles)(App)
