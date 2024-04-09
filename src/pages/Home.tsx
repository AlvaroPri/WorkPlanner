import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import "./Home.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import logo from "../img/Logo.png";
import { IonButton, IonIcon, IonInput } from '@ionic/react';
import { appsOutline } from 'ionicons/icons';

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
  id: number;
  title: string;
  description: string;
  assignee: string;
}

const Home: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | Date[] | null>(
    new Date()
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [activities, setActivities] = useState<Activity[]>([]);
  
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

  const handleAddActivity = () => {
    const newActivity: Activity = {
      id: activities.length + 1,
      title: title,
      description: description,
      assignee: assignee
    };
    setActivities([...activities, newActivity]);
    setTitle("");
    setDescription("");
    setAssignee("");
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
            <IonCard key={activity.id} className="card">
              <IonCardHeader>
                <IonTitle>{activity.title}</IonTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>{activity.description}</p>
                <p>Assignee: {activity.assignee}</p>
              </IonCardContent>
            </IonCard>
          ))}
        </div>

        {/* Formulario para añadir actividad */}
        <IonCard className="add-activity-card">
          <IonCardContent>
            <IonItem>
              <IonLabel position="floating">Title</IonLabel>
              <IonInput value={title} onIonChange={(e) => setTitle(e.detail.value!)} />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Description</IonLabel>
              <IonInput value={description} onIonChange={(e) => setDescription(e.detail.value!)} />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Assignee</IonLabel>
              <IonInput value={assignee} onIonChange={(e) => setAssignee(e.detail.value!)} />
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
