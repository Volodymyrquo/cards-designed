import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import {
  AuthPage,
  Cards,
  CardsTypes,
  Contacts,
  Currencies,
  Dashboard,
  Header,
  Home,
  Navbar,
  Requisites,
  Tariffs,
  Users,
} from './components';
import { ForCards, ForUsers, Types } from './components/Operations';

const App = () => {
  return (
    <div className='app-wrapper'>
      <Header />
      <Navbar />
      <div className='app-wrapper-content'>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/cards' component={Cards} />
          <Route path='/cardstypes' component={CardsTypes} />
          <Route path='/contacts' component={Contacts} />
          <Route path='/currencies' component={Currencies} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/requisites' component={Requisites} />
          <Route path='/tariffs' component={Tariffs} />
          <Route path='/users' component={Users} />
          <Route path='/types' component={Types} />
          <Route path='/forusers' component={ForUsers} />
          <Route path='/forcards' component={ForCards} />

          <Route path='/login' component={AuthPage} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
