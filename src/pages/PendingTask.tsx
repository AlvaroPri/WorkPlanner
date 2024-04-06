import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import "./PendingTask.css"; 
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import logo from "../img/Logo.png";
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
} from "@ionic/react";

// Definimos una interfaz para la estructura de las tareas pendientes
interface Task {
  id: number;
  title: string;
  description: string;
}

const PendingTask: React.FC = () => {
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

  // Datos de ejemplo para las tareas pendientes
  const pendingTasks: Task[] = [
    { id: 1, title: "Tarea Pendiente 1", description: "Descripción de la tarea pendiente 1" },
    { id: 2, title: "Tarea Pendiente 2", description: "Descripción de la tarea pendiente 2" },
    { id: 3, title: "Tarea Pendiente 3", description: "Descripción de la tarea pendiente 3" },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="logo-title-container">
            <IonImg src={logo} className="logo" />
            <IonTitle className="header-title">WorkPlanner</IonTitle>
          </div>
          <div className="projects-title-container">
            <IonTitle className="projects-title">Pending Tasks</IonTitle>
          </div>
          <IonIcon icon={menuOpen ? "close-circle" : "menu"} onClick={toggleMenu} slot="end" />
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className={`menu ${menuOpen ? "open" : ""}`}>
          <IonCard>
            <IonCardContent>
              <IonTitle>In Progress</IonTitle>
              <IonTitle>Complete</IonTitle>
              <IonTitle>SAPO</IonTitle>
              <IonIcon icon="arrow-back" onClick={handleAtras} />
            </IonCardContent>
          </IonCard>
        </div>

        <IonCard className="tasks-card">
          <IonCardContent>
            {pendingTasks.map((task: Task) => (
              <div key={task.id} className="task-item">
                <IonIcon icon="alert-circle" className="task-icon" />
                <div className="task-content">
                  <IonTitle>{task.title}</IonTitle>
                  <p>{task.description}</p>
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
            <IonIcon icon="add-circle" className="bottom-icon" />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PendingTask;
