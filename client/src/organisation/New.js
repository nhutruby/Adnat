import React from "react"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"
import DialogTitle from "@material-ui/core/DialogTitle"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import { connect } from "react-redux"
import { newOrganisation } from "../home/HomeAction"
import getCookie from "../common/cookie"
const styles = theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  },
  container: {
    display: "flex"
  },
  button: {
    textTransform: "none"
  },
  error: {
    textAlign: "center",
    color: "red"
  }
})

class CNew extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      nameError: null,
      hourly_rate: 0,
      hourlyRateError: null
    }
    this.handleValidate = this.handleValidate.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleClose = () => {
    this.props.handlerFromFormDialog(false)
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value })
    this.handleValidate()
  }
  handleValidate = () => {
    const formEl = this.formEl
    const formLength = formEl.length
    this.setState({ nameError: null, hourlyRateError: null })
    if (formEl.checkValidity() === false) {
      for (let i = 0; i < formLength; i++) {
        const elem = formEl[i]
        if (elem.nodeName.toLowerCase() !== "button") {
          if (!elem.validity.valid) {
            switch (elem.name) {
              case "name":
                this.setState({ nameError: "Name: " + elem.validationMessage })
                break
              case "hourly_rate":
                this.setState({
                  hourlyRateError: "Hourly Rate: " + elem.validationMessage
                })
                break
              default:
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
    if (this.handleValidate()) {
      const authToken = getCookie("auth_token")
      if (authToken !== "") {
        this.props.newOrganisation({
          name: this.state.name,
          hourly_rate: this.state.hourly_rate,
          per_page: this.props.rowsPerPage,
          auth_token: authToken
        })
      }
    }
  }

  componentDidUpdate(oldProps) {
    if (this.props.error === false) {
      this.props.handlerFromFormDialog(false)
    }
  }
  render() {
    const { classes } = this.props

    return (
      <div>
        <DialogTitle id="form-dialog-title">New Organisation</DialogTitle>

        <form
          ref={form => (this.formEl = form)}
          onSubmit={this.handleSubmit}
          noValidate
        >
          {this.state.nameError && (
            <div className={classes.error}>
              <label> {this.state.nameError}</label>
            </div>
          )}
          {this.state.hourlyRateError && (
            <div className={classes.error}>
              <label> {this.state.hourlyRateError}</label>
            </div>
          )}
          {this.props.error && (
            <div className={classes.error}>
              <label>{this.props.error.join(", ")}</label>
            </div>
          )}
          <TextField
            id="name"
            name="name"
            label="Name"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
            required={true}
          />
          <TextField
            id="hourly_rate"
            name="hourly_rate"
            label="Hourly Rate ($)"
            value={this.state.hourly_rate}
            onChange={this.handleChange}
            type="number"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            inputProps={{
              min: 0
            }}
            required={true}
          />
          <Typography component="pre">
            <DialogActions>
              <Button
                onClick={this.handleClose}
                color="primary"
                className={classes.button}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                name="submit"
                className={classes.button}
              >
                New
              </Button>
            </DialogActions>
          </Typography>
        </form>
      </div>
    )
  }
}
CNew.propTypes = {
  classes: PropTypes.object.isRequired
}
const mapDispatchToProps = dispatch => {
  return {
    newOrganisation: params => dispatch(newOrganisation(params))
  }
}
const mapStateToProps = state => {
  return {
    error: state.HomeReducer.error
  }
}
const New = connect(
  mapStateToProps,
  mapDispatchToProps
)(CNew)

export default withStyles(styles)(New)
