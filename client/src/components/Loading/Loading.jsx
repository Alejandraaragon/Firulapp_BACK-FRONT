import React from "react";
import style from "../Loading/Loading.module.css"

export default class Loading extends React.Component{
    render() {
        return(
            <div className={style.containLoading}>
                <h2 className={style.textLoading}>LOADING...</h2>
            </div>
        )
    }
};

