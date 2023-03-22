import React from 'react';
import style from "./Footer.module.css";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../../imagenes/logoAA.png";
import linkedin1 from "../../imagenes/linkedIn.png"
import github1 from "../../imagenes/gitHub.png" 
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailIcon from '@mui/icons-material/Mail';


function Footer() {
  return (
    <footer className={style.footer}>
    <Container>
      <Row className={style.aligneItems}>
        
   {/*    <Col className={style.column3} size={12} sm={6}>
          <img src={logo} alt="Logo" />
        </Col> */}
        
        <Col size={12} sm={6} className={style.textcenter}>
        <div className={style.socialicon}>
            <a href="https://www.linkedin.com/in/alejandra-aragon-6a07541a4/"><img src={linkedin1} alt="Icon" /></a>
            <a href="https://github.com/Alejandraaragon"><img src={github1} alt="Icon" /></a>
          <br/>
          <div>
          <br/>
            <LocationOnIcon  />  
            <span className={style.textFooter}> Cali, Colombia</span>
          </div>
          
          <div>
            < WhatsAppIcon />
            <span className={style.textFooter}> +57 317-098-18-11</span>
          </div>
          
          <div>
            <MailIcon />
            <span className={style.textFooter}> alejita.0418@gmail.com</span>
          </div>  
          </div>
        </Col>
        <p>Copyright 2022. All Rights Reserved</p>
        <br/>
      </Row>
    </Container>
  </footer>
  )
}

export default Footer
