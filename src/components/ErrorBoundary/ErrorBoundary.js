import React, {Component} from 'react'

// Error handling for components https://reactjs.org/docs/error-boundaries.html
export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errorMsg: ''
  }

  componentDidCatch = (errorMsg, info) => {
    this.setState({hasError: 'true', errorMsg})
  }

  render () {
    if (this.state.hasError) {
      return <h1>{this.state.errorMsg}</h1>
    } else {
      return this.props.children
    }
  }
}
