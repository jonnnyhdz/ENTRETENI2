import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logoImage from '../img/logo.png';
import firebase from 'firebase/compat/app';
import { auth } from '../bd/firebase';

const googleButtonImageUrl = 'https://1000marcas.net/wp-content/uploads/2020/02/logo-Google.png';

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result.additionalUserInfo.profile.email);
        setUser(result.additionalUserInfo.profile);
        navigate('/');
    window.location.reload();
      })
      .catch((error) => {
        console.error('Error al iniciar sesión con Google:', error);
      });
  };

  const extractInitial = (name) => {
    const initials = name.split(' ').map((word) => word[0]);
    return initials.join('').toUpperCase();
  };

  return (
    <div className="login-container">
      <div className='login-card'>
        <div className="logo">
          <img src={logoImage} alt="Logo del proyecto" />
        </div>
        <h1>Inicia sesión con:</h1>

        <img
          src={googleButtonImageUrl}
          alt="Iniciar sesión con Google"
          onClick={handleGoogleSignIn}
          style={{ cursor: 'pointer', width: '150px', height: '80px' }}
        />

        {user && user.name && (
          <div className="user-initial-circle">
            {extractInitial(user.name)}
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
