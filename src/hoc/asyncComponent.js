import React, { Component } from 'react'
/**
 * TODO: Update the configuration when issue is solved
 * Uncaught (in promise) TypeError: Cannot read property 'call' of undefined...
 * Error for css file inside async components when using chunks
 * https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/456
 * This is a problem for create-react-app also, since it's Webpack problem
 * https://github.com/facebook/create-react-app/issues/4130
 */
require('style-loader/lib/addStyles')
require('css-loader/lib/css-base')

const asyncComponent = (importComponent) => {
  return class extends Component {
      state = {
        component: null
      }

      componentDidMount () {
        importComponent()
          .then(cmp => {
            this.setState({component: cmp.default})
          })
      }

      render () {
        const C = this.state.component
        return C ? <C {...this.props} /> : null
      }
  }
}

export default asyncComponent
