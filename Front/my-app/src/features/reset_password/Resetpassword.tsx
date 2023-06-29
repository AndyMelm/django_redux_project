import React from 'react'

const Resetpassword = () => {


  return (
    <div>
      <h3> If you forgot your password, click here:</h3>

      <button className="btn btn-danger" onClick={() => window.location.href = 'http://127.0.0.1:8000/reset_password/'}>
        Reset Password
      </button>


    </div>
  )
}

export default Resetpassword