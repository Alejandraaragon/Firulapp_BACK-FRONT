import React from "react";
import style from "../Loading/Loading.module.css";

export default class Loading extends React.Component{
    render() {
        return(
            <div className={style.containAll}>
              <div className={style.textLoading}>Loading...</div>
              <div className={style.containLoading}></div>  
            </div> 
            
        )
    }
};

