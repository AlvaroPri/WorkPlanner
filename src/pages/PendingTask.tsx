import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import logo from "../img/logoN.png";
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
import supabase from "../components/SupabaseClient"; // Importar supabase desde el archivo SupabaseClient.js

interface Project {
  id: number;
  Title: string;
  description: string;
  id_proyect: number;
  assigment_employee: number;
}

const PendingTask: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | Date[] | null>(
    new Date()
  );
  const [pendingTasks, setPendingTasks] = useState<Project[]>([]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleDateChange = (value: Date | Date[] | null) => {
    setSelectedDate(value);
  };

  const history = useHistory<any>();
  const handleAtras = () => {
    window.location.href = "/login";
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

  const Home = () => {
    history.push("/Home");
  };
  const handleInProgress = (id_proyect: number) => {
    // Enviar solicitud para marcar el proyecto como InProgress en la base de datos
    supabase
      .from<Project>("Proyects")
      .update({ state: "InProgress" })
      .eq("id_proyect", id_proyect)
      .then(({ error }) => {
        if (error) {
          console.error("Error updating project state:", error.message);
        } else {
          // Actualizar el estado local después de completar con éxito la actualización en la base de datos
          const updatedProjects = pendingTasks.map(project =>
            project.id_proyect === id_proyect ? { ...project, state: "InProgress" } : project
          );
          setPendingTasks(updatedProjects);
        }
      });
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
      <IonHeader className="header">
        <IonToolbar className="encabezado">
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
              <IonLabel onClick={Home}>Home</IonLabel>
            </IonItem>
            <IonItem className="menu-item">
              <IonButton className="AtrasButtom" onClick={handleAtras}>Log Out</IonButton>
            </IonItem>
          </IonList>
        </div>

        <div className="container-PendigTask">  
        <IonCard className="activities-card">
          <IonCardContent className="Card_PendingTask">
            {pendingTasks.map((project: Project) => (
              <div key={project.id} className="activity-item">
            <IonButton  className="Button"onClick={() => handleInProgress(project.id_proyect)}>✅</IonButton>
                <div className="activity-content">
                  <IonTitle>{project.Title}</IonTitle>
                  <p>{project.description}</p>

                </div>
              </div>
            ))}
          </IonCardContent>
        </IonCard>
            </div>

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

export default PendingTask;