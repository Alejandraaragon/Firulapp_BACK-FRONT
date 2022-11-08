import React from "react";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogsName } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import style from "../NavBar/NavBar.module.css";
import huella from "../../imagenes/HUELLA.jpg";
import NotFound from "../NotFound/NotFound.jsx";

const NavBar = ({paginate}) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [input, setInput] = useState("");
    
   const allDogs = useSelector((state) => state.dogs);  
   
    
    const handleInput = (e) => {//cambia cada caracter
        e.preventDefault();
        setInput(e.target.value)
    }

    const handleSubmit = (e) => {//mando la accion y me trae el dog
        e.preventDefault();
        if(input){
        dispatch(getDogsName(input))
        setInput("")
        history.push("/home")//me devuelve a home en pagina 1
        paginate(1)
        }if(e.target.value !== allDogs.name){//si apreto GO sin ningun input
            return alert("Please input a name to start the search :3")
        }
   }
 

return(
    <div className={style.containNavBar}>
        <div>
           <div className={style.contain2}>
           <label className={style.labelTitle}>FIRULApp</label>
           <img className={style.imgHuella} src={huella} alt="huella" width="50px"/>   
           <label className={style.labelSearch}><strong>SEARCH:</strong> </label>
           <input className={style.inputNav}
               value={input}
               type="text"
               placeholder=" Name..."
               onChange={handleInput}>
           </input>
           <button className={style.btnNav}
               type="submit"
               onClick={handleSubmit}>GO</button>
               <Link  to="/create"> 
                   <button className={style.btnCreate}>Create Dog</button>
               </Link>  
            </div>
        </div>
    </div>
 )
}

export default NavBar;