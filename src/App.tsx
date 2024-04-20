import React from 'react';
import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Componentes y páginas */
import Login from './components/Login';
import Register from './components/Register';
import Home from './pages/Home';
import ExploreContainer from './components/ExploreContainer';
import './theme/variables.css';
import InProgress from './pages/InProgress';
import Complete from './pages/Complete';
import PendingTask from './pages/PendingTask';

/*paginas de usuarios*/
import U_InProgress from './pages/U_InProgress';
import U_Complete from './pages/U_complete';
import U_PendingTask from './pages/U_PendingTask';
import U_Home from './pages/U_Home';

/* Configuración de Ionic React */
setupIonicReact();

const App: React.FC = () => (
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


        {/* Rutas para usuario */}
        <Route exact path="/U_InProgress">
          <U_InProgress />
        </Route>

        <Route exact path="/U_PendingTask">
          <U_PendingTask />
        </Route>

        <Route exact path="/U_Complete">
          <U_Complete />
        </Route>

        <Route exact path="/U_Home">
          <U_Home />
        </Route>


      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
