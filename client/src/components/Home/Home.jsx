import React from "react";
import { Link } from "react-router-dom";
import  Card  from "../Card/Card.jsx";
import NavBar  from "../NavBar/NavBar.jsx";
import Paginate  from "../Paginate/Paginate.jsx";
import Loading from "../Loading/Loading.jsx";
import NotFound from "../NotFound/NotFound.jsx";
import { useState, useEffect } from "react";
import { getAllDogs, getTemperament, orderByNameAlpha, filterByCreated, resetDogs, filterByTemperament, filterByWeight, getDogsApiDb } from "../../redux/actions.js";
import { useDispatch, useSelector } from "react-redux";
import { API, DB, ALL } from "../../constantes/index.js";
import style from "../Home/Home.module.css";
import Banner from "../Banner/Banner.jsx";
import Footer from "../Footer/Footer.jsx";


const Home = () => {
  
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const allTemperaments = useSelector((state) => state.temperament);

    
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(8)
    const iOLastDog = currentPage * dogsPerPage;
    const iOFirstDog = iOLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(iOFirstDog, iOLastDog)
   
    const paginate = (pageNumbers) => {
        setCurrentPage(pageNumbers)
    } 

    const [order, setOrder] = useState("");
    
    useEffect(() => {
        dispatch(getAllDogs());
        dispatch(getTemperament());
    }, [dispatch])

    const handleFilterTemper = (e) => {
        e.preventDefault();
        dispatch(filterByTemperament(e.target.value))
        setCurrentPage(1)
    }
    const handleOrderAZ = (e) => {
        e.preventDefault();
         dispatch(orderByNameAlpha(e.target.value))
         setCurrentPage(1)
         setOrder(`Ordered ${e.target.value}`)
    }
    const handleFilterCreated = (e) => {
        e.preventDefault();
        dispatch(filterByCreated(e.target.value))
        setCurrentPage(1);
    }
    function handlerFilterWeight (e) {
        dispatch(filterByWeight(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordered ${e.target.value}`)
    }
   /*  function handleHeight (e) {
        e.preventDefault();
        dispatch(heightMax(e.target.value))
        setCurrentPage(1)
    } */

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(resetDogs())
    }
//allDogs.length > 0 ?
  return(
    <div>
        <div className={style.containHome}>
       { allDogs.length > 0 ?
            <div>
                <div className={style.containNav}>
              <NavBar  paginate={paginate}/>
              </div>
              <br/>
              <div>
                <Banner />
              </div>
              <div className={style.containAllFiltros}>
              <br/>
              <br/>
              <br/>
              
              <h1>FILTER</h1> 
              <p>In this section you can make your personalized search. Filter to any breed of dog either from the app or from your own creation. Use and mix the different filters to find what you want</p>
            <div className={style.containSearch}>{/* inicio FILTROS */}
              <div className={style.containSelect}>
                <select className={style.selectAll} onChange={handleFilterCreated}>
                   <option hidden>Dogs</option>
                   <option key={1} value={ALL}>All</option>
                   <option key={2} value={API}>Api</option>
                   <option key={3} value={DB}>Created</option>
                </select>
                <select className={style.selectAlpha} onChange={handleOrderAZ}>
                   <option hidden>Alphabetic</option>
                   <option key={1} value="A-Z">A-Z</option>
                   <option key={2} value="Z-A">Z-A</option>
                </select>
                <select className={style.selectTemp} onChange={handleFilterTemper}>
                   <option hidden>Temperament</option>
                   <option key={1+'e'} value="All">All</option>
                   {
                    allTemperaments.map(e => (
                        <option value={e.name} key={e.id}>{e.name}</option>
                    ))
                   }
                </select> 
                <select className={style.selectWeight} onChange={handlerFilterWeight}>
                   <option hidden>Weight</option>
                   <option key={1} value="max_weight">Max</option>
                   <option key={2} value="min_weight">Min</option>
                </select>
                </div>
                </div>{/* fin FILTROS */}
                </div>
                <div>
                    
                <button className={style.resetDogs} onClick={handleClick}><strong>Reset Dogs</strong></button>
                </div>
                
                <br/>
                
                
            <> 
                <div className={style.containCard}>
                {currentDogs.length > 0 ? currentDogs.map((e, l) => {
                   return(
                <Link to={`/dogs/${e.id}`}  key={l}>
                  
                     <div>
                <Card 
                 
                   name={e.name}
                   image={e.image}
                   id={e.id}
                   temperament={e.temperament}
                   weight_min={e.weight_min}
                   weight_max={e.weight_max}
                />
                     </div>
                </Link>
            )
            
             }): <div>
                <NotFound />
                 </div>
                  
          }     </div>  
          <br/>  <br/> 
            <div className={style.containPaginate}>
                <Paginate
                  dogsPerPage={dogsPerPage}
                  allDogs={allDogs.length}
                  paginate = {paginate}/> 
            </div> 
            <br/>
            </>
        
            </div>
                :<Loading />    
       }</div>
       <Footer />
    </div>

)}

export default Home;