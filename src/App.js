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
import './App.scss';



function App() {
  const [unit, setUnit] = useState('Metric');
  return (
    <UnitContext.Provider value={{ unit, setUnit }}>
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
    </UnitContext.Provider >
  );
}





export default connect(null)(App);
