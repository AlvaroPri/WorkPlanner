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
} from '@ionic/react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://gzaimljsjrzcamhdwwjr.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6YWltbGpzanJ6Y2FtaGR3d2pyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMDgwOTAzOSwiZXhwIjoyMDI2Mzg1MDM5fQ.7Gik0B0Sj0oQrU-UNYkH8RhSUO66CCEifQPowlVuVfU";

const supabase = createClient(supabaseUrl, supabaseKey);

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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
        return;
      }

      // Si las credenciales son correctas, redirige al usuario a la página principal
      history.push("/explore");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const handleRegister = () => {
    //history.push("/register");
  };

  const handleForgotPassword = () => {
    // Redirigir al usuario a la página de reinicio de contraseña o manejar el reinicio de contraseña
    console.log("Redirect to forgot password page or handle forgot password");
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Inicio de Sesión</IonCardTitle>
        <IonCardSubtitle>Ingrese sus credenciales</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        <IonInput
          placeholder="Usuario"
          value={username}
          onIonChange={(e) => setUsername(e.detail.value!)}
        />
        <IonInput
          type="password"
          placeholder="Contraseña"
          value={password}
          onIonChange={(e) => setPassword(e.detail.value!)}
        />

        <IonButton expand="full" onClick={handleLogin}>
          Iniciar Sesión
        </IonButton>

        <IonButton expand="full" onClick={handleRegister}>
          Registrarse
        </IonButton>

        <IonButton expand="full" onClick={handleForgotPassword}>
          ¿Olvidaste tu contraseña?
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default Login;
