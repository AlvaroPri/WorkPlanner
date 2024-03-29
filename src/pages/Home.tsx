<<<<<<< HEAD
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import Login  from '../components/Login';

=======
import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import Example from '../components/Example'; // Ajusta la ruta según tu estructura
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
//no quiere coger ningun cambiooooooo :c
>>>>>>> 5d03e73ee4cd88e99e5272a3aaab08c6eac2a6a4
const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
<<<<<<< HEAD
          <IonTitle>Blank</IonTitle>
=======
          <IonTitle>WorkPlanner</IonTitle>
>>>>>>> 5d03e73ee4cd88e99e5272a3aaab08c6eac2a6a4
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
<<<<<<< HEAD
            <IonTitle size="large">Blank0</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Login/>
=======
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Agrega el formulario de inicio de sesión */}
        <Example />

        {/* Agrega el componente de exploración */}
        <ExploreContainer />
>>>>>>> 5d03e73ee4cd88e99e5272a3aaab08c6eac2a6a4
      </IonContent>
    </IonPage>
  );
};

export default Home;
<<<<<<< HEAD
//1776A7//
=======
>>>>>>> 5d03e73ee4cd88e99e5272a3aaab08c6eac2a6a4
