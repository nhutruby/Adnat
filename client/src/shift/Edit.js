import "date-fns"
import React from "react"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"
import DialogTitle from "@material-ui/core/DialogTitle"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import { connect } from "react-redux"
import { editShift } from "../home/HomeAction"
import getCookie from "../common/cookie"
import DateFnsUtils from "@date-io/date-fns"
import Grid from "@material-ui/core/Grid"
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers"
const styles = theme => ({
  textField: {
    margin: theme.spacing(2),
    padding: 16,
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
  },
  grid: {
    width: "60%"
  }
})

class CEdit extends React.Component {
  constructor(props) {
    super(props)
    const { breakLength, startTime, endTime } = this.props
    this.state = {
      break_length: breakLength,
      selectedStartTime: startTime,
      selectedEndTime: endTime,
      starTimeError: null,
      endTimeError: null,
      breakLengthError: null
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
  handleStartTimeChange = data => {
    this.setState({ startTimeError: null })
    if (data === null) {
      data = new Date()
    }
    this.setState({ selectedStartTime: data })
    if (data && data.toString() === "Invalid Date") {
      this.setState({ startTimeError: "Start Time is not valid" })
      return
    }
    const startYear = data.getFullYear()
    const startMonth = data.getMonth()
    const startDate = data.getDate()
    const startHours = data.getHours()
    const startMinutes = data.getMinutes()
    let startTime = new Date(
      startYear,
      startMonth,
      startDate,
      startHours,
      startMinutes
    )
    this.setState({ selectedStartTime: startTime })
    const { selectedEndTime } = this.state
    const endTime = new Date(selectedEndTime.toString())
    const endHours = endTime.getHours()
    const endMinutes = endTime.getMinutes()
    if (endHours * 60 + endMinutes < startHours * 60 + startMinutes) {
      endTime.setDate(endTime.getDate() + 1)
      this.setState({ selectedEndTime: endTime })
    } else {
      this.setState({ selectedEndTime: endTime })
    }
  }
  handleEndTimeChange = data => {
    this.setState({ endTimeError: null })
    if (data === null) {
      data = new Date()
    }
    if (data && data.toString() === "Invalid Date") {
      this.setState({ endTimeError: "End Time is not valid" })
      return
    }
    const { selectedStartTime } = this.state
    const starTime = new Date(selectedStartTime.toString())
    const startYear = starTime.getFullYear()
    const startMonth = starTime.getMonth()
    const startDate = starTime.getDate()
    const startHours = starTime.getHours()
    const startMinutes = starTime.getMinutes()
    const endHours = data.getHours()
    const endMinutes = data.getMinutes()
    let endTime = new Date(
      startYear,
      startMonth,
      startDate,
      endHours,
      endMinutes
    )
    if (endHours * 60 + endMinutes < startHours * 60 + startMinutes) {
      endTime.setDate(endTime.getDate() + 1)
      this.setState({ selectedEndTime: endTime })
    } else {
      this.setState({ selectedEndTime: endTime })
    }
  }
  handleValidate = () => {
    const formEl = this.formEl
    const formLength = formEl.length
    this.setState({ breakLengthError: null })
    if (formEl.checkValidity() === false) {
      for (let i = 0; i < formLength; i++) {
        const elem = formEl[i]
        if (elem.nodeName.toLowerCase() !== "button") {
          if (!elem.validity.valid) {
            switch (elem.name) {
              case "break_length":
                this.setState({
                  breakLengthError: "Break Length: " + elem.validationMessage
                })
                break
              default:
            }
          }
        }
      }
    }
  }
  handleSubmit = event => {
    event.preventDefault()
    this.handleValidate()
    if (
      this.state.starTimeError === null &&
      this.state.endTimeError === null &&
      this.state.breakLengthError === null
    ) {
      const authToken = getCookie("auth_token")
      if (authToken !== "") {
        this.props.editShift({
          id: this.props.id,
          start_time: this.state.selectedStartTime,
          end_time: this.state.selectedEndTime,
          break_length: this.state.break_length,
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
        <DialogTitle id="form-dialog-title">Edit Shift</DialogTitle>

        <form
          ref={form => (this.formEl = form)}
          onSubmit={this.handleSubmit}
          noValidate
        >
          {this.state.startTimeError && (
            <div className={classes.error}>
              <label> {this.state.startTimeError}</label>
            </div>
          )}
          {this.state.endTimeError && (
            <div className={classes.error}>
              <label> {this.state.endTimeError}</label>
            </div>
          )}
          {this.state.breakLengthError && (
            <div className={classes.error}>
              <label> {this.state.breakLengthError}</label>
            </div>
          )}
          {this.props.error && (
            <div className={classes.error}>
              <label>{this.props.error.join(", ")}</label>
            </div>
          )}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container className={classes.grid} justify="space-around">
              <KeyboardDatePicker
                margin="normal"
                id="shift_date"
                name="shift_date"
                label="Shift Date"
                value={this.state.selectedStartTime}
                onChange={this.handleStartTimeChange}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
                required={true}
              />
              <KeyboardTimePicker
                margin="normal"
                id="start_time"
                name="start_time"
                label="Start Time"
                value={this.state.selectedStartTime}
                onChange={this.handleStartTimeChange}
                KeyboardButtonProps={{
                  "aria-label": "change time"
                }}
                required={true}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container className={classes.grid} justify="space-around">
              <KeyboardTimePicker
                margin="normal"
                id="end_time"
                name="end_time"
                label="End Time"
                value={this.state.selectedEndTime}
                onChange={this.handleEndTimeChange}
                KeyboardButtonProps={{
                  "aria-label": "change time"
                }}
                required={true}
              />
              <TextField
                id="break_length"
                name="break_length"
                label="Break Length"
                value={this.state.break_length}
                onChange={this.handleChange}
                type="number"
                className={classes.textField}
                inputProps={{
                  min: 0
                }}
                required={true}
              />
            </Grid>
          </MuiPickersUtilsProvider>
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
                Edit
              </Button>
            </DialogActions>
          </Typography>
        </form>
      </div>
    )
  }
}
CEdit.propTypes = {
  classes: PropTypes.object.isRequired
}
const mapDispatchToProps = dispatch => {
  return {
    editShift: params => dispatch(editShift(params))
  }
}
const mapStateToProps = state => {
  return {
    error: state.HomeReducer.error
  }
}
const Edit = connect(
  mapStateToProps,
  mapDispatchToProps
)(CEdit)

export default withStyles(styles)(Edit)
