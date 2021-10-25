import React, { useState, useEffect } from 'react';
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { UserContext } from './context/UserContext';
import { checkUser } from './services/magic';
import AuthenticateView from './views/AuthenticateView/AuthenticateView';
import DashboardView from './views/DashboardView/DashboardView';
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
        {user.isLoggedIn && <Redirect to={{ pathname: '/dashboard' }} />}
        <Switch>
          <Route exact path="/">
            <AuthenticateView setStatus={setUser} />
          </Route>
          <PrivateRoute path="/dashboard" component={DashboardView} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
