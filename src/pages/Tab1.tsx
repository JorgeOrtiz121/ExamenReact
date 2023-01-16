import React, {useState} from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonInput,
    useIonViewWillEnter,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonList,
    IonButton,
    IonItem,
    IonIcon,
    IonToast,
    IonImg
} from '@ionic/react';
import { addOutline, trashBinOutline, pencil, barbellOutline, checkmarkDoneCircle } from 'ionicons/icons';
import {firebaseConfig} from '../database/config'
import firebase from 'firebase/app'; // npm i firebase
import './Tab1.css';
import 'firebase/firebase-firestore';
import {deportista} from '../modelo/deportista'

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Tab1: React.FC = () => {

    const [listaDeportista, setListaDeportista] = useState < deportista[] > ([]); 
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [titulos, setTitulos] = useState('');
    const[deporte,setDeporte]=useState('');
    const[modalidad,setModalidad]=useState('');
    const[edad,setEdad]=useState('');
    const [mensaje, setMensaje] = useState(false);
    const [bandera, setBandera] = useState(true);
    const listar = async () => {
        try {
            let lista: deportista[] = []
            const res = await firebase.firestore().collection('equipo').get();
            res.forEach((doc) => {
                let obj = {
                    id: doc.id,
                    nombre: doc.data().nombre,
                    titulos: doc.data().titulos,
                    edad:doc.data().edad,
                    deporte:doc.data().deporte,
                    modalidad:doc.data().modalidad
                };
                lista.push(obj)
    
            });
            setListaDeportista(lista)
        } catch (error) {}
    }

    const crear = async () => {
        try {
            if(bandera){
                await firebase.firestore().collection('equipo').add(
                    {nombre, titulos,deporte,modalidad,edad});
                   
            }else{
                await firebase.firestore().collection('equipo').doc(id).set(
                    {nombre, titulos,deporte,modalidad,edad});
                    setBandera(true);
            }
             
        } catch (error) {}
        setId('');
        setNombre('');
        setTitulos('');
        setDeporte('');
        setModalidad('');
        setEdad('');
        setMensaje(true);
        listar();  
    }


    const eliminar = async(id:string) =>{
        try {
            console.log(id)
            await firebase.firestore().collection('equipo').doc(id).delete();
            listar();  
        } catch (error) {}       
    }

    const editar = (id:string,nombre:string,titulo:string,deporte:string,modalidad:string,edad:string) => {
      setId(id);
      setNombre(nombre);
      setTitulos(titulo);
      setDeporte(deporte);
      setModalidad(modalidad);
      setEdad(edad);
      setBandera(false);
  } 

    useIonViewWillEnter(() => {
        listar();
    })
//estilos
const estiloTema={
color:'black'
}
const estiloImagen={
    innerHeight:50,
    innerWidth:50

}

  
    return (
        
        <IonPage>

        <IonToast
           isOpen={mensaje}
           onDidDismiss={() => setMensaje(false)}
           message="Deportista Guardado en el Sistema"
           duration={50}
          />
            <IonHeader>
           
                
                <IonToolbar color="secondary">
                

                    <IonTitle style={estiloTema} >
                    <IonIcon icon={barbellOutline}></IonIcon>
                          ---REGISTRO DE DATOS PERSONALES DE LA FEKB
                         
                    </IonTitle>
                
                </IonToolbar>

            </IonHeader> 
            <IonImg style={estiloImagen} src='https://img2.freepng.es/20180920/pbv/kisspng-world-kickboxing-association-muay-thai-wka-queensl-modified-muay-thai-wka-north-queensland-regional-t-5ba3fe601fead4.5600484215374741441307.jpg'></IonImg>
            <IonContent>

                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Deportista</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonCard>
                    <IonItem>
                        <IonInput value={nombre}
                            placeholder="Nombre del Deportista"
                            onIonChange={ e => setNombre(e.detail.value!) }
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonInput value={titulos}
                            placeholder="Apellido del Deportista"
                            onIonChange={ e => setTitulos(e.detail.value!) }
                        ></IonInput>
                    </IonItem>
                   
                    <IonItem>
                        <IonInput value={deporte}
                            placeholder="Tipo de Deporte que Practicas"
                            onIonChange={ e => setDeporte(e.detail.value!) }
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonInput value={modalidad}
                            placeholder="Modalidad que practica"
                            onIonChange={ e => setModalidad(e.detail.value!) }
                        ></IonInput>
                        
                    </IonItem>
                    <IonItem>
                        <IonInput value={edad}
                            placeholder="Edad del Deportista"
                            onIonChange={ e => setEdad(e.detail.value!) }
                        ></IonInput>
                    </IonItem>
                <IonButton color="light" expand="block"
                    onClick={() => crear() }>
                        <IonIcon icon={checkmarkDoneCircle}>
                        </IonIcon>{bandera?'Deportista':'Editar'}</IonButton>
                </IonCard>
                <IonList> {
                    listaDeportista.map(deportista => (
                        <IonCard key={deportista.id} >
                            <IonCardHeader>
                                <IonCardTitle>Nombre:{
                                    deportista.nombre
                                }</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonCardContent>
                                Apellido: {deportista.titulos}
                                </IonCardContent>
                              
                                <IonCardContent>
                                Deporte: {deportista.deporte}

                                </IonCardContent>
                                <IonCardContent>
                                Modalidad: {deportista.modalidad}

                                </IonCardContent>
                                <IonCardContent>
                                Edad: {deportista.edad}

                                </IonCardContent>
                                
                                <IonButton color="danger" expand="block"
                               onClick={() => eliminar(''+deportista.id)}>
                             <IonIcon icon={trashBinOutline}></IonIcon>
                               Eliminar Deportista</IonButton>  
                        <IonButton color="success" expand="block"
                         onClick={
                    () => editar(''+deportista.id,''+deportista.nombre,''+deportista.titulos,''+deportista.deporte,''+deportista.modalidad,''+deportista.edad)}>
                             <IonIcon icon={pencil}></IonIcon>Editar Informacion del Deportista</IonButton>   
                            </IonCardContent>
                             
                        </IonCard>
                    )) }
                 </IonList>
            </IonContent>
        </IonPage>
    );
};
export default Tab1;
