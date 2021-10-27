import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header/Header';
import Weather from './Weather/Weather';
import Favorties from './Favorites/Favorties';
import { UnitContext } from './unit-context'
import './App.scss';
import { ModeContext } from './mode-context';

function App() {
  const [unit, setUnit] = useState('Metric');
  const [mode, setMode] = useState('light');

  return (
    <UnitContext.Provider value={{ unit, setUnit }}>
      <ModeContext.Provider value={{ mode, setMode }}>
        <Router>
          <div className={mode === 'dark' ? 'App dark' : 'App'}>
            <div className="App-container">
              <Header />
              <Switch>
                <Route path="/favorites">
                  <Favorties />
                </Route>
                <Route path="/:cityName?">
                  <Weather />
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </ModeContext.Provider >
    </UnitContext.Provider >
  );
}





export default connect(null)(App);
