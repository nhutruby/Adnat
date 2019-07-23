import React, { lazy } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import Tooltip from "@material-ui/core/Tooltip"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import { deleteShift, newShiftShow, editShiftShow } from "../home/HomeAction"
import { connect } from "react-redux"
import getCookie from "../common/cookie"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import { format } from "date-fns"

const New = lazy(() => import("./New"))
const Edit = lazy(() => import("./Edit"))
const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  table: {
    minWidth: 100
  },
  icon: {
    margin: theme.spacing(2),
    "&:hover": {
      cursor: "pointer"
    }
  },
  button: {
    margin: theme.spacing(2),
    textTransform: "none"
  }
})
class FormDialog extends React.Component {
  handleClose = () => {
    this.props.handlerFromParent(false)
  }
  handleData = data => {
    this.props.handlerFromParent(this.props.handlerFromFormDialog)
  }

  render() {
    const {
      shiftId,
      startTime,
      endTime,
      breakLength,
      dialogShow,
      maxWidth,
      rowsPerPage
    } = this.props
    let form
    switch (dialogShow) {
      case "new":
        form = (
          <New
            handlerFromFormDialog={this.handleData}
            rowsPerPage={rowsPerPage}
          />
        )
        break
      case "edit":
        form = (
          <Edit
            handlerFromFormDialog={this.handleData}
            id={shiftId}
            startTime={startTime}
            endTime={endTime}
            breakLength={breakLength}
            rowsPerPage={rowsPerPage}
          />
        )
        break
      default:
    }

    return (
      <div>
        <Dialog
          open={this.props.open ? true : false}
          onClose={this.handleClose}
          fullWidth={true}
          maxWidth={maxWidth}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>{form}</DialogContent>
        </Dialog>
      </div>
    )
  }
}
function FList(props) {
  const { classes } = props
  const [open, setOpen] = React.useState(false)
  const [dialogShow, setDialogShow] = React.useState()
  const [maxWidth, setMaxWidth] = React.useState()
  const [startTime, setStartTime] = React.useState()
  const [endTime, setEndTime] = React.useState()
  const [shiftId, setShiftId] = React.useState()
  const [breakLength, setBreakLength] = React.useState()
  const [rowsPerPage] = React.useState(20)
  const handleDeleteClick = (event, id) => {
    event.stopPropagation()
    const authToken = getCookie("auth_token")
    if (authToken !== "") {
      props.deleteShift({
        auth_token: authToken,
        id: id
      })
    }
  }
  const handleData = data => {
    setOpen(data)
  }
  const handleNewShift = (event, maxWidth) => {
    event.stopPropagation()
    setOpen(true)
    setDialogShow("new")
    setMaxWidth(maxWidth)
    props.newShiftShow()
  }
  const handleEditShift = (
    event,
    shiftId,
    startTime,
    endTime,
    breakLength,
    maxWidth
  ) => {
    event.stopPropagation()
    setOpen(true)
    setDialogShow("edit")
    setShiftId(shiftId)
    setStartTime(startTime)
    setEndTime(endTime)
    setBreakLength(breakLength)
    setMaxWidth(maxWidth)
    props.editShiftShow()
  }
  return (
    <div>
      <h3> Shifts </h3>
      <Paper className={classes.root} elevation={0}>
        <Grid container={true} wrap="nowrap" spacing={0}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={event => handleNewShift(event, "sm")}
          >
            New
          </Button>
        </Grid>
      </Paper>
      {props.shifts && props.shifts.length > 0 ? (
        <div>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Employee Name</TableCell>
                  <TableCell align="right">Shift Date</TableCell>
                  <TableCell align="right">Start Time</TableCell>
                  <TableCell align="right">Finish Time</TableCell>
                  <TableCell align="right">Break Length (minutes)</TableCell>
                  <TableCell align="right">Hours Worked</TableCell>
                  <TableCell align="right">Shift Cost</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.shifts.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.user && row.user.name}
                    </TableCell>
                    <TableCell align="right">
                      {format(new Date(row.start_time), "MM/dd/yyyy")}
                    </TableCell>
                    <TableCell align="right">
                      {format(new Date(row.start_time), "h:mm:a")}
                    </TableCell>
                    <TableCell align="right">
                      {format(new Date(row.end_time), "h:mm:a")}
                    </TableCell>
                    <TableCell align="right">{row.break_length}</TableCell>
                    <TableCell align="right">{row.hours_worked}</TableCell>
                    <TableCell align="right"> {row.shift_cost}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit">
                        <EditIcon
                          className={classes.icon}
                          onClick={event =>
                            handleEditShift(
                              event,
                              row.id,
                              row.start_time,
                              row.end_time,
                              row.break_length,
                              "sm"
                            )
                          }
                        />
                      </Tooltip>
                      <Tooltip title="Delete">
                        <DeleteIcon
                          className={classes.icon}
                          onClick={event => handleDeleteClick(event, row.id)}
                        />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
      ) : (
        <div> No Data </div>
      )}
      <FormDialog
        open={open}
        handlerFromParent={handleData}
        dialogShow={dialogShow}
        maxWidth={maxWidth}
        rowsPerPage={rowsPerPage}
        startTime={startTime}
        endTime={endTime}
        breakLength={breakLength}
        shiftId={shiftId}
      />
    </div>
  )
}

FList.propTypes = {
  classes: PropTypes.object.isRequired
}
const mapStateToProps = state => {
  let shifts = state.HomeReducer.shifts
  console.log(shifts)
  const organisation = state.HomeReducer.user_organisation
  shifts &&
    shifts.forEach(i => {
      const startTime = new Date(i.start_time)
      const endTime = new Date(i.end_time)
      const startHours = startTime.getHours()
      const startMinutes = startTime.getMinutes()
      const endHours = endTime.getHours()
      const endMinutes = endTime.getMinutes()
      if (startHours * 60 + startMinutes <= endHours * 60 + endMinutes) {
        const shiftLength =
          endHours * 60 + endMinutes - startHours * 60 - startMinutes
        console.log(shiftLength)
        const hoursWorked = ((shiftLength - i.break_length) / 60).toFixed(2)
        console.log(hoursWorked)
        let shiftCost = organisation
          ? (hoursWorked * organisation.hourly_rate).toFixed(2)
          : 0
        console.log(".........")
        console.log(startTime.getDay())
        i.hours_worked = hoursWorked
        if (startTime.getDay() === 0) {
          console.log("aasunday")
          shiftCost = organisation
            ? (hoursWorked * organisation.hourly_rate * 2).toFixed(2)
            : 0
        }
        console.log(shiftCost)
        i.shift_cost = shiftCost
      }
    })
  return {
    user_organisation: state.HomeReducer.user_organisation,
    shifts: state.HomeReducer.shifts
  }
}
const mapDispatchToProps = dispatch => {
  return {
    deleteShift: params => dispatch(deleteShift(params)),
    newShiftShow: () => dispatch(newShiftShow()),
    editShiftShow: () => dispatch(editShiftShow())
  }
}
const List = connect(
  mapStateToProps,
  mapDispatchToProps
)(FList)

export default withStyles(styles)(List)
