
import Button from '@mui/material/Button';

const Resetpassword = () => {
  return (
    <div>
      <h3>If you forgot your password, click here:</h3>
      <Button variant="contained" color="error" onClick={() => (window.location.href = 'http://127.0.0.1:8000/reset_password/')}>
        Reset Password
      </Button>
    </div>
  );
};

export default Resetpassword;
