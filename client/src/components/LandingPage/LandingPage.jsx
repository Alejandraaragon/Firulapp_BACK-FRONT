import React from "react";
import {Link} from "react-router-dom";
import style from "./LandingPage.module.css";


const LandingPage = () => {
return(
    
    <div className={style.containLanding}>
       <div className={style.contain}>
           <div className={style.containTitle_text}>

            <h1 className={style.landingTitle}>FIRULApp </h1><br/>
            <p className={style.landingText}>Welcome to FiruApp, this application will allow you to know any<br/>
               breed of dogs that exists with detailed information on each one.<br/>
               You can also create your own dog with the information you want.<br/>
               Enter now and have fun!
            </p>
         <br/> 
         <br/> 
        <div className={style.containButton}>
            <Link to="/home">
                <button className={style.landingButton}>GO</button>
            </Link>
        </div>  
        </div>

        </div>
    </div> 
        
    )

}
export default LandingPage;

   