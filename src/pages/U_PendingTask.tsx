import React, { useState, useEffect } from "react";
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
  IonAlert
} from "@ionic/react";
import supabase from "../components/SupabaseClient"; // Importar supabase desde el archivo SupabaseClient.js

interface Project {
  id: number;
  Title: string;
  description: string;
  id_proyect: number;
  assigment_employee: number;
}

const U_PendingTask: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | Date[] | null>(
    new Date()
  );
  const [pendingTasks, setPendingTasks] = useState<Project[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Project | null>(null);
  const [showAlert, setShowAlert] = useState(false); // Estado para controlar la visibilidad de la alerta

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
    history.push("/U_InProgress");
  };

  const Pending = () => {
    history.push("/U_PendingTask");
  };

  const Complete = () => {
    history.push("/U_Complete");
  };

  useEffect(() => {
    // Consultar tareas pendientes desde la base de datos utilizando Supabase
    supabase
      .from<Project>("Proyects") // Asegúrate de que la tabla se llame "Proyects"
      .select("*")
      .eq("state", "PendingTask") // Ajusta según la columna que indica el estado de la tarea
      .then(({ data, error }) => {
        if (error) {
          console.error("Error fetching pending tasks:", error.message);
        } else {
          setPendingTasks(data || []);
        }
      });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="logo-title-container">
            <IonImg src={logo} className="logo" />
            <IonTitle className="header-title">WorkPlanner</IonTitle>
          </div>

          <div className="projects-title-container">
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
            {pendingTasks.map((activity: Project) => (
              <div key={activity.id} className="activity-item">
                <IonButton onClick={() => history.push("/Complete")} className="image-button">
                  <IonImg src={logo} className="activity-icon" />
                </IonButton>
                <div className="activity-content">
                  <IonTitle onClick={() => {
                    setSelectedActivity(activity);
                    setShowAlert(true);
                  }}>
                    {activity.Title}
                  </IonTitle>
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
      </IonContent>

      {/* Alerta emergente */}
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={selectedActivity ? selectedActivity.Title : ""}
        message={selectedActivity ? selectedActivity.description : ""}
        buttons={['OK']}
      />
    </IonPage>
  );
};

export default U_PendingTask;
