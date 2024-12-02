import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Container, Col, Row, Button
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  introTextContainer: {
    margin: 10,
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1.2em',
    fontWeight: 500,
  },
  introImageContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const parseIntro = (text) => (
    <ReactMarkdown
      children={text}
    />
  );

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          {data
            ? (
              <Fade>
                <Row>
                  <Col style={styles.introTextContainer}>
                    {parseIntro(data.about)}
                    <Button
                      onClick={() => window.open(data.resumeLink, '_blank')}
                      style={{
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        padding: '10px 20px',
                        borderRadius: '15px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        transition: 'background-color 0.3s',
                        '&:hover': {
                          backgroundColor: '#0056b3',
                        },
                        '&:focus': {
                          outline: 'none',
                        },
                      }}
                    >
                      Resume
                    </Button>
                  </Col>
                  <Col style={styles.introImageContainer}>
                    <img src={data?.imageSource} alt="profile" />
                  </Col>
                </Row>
              </Fade>
            )
            : <FallbackSpinner />}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
