import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import endpoints from '../constants/endpoints';
import Social from './Social';

const Fotter = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.fotter, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <div className="container-fluid fotter bg-dark text-center py-4">
      <p className="text-light h2">{data?.introText}</p>
      <Link to={data?.contactLink}>
        <button id="let" className="btn btn-outline-light text-light" type="button">
          {data?.buttonText}
        </button>
      </Link>

      <div className="row text-light py-3">
        <div className="col-12 col-md-4">
          <h5 className="text-info">{data?.moreLinksTitle}</h5>
          {data?.moreLinks.map((link) => (
            <a key={link.label} href={link.url} className="text-light d-block">
              {link.label}
            </a>
          ))}
        </div>

        <div className="col-12 col-md-4 text-justify py-3 px-1">
          <p>{data?.description}</p>
        </div>

        <div className="col-12 col-md-4">
          <h5 className="text-info">{data?.socialTitle}</h5>
          <Social />
        </div>
      </div>
    </div>
  );
};

export default Fotter;
