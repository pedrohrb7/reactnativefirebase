import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { addDoc, doc, getDoc, collection } from "firebase/firestore";

import { db } from "./src/firebaseConnection";

export default function App() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const docRef = doc(db, "users", "1");

      getDoc(docRef)
        .then((response) => {
          setName(response.data()?.name);
          console.log("rs ", response.data());
          setLoading(false);
        })
        .catch((err: any) => {
          setLoading(false);
          console.error("error", err);
        });

      //onSnapshot(doc(db, "users", "1"), (doc) => {
      //  setName(doc.data()?.name);
      //});
    }

    getData();
  }, []);

  const handleAdd = async () => {
    //await setDoc(doc(db, "users", "3"), {
    //  name: "Master",
    //  username: "masterOfPuppets",
    //});

    await addDoc(collection(db, "users"), {
      name: "Novo",
      username: "fulaninho",
    });
  };

  return (
    <View style={styles.container}>
      {loading ? <Text>Carregando...</Text> : <Text>Nome: {name}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#000",
    alignSelf: "center",
  },
  buttonText: {
    padding: 8,
    color: "#fff",
  },
});
