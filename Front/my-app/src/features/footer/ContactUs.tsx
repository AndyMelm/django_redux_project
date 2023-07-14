import React from 'react';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ContactUs = () => {
  const emailAddress = 'andrey.melman93@gmail.com';

  return (
    <div>
      <h2>Contact Us</h2>
      <p>If you have any questions or concerns, please feel free to contact us at:</p>
      <a href={`mailto:${emailAddress}`}>
        <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: '54px' }} /> 
      </a>
      &nbsp; &nbsp;    &nbsp; &nbsp; 
      <a href="https://github.com/AndyMelm">
        <FontAwesomeIcon icon={faGithub} style={{ fontSize: '54px' }} /> 
      </a>
      &nbsp; &nbsp;    &nbsp; &nbsp; 
      <a href="https://www.linkedin.com/in/andrey-melman-636b49277/">
        <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: '54px' }} /> 
      </a>
    </div>
  );
};

export default ContactUs;
