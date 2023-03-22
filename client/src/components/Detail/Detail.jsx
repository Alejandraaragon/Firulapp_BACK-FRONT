import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getDogsDetail, clearDetail } from "../../redux/actions.js";
import Loading from "../Loading/Loading.jsx";
import style from "../Detail/Detail.module.css";
import NavBar from "../NavBar/NavBar.jsx";

const Detail = () => {

   const dispatch = useDispatch();
   let { id } = useParams();//permite acceder desde un componente a los parámetros de la ruta
   const dogDetail = useSelector((state) => state.details)

   useEffect(() => {
    dispatch(getDogsDetail(id));//se monta el componente
    return () => {
        dispatch(clearDetail())//se desmonta el componente
    }
   }, [dispatch, id]);



  return (
   
    <div className={style.containDetail}>
       <NavBar  className={style.containNav}/>
        <div>{
           dogDetail.length > 0 ? 
           <div>{/* div CONDICION:  tiene adentro la respuesta a la primer condicion. Tiene todo lo que deberia tener el detalle */}
             <div className={style.containBtnTitle}>
             
             <h2 className={style.nameDetail}>{dogDetail[0].name}</h2><br/>
             </div>
             <div className={style.containImgInfo}>
               <div className={style.detailImg}>
                 <img className={style.image}src={dogDetail[0].image} alt="dogImage"  height="350px" width="450px"/>
               </div>

               <div className={style.containInfoDetail}>
                 <h3># {dogDetail[0].id}</h3>
                 <h3>Weight: {dogDetail[0].weight_min} - {dogDetail[0].weight_max} KG</h3>
                 <h3>Height: {dogDetail[0].height_min} - {dogDetail[0].height_max} CM</h3>
                 <h3>Time of life: {dogDetail[0].life_span}</h3>
               <h3 className={style.detailTemper}>Temperament: {dogDetail[0].temperament}</h3>
               </div>
               </div>
              <br/>
              <br/>
              <br/>
          </div>/* div fin CONDICION: */
        : <Loading />
        }
        </div>
    </div>
    
  )
}

export default Detail;