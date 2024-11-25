import React from 'react';
import { Container } from 'react-bootstrap';
// import Fade from 'react-reveal';
import Home from './Home';
import About from './About';
import Skills from './Skills';
import Education from './Education';
import Fotter from './Fotter';

function Main() {
  return (
    <>
      <Container>
        <Home />
        <About header="About Me" />
        <Skills header="Skills" />
        <Education header="Education" />
      </Container>
      <Fotter />
    </>
  );
}

export default Main;
