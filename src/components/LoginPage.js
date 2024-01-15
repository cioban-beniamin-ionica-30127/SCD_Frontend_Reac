import React, { useState } from 'react';
import axios from 'axios';
import extractRoleFromToken from '../services/JwtDecoder';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, CssBaseline, Typography } from '@mui/material';
import { styled } from '@mui/system';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


const LoginPageStyle = styled('div')({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(to right, #6DD5FA, #FF758C)', // Example gradient
});

const StyledTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
});

const StyledButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  color: 'white',
  marginTop: '20px',
});

const useStyles = styled((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const requestBody = {
        username: username,
        password: password,
      };
      const result = await axios.post("http://localhost:8080/api/v1/users/login", requestBody);
      const jwt = result?.data?.token;

      localStorage.setItem("jwt", jwt);

      const role = extractRoleFromToken(jwt);

      if (role === "DIRECTOR") {
        console.log('ROLE IS DIRECTOR ---- OK');
        navigate('/employeeManagement');
      } else {
        console.error('Unauthorized access');
      }

      console.log('User Role:', role);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
      <LoginPageStyle>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <LockOutlinedIcon style={{ color: 'white', marginBottom: '20px' }} />
            <Typography component="h1" variant="h5" style={{ color: 'white' }}>
              Login
            </Typography>
            <form className={classes.form} noValidate>
              <StyledTextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
              />
              <StyledTextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
              <StyledButton
                  fullWidth
                  variant="contained"
                  className={classes.submit}
                  onClick={handleLogin}
              >
                Login
              </StyledButton>
            </form>
          </div>
        </Container>
      </LoginPageStyle>
  );
};

export default LoginPage;