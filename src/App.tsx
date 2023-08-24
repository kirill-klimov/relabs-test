import { Switch, Route, useLocation } from 'wouter';
import Auth from './pages/Auth';
import { useContext, useEffect } from 'react';
import { IUserContext, UserContext } from './context/UserContext';
import Home from './pages/Home';

export default function App() {

  const [location, setLocation] = useLocation();
  const { setUser, user } = useContext(UserContext) as IUserContext;
  

  useEffect(() => {
    if (!user) setLocation('/login');
  }, [user]);

  return (
    <Switch>
      <Route path='/' component={Home} /> 
      <Route path='/login' component={Auth} />
    </Switch>
  );
}