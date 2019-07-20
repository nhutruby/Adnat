import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  table: {
    minWidth: 650,
  },
  icon: {
    margin: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(2),
    textTransform: 'none',
  },
}))

function createData(name, calories, fat, carbs, protein) {
  return {name, calories, fat, carbs, protein}
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
]

export default function SimpleTable() {
  const classes = useStyles()

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
            onClick={event => this.handleNew(event, 'sm')}
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
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <EditIcon className={classes.icon} />
                  </Tooltip>
                  <Tooltip title="Delete">
                    <DeleteIcon className={classes.icon} />
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
    </div>
  )
}
