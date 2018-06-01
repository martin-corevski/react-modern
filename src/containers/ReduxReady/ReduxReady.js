import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { enableNotifications } from '../../services/notificationsMgmt'
// Material-UI
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import HomeIcon from '@material-ui/icons/Home'
// SEO, dynamic head updates
import { Helmet } from 'react-helmet'

import * as actionCreators from '../../store/actions/index'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
})

class ReduxReady extends Component {
  componentDidMount = () => {
    this.props.onInitializeState()
  }

  render () {
    const { classes } = this.props

    return (
      <div>
        <Helmet>
          <title>Redux Ready</title>
          <meta
            name='description'
            content='Meta description updated with helmet!'
          />
          {/* <link rel="canonical" href="http://mysite.com/example" /> */}
        </Helmet>
        <HomeIcon className={classes.icon} />
        <h1>Test redux saga by pressing the buttons</h1>
        <h3>{this.props.str}</h3>
        <Button
          variant='raised'
          className={classes.button}
          onClick={this.props.onAction1}
        >
          Test action
        </Button>
        <Button
          variant='raised'
          className={classes.button}
          color='primary'
          onClick={this.props.onStoreData}
        >
          Add number
        </Button>
        <hr />
        {this.props.nums ? this.props.nums.join(' ') : ''}
        <h4>Errors: </h4>
        {typeof this.props.error === 'string'
          ? this.props.error
          : JSON.stringify(this.props.error)}
        <hr />
        <h1>Notify me when a number is added</h1>
        {/* We can hide the button as soon as we have an active subscription */}
        <Button
          variant='raised'
          className={classes.button}
          color='secondary'
          onClick={enableNotifications}
        >
          Enable notifications
        </Button>
      </div>
    )
  }
}

ReduxReady.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    str: state.r1.string,
    nums: state.r2d2.numbers,
    error: state.r2d2.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitializeState: () => dispatch(actionCreators.initializeState()),
    onAction1: () => dispatch(actionCreators.action1()),
    onStoreData: () => dispatch(actionCreators.storeData(1))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(ReduxReady)
)
