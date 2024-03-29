import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonInput,
  IonButton,
  IonAlert,
} from '@ionic/react';
import { createClient } from '@supabase/supabase-js';
import './Login.css'; // Importa el archivo CSS para aplicar estilos personalizados
import logo from './logo.png'; // Importa la imagen de tu logo

const supabaseUrl = "https://gzaimljsjrzcamhdwwjr.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6YWltbGpzanJ6Y2FtaGR3d2pyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMDgwOTAzOSwiZXhwIjoyMDI2Mzg1MDM5fQ.7Gik0B0Sj0oQrU-UNYkH8RhSUO66CCEifQPowlVuVfU";

const supabase = createClient(supabaseUrl, supabaseKey);

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false); // Estado para controlar si se muestra el mensaje de error
  const history = useHistory<any>();

  const handleLogin = async () => {
    if (!username || !password) {
      console.error("Error: username o password vacío");
      return;
    }

    try {
      // Consulta a la tabla 'RegisterUser' para verificar las credenciales
      const { data, error } = await supabase
        .from("RegisterUser")
        .select("*")
        .eq("ID", username)
        .eq("Password", password)
        .single();

      if (error) {
        console.error("Error al consultar la base de datos:", error.message);
        return;
      }

      if (!data) {
        console.error("Credenciales incorrectas");
        setShowError(true); // Mostrar mensaje de error si las credenciales son incorrectas
        return;
      }

      // Si las credenciales son correctas, redirige al usuario a la página principal
      history.push("/home");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
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
    <IonCard className="login-card"> {/* Aplica la clase de estilo al componente IonCard */}
      <IonCardHeader>
        <img src="src/img/Logo.png" className="logo-img" /> {/* Agrega la imagen en la esquina superior izquierda */}
        <IonCardTitle style={{'margin-left':'80px', "color": "#fc4f00", "font-size":"37px"}} >WorkPlanner</IonCardTitle>
        <IonCardSubtitle>-</IonCardSubtitle>
      </IonCardHeader>
      <div style={{ "text-align": "center"}}>
      <img src="src/img/perfil1.png" className="logo-img" style={{'margin-top':'80px', "width" : "250px", "position": "relative"}} /> {/* Agrega la imagen en la esquina superior izquierda */}
      
      </div>
      <IonCardContent  className="scrollable-content" style={{'margin-top':'90px'}}>
        <div className="input-container">
          <div>ID</div>
          <IonInput
            placeholder="Ingrese su ID"
            value={username}
            onIonChange={(e) => setUsername(e.detail.value!)}
          />
        </div>
        <div className="input-container">
          <div>Contraseña</div>
          <IonInput
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          />
        </div>

        <IonButton className="oval-button" expand="full" onClick={handleLogin}>
          Iniciar Sesión
        </IonButton>

        <IonButton className="oval-button" expand="full" onClick={handleRegister}>
          Registrarse
        </IonButton>

        <IonButton className="forgot-button" expand="full" onClick={handleForgotPassword}>
          ¿Olvidaste tu contraseña?
        </IonButton>

        {/* Alerta para mostrar el mensaje de error */}
        <IonAlert
          isOpen={showError}
          onDidDismiss={() => setShowError(false)}
          header={'Error'}
          message={'Ha ingresado el usuario o contraseña incorrectos'}
          buttons={['OK']}
        />
      </IonCardContent>
    </IonCard>
  );
};

export default Login;
