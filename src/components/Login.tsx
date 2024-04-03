// Código con las mejoras implementadas
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
import { createClient } from '@supabase/supabase-js';
import './Login.css'; // Importa el archivo CSS para aplicar estilos personalizados
import logo from '../img/Logo.png'; // Importa la imagen de tu logo
import { Style } from '@capacitor/status-bar';

const supabaseUrl = "https://gzaimljsjrzcamhdwwjr.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6YWltbGpzanJ6Y2FtaGR3d2pyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMDgwOTAzOSwiZXhwIjoyMDI2Mzg1MDM5fQ.7Gik0B0Sj0oQrU-UNYkH8RhSUO66CCEifQPowlVuVfU";

const supabase = createClient(supabaseUrl, supabaseKey);

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false); // Estado para controlar si se muestra el mensaje de error
  const [errorMessage, setErrorMessage] = useState<string>(''); // Estado para controlar el mensaje de error específico
  const [userInteracted, setUserInteracted] = useState<boolean>(false); // Estado para controlar si el usuario ha interactuado con los campos de entrada
  const history = useHistory<any>();

  const handleLogin = async () => {
    if (!userInteracted) {
      // Verificar si el usuario ha interactuado con los campos de entrada
      setUserInteracted(true); // Establecer que el usuario ha interactuado con los campos de entrada
      return;
    }

    if (!username || !password) {
      console.error("Error: username o password vacío");
      setErrorMessage(" username o password vacío"); // Establecer el mensaje de error específico
      setShowError(true);
      return;
    }

    try {
      // Consulta a la tabla 'RegisterUser' para verificar las credenciales
      const { data, error } = await supabase
        .from("RegisterUser")
        .select("*")
        .eq("ID", username)
        .single();

      if (error) {
        console.error("Error al consultar la base de datos:", error.message);
        setErrorMessage("Error al consultar la base de datos"); // Establecer el mensaje de error específico
        setShowError(true);
        return;
      }

      if (!data || data.Password !== password) {
        console.error("Credenciales incorrectas");
        setErrorMessage("Credenciales incorrectas"); // Establecer el mensaje de error específico
        setShowError(true);
        return;
      }

      // Si las credenciales son correctas, redirige al usuario a la página principal
      history.push("/home");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setErrorMessage("Error al iniciar sesión"); // Establecer el mensaje de error específico
      setShowError(true);
    }
  };

  const handleRegister = () => {
    history.push("/register");
  };

  const handleForgotPassword = () => {
    // Redirigir al usuario a la página de reinicio de contraseña o manejar el reinicio de contraseña
    console.log("Redirect to forgot password page or handle forgot password");
  };

  return (
    <div className='Padre'>
    <IonCard className="login-card"> {/* Aplica la clase de estilo al componente IonCard */}
      <IonCardHeader>
        <img src={logo} className="logo-img" /> {/* Agrega la imagen en la esquina superior izquierda */}
        <IonCardTitle className="TitleWP">WorkPlanner</IonCardTitle>
      </IonCardHeader>
      <IonCardContent >
        <div>
          <div style={{textAlign:"center"}}>ID</div>
          <IonInput className="input-container"
            placeholder=""
            value={username}
            onIonChange={(e) => setUsername(e.detail.value!)}
            onBlur={() => setUserInteracted(true)} // Establecer que el usuario ha interactuado con el campo de entrada al perder el foco
          />
        </div>
        <div >
          <div style={{textAlign:"center"}}>Contraseña</div>
          <IonInput className="input-container"
            type="password"
            placeholder=""
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
            onBlur={() => setUserInteracted(true)} // Establecer que el usuario ha interactuado con el campo de entrada al perder el foco
          />
        </div>
        <IonButton className="oval-button" expand="full" onClick={handleLogin}>
          Iniciar Sesión
        </IonButton>

        <IonButton style={{ borderRadius: "10px" }} className="oval-button" expand="full" onClick={handleRegister}>
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
    </div>
  );
};

export default Login;
