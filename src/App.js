import React, { useEffect } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './App.scss';
import { connect } from 'react-redux';
import { getCurrentWeather, getFavoritesWeather } from "./redux/AsyncThunk"


function App() {
  const dispatch = useDispatch()
  const currentWeather = useSelector(({ currentWeather }) => currentWeather)
  const currentCity = useSelector(({ currentCity }) => currentCity)
  const getWeather = async (value) => {
    dispatch(getCurrentWeather(value))
    dispatch(getFavoritesWeather(['london', 'tel aviv', 'holon']))
  }
  // const onSearchChange = (e) => getWeather(e.target.value)
  const onSearchKeyDown = (e) => {
    if (e.key !== "Enter") return
    getWeather(e.target.value)
  }
  return (
    <div className="App">
      <input
        onKeyDown={onSearchKeyDown} />

      {JSON.stringify(currentWeather, null, '\t')}

    </div>
  );
}
export default connect(null)(App);
