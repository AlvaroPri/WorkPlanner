import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
<<<<<<< HEAD
//import Home from './pages/Home';//
import Login from './components/Login';
import Register from './components/Register';
=======
import Home from './pages/Home';
>>>>>>> 5d03e73ee4cd88e99e5272a3aaab08c6eac2a6a4

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
<<<<<<< HEAD
/* Theme variables */
import './theme/variables.css';
import ExploreContainer from './components/ExploreContainer';

setupIonicReact();
=======

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

>>>>>>> 5d03e73ee4cd88e99e5272a3aaab08c6eac2a6a4
const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
<<<<<<< HEAD
        <Route exact path="/login"> 
          <Login />
        </Route>
        <Route exact path="/register"> 
          <Register />
        </Route>
        <Route exact path="/explore">
          <ExploreContainer />
        </Route>
        <Route exact path="/">
          <Redirect to="/login" />
=======
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
>>>>>>> 5d03e73ee4cd88e99e5272a3aaab08c6eac2a6a4
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
