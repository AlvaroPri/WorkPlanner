import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import "./Home.css";
import "react-datepicker/dist/react-datepicker.css"; // Estilos de react-datepicker
import "react-calendar/dist/Calendar.css"; // Estilos de react-calendar
import Calendar from "react-calendar"; // Importa react-calendar
import logo from "../img/Logo.png";
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
import Complete from "./Complete";


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
  const history = useHistory<any>();
  const handleAtras = () => {
    history.push("/login");
  };

  const Progress = () => {
    history.push("/InProgress");
  };
  const Complete = () => {
    history.push("/Complete");
  };
  const Pending = () => {
    history.push("/PendingTask");
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
              <IonLabel onClick={Progress}>In Progress</IonLabel>
            </IonItem>
            <IonItem className="menu-item">
              <IonLabel onClick={Complete}>Complete</IonLabel>
            </IonItem>
            <IonItem className="menu-item">
              <IonLabel onClick={Pending}>Pending Task</IonLabel>
            </IonItem>
            <IonItem className="menu-item">
              <IonButton className="AtrasButtom" onClick={handleAtras}>Atras</IonButton>
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
