import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import "./U_PendingTask.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import logo from "../img/Logo.png";
import { appsOutline } from 'ionicons/icons';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonIcon,
  IonCard,
  IonCardContent,
  IonTitle,
  IonImg,
  IonLabel,
  IonItem,
  IonList,
  IonButton,
} from "@ionic/react";

interface Activity {
  id: number;
  title: string;
  description: string;
}

const U_PendingTask: React.FC = () => {
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

  const Pending = () => {
    history.push("/PendingTask");
  };

  const Complete = () => {
    history.push("/Complete");
  };


  // Datos de ejemplo para las actividades completadas
  const completedActivities: Activity[] = [
    { id: 1, title: "Actividad Completada 1", description: "Descripción de la actividad completada 1" },
    { id: 2, title: "Actividad Completada 2", description: "Descripción de la actividad completada 2" },
    { id: 3, title: "Actividad Completada 3", description: "Descripción de la actividad completada 3" },
  ];

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
            <IonTitle className="projects-title">Pending Task</IonTitle>
          </div>
          
          <IonButton slot="end" onClick={toggleMenu }>
            <IonIcon icon={menuOpen ? "close-circle" : appsOutline} />
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
              <IonButton className="AtrasButtom" onClick={handleAtras}>Log Out</IonButton>
            </IonItem>
          </IonList>
        </div>

        <IonCard className="activities-card">
  <IonCardContent>
    {completedActivities.map((activity: Activity) => (
      <div key={activity.id} className="activity-item">
        {/* Envolver la imagen con IonButton y aplicar un estilo para eliminar fondo y borde */}
        <IonButton onClick={() => history.push("/Complete")} className="image-button">
  <IonImg src={logo} className="activity-icon" />
</IonButton>

        <div className="activity-content">
          <IonTitle>{activity.title}</IonTitle>
          <p>{activity.description}</p>
        </div>
      </div>
    ))}
  </IonCardContent>
</IonCard>



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

export default U_PendingTask;
