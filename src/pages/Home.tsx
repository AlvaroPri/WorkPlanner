import './Home.css';
import Login from '../components/Login';
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

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>WorkPlanner</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank0</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Login />
        <IonHeader>
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Agrega el formulario de inicio de sesión */}
        <Example />

        {/* Agrega el componente de exploración */}
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
