import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import "./Complete.css";
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
  IonInput
} from "@ionic/react";

interface Activity {
  id: number;
  title: string;
  description: string;
}

const Complete: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | Date[] | null>(
    new Date()
  );
  const [showInputFields, setShowInputFields] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completedActivities, setCompletedActivities] = useState<Activity[]>([
    { id: 1, title: "Actividad Completada 1", description: "Descripción de la actividad completada 1" },
    { id: 2, title: "Actividad Completada 2", description: "Descripción de la actividad completada 2" },
    { id: 3, title: "Actividad Completada 3", description: "Descripción de la actividad completada 3" },
  ]);

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

  const handleAddTask = () => {
    setShowInputFields(true);
  };

  const saveTask = () => {
    const newTask: Activity = {
      id: completedActivities.length + 1,
      title: title,
      description: description
    };
    setCompletedActivities([...completedActivities, newTask]);
    setShowInputFields(false);
    setTitle("");
    setDescription("");
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
            <IonTitle className="projects-title">Complete</IonTitle>
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
              <IonLabel onClick={Pending}>Pending Task</IonLabel>
            </IonItem>
            <IonItem className="menu-item">
              <IonButton onClick={handleAtras}>Log Out</IonButton>
            </IonItem>
          </IonList>
        </div>

        <IonCard className="activities-card">
          <IonCardContent>
            {completedActivities.map((activity: Activity) => (
              <div key={activity.id} className="activity-item">
                <IonImg src={logo} className="activity-icon" />
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
            <IonButton shape="round" className="bottom-button" onClick={handleAddTask}>
              +
            </IonButton>
          </div>
        </div>

        {showInputFields &&
          <div>
            <IonItem>
              <IonLabel position="floating">Título</IonLabel>
              <IonInput value={title} onIonChange={(e) => setTitle(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Descripción</IonLabel>
              <IonInput value={description} onIonChange={(e) => setDescription(e.detail.value!)}></IonInput>
            </IonItem>
            <IonButton onClick={saveTask}>Guardar</IonButton>
          </div>
        }

      </IonContent>
    </IonPage>
  );
};

export default Complete;
