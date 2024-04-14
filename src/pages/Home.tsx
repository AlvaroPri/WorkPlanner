import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import "./Home.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import logo from "../img/Logo.png";
import { IonButton, IonIcon, IonInput } from '@ionic/react';
import { appsOutline } from 'ionicons/icons';
import supabase from "../components/SupabaseClient"; // Importar supabase desde el archivo SupabaseClient.js

import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonImg,
} from "@ionic/react";

interface Activity {
  id_proyect: number;
  state: string;
  id_admin: string;
  description: string;
  assigment_employee: string;
  Title: string;
}

const Home: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | Date[] | null>(
    new Date()
  );
  const [Title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assigment_employee, setAssignee] = useState("");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [id_admin, setIdAdmin] = useState(""); // Nuevo estado para el id_admin
  
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

  const handleAddActivity = async () => {
    const newActivity: Activity = {
      id_proyect: 4,
      Title: Title,
      description: description,
      assigment_employee: assigment_employee,
      id_admin: id_admin, // Asignar el id_admin introducido por el usuario
      state: "PendingTask" // Establecer el estado por defecto
    };

    try {
      const { data, error } = await supabase
        .from('Proyects')
        .insert([newActivity])
        .select();
      
      if (error) {
        console.error("Error adding activity to database:", error.message);
      } else {
        console.log("Activity added successfully:", data);
        setActivities([...activities, newActivity]);
        setTitle("");
        setDescription("");
        setAssignee("");
        setIdAdmin(""); // Limpiar el id_admin después de la inserción
      }
    } catch (error) {
      console.error("Error adding activity to database:", error.message);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="logo-title-container">
            <IonImg src={logo} className="logo" />
            <IonTitle className="header-title">WorkPlanner</IonTitle>
          </div>
          <div className="projects-title-container">
            <IonTitle className="projects-title">Projects</IonTitle>
          </div>
          <IonButton slot="end" onClick={toggleMenu}>
            <IonIcon icon={menuOpen ? "close-circle" : appsOutline} />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className={`menu ${menuOpen ? "open" : ""}`}>
          <IonList className="menu-list">
            <IonItem className="menu-item" onClick={Progress}>
              <IonLabel>In Progress</IonLabel>
            </IonItem>
            <IonItem className="menu-item" onClick={Complete}>
              <IonLabel>Complete</IonLabel>
            </IonItem>
            <IonItem className="menu-item" onClick={Pending}>
              <IonLabel>Pending Task</IonLabel>
            </IonItem>
            <IonItem className="menu-item" onClick={handleAtras}>
              <IonLabel>Log Out</IonLabel>
            </IonItem>
          </IonList>
        </div>

        {/* Tarjetas de actividades */}
        <div className="card-container">
          {activities.map((activity: Activity) => (
            <IonCard key={activity.id_proyect} className="card">
              <IonCardHeader>
                <IonTitle>{activity.Title}</IonTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>{activity.description}</p>
                <p>Assignee: {activity.assigment_employee}</p>
              </IonCardContent>
            </IonCard>
          ))}
        </div>

        {/* Formulario para añadir actividad */}
        <IonCard className="add-activity-card">
          <IonCardContent>
            <IonItem>
              <IonLabel position="floating">Title</IonLabel>
              <IonInput value={Title} onIonChange={(e) => setTitle(e.detail.value!)} />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Description</IonLabel>
              <IonInput value={description} onIonChange={(e) => setDescription(e.detail.value!)} />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Assignee</IonLabel>
              <IonInput value={assigment_employee} onIonChange={(e) => setAssignee(e.detail.value!)} />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Admin ID</IonLabel>
              <IonInput value={id_admin} onIonChange={(e) => setIdAdmin(e.detail.value!)} />
            </IonItem>
          </IonCardContent>
          <div className="centered-button-container">
            <div className="centered-button">
              <IonButton shape="round" className="bottom-button" onClick={handleAddActivity}>
                +
              </IonButton>
            </div>
          </div>
        </IonCard>

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

export default Home;
