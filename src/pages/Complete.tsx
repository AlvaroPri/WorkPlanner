import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import "./Complete.css";
import "./compar.css"
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
  IonInput
} from "@ionic/react";
import supabase from "../components/SupabaseClient"; // Importar supabase desde el archivo SupabaseClient.js

interface Project {
  id: number;
  Title: string;
  description: string;
  id_proyect: number;
  assigment_employee: number;
}

const Complete: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | Date[] | null>(
    new Date()
  );
  const [completedProjects, setCompletedProjects] = useState<Project[]>([]);

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

  const Pending = () => {
    history.push("/PendingTask");
  };

  const Home = () => {
    history.push("/Home");
  };

  useEffect(() => {
    // Consultar proyectos completados desde la base de datos utilizando Supabase
    supabase
      .from<Project>("Proyects")
      .select("*")
      .eq("state", "Complete")
      .then(({ data, error }) => {
        if (error) {
          console.error("Error fetching completed projects:", error.message);
        } else {
          setCompletedProjects(data || []);
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
            <IonTitle className="projects-title">COMPLETE</IonTitle>
          </div>
          
          <IonButton slot="end" onClick={toggleMenu }>
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
              <IonLabel onClick={Pending}>Pending Task</IonLabel>
            </IonItem>
            <IonItem className="menu-item">
              <IonLabel onClick={Home}>Home</IonLabel>
            </IonItem>
            <IonItem className="menu-item">
              <IonButton expand="full" onClick={handleAtras}>Log Out</IonButton>
            </IonItem>
          </IonList>
        </div>

        {/* Lista de proyectos completados */}
        <div className="parent-container">  
        <IonCard className="activities-card">
          <IonCardContent>
            {completedProjects.map((project: Project) => (
              <div key={project.id_proyect} className="activity-item">
                <IonImg src={logo} className="activity-icon" />
                <div className="activity-content">
                  <IonTitle>{project.Title}</IonTitle>
                  <p>{project.description}</p>
                  <p>Tarea Completada por: {project.assigment_employee}</p>
                </div>
              </div>
            ))}
          </IonCardContent>
        </IonCard>
            </div>
        {/* Calendario */}
        <div className="calendar-container">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate as Date | Date[] | null}
          />
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Complete;
