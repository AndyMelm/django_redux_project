import React from 'react';

const ContactUs = () => {
  const emailAddress = 'contact@example.com';

  return (
    <div>
      <h2>Contact Us</h2>
      <p>If you have any questions or concerns, please feel free to contact us at:</p>
      <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
    </div>
  );
};

export default ContactUs;
