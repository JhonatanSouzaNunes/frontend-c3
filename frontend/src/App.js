import React from 'react';
import SingIn from './components/SingIn/index'
import Register from './components/Register/index'
import Checkout from './components/Checkout/index';
import Dashboard from './components/Dashboards';
import PageNotFound from './components/PageNotFound';
import { BrowserRouter, Route, Switch } from 'react-router-dom';



const App = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={SingIn} />
        <Route path="/register" component={Register} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/*" component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
