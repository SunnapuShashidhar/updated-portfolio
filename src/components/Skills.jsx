import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  iconStyle: {
    height: 75,
    width: 75,
    margin: 10,
    marginBottom: 0,
  },
  introTextContainer: {
    whiteSpace: 'pre-wrap',
    marginBottom: 45,
  },
};

// Reusable Skill Renderer
const Skill = ({ skill, colSize }) => (
  <Col
    lg={colSize}
    md={8}
    sm={12}
    xs={12}
    className="mb-4 d-flex flex-column align-items-center text-center"
  >
    <h3>{skill.title}</h3>
    <div>
      {skill.items.map((item) => (
        <div key={item.title} style={{ display: 'inline-block' }}>
          <img
            style={styles.iconStyle}
            src={item.icon}
            alt={item.title}
            className="bg-transparent"
          />
          <p>{item.title}</p>
        </div>
      ))}
    </div>
  </Col>
);

function Skills(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const renderSkillsIntro = (intro) => (
    <h4 style={styles.introTextContainer}>
      <ReactMarkdown children={intro} />
    </h4>
  );

  useEffect(() => {
    fetch(endpoints.skills, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <Fade>
          <div className="section-content-container">
            <Container>
              {renderSkillsIntro(data.intro)}
              <Row>
                {data.skills.slice(0, 2).map((skill) => (
                  <Skill key={skill.title} skill={skill} colSize={6} />
                ))}
              </Row>
              {data.skills.length > 2 && (
                <Row className="justify-content-center mt-4">
                  <Skill skill={data.skills[2]} colSize={6} />
                </Row>
              )}
            </Container>
          </div>
        </Fade>
      ) : (
        <FallbackSpinner />
      )}
    </>
  );
}

Skill.propTypes = {
  skill: PropTypes.shape({
    title: PropTypes.string.isRequired, // The title of the skill
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired, // The title of an item
        icon: PropTypes.string.isRequired,
      })
    )
  }).isRequired,
  colSize: PropTypes.number.isRequired,
};
Skills.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Skills;
