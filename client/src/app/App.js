import React, {Suspense, lazy} from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import getCookie from '../common/cookie'
import sagaMiddleware from '../common/saga'
import AuthSaga from '../auth/AuthSaga'
import {auth} from '../auth/AuthAction'
import HomeSaga from '../home/HomeSaga'
import {home} from '../home/HomeAction'
const Home = lazy(() => import('../home/Home'))
const Welcome = lazy(() => import('../welcome/Welcome'))
class CApp extends React.Component {
  componentWillMount() {
    sagaMiddleware.run(AuthSaga, this.props.store)
    sagaMiddleware.run(HomeSaga, this.props.store)
    const authToken = getCookie('auth_token')
    if (authToken !== '') {
      this.props.auth(authToken)
      this.props.home(authToken)
    }
  }
  render() {
    const {authorization} = this.props
    return (
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
    )
  }
}

const mapStateToProps = state => {
  return {authorization: state.AuthReducer.authorization}
}
const mapDispatchToProps = dispatch => {
  return {
    auth: auth_token => dispatch(auth(auth_token)),
    home: auth_token => dispatch(home(auth_token)),
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(CApp)

export default App
