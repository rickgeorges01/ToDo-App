import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Image,KeyboardAvoidingView } from 'react-native';
import { signInWithEmailAndPassword,createUserWithEmailAndPassword} from 'firebase/auth'
import Logo from "../../assets/logo/logo1.png";
import {FIREBASE_AUTH} from "../../firebaseConfig";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    // Fonctions pour gérer la connexion et l'inscription
    const signIn = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth,email, password);
            console.log('Utilisateur authentifié avec succès',response);
            alert('Bienvenue sur votre nouvelle application !');
        } catch (error:any) {
            console.log(error);
            alert('Authentification échoué, veuillez réssayer'+error.message);
        }finally {
            setLoading(false);
        }

    };
    const signUp = async () => {
        setLoading(true)
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            console.log('Utilisateur enregistré avec succès',user);
            alert('Bon retour parmi nous !');
        }catch (error:any) {
            console.log(error);
            alert('Inscription échoué veuillez ressayer'+ error.message );
        }finally{
            setLoading(false);
        }

    };

    // Interface de la page de connexion
    return (
        <View style={styles.container}>

                <Image source={Logo} style={styles.logo} />
                <Text style={styles.header}>Be productive with your ToDo App</Text>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="E-Mail"
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        value={email}
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        onChangeText={setPassword}
                        autoCapitalize="none"
                        value={password}
                        secureTextEntry={true}
                    />

                    <TouchableOpacity style={styles.button} onPress={signIn}>
                        <Text style={styles.buttonText}>Create an account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={signUp}>
                        <Text style={styles.buttonText}>Log In</Text>
                    </TouchableOpacity>
                </View>

        </View>
    );
};

export default Login;

// Styles pour la page de connexion
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#ffffff', // Couleur de fond neutre
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333', // Couleur de texte foncée pour le contraste
    },
    logo: {
        width: 250, // Largeur souhaitée
        height: 250, // Hauteur souhaitée
        marginBottom: 40, // Espace sous le logo
    },
    form: {
        width: '80%',
        padding: 20,
        backgroundColor: '#ffffff', // Fond blanc pour le formulaire
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        height: 50,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#b0c4de', // Bordure discrète pour les champs de texte
        marginBottom: 20,
        fontSize: 16,
        padding: 10,
    },
    button: {
        backgroundColor: '#708090', // Couleur de bouton primaire
        padding: 15,
        borderRadius: 4,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#ffffff', // Texte blanc pour une bonne visibilité sur les boutons
        fontSize: 16,
        fontWeight: 'bold',
    }
});
