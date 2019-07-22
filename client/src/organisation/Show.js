import React, { lazy } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Tooltip from "@material-ui/core/Tooltip"
import EditIcon from "@material-ui/icons/Edit"
import LeaveIcon from "@material-ui/icons/RemoveCircle"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import { editOrganisationShow } from "../home/HomeAction"
import { connect } from "react-redux"
const Edit = lazy(() => import("./Edit"))
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "right"
  },

  icon: {
    marginLeft: theme.spacing(2),
    "&:hover": {
      cursor: "pointer"
    }
  }
}))

function FShow(props) {
  const classes = useStyles()
  const { user_organisation } = props
  const [open, setOpen] = React.useState(false)

  const handleEditOrganisation = event => {
    console.log("show")
    setOpen(true)
    props.editOrganisationShow()
  }
  const handleData = data => {
    setOpen(data)
  }
  function handleClose() {
    setOpen(false)
  }
  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h5">
          {user_organisation.name}, ${user_organisation.hourly_rate}
          <Tooltip title="Edit">
            <EditIcon
              className={classes.icon}
              color="primary"
              onClick={event => handleEditOrganisation(event => event)}
            />
          </Tooltip>
          <Tooltip title="Leave">
            <LeaveIcon className={classes.icon} color="secondary" />
          </Tooltip>
        </Typography>
        <Typography component="p" />
      </Paper>
      <Dialog open={open} onClose={handleClose} maxWidth="sm">
        <DialogContent>
          <Edit
            handlerFromFormDialog={handleData}
            id={user_organisation.id}
            name={user_organisation.name}
            hourlyRate={user_organisation.hourly_rate}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
const mapDispatchToProps = dispatch => {
  return {
    editOrganisationShow: () => dispatch(editOrganisationShow())
  }
}
const Show = connect(
  null,
  mapDispatchToProps
)(FShow)
export default Show
