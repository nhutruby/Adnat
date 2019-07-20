import React, {lazy} from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import LogInReducer from '../login/LogInReducer'
import SignUpReducer from '../signup/SignUpReducer'
import sagaMiddleware from '../common/saga'
import LoginSaga from '../login/LogInSaga'
import SignUpSaga from '../signup/SignUpSaga'
const Grid = lazy(() => import('@material-ui/core/Grid'))
const LogIn = lazy(() => import('../login/LogIn'))
const SignUp = lazy(() => import('../signup/SignUp'))
const styles = theme => ({
  root: {
    flexGrow: 1,
  },

  paper: {
    textAlign: 'right',
    color: theme.palette.text.secondary,
    padding: theme.spacing(2),
  },
})

class Welcome extends React.Component {
  componentWillMount() {
    this.props.store.injectReducer('LogInReducer', LogInReducer)
    this.props.store.injectReducer('SignUpReducer', SignUpReducer)
    sagaMiddleware.run(LoginSaga, this.props.store)
    sagaMiddleware.run(SignUpSaga, this.props.store)
  }
  render() {
    const {classes, store} = this.props
    return (
      <div className={classes.root}>
        <Grid container={true} spacing={3}>
          <Grid item={true} xs={12}>
            <Paper className={classes.paper} elevation={1}>
              <LogIn store={store} />
            </Paper>
          </Grid>
          <Grid item={true} xs={7}>
            <Paper className={classes.paper} elevation={0} />
          </Grid>
          <Grid item={true} xs={5}>
            <Paper className={classes.paper} elevation={1}>
              <SignUp />
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

Welcome.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(Welcome)
