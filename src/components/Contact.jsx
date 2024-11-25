import React, { useState, useEffect } from 'react';
import endpoints from '../constants/endpoints';

const Contact = () => {
  const [contactData, setContactData] = useState(null);
  const [formData, setFormData] = useState({});
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitMessageTextColor, setSubmitMessageTextColor] = useState('');
  useEffect(() => {
    fetch(endpoints.con, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setContactData(res))
      .catch((err) => err);
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { name, email, description } = formData;

    if (!name || !email || !description) {
      setSubmitMessage(contactData.validationMessage);
      setSubmitMessageTextColor('text-danger');
      return;
    }

    try {
      const response = await fetch('https://portfoliomicroservers.herokuapp.com/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.isSuccessful) {
        setSubmitMessage(contactData.successMessage.replace('{name}', formData.name));
        setSubmitMessageTextColor('text-info');
        setFormData({});
      } else {
        setSubmitMessage(contactData.errorMessage);
        setSubmitMessageTextColor('text-danger');
      }
    } catch (error) {
      setSubmitMessage('Network error. Please try again later.');
      setSubmitMessageTextColor('text-danger');
    }
  };

  return (
    <div className="container my-5 py-5">
      <h1 className="font-weight-light text-center py-5">
        <span className="text-info">{contactData.title}</span>
      </h1>
      <div className="row justify-content-center">
        <div className="col-11 col-lg-5">
          <form onSubmit={onSubmit}>
            {contactData.formFields.map((field) => (
              <div className="form-group" key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    className="form-control"
                    name={field.name}
                    rows={field.rows}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ''}
                    onChange={onChange}
                    required={field.required}
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    className="form-control"
                    placeholder={field.placeholder}
                    value={formData[field.name] || ''}
                    onChange={onChange}
                    required={field.required}
                  />
                )}
              </div>
            ))}
            <button
              type="submit"
              className={contactData.submitButton.style.className}
              style={{ backgroundColor: contactData.submitButton.style.backgroundColor }}
            >
              {contactData.submitButton.text}
            </button>
          </form>
        </div>
      </div>
      <div className="py-5 mx-2 text-center">
        <h5 className={submitMessageTextColor}>{submitMessage}</h5>
      </div>
    </div>
  );
};

export default Contact;
