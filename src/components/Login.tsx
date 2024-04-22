import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonButton,
  IonAlert,
} from '@ionic/react';
import './Login.css'; // Importa el archivo CSS para aplicar estilos personalizados
import logo from '../img/Logo.png'; // Importa la imagen de tu logo
import supabase from '../components/SupabaseClient';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [userInteracted, setUserInteracted] = useState<boolean>(false);
  const history = useHistory<any>();

  const handleLogin = async () => {
    if (!userInteracted) {
      setUserInteracted(true);
      return;
    }
  
    if (!username || !password) {
      setErrorMessage('Por favor, ingresa tu ID y contraseña.');
      setShowError(true);
      return;
    }
  
    try {
      const { data, error } = await supabase
        .from('RegisterUser')
        .select('*')
        .eq('ID', username)
        .single();
  
      if (error) {
        console.error('Error al consultar la base de datos:', error.message);
        setErrorMessage('Error al consultar la base de datos.');
        setShowError(true);
        return;
      }
  
      if (!data || data.Password !== password) {
        setErrorMessage('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
        setShowError(true);
        return;
      }
  
      // Verifica si el usuario es un administrador
      if (data.Admin === true) {
        // Redirige a la página de inicio de administrador
        history.push('/home');
      } else {
        // Redirige a la página de inicio de usuario normal
        history.push('/U_home');
      }
  
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setErrorMessage('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
      setShowError(true);
    }
  };

  const handleRegister = () => {
    history.push('/register');
  };

  const handleForgotPassword = () => {
    console.log('Redirect to forgot password page or handle forgot password');
  };

  return (
    <IonCard className="login-card">
      <IonCardHeader>
        <img src={logo} alt="Logo" className="logo-img" />
        <IonCardTitle className="TitleWP">WorkPlanner</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <div>
          <div className="TextIdPass">ID</div>
          <IonInput
            className="input-container"
            placeholder=""
            value={username}
            onIonChange={(e) => setUsername(e.detail.value!)}
            onBlur={() => setUserInteracted(true)}
          />
        </div>
        <div>
          <div className="TextIdPass">Contraseña</div>
          <IonInput
            className="input-container"
            type="password"
            placeholder=""
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
            onBlur={() => setUserInteracted(true)}
          />
        </div>
        <IonButton className="oval-button" expand="full" onClick={handleLogin}>
          Iniciar Sesión
        </IonButton>
        <IonButton style={{ borderRadius: '10px' }} className="oval-button" expand="full" onClick={handleRegister}>
          Registrarse
        </IonButton>
        <IonButton className="oval-button" expand="full" onClick={handleForgotPassword}>
          ¿Olvidaste tu contraseña?
        </IonButton>
        <IonAlert
          isOpen={showError}
          onDidDismiss={() => setShowError(false)}
          header={'Error'}
          message={errorMessage}
          buttons={['OK']}
        />
      </IonCardContent>
    </IonCard>
  );
};

export default Login;
