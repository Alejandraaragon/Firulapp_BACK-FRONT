import React from "react";
import style from "../NotFound/NotFound.module.css";

export default class NotFound extends React.Component{
    render() {
        return(
            <div className={style.containNotFound}>
                <h2 className={style.textNotFound}>DOG NOT FOUND</h2>
            </div>
        )
    }
};
