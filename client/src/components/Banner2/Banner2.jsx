import React from 'react'
import style from "./Banner2.module.css";
import { Container, Row, Col } from "react-bootstrap";
import img12 from 
"../../imagenes/40242584-9bb8-43a6-8508-cc0ea4dc3717_16-9-discover-aspect-ratio_default_0_x775y414.jpg";
 
function Banner2() {
  return (
    <div>
      <section className={style.banner1} id="home">
      <Container>
        <Row >
          <Col xs={12} md={6} xl={7}>
              <div>
                <h1 className={style.textImage1}>Create your Dog ¡NOW!</h1><br/>
                
                  <p className={style.texting}>
                  Fill out the form that you will find below with the data of the dog that you want to create and press the create button at the end. Go back to Home and look for him by his name or by his initial. </p>
                  <h2 className={style.success}>Successes!</h2>
              </div>
            
          </Col>
              
          <Col xs={12} md={6} xl={5}>
            <div>
                  <img className={style.imgBanner2} src={img12} alt="Header Img"/>
              </div>
          </Col>
          
        </Row>
      </Container>
    </section>
    </div>
  )
}

export default Banner2
