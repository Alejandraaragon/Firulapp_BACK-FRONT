import React from "react";
import style from "../Paginate/Paginate.module.css";

const Paginate = ({allDogs, dogsPerPage, paginate}) => {
   const pageNumbers = []
                                //262/8 + 1
   for(let i = 1; i <= Math.ceil(allDogs/dogsPerPage); i++){
    pageNumbers.push(i)
   }
   return (
    <div className={style.containPaginate}>
        <nav>
        
           <ul>
            {
                pageNumbers?.map((e) => {
                    return(
                        
                            <button className={style.buttonPaginate} key={e} onClick={() => paginate(e)}>{e}</button>
                            
                    )
                })
            }
           </ul>
        </nav>
    </div>
   )
}

export default Paginate;