import React, { useState } from 'react';
import './Home.css';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonTitle,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/react';
import { apps } from 'ionicons/icons'; // Importa el icono de Ionic
import 'react-datepicker/dist/react-datepicker.css'; // Estilos de react-datepicker
import Calendar from 'react-calendar';

const Home: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date()); // Estado para la fecha del calendario

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>WorkPlanner</IonTitle>
          <IonTitle slot="start" className="header-title">Projects</IonTitle>
          <IonButton slot="end" onClick={toggleMenu}>
            <IonIcon name={menuOpen ? 'close-circle' : 'menu'} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className={`menu ${menuOpen ? 'open' : ''}`}>
          <IonList className="menu-list">
            <IonItem className="menu-item">
              <IonLabel>In Progress</IonLabel>
            </IonItem>
            <IonItem className="menu-item">
              <IonLabel>Complete</IonLabel>
            </IonItem>
            <IonItem className="menu-item">
              <IonLabel>Pending Task</IonLabel>
            </IonItem>
            <IonItem className="menu-item">
              <IonLabel>Log Out</IonLabel>
            </IonItem>
          </IonList>
        </div>
        {/* Contenido principal aquí */}
        <IonCard className="card">
          <IonCardHeader>
            <IonTitle>Card 1</IonTitle>
          </IonCardHeader>
          <IonCardContent>
            Content of Card 1
          </IonCardContent>
        </IonCard>
        <IonCard className="card">
          <IonCardHeader>
            <IonTitle>Card 2</IonTitle>
          </IonCardHeader>
          <IonCardContent>
            Content of Card 2
          </IonCardContent>
        </IonCard>
        <IonCard className="card">
          <IonCardHeader>
            <IonTitle>Card 3</IonTitle>
          </IonCardHeader>
          <IonCardContent>
            Content of Card 3
          </IonCardContent>
        </IonCard>
        <Calendar className="calendar" />
        <IonButton expand="block" className="bottom-button">
          Bottom Button
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
