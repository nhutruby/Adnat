import React, { lazy } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import sagaMiddleware from "../common/saga"
import SignOutSaga from "../signout/SignOutSaga"
import SignOutReducer from "../signout/SignOutReducer"
import Organisations from "../organisation/List"
import HomeSaga from "../home/HomeSaga"
import { home } from "../home/HomeAction"
import { connect } from "react-redux"
import getCookie from "../common/cookie"
const Grid = lazy(() => import("@material-ui/core/Grid"))
const Header = lazy(() => import("../header/Header"))
const ShowOrganisation = lazy(() => import("../organisation/Show"))
const Shifts = lazy(() => import("../shift/List"))
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
})
class CHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1
    }
    this.handleScroll = this.handleScroll.bind(this)
  }
  handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      const authToken = getCookie("auth_token")
      this.setState({
        page: this.state.page + 1
      })
      setTimeout(() => {
        if (authToken !== "") {
          this.props.home({
            auth_token: authToken,
            page: this.state.page,
            per_page: 20
          })
        }
      }, 50)
    }
  }
  componentWillMount() {
    this.props.store.injectReducer("SignOutReducer", SignOutReducer)
    window.addEventListener("scroll", this.handleScroll)
    sagaMiddleware.run(SignOutSaga, this.props.store)
    sagaMiddleware.run(HomeSaga, this.props.store)
    const authToken = getCookie("auth_token")
    if (authToken !== "") {
      this.props.home({ auth_token: authToken, page: 1, per_page: 20 })
    }
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  }
  render() {
    const { classes, user_organisation } = this.props
    return (
      <div className={classes.root}>
        {user_organisation != null ? (
          <Grid container={true} spacing={3}>
            <Grid item={true} xs={12}>
              <Paper className={classes.paper} elevation={1}>
                <Header />
              </Paper>
            </Grid>
            <Grid item={true} xs={1}>
              <Paper className={classes.paper} elevation={0} />
            </Grid>
            <Grid item={true} xs={10}>
              <Paper className={classes.paper} elevation={0}>
                <ShowOrganisation user_organisation={user_organisation} />
              </Paper>
            </Grid>
            <Grid item={true} xs={1}>
              <Paper className={classes.paper} elevation={0} />
            </Grid>
            <Grid item={true} xs={1}>
              <Paper className={classes.paper} elevation={0} />
            </Grid>
            <Grid item={true} xs={10}>
              <Paper className={classes.paper} elevation={0}>
                <Shifts />
              </Paper>
            </Grid>
            <Grid item={true} xs={1}>
              <Paper className={classes.paper} elevation={0} />
            </Grid>
          </Grid>
        ) : (
          <Grid container={true} spacing={3}>
            <Grid item={true} xs={12}>
              <Paper className={classes.paper} elevation={1}>
                <Header />
              </Paper>
            </Grid>
            <Grid item={true} xs={2}>
              <Paper className={classes.paper} elevation={0} />
            </Grid>
            <Grid item={true} xs={8}>
              <Paper className={classes.paper} elevation={1}>
                <Organisations />
              </Paper>
            </Grid>
            <Grid item={true} xs={2}>
              <Paper className={classes.paper} elevation={0} />
            </Grid>
          </Grid>
        )}
      </div>
    )
  }
}
CHome.propTypes = {
  classes: PropTypes.object.isRequired
}
const mapStateToProps = state => {
  return {
    organisations: state.HomeReducer.organisations,
    user_organisation: state.HomeReducer.user_organisation,
    shifts: state.HomeReducer.shifts
  }
}
const mapDispatchToProps = dispatch => {
  return {
    home: auth_token => dispatch(home(auth_token))
  }
}

const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(CHome)
export default withStyles(styles)(Home)
