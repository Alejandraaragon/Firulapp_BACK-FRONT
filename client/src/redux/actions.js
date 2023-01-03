import axios from "axios";
import { GET_ALL_DOGS,
         GET_NAMES,
         GET_DETAIL,
         GET_TEMPERAMENTS,
         FILTER_BY_TEMPERAMENT,
         ORDER_BY_NAME_ALPHA,
         FILTER_BY_WEIGHT,
         FILTER_BY_CREATED,
         CLEAR_DETAIL,
         RESET,
         DELETE_DOG,
         HEIGHT_MAX
        
         } from "../constantes/index.js";

export const getAllDogs = () => {
    return async function (dispatch){
        let info = await axios.get("http://localhost:3001/dogs")
        return dispatch ({
            type: GET_ALL_DOGS,
            payload: info.data
        })
    }
} 

export const getDogsName = (name) => {
    return async function (dispatch){
        let info = await axios.get(`http://localhost:3001/dogs/?name=${name}`)
        return dispatch ({
            type: GET_NAMES,
            payload: info.data
        })
    }
}

/* export const getDogsDetail = (id) => {
    return async function (dispatch) {
        let info = await axios.get(`http://localhost:3001/dogs/${id}`)
        return dispatch ({
            type: GET_DETAIL,
            payload: info.data
        })
    }
} */
export function getDogsDetail (id) {
    return function (dispatch) {
        axios.get(`http://localhost:3001/dogs/${id}`)
        .then(res => dispatch({
            type: GET_DETAIL,
            payload: res.data
        }))
        .catch(err =>
            console.error(err))
    }
}

export const postDog = (payload) => {
    return async function (dispatch) {
        const info = await axios.post("http://localhost:3001/dogs", payload)
        return info;
    }
}

export const getTemperament = () => {
    return async function (dispatch) {
        let info = await axios.get(`http://localhost:3001/temperament`)
        return dispatch ({
            type: GET_TEMPERAMENTS,
            payload: info.data
        })
    }
}

export const filterByTemperament = (payload) => {
    return {
        type: FILTER_BY_TEMPERAMENT,
        payload
    }
}

export const orderByNameAlpha = (payload) => {
    return {
        type: ORDER_BY_NAME_ALPHA,
        payload
    }
}

/* export const filterByHeight = (payload) => {
    return {
        type: FILTER_BY_HEIGHT,
        payload
    }
} */

export const filterByWeight = (payload) => {
    return {
        type: FILTER_BY_WEIGHT,
        payload
    }
}

export const filterByCreated = (payload) => {
    return {
        type: FILTER_BY_CREATED,
        payload
    }
}

export const resetDogs = () => {
    return {
        type: RESET,
    }
        
}

export const clearDetail = () => {//es para limpiar el detail anterior
    return {
        type: CLEAR_DETAIL
    }
}

/* export const deleteDogs = (id) => {
    return  async function (dispatch) {
        const info = await axios.delete(`http://localhost:3001/dogs/${id}`);
        return dispatch({
            type: DELETE_DOG,
            payload: info.data
        })
    }
} */
export const heightMax = () => {
    return {
        type: HEIGHT_MAX
    }
}


 