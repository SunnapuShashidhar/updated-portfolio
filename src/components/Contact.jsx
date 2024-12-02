import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
  });
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitMessageTextColor, setSubmitMessageTextColor] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbyjp_R1YpZG-VK---eTp_csKY8AABerGYQgeIRKE4lRTvjocsF0uPTzFIrhsO7Wls8D/exec', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      if (result.status === 'success') {
        setSubmitMessage('Your message has been sent successfully!');
        setSubmitMessageTextColor('text-info');
        setFormData({
          name: '',
          email: '',
          description: '',
        });
      } else {
        setSubmitMessage('Failed to send your message. Please try again.');
        setSubmitMessageTextColor('text-danger');
      }
    } catch (error) {
      setSubmitMessage('Error sending your message. Please check your connection.');
      setSubmitMessageTextColor('text-danger');
    }
  };

  return (
    <div className="container my-5 py-5" style={{ width: '100vw' }}>
      <h1 className="font-weight-light text-center py-5">
        <span className="text-info">Thank you! </span>for your interest
      </h1>
      <div className="row justify-content-center">
        <div className="col-11 col-lg-5">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <p className="d-flex align-self-start">Name *</p>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <p className="d-flex align-self-start">Email *</p>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <p className="d-flex align-self-start">Tell me about your project *</p>
              <textarea
                className="form-control"
                name="description"
                rows="5"
                value={formData.description}
                onChange={handleChange}
                required
              >
              </textarea>
            </div>
            <button
              type="submit"
              className="btn btn-dark d-flex align-self-end"
              style={{ backgroundColor: 'black' }}
            >
              Lets talk business
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

export default ContactForm;
