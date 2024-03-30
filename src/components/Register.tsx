import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonInput,
  IonLabel,
  IonButton,
  IonDatetime,
} from '@ionic/react';
import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const supabaseUrl = "https://gzaimljsjrzcamhdwwjr.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6YWltbGpzanJ6Y2FtaGR3d2pyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMDgwOTAzOSwiZXhwIjoyMDI2Mzg1MDM5fQ.7Gik0B0Sj0oQrU-UNYkH8RhSUO66CCEifQPowlVuVfU";
const supabase = createClient(supabaseUrl, supabaseKey);

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [id, setID] = useState<number>(0);
  const [password, setPassword] = useState<string>('');
  const [birthdate, setBirthdate] = useState<string>('');

  const history = useHistory<any>();

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password || !birthdate) {
      console.error("Error: los campos no pueden estar vacíos");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("RegisterUser")
        .insert([
          {
            FirstName: firstName,
            LastName: lastName,
            Email: email, // Corregido: Utilizar 'Email' en lugar de 'EMail'
            ID: id,
            Password: password,
            Date: birthdate,
          },
        ]);

      if (error) {
        console.error("Error al insertar los datos:", error.message);
        return;
      }

      history.push("/login");
    } catch (error) {
      console.error("Error al registrar al usuario:", error);
    }
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Registro</IonCardTitle>
        <IonCardSubtitle>Crea una nueva cuenta</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        <IonItem>
          <IonLabel>Nombre:</IonLabel>
          <IonInput
            placeholder="Nombre"
            value={firstName}
            onIonChange={(e) => setFirstName(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel>Apellido:</IonLabel>
          <IonInput
            placeholder="Apellido"
            value={lastName}
            onIonChange={(e) => setLastName(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel>E-Mail:</IonLabel>
          <IonInput
            type="email"
            placeholder="email@example.com"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel>ID:</IonLabel>
          <IonInput
            type="number"
            placeholder="ID"
            value={id}
            onIonChange={(e) => setID(Number(e.detail.value!))}
          />
        </IonItem>
        <IonItem>
          <IonLabel>Contraseña:</IonLabel>
          <IonInput
            type="password"
            placeholder="Contraseña"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel>Fecha de Nacimiento:</IonLabel>
          <IonDatetime
            placeholder="Fecha de Nacimiento"
            value={birthdate}
            onIonChange={(e) => setBirthdate(e.detail.value!)}
          />
        </IonItem>
        <IonButton onClick={handleRegister}>Registrar</IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default Register;
