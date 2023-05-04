import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { API_KEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID } from '@env';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default function App() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    // Get a reference to the "exercises" node in the database
    const exercisesRef = ref(getDatabase(app), "exercises");

    // Listen for changes to the exercises node in the database
    onValue(exercisesRef, (snapshot) => {
      const exercisesData = snapshot.val();

      // Convert the exercises object to an array
      const exercisesArray = Object.entries(exercisesData || {}).map(
        ([key, value]) => ({ id: key, ...value })
      );

      setExercises(exercisesArray);
    });
  }, []);

  return (
    <div>
      <h1>Exercise List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Muscles</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => (
            <tr key={exercise.id}>
              <td>{exercise.name}</td>
              <td>{exercise.description}</td>
              <td>{exercise.muscles}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  header: { height: 50, backgroundColor: '#537791' },
  headerText: { textAlign: 'center', fontWeight: '100', color: '#fff' },
  text: { textAlign: 'center', fontWeight: '100' }
});
