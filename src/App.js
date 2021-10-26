import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { getCurrentWeather, getFavoritesWeather } from './redux/AsyncThunk'
import Header from './Header/Header';
import Weather from './Weather/Weather';
import Favorties from './Favorites/Favorties';
import { UnitContext } from './unit-context'
import { InputContext } from './input-context';
import './App.scss';




function App() {
  const [unit, setUnit] = useState('Metric');
  const [input, setInput] = useState('Tel Aviv')
  return (
    <UnitContext.Provider value={{ unit, setUnit }}>
      <InputContext.Provider value={{ input, setInput }}>
        <Router>
          <div className="App">
            <div className="App-container">
              <Header />
              <Switch>
                <Route path="/favorites">
                  <Favorties />
                </Route>
                <Route path="/" exact>
                  <Weather />
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </InputContext.Provider >
    </UnitContext.Provider >
  );
}





export default connect(null)(App);
