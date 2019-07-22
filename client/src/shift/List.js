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
import PersonAddIcon from "@material-ui/icons/PersonAdd"
import {
  deleteOrganisation,
  newShiftShow,
  editOrganisationShow,
  joinOrganisation
} from "../home/HomeAction"
import { connect } from "react-redux"
import getCookie from "../common/cookie"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
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
      organisationId,
      name,
      hourlyRate,
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
            id={organisationId}
            name={name}
            hourlyRate={hourlyRate}
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
  const [name, setName] = React.useState()
  const [hourlyRate, setHourlyRate] = React.useState()
  const [organisationId, setOrganisationId] = React.useState()
  const [rowsPerPage] = React.useState(20)
  const handleDeleteClick = (event, id) => {
    event.stopPropagation()
    const authToken = getCookie("auth_token")
    if (authToken !== "") {
      props.deleteOrganisation({
        auth_token: authToken,
        id: id
      })
    }
  }
  const handleJoin = (event, id) => {
    event.stopPropagation()
    const authToken = getCookie("auth_token")
    if (authToken !== "") {
      props.joinOrganisation({
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
    console.log("mm")
    setOpen(true)
    setDialogShow("new")
    setMaxWidth(maxWidth)
    props.newShiftShow()
  }
  const handleEditOrganisation = (
    event,
    organisationId,
    name,
    hourlyRate,
    maxWidth
  ) => {
    event.stopPropagation()
    setOpen(true)
    setDialogShow("edit")
    setOrganisationId(organisationId)
    setName(name)
    setHourlyRate(hourlyRate)
    setMaxWidth(maxWidth)
    props.editOrganisationShow("list")
  }
  return (
    <div>
      <h3> Shifts </h3>
      <Paper className={classes.root} elevation={0}>
        <Grid container={true} wrap="nowrap" spacing={1}>
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
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Hourly Rate</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.shfts.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.hourly_rate}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit">
                        <EditIcon
                          className={classes.icon}
                          onClick={event =>
                            handleEditOrganisation(
                              event,
                              row.id,
                              row.name,
                              row.hourly_rate,
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
                      <Tooltip title="Join">
                        <PersonAddIcon
                          className={classes.icon}
                          onClick={event => handleJoin(event, row.id)}
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
        name={name}
        hourlyRate={hourlyRate}
        organisationId={organisationId}
      />
    </div>
  )
}

FList.propTypes = {
  classes: PropTypes.object.isRequired
}
const mapStateToProps = state => {
  return {
    user_organisation: state.HomeReducer.user_organisation,
    shifts: state.HomeReducer.shifts
  }
}
const mapDispatchToProps = dispatch => {
  return {
    deleteOrganisation: params => dispatch(deleteOrganisation(params)),
    newShiftShow: () => dispatch(newShiftShow()),
    editOrganisationShow: kind => dispatch(editOrganisationShow(kind)),
    joinOrganisation: params => dispatch(joinOrganisation(params))
  }
}
const List = connect(
  mapStateToProps,
  mapDispatchToProps
)(FList)

export default withStyles(styles)(List)
