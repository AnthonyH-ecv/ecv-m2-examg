import { useContext, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { Menu } from './components/menu/Menu';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Collection from './pages/Collection';
import { ApplicationContext, ApplicationProvider } from './domain/application.store';
import { authGetMe } from './domain/authentication/authentication.actions';

import './App.css';

const Wrapper = ({ component: Component, ...props }) => {
  const { dispatch } = useContext(ApplicationContext);
  const history = useHistory();

  useEffect(() => {
    try {
      authGetMe(dispatch);
    } catch (error) {
      history.push('/login');
    }
  }, [])
  return <Component {...props} />
}

const ProtectedRoute = ({ component, ...rest }) => {
  const { state } = useContext(ApplicationContext);
  return (
    <Route {...rest} render={props => {
      if (state.isLoggedIn) {
        return <Wrapper {...props} component={component} />
      }
      return <Redirect to="/login" />
    }} />
  )
}


function App() {
  return (
    <ApplicationProvider>
      <div className="App">
        <Switch>
          <Route path='/login' component={Auth} />
          <ProtectedRoute exact path='/' component={Home} />
          <ProtectedRoute exact path='/profile' component={Collection} />
          <Redirect to="/" />
        </Switch>
        <Menu />
      </div >
    </ApplicationProvider >
  );
}

export default App;
