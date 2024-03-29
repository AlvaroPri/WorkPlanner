import React, { useState } from 'react';
import './Home.css';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon
} from '@ionic/react';

const Home: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>WorkPlanner</IonTitle>
          <IonButton slot="end" onClick={toggleMenu}>
            <IonIcon name={menuOpen ? 'close-circle' : 'menu'} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      </IonContent>
    </IonPage>
  );
};

export default Home;
