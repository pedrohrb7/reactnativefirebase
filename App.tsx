import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

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

  return (
    <View style={styles.container}>
      {loading ? <Text>Carregando...</Text> : <Text>Nome: {name}</Text>}
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
});
