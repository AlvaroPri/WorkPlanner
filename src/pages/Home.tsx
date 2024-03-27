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
