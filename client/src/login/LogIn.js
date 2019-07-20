import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import cookie from 'cookie'
import {connect} from 'react-redux'
import {logIn} from './LogInAction'
import withStyles from '@material-ui/core/styles/withStyles'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Button from '@material-ui/core/Button'
import Popper from '@material-ui/core/Popper'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
const styles = theme => ({
  root: {
    flexWrap: 'wrap',
    display: 'inline-flex',
    textAlign: 'right',
  },
  container: {
    display: 'flex',
  },
  button: {
    margin: 36,
    textTransform: 'none',
  },
  margin: {
    margin: theme.spacing(3),
  },
  textField: {
    flexBasis: 200,
  },
  typography: {
    padding: theme.spacing(1),
    color: 'white',
  },
  popper: {
    backgroundColor: '#f44336',
  },
})
class CLogIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      email: '',
      showPassword: false,
      showFormSuccess: false,
      isValidated: false,
      anchorEl: null,
      open: false,
      id: null,
      popperContent: [],
    }
    this.validate = this.validate.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClickShowPassword = this.handleClickShowPassword
  }
  validate = () => {
    const formEl = this.formEl
    const formLength = formEl.length
    this.setState(state => ({popperContent: [], id: null, open: false}))
    if (formEl.checkValidity() === false) {
      this.setState(state => ({id: 'login_popper', open: true}))
      for (let i = 0; i < formLength; i++) {
        const elem = formEl[i]
        if (elem.nodeName.toLowerCase() !== 'button') {
          if (!elem.validity.valid) {
            if (!(elem.name === 'password')) {
              this.setState(state => ({
                popperContent: state.popperContent.concat(
                  elem.name.charAt(0).toUpperCase() +
                    elem.name.slice(1) +
                    ' :' +
                    elem.validationMessage
                ),
              }))
            } else {
              this.setState(state => ({
                popperContent: state.popperContent.concat(
                  'Password: Must be at least 6 characters long, contain letters and numbers'
                ),
              }))
            }
          }
        }
      }
      return false
    } else {
      return true
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const {currentTarget} = event
    this.setState(state => ({anchorEl: currentTarget}))
    if (this.validate()) {
      this.props.logIn({
        email: this.state.email,
        password: this.state.password,
      })
    }
  }
  handleChange = prop => event => {
    event.preventDefault()
    this.setState({[prop]: event.target.value})
  }

  handleClickShowPassword = () => {
    this.setState(state => ({
      showPassword: !state.showPassword,
    }))
  }

  render() {
    if (this.props.loggedIn && this.props.auth_token) {
      if (typeof document !== 'undefined') {
        document.cookie = cookie.serialize('auth_token', this.props.auth_token)
      }
      window.location.reload()
    }
    const {classes, error} = this.props
    const {anchorEl} = this.state
    let open = error ? true : this.state.open
    const id = open ? 'login-popper' : null
    return (
      <div className={classes.root}>
        <form
          noValidate={true}
          ref={form => (this.formEl = form)}
          className={classes.container}
          onSubmit={this.handleSubmit}
        >
          <TextField
            id="email"
            label="Email"
            className={classNames(classes.textField, classes.margin)}
            required={true}
            type="email"
            value={this.state.email}
            name="email"
            autoComplete="username"
            onChange={this.handleChange('email')}
          />
          <TextField
            id="password"
            className={classNames(classes.margin, classes.textField)}
            required={true}
            value={this.state.password}
            name="password"
            autoComplete="current-password"
            type={this.state.showPassword ? 'text' : 'password'}
            label="Password"
            onChange={this.handleChange('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            inputProps={{
              pattern: '(?=.*[0-9])(?=.*[a-z]).{6,}',
            }}
          />

          <div>
            <Button
              variant="contained"
              aria-describedby={id}
              className={classNames(classes.button)}
              color="primary"
              type="submit"
              name="login"
              id="login"
            >
              Log In
            </Button>
            <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom">
              {error && this.state.popperContent.length === 0 ? (
                <Paper className={classNames(classes.popper)}>
                  <Typography className={classes.typography}>
                    {error}
                  </Typography>
                </Paper>
              ) : (
                this.state.popperContent.map((content, index) => (
                  <Paper className={classNames(classes.popper)} key={index}>
                    <Typography className={classes.typography}>
                      {content}
                    </Typography>
                  </Paper>
                ))
              )}
            </Popper>
          </div>
        </form>
      </div>
    )
  }
}
CLogIn.propTypes = {
  classes: PropTypes.object.isRequired,
}
const mapDispatchToProps = dispatch => {
  return {
    logIn: (email, password) => dispatch(logIn(email, password)),
  }
}
const mapStateToProps = state => {
  return {
    loggedIn: state.LogInReducer.user_logged_in,
    error: state.LogInReducer.error,
    auth_token: state.LogInReducer.user.auth_token,
  }
}
const LogIn = connect(
  mapStateToProps,
  mapDispatchToProps
)(CLogIn)
export default withStyles(styles)(LogIn)
