import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square,footballOutline, barbell, barbellOutline } from 'ionicons/icons';
import { AuthContext } from './auth';
import LoginPage from './pages/LoginPage';
import AppTabs from './AppTabs';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

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


const App: React.FC = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  console.log(`renderizando con estado: ${loggedIn}` );
  
  return(
  <IonApp>

    <AuthContext.Provider value = {{loggedIn}}>
    <IonReactRouter>
      
   
      <IonRouterOutlet>
        <Route>
          
            <LoginPage  onLogin={()=>setLoggedIn(true)}/>
          
        </Route>


      <Route path="/my">
        <AppTabs/>
      </Route>
      <Route path="/" render={() => <Redirect to="/my/tab1" />} exact={true} />
      
      

      </IonRouterOutlet>

    </IonReactRouter>
    </AuthContext.Provider>
  </IonApp>
);
  }

export default App;
