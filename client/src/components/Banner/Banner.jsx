import React from 'react'
import style from "./Banner.module.css";
import { Container, Row, Col } from "react-bootstrap";
/* import img12 from "../../imagenes/alelu.jpg"; */

function Banner() {
  return (
    <div>
      <section className={style.banner} id="home">
      <Container>
        <Row>
          <Col xs={12} md={6} xl={7}>
              <div>
                <h1>Welcome to <br/>FIRULApp</h1><br/>
                  <p>Welcome to the fun!!! <br/>
                    In this app you can upload your dog's photo and create your own card with detailed information. You can also search for the breed you want, we have hundreds of them in our app. The fun begins!!</p>
              </div>
            
          </Col>
              
          <Col xs={12} md={6} xl={5}>
            {/* <div>
                  <img src={img12} alt="Header Img"/>
              </div> */}
          </Col>
          
        </Row>
      </Container>
    </section>
    </div>
  )
}

export default Banner
