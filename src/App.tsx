import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './components/Login';
import Register from './components/Register';
import Home from './pages/Home';
import ExploreContainer from './components/ExploreContainer';

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
/* Theme variables */
import './theme/variables.css';
import InProgress from './pages/InProgress';
import Complete from './pages/Complete';
import PendingTask from './pages/PendingTask';
import U_InProgress from './pages/U_InProgress';



setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/login"> 
          <Login />
        </Route>
        <Route exact path="/register"> 
          <Register />
        </Route>
        <Route exact path="/explore">
          <ExploreContainer />
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

        //Rutas para usuarios
        <Route exact path="/U_InProgress">
          <U_InProgress />
        </Route>

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
