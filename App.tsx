import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { addDoc, doc, getDoc, collection } from "firebase/firestore";

import { db } from "./src/firebaseConnection";

export default function App() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function getData() {
      const docRef = doc(db, "users", "1");

      getDoc(docRef)
        .then((response) => {
          console.log("rs ", response.data());
        })
        .catch((err: any) => {
          console.error("error", err);
        });
    }

    getData();
  }, []);

  const handleAdd = async () => {
    await addDoc(collection(db, "users"), {
      name,
      username,
    }).then(() => {
      setName("");
      setUsername("");
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome: </Text>
      <TextInput
        style={styles.input}
        placeholder="Informe o nome"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <Text style={styles.label}>Username: </Text>
      <TextInput
        style={styles.input}
        placeholder="Informe o username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#000",
    marginHorizontal: 8,
    borderRadius: 6,
  },
  buttonText: {
    padding: 8,
    color: "#fff",
    textAlign: "center",
  },
  label: {
    color: "#000",
    fontSize: 18,
    marginBottom: 4,
    marginLeft: 8,
  },
  input: {
    borderWidth: 1,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 6,
  },
});
