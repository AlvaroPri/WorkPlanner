import React, { useState } from "react";
import "./Home.css";
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
  IonLabel,
  IonImg,
} from "@ionic/react";
import { apps } from "ionicons/icons"; // Importa el icono de Ionic
import "react-datepicker/dist/react-datepicker.css"; // Estilos de react-datepicker
import "react-calendar/dist/Calendar.css"; // Estilos de react-calendar
import Calendar from "react-calendar"; // Importa react-calendar
import logo from "../img/Logo.png";
const Home: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | Date[] | null>(
    new Date()
  );

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleDateChange = (value: Date | Date[] | null) => {
    setSelectedDate(value);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            {/* Contenedor del logo y "WorkPlanner" */}
          <div className="logo-title-container">
            {/* Logo */}
            <IonImg src={logo} className="logo" />

            {/* Título "WorkPlanner" */}
            <IonTitle className="header-title">WorkPlanner</IonTitle>
          </div>

          {/* Contenedor del título "Projects" */}
          <div className="projects-title-container">
            {/* Título "Projects" */}
            <IonTitle className="projects-title">Projects</IonTitle>
          </div>
          <IonButton slot="end" onClick={toggleMenu}>
            <IonIcon name={menuOpen ? "close-circle" : "menu"} />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className={`menu ${menuOpen ? "open" : ""}`}>
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

        {/*Tarjetas de actividades */}
        <IonCard className="card">
          <IonCardHeader>
            <IonTitle>Card 1</IonTitle>
          </IonCardHeader>
          <IonCardContent>Content of Card 1</IonCardContent>
        </IonCard>
        <IonCard className="card">
          <IonCardHeader>
            <IonTitle>Card 2</IonTitle>
          </IonCardHeader>
          <IonCardContent>Content of Card 2</IonCardContent>
        </IonCard>
        <IonCard className="card">
          <IonCardHeader>
            <IonTitle>Card 3</IonTitle>
          </IonCardHeader>
          <IonCardContent>Content of Card 3</IonCardContent>
        </IonCard>

        {/* Calendario */}
        <div className="calendar-container">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate as Date | Date[] | null}
          />
        </div>

        <div className="centered-button-container">
          <div className="centered-button">
            <IonButton shape="round" className="bottom-button">
              +
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
