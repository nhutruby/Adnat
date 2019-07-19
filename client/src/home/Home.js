import React, {lazy} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import sagaMiddleware from "../common/saga";
import SignOutSaga from "../signout/SignOutSaga";
import SignOutReducer from "../signout/SignOutReducer";
import {StoreContext} from "../common/context/Store";
const Grid = lazy(() => import ("@material-ui/core/Grid"));
const Header = lazy(() => import ("../header/Header"));
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});
class CHome extends React.Component {
  componentWillMount() {
    this.context.injectReducer("SignOutReducer", SignOutReducer);
    sagaMiddleware.run(SignOutSaga, this.context);
  }
  render() {
    const {classes} = this.props;

    return (<div className={classes.root}>
      <Grid container={true} spacing={10}>
        <Grid item={true} xs={12}>
          <Paper className={classes.paper} elevation={1}>
            <Header/>
          </Paper>
        </Grid>
      </Grid>
    </div>);
  }
}
CHome.propTypes = {
  classes: PropTypes.object.isRequired
};
CHome.contextType = StoreContext;
export default withStyles(styles)(CHome);
