import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Componentes y páginas */
import Login from './components/Login';
import Register from './components/Register';
import Home from './pages/Home';
import './theme/variables.css';
import InProgress from './pages/InProgress';
import Complete from './pages/Complete';
import PendingTask from './pages/PendingTask';

/* Páginas de usuarios */
import U_InProgress from './pages/U_InProgress';
import U_Complete from './pages/U_Complete';
import U_PendingTask from './pages/U_PendingTask';
import U_Home from './pages/U_Home';

/* Configuración de Ionic React */
setupIonicReact();

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false); // Estado para verificar si el usuario es un administrador

  // Lógica para verificar si el usuario es un administrador (puedes implementar tu lógica de autenticación aquí)
  useEffect(() => {
    // Ejemplo de lógica de autenticación simulada (puedes reemplazarla con tu propia lógica)
    const userIsAdmin = true; // Aquí deberías verificar si el usuario actual es un administrador
    setIsAdmin(userIsAdmin);
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/"> 
            <Login />
          </Route>
          <Route exact path="/login"> 
            <Login />
          </Route>
          <Route exact path="/register"> 
            <Register />
          </Route>
          {/* Rutas para usuarios admin */}
          {isAdmin ? (
            <>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/PendingTask">
                <PendingTask />
              </Route>
              <Route exact path="/InProgress"> 
                <InProgress />
              </Route>
              <Route exact path="/Complete"> 
                <Complete />
              </Route>
            </>
          ) : (
            <>
              <Route exact path="/u_home">
                <U_Home />
              </Route>
              <Route exact path="/u_PendingTask">
                <U_PendingTask />
              </Route>
              <Route exact path="/u_InProgress"> 
                <U_InProgress />
              </Route>
              <Route exact path="/u_Complete"> 
                <U_Complete />
              </Route>
            </>
          )}
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
