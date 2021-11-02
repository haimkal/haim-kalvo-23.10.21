import { createAction } from "@reduxjs/toolkit";

export const ACTION_GET_CURRENT_WEATHER = createAction('GET_CURRENT_WEATHER')
export const ACTION_GET_FAVORITE_WEATHER = createAction('GET_FAVORITE_WEATHER')
export const ACTION_ADD_FAVORITE_CITY = createAction('ADD_FAVORITE_CITY')
export const ACTION_REMOVE_CITY_FROM_FAVORITES = createAction('REMOVE_CITY_FROM_FAVORTIES')