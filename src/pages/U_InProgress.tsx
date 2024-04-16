import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import "./InProgress.css";
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
import supabase from "../components/SupabaseClient"; // Importar supabase desde el archivo SupabaseClient.js

interface Project {
  id: number;
  Title: string;
  description: string;
  id_proyect: number;
  assigment_employee: number;
  state: string;
}

const U_InProgress: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectsInProgress, setProjectsInProgress] = useState<Project[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | Date[] | null>(new Date());

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

  const handleComplete = (id_proyect: number) => {
    // Enviar solicitud para marcar el proyecto como completo en la base de datos
    supabase
      .from<Project>("Proyects")
      .update({ state: "Complete" })
      .eq("id_proyect", id_proyect)
      .then(({ error }) => {
        if (error) {
          console.error("Error updating project state:", error.message);
        } else {
          // Actualizar el estado local después de completar con éxito la actualización en la base de datos
          const updatedProjects = projectsInProgress.map(project =>
            project.id_proyect === id_proyect ? { ...project, state: "Complete" } : project
          );
          setProjectsInProgress(updatedProjects);
        }
      });
  };

  useEffect(() => {
    // Consultar proyectos en progreso desde la base de datos utilizando Supabase
    supabase
      .from<Project>("Proyects")
      .select("*")
      .eq("state", "InProgress")
      .then(({ data, error }) => {
        if (error) {
          console.error("Error fetching projects:", error.message);
        } else {
          setProjectsInProgress(data || []);
        }
      });
  }, []);

  return (
    <IonPage>
      {/* Encabezado */}
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
            <IonTitle className="projects-title">In Progress</IonTitle>
          </div>
          
          <IonButton slot="end" onClick={toggleMenu}>
            <IonIcon icon={menuOpen ? "close-circle" : appsOutline} />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* Menú lateral */}
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

        {/* Lista de proyectos en progreso */}
        <IonCard className="activities-card">
          <IonCardContent>
            {projectsInProgress.map((project: Project) => (
              <div key={project.id_proyect} className="activity-item">
                <IonImg src={logo} className="activity-icon" />
                <div className="activity-content">
                  <IonTitle>{project.Title}</IonTitle>
                  <p>{project.description}</p>
                  <p>Tarea asignada a: {project.assigment_employee}</p>
                  <IonButton onClick={() => handleComplete(project.id_proyect)}>Marcar como completo</IonButton>
                </div>
              </div>
            ))}
          </IonCardContent>
        </IonCard>

        {/* Calendario */}
        <div className="calendar-container">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate as Date | Date[] | null}
          />
        </div>
        
        {/* Botón flotante */}
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

export default U_InProgress;
