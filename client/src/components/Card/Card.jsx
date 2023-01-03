import React from "react";
import style from "./Card.module.css";


const Card = ({id, image, name, temperament, weight_min, weight_max}) => {
  return(
    <div className={style.containCard}>
         <h2 className={style.name}>{name}</h2>
       <div className={style.containImg}>
         <img className={style.cardImg} src={image} alt="dogs" height="200px" width="250px"/>
       </div>
       <div className={style.cardInfo}>
         <h2 className={style.name}>{name}</h2>
         <h4>Temperament: {temperament}</h4>
         <h4>Weight min: {weight_min}</h4>
         <h4>Weight max: {weight_max}</h4>
         <h4>{id}</h4>
        </div>
    </div>
  )
}

export default Card;