import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {signUp} from '../signup/SignUpAction'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Popper from '@material-ui/core/Popper'
import Fade from '@material-ui/core/Fade'
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  emailConfirmation: {
    textAlign: 'left',
    color: 'blue',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  button: {
    margin: theme.spacing(1),
    textTransform: 'none',
  },
  typography: {
    padding: theme.spacing(2),
    color: 'white',
  },
  popper: {
    backgroundColor: '#f44336',
  },
  fake: {
    display: 'none',
  },
})
class CSignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      showPassword: false,
      anchorEl: null,
      open: false,
      placement: null,
      content: '',
    }
    this.handleValidate = this.handleValidate.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClickShowPassword = this.handleClickShowPassword
  }
  handleValidate = () => {
    const formEl = this.formEl
    const formLength = formEl.length
    if (formEl.password_confirmation.value !== formEl.new_password.value) {
      formEl.password_confirmation.setCustomValidity("Passwords don't match")
    } else {
      formEl.password_confirmation.setCustomValidity('')
    }
    let result = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    }
    if (formEl.checkValidity() === false) {
      for (let i = 0; i < formLength; i++) {
        const elem = formEl[i]
        if (elem.nodeName.toLowerCase() !== 'button') {
          if (!elem.validity.valid) {
            switch (elem.name) {
              case 'name':
                result.name = 'Name :' + elem.validationMessage
                break
              case 'email':
                result.email = 'Email :' + elem.validationMessage
                break
              case 'password':
                result.password =
                  'Password: Must be at least 6 characters long, contain letters and numbers'
                break
              case 'password_confirmation':
                result.password_confirmation =
                  'Password Confirmation :' + elem.validationMessage
                break
              default:
            }
          }
        }
      }
    }
    return result
  }
  handleSubmit = event => {
    event.preventDefault()
    const {currentTarget} = event
    const validate = this.handleValidate()
    if (
      validate.name === '' &&
      validate.email === '' &&
      validate.password === '' &&
      validate.password_confirmation === ''
    ) {
      this.props.signUp({
        user: {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation,
        },
      })
    } else {
      let content = ''

      const placement = 'bottom'
      content = [
        validate.name,
        validate.email,
        validate.password,
        validate.password_confirmation,
      ]
        .filter(i => i !== '')
        .join(' ')
      this.setState(state => ({
        anchorEl: currentTarget,
        open: true,
        placement,
        content: content,
      }))
    }
  }
  handleChange = placement => event => {
    this.setState({[event.target.name]: event.target.value})
    const {currentTarget} = event
    const validate = this.handleValidate()
    const name = validate[event.target.name]
    if (name !== '') {
      this.setState(state => ({
        anchorEl: currentTarget,
        open: true,
        placement,
        content: name,
      }))
    } else {
      this.setState(state => ({
        anchorEl: currentTarget,
        open: false,
        placement,
      }))
    }
  }

  handleClickShowPassword = () => {
    this.setState(state => ({
      showPassword: !state.showPassword,
    }))
  }

  render() {
    const {classes} = this.props
    const {error, sign_up, name} = this.props
    const {anchorEl, open, placement, content} = this.state
    if (sign_up) {
      return (
        <div>
          <Paper elevation={0}>
            <Typography
              variant="h6"
              component="h4"
              className={classes.emailConfirmation}
            >
              Hi {name}, please log in.
            </Typography>
          </Paper>
        </div>
      )
    }

    let errorArray = []
    if (error) {
      for (var property in error) {
        errorArray.push(
          property.charAt(0).toUpperCase() +
            property.slice(1) +
            ': ' +
            error[property]
        )
      }
    }

    return (
      <form
        ref={form => (this.formEl = form)}
        className={classes.container}
        noValidate={true}
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement={placement}
          transition
        >
          {({TransitionProps}) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper className={classes.popper}>
                <Typography className={classes.typography}>
                  {content}
                </Typography>
              </Paper>
            </Fade>
          )}
        </Popper>
        <TextField
          id="fakeemail"
          name="email"
          className={classes.fake}
          type="email"
        />
        <TextField
          id="fakepassword"
          name="password"
          className={classes.fake}
          type="password"
        />
        <Paper elevation={0}>
          <Typography component="pre">
            <TextField
              id="name"
              name="name"
              label="Name"
              className={classes.textField}
              margin="normal"
              required={true}
              value={this.state.name}
              onChange={this.handleChange('bottom')}
            />
          </Typography>
          <Typography component="pre">
            <TextField
              id="new_email"
              name="email"
              label="Email"
              className={classes.textField}
              type="email"
              margin="normal"
              required={true}
              value={this.state.email}
              autoComplete="nope"
              onChange={this.handleChange('bottom')}
            />
          </Typography>
          <Typography component="pre">
            <TextField
              id="new_password"
              className={classes.textField}
              required={true}
              name="password"
              margin="normal"
              autoComplete="new-password"
              value={this.state.password}
              type={this.state.showPassword ? 'text' : 'password'}
              label="Password"
              onChange={this.handleChange('bottom')}
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
          </Typography>
          <Typography component="pre">
            <TextField
              id="password_confirmation"
              name="password_confirmation"
              label="Password Confirmation"
              className={classes.textField}
              autoComplete="off"
              type="password"
              margin="normal"
              required={true}
              value={this.state.password_confirmation}
              onChange={this.handleChange('bottom')}
            />
          </Typography>
          <Typography component="pre">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
              name="signup"
              id="signup"
            >
              Sign Up
            </Button>
            {errorArray.map((content, index) => (
              <Paper className={classes.popper} key={index}>
                <Typography className={classes.typography}>
                  {content}
                </Typography>
              </Paper>
            ))}
          </Typography>
        </Paper>
      </form>
    )
  }
}
CSignUp.propTypes = {
  classes: PropTypes.object.isRequired,
}
const mapDispatchToProps = dispatch => {
  return {
    signUp: (name, email, password, password_confirmation) =>
      dispatch(signUp(name, email, password, password_confirmation)),
  }
}
const mapStateToProps = state => {
  return {
    sign_up: state.SignUpReducer.sign_up,
    error: state.SignUpReducer.error,
    name: state.SignUpReducer.user.name,
    email: state.SignUpReducer.user.email,
  }
}
const SignUp = connect(
  mapStateToProps,
  mapDispatchToProps
)(CSignUp)
export default withStyles(styles)(SignUp)
