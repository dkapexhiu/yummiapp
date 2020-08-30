import React, { useEffect} from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import { auth } from './firebase'
import { connect } from "react-redux";
import { setUser, clearUser } from './store/Auth/userActions'
import Home from './Pages/Home'
import Header from './Components/Header'
import Message from './Components/Message'
import Checkout from './Pages/Checkout'
import Orders from './Pages/Orders'
import { AnimatePresence } from 'framer-motion';

const RouterApp = (props) => {

  //const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        props.setUser(user)
        //props.setMessage('You have successfully signed in.')
      } else {
        props.clearUser()
      }
    })
  }, [props])

  return (
    <>
      <Message />
      <Header />
      <AnimatePresence exitBeforeEnter>
        <Switch>
          <Route path="/register">
            <Register history={props.history} />
          </Route>
          <Route path="/login">
            <Login history={props.history} />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </AnimatePresence>
    </>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.user.isLoading
})

const mapDispatchToProps = { setUser, clearUser };

// used withRouter for history object
const App = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RouterApp)
)

export default App