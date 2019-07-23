import React, { Suspense, lazy } from "react"
import { connect } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
import getCookie from "../common/cookie"
import sagaMiddleware from "../common/saga"
import AuthSaga from "../auth/AuthSaga"
import { auth } from "../auth/AuthAction"
const Home = lazy(() => import("../home/Home"))
const Welcome = lazy(() => import("../welcome/Welcome"))
class CApp extends React.Component {
  constructor(props) {
    super(props)
    sagaMiddleware.run(AuthSaga, this.props.store)
    const authToken = getCookie("auth_token")
    if (authToken !== "") {
      this.props.auth(authToken)
    }
  }
  render() {
    const { authorization, isLoading } = this.props
    return !isLoading ? (
      <div>
        <Router>
          <Suspense fallback={<div />}>
            {authorization ? (
              <Home store={this.props.store} />
            ) : (
              <Welcome store={this.props.store} />
            )}
          </Suspense>
        </Router>
      </div>
    ) : null
  }
}

const mapStateToProps = state => {
  return {
    authorization: state.AuthReducer.authorization,
    isLoading: state.AuthReducer.isLoading
  }
}
const mapDispatchToProps = dispatch => {
  return {
    auth: auth_token => dispatch(auth(auth_token))
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(CApp)

export default App
