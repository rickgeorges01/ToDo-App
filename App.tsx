
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from "@react-navigation/native";
import List from "./app/screens/List";
import Details from "./app/screens/Details";
import Login from "./app/screens/Login";
import {useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth"
import firebase from "firebase/compat";
import User = firebase.User;
import {FIREBASE_AUTH} from "./firebaseConfig";

// Création de navigateurs de pile pour la navigation principale et interne.
const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

// Composant pour la navigation interne (écrans To-Do et Détails).
function InsideLayout () {
    return (
        <InsideStack.Navigator>
            <InsideStack.Screen name="My To-Do" component={List}/>
            <InsideStack.Screen name="Details" component={Details}/>
        </InsideStack.Navigator>
    );
}

// Composant principal de l'application.
export default function App() {
    // État pour l'utilisateur authentifié.
    const [user, setUser] = useState<User | null>(null);

    // S'abonner aux changements d'état d'authentification.
    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            //console.log('user', user);
            // Met à jour l'état de l'utilisateur.
            setUser(user);
        });
    }, []); // S'exécute une fois après le montage.

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="ToDo App">
                {/* Affiche InsideLayout si l'utilisateur est connecté, sinon Login. */}
                {user ?
                    <Stack.Screen name="Inside" component={InsideLayout} options={{headerShown:false}}/> :
                    <Stack.Screen name="ToDo App" component={Login} options={{headerShown:false}}/>
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}
