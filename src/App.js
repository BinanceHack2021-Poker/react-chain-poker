import React, { useState, useEffect } from 'react';
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { UserContext } from './contexts/UserContext';
import { checkUser } from './services/magic';
import AuthenticateView from './views/AuthenticateView';
import AppView from './views/AppView';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const [user, setUser] = useState({ isLoggedIn: false, email: ''});
  const [loading, setLoading] = useState();

  useEffect(() => {
    const validateUser = async () => {
      setLoading(true);
      try {
        await checkUser(setUser);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    validateUser();
  }, [user.isLoggedIn, user.email]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <Spinner animation="border" />
      </div>
    );
  }
  return (
    <UserContext.Provider value={user}>
      <Router>
        {user.isLoggedIn && <Redirect to={{ pathname: '/game' }} />}
        <Switch>
          <Route exact path="/">
            <AuthenticateView setStatus={setUser} />
          </Route>
          <PrivateRoute path="/game" component={AppView} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
