// Importations nécessaires
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Button, Text, FlatList, TouchableOpacity,Image } from 'react-native';
import { FIREBASE_DB } from "../../firebaseConfig";
import { addDoc, collection, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Entypo } from "@expo/vector-icons/";
import Logo from "../../assets/logo/logo1.png";
import {FIREBASE_AUTH} from "./firebaseConfig";

// Définition de l'interface pour une tâche (Todo)
export interface Todo {
    title: string;
    done: boolean;
    id: string;
}

const List = ({ navigation }: any) => {
    // États pour stocker les tâches et la nouvelle tâche à ajouter
    const [todos, setTodos] = useState<Todo[]>([]);
    const [todo, setTodo] = useState('');

    // États pour la modification d'une tâche
    const [editingId, setEditingId] = useState(null);
    const [newTitle, setNewTitle] = useState('');

    // Souscription aux mises à jour de Firestore
    useEffect(() => {
        const todoRef = collection(FIREBASE_DB, 'to_dos');
        const subscriber = onSnapshot(todoRef, (snapshot) => {
            const fetchedTodos: Todo[] = [];
            snapshot.docs.forEach((doc) => {
                fetchedTodos.push({ id: doc.id, ...doc.data() } as Todo);
            });
            setTodos(fetchedTodos);
        });
        return () => subscriber();
    }, []);

    // Ajout d'une nouvelle tâche
    const addTodo = async () => {
        await addDoc(collection(FIREBASE_DB, 'to_dos'), { title: todo, done: false });
        setTodo('');
    };

    // Basculer l'état de 'done' pour une tâche
    const toggleDone = async (item: Todo) => {
        const ref = doc(FIREBASE_DB, `to_dos/${item.id}`);
        await updateDoc(ref, { done: !item.done });
    };

    // Supprimer une tâche
    const deleteItem = async (item: Todo) => {
        const ref = doc(FIREBASE_DB, `to_dos/${item.id}`);
        await deleteDoc(ref);
    };

    // Commencer la modification d'une tâche
    const startEditing = (item: Todo) => {
        setEditingId(item.id);
        setNewTitle(item.title);
    };

    // Appliquer les modifications d'une tâche
    const applyEdit = async () => {
        if (editingId) {
            const ref = doc(FIREBASE_DB, `to_dos/${editingId}`);
            await updateDoc(ref, { title: newTitle });
            setEditingId(null);
            setNewTitle('');
        }
    };

    // Rendu d'une tâche
    const renderTodo = ({ item }: { item: Todo }) => {
        return (
            <View style={styles.todoContainer}>
                {editingId === item.id ? (
                    <View style={styles.editContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setNewTitle}
                            value={newTitle}
                        />
                        <Button title="Apply" onPress={applyEdit} />
                    </View>
                ) : (
                    <TouchableOpacity onPress={() => toggleDone(item)} style={styles.todo}>
                        {item.done ?
                            <Ionicons
                                name='md-checkmark-circle'
                                size={24} color="green" />
                            : <Entypo name="circle" size={24}
                                      color="#708090" />
                        }

                        <Text style={styles.todoText}>{item.title}</Text>
                    </TouchableOpacity>
                )}
                <Ionicons
                    name="pencil-outline"
                    size={24}
                    color="#b0c4de"
                    onPress={() => startEditing(item)}
                />
                <Ionicons
                    name="trash-bin-outline"
                    size={24}
                    color="red"
                    onPress={() => deleteItem(item)}
                />
            </View>
        );
    };

    // Affichage principal
    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Image source={Logo} style={styles.logo} />
                <TextInput
                    style={styles.input}
                    placeholder="Add a new TO-DO"
                    onChangeText={setTodo}
                    value={todo}
                />
                <Button onPress={addTodo} title="Add a to-do" disabled={todo === ''} />
            </View>
            {todos.length > 0 && (
                <FlatList
                    data={todos}
                    renderItem={renderTodo}
                    keyExtractor={(item) => item.id}
                />
            )}
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    form: {
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 4,
        padding: 10,
    },
    todoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    todoText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    todo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    editContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default List;
