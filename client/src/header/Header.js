import React from 'react'
import {connect} from 'react-redux'
import {signOut} from '../signout/SignOutAction'
import getCookie from '../common/cookie'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import cookie from 'cookie'
const styles = theme => ({
  root: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'right',
  },

  button: {
    margin: theme.spacing(2),
    textTransform: 'none',
  },
})

class CHeader extends React.Component {
  constructor(props) {
    super(props)
    this.handleSignOut = this.handleSignOut.bind(this)
  }
  handleSignOut = () => {
    const authToken = getCookie('auth_token')
    if (authToken) {
      this.props.signOut(authToken)
      if (typeof document !== 'undefined') {
        document.cookie = cookie.serialize('auth_token', '')
      }
      window.location.reload()
    }
  }
  render() {
    const {name, classes} = this.props
    return (
      <div className={classes.root}>
        <div>{name}</div>
        <Button
          variant="contained"
          className={classes.button}
          onClick={this.handleSignOut}
        >
          Log Out
        </Button>
      </div>
    )
  }
}
CHeader.propTypes = {
  classes: PropTypes.object.isRequired,
}
const mapDispatchToProps = dispatch => {
  return {
    signOut: auth_token => dispatch(signOut(auth_token)),
  }
}
const mapStateToProps = state => {
  return {name: state.AuthReducer.user.name}
}
const Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(CHeader)
export default withStyles(styles)(Header)
