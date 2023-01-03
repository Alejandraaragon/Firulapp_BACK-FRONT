import { GET_ALL_DOGS,
         GET_NAMES,
         GET_DETAIL,
         GET_TEMPERAMENTS,
         FILTER_BY_TEMPERAMENT,
         ORDER_BY_NAME_ALPHA,
         FILTER_BY_WEIGHT ,
         FILTER_BY_CREATED,
         CLEAR_DETAIL,
         POST_DOG,
         RESET,
         DB,
         DELETE_DOG,
         HEIGHT_MAX
        } from "../constantes/index.js";
import { heightMax } from "./actions.js";

const initialState = {
    dogs: [], //es el filtro
    filterDogs: [],//alldogs tiene toos los perros
    temperament: [],
    details: [],
    created: []
}

//toma el estado anterior + accion = devuelve Nuevo estado
const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_DOGS:
          return {
            ...state,
            dogs: action.payload,
            filterDogs: action.payload
          }
        case GET_NAMES:
            return {
            ...state,
            dogs: action.payload   
            }
        case GET_DETAIL:
          return {
            ...state,
            details: action.payload
          }
        case GET_TEMPERAMENTS:
          return {
            ...state,
            temperament: action.payload
          }
        case RESET:
          return {
            ...state,
            dogs: state.filterDogs
          }
        case ORDER_BY_NAME_ALPHA:
          let orderedDogs = action.payload === "A-Z" ? state.filterDogs.sort((a, b) => {
              if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                  return 0;
               }): state.filterDogs.sort((a, b) => {
              if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              if(a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                  return 0;
               });
          return {
             ...state,
             filterDogs: orderedDogs,
                }

       /* case CREATED:
           return {
            ...state,
            created: action.payload
           }
             case FILTER_BY_CREATED:
            let dogsCreated = state.filterDogs
            let filterCreated = action.payload === DB ? dogsCreated.filter(d => d.createdAtDb) : dogsCreated.filter(d => !d.createdAtDb)          
          return {
            ...state,
           created: filterCreated
          }*/
       case FILTER_BY_CREATED:
          let allDogs = state.filterDogs;
          let filterCreated = action.payload === DB ? allDogs.filter(d => d.createdAtDb) : allDogs.filter(d => !d.createdAtDb)          
          return {
            ...state,
            dogs: action.payload === DB ? filterCreated : allDogs
          } 

          case FILTER_BY_WEIGHT:
            const dogsWeight = state.filterDogs.filter(d => d.weight_min)
            const filterWeight = action.payload === 'min_weight' ? dogsWeight.sort((a, b) => {
              return a.weight_min - b.weight_min
            })  :
            dogsWeight.sort((a,b) =>{
              return a.weight_min - b.weight_min
          }).reverse()
            
            return {
              ...state,
              dogs: filterWeight,
          };
          case HEIGHT_MAX:
            const totalDogs = state.filterDogs
            const order = totalDogs.filter(e => e.heightMax > 50)
              return {
                ...state,
                dogs: order
              }
                          
          
          case FILTER_BY_TEMPERAMENT:
            const dogsAll = state.filterDogs
            const filteredTemp = action.payload === 'All'?  dogsAll : dogsAll.filter(e => {
                return e.temperament?.includes(action.payload)
            })
    
            return {
              ...state,
              dogs: filteredTemp,
          };

          /* case ALL_API_DB:
            let allDogs2 = state.filterDogs;
            let dogsCreated = action.payload === DB ? allDogs2.filter(d => d.createdAtDb) : allDogs2.filter(d => !d.createdAtDb)          
            let allApiDb = allDogs + dogsCreated;
            return {
              ...state,
              dogs: allApiDb
            } */

          case CLEAR_DETAIL : 
            return {
              ...state ,
              details : {}
            }

          /* case DELETE_DOG:
            return {
           ...state,
           filterDogs: state.filterDogs.filter(e => e.id !== action.payload)
            } */
          case POST_DOG : 
            return {
              ...state
        };
          default: return state
    }
}

    
export default rootReducer