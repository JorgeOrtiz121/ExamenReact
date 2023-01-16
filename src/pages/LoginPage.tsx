import {IonInput,IonLabel, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList } from '@ionic/react';
import { Redirect } from 'react-router';
import { useAuth } from '../auth';
import { auth } from '../firebase';
import {useState} from 'react';

interface Props {
  onLogin: () => void;
}

const LoginPage: React.FC<Props> = ({ onLogin }) => {
  const { loggedIn } = useAuth();
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const credential = await auth.signInWithEmailAndPassword(email, password);
    console.log('credential:', credential);
    onLogin();
  };

  if (loggedIn) {
    return <Redirect to="/my/tab1" />;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inicio de Sesión</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonLabel position="stacked">Email</IonLabel>
          <IonInput type="email" value={email}
            onIonChange={(event) => setEmail(event.detail.value)}></IonInput>
        </IonList>
        <IonList>
          <IonLabel position="stacked">Contraseña</IonLabel>
          <IonInput type="password" value={password}
            onIonChange={(event) => setPassword(event.detail.value)}></IonInput>
        </IonList>
        <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
