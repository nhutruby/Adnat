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
import { deleteOrganisation, newOrganisationShow } from "../home/HomeAction"
import { connect } from "react-redux"
import getCookie from "../common/cookie"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
const New = lazy(() => import("./New"))
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
    const { dialogShow, maxWidth, rowsPerPage } = this.props
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
  const handleData = data => {
    setOpen(data)
  }
  const handleNewOrganisation = (event, maxWidth) => {
    event.stopPropagation()
    setOpen(true)
    setDialogShow("new")
    setMaxWidth(maxWidth)
    props.newOrganisationShow()
  }
  return (
    <div>
      <p>
        You aren't a member of any organisations. Join an existing one or create
        a new one.
      </p>
      <h2> Organisations </h2>
      <Paper className={classes.root} elevation={0}>
        <Grid container={true} wrap="nowrap" spacing={1}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={event => handleNewOrganisation(event, "sm")}
          >
            New
          </Button>
        </Grid>
      </Paper>
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
            {props.organisations &&
              props.organisations.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.hourly_rate}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <EditIcon className={classes.icon} />
                    </Tooltip>
                    <Tooltip title="Delete">
                      <DeleteIcon
                        className={classes.icon}
                        onClick={event => handleDeleteClick(event, row.id)}
                      />
                    </Tooltip>
                    <Tooltip title="Join">
                      <PersonAddIcon className={classes.icon} />
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
      <FormDialog
        open={open}
        handlerFromParent={handleData}
        dialogShow={dialogShow}
        maxWidth={maxWidth}
        rowsPerPage={rowsPerPage}
      />
    </div>
  )
}

FList.propTypes = {
  classes: PropTypes.object.isRequired
}
const mapDispatchToProps = dispatch => {
  return {
    deleteOrganisation: params => dispatch(deleteOrganisation(params)),
    newOrganisationShow: () => dispatch(newOrganisationShow())
  }
}
const List = connect(
  null,
  mapDispatchToProps
)(FList)

export default withStyles(styles)(List)
