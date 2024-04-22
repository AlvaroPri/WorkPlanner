import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonAlert,
  IonInput,
  IonDatetime,
  IonCheckbox, // Importa IonCheckbox
} from '@ionic/react';
import supabase from '../components/SupabaseClient';
import { IonButton, IonIcon } from '@ionic/react';
import { arrowBackOutline  } from 'ionicons/icons';

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [id, setID] = useState<number>(0);
  const [password, setPassword] = useState<string>('');
  const [birthdate, setBirthdate] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const history = useHistory<any>();

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password || !birthdate) {
      console.error('Error: los campos no pueden estar vacíos');
      return;
    }

    try {
      const currentDate = new Date();
      const dateRegister = currentDate.toISOString();

      const { data, error } = await supabase
        .from('RegisterUser')
        .select('*')
        .eq('ID', id.toString());

      if (data && data.length > 0) {
        setShowError(true);
        return;
      }

      const { error: insertError } = await supabase
        .from('RegisterUser')
        .insert([
          {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            ID: id,
            Password: password,
            Date: birthdate,
            Date_Register: dateRegister,
            Admin: isAdmin, // Aquí se incluye si es administrador o no
          },
        ]);

      if (insertError) {
        console.error('Error al insertar los datos:', insertError.message);
        return;
      }

      history.push('/login');
    } catch (error) {
      console.error('Error al registrar al usuario:', error);
    }
  };

  const handleAtras = () => {
    history.push('/login');
  };

  return (
    <div className="ContenedorPadre">
      <IonCard>
          <IonCardHeader>
            <IonButton onClick={handleAtras} slot="start">
             <IonIcon slot="icon-only" icon={arrowBackOutline} />
             </IonButton>
             <IonCardTitle>Crea una nueva cuenta</IonCardTitle>
          </IonCardHeader>
        <IonCardContent>
          <IonItem>
            <IonInput
              placeholder="Nombre"
              value={firstName}
              onIonChange={(e) => setFirstName(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonInput
              placeholder="Apellido"
              value={lastName}
              onIonChange={(e) => setLastName(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonInput
              type="email"
              placeholder="E-Mail"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonInput
              type="text"
              placeholder="ID"
              value={id === 0 ? '' : id.toString()}
              onIonChange={(e) => setID(Number(e.detail.value!))}
            />
          </IonItem>
          <IonItem>
            <IonInput
              type="password"
              placeholder="Contraseña"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonDatetime
              displayFormat="YYYY-MM-DD"
              placeholder="Fecha de Nacimiento"
              value={birthdate}
              onIonChange={(e) => setBirthdate(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonCheckbox // Usa IonCheckbox para la selección de administrador
              checked={isAdmin}
              onIonChange={(e) => setIsAdmin(e.detail.checked)}
            />
            <label>¿Es administrador?</label> {/* Agrega una etiqueta para la selección de administrador */}
          </IonItem>

          <IonButton expand="full" onClick={handleRegister}>Registrar</IonButton>
          <IonButton expand="full" onClick={handleAtras}>
            <IonIcon slot="icon-only" icon={arrowBackOutline} />
          </IonButton>
        </IonCardContent>
      </IonCard>

      <IonAlert
        isOpen={showError}
        onDidDismiss={() => setShowError(false)}
        header={'Error'}
        message={'El usuario ya está registrado.'}
        buttons={['OK']}
      />
    </div>
  );
};

export default Register;
