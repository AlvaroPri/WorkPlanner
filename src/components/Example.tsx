// Archivo: Example.tsx
import React, { useState } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonInput,
  IonButton,
} from '@ionic/react';

const Example: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lógica de inicio de sesión
    console.log('Username:', username);
    console.log('Password:', password);
  };

  const handleRegister = () => {
    // Lógica de registro
    console.log('Redirect to registration page or handle registration');
  };

  const handleForgotPassword = () => {
    // Lógica de olvidar contraseña
    console.log('Redirect to forgot password page or handle forgot password');
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

export default Example;
