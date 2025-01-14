import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { addDoc, collection, getDocs } from "firebase/firestore";

import { db } from "./src/firebaseConnection";
import UsersList from "./src/components/Users";

export default function App() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    async function getData() {
      const usersRef = collection(db, "users");

      getDocs(usersRef).then((result) => {
        let list: any[] = [];

        result.forEach((doc) => {
          list.push({
            id: doc.id,
            name: doc.data().name,
            username: doc.data().username,
          });
        });
        setUsers(list);
        setLoading(false);
      });
    }

    getData();
  }, []);

  const handleAdd = async () => {
    await addDoc(collection(db, "users"), {
      name,
      username,
    })
      .then(() => {
        setName("");
        setUsername("");
      })
      .catch((err: any) => {
        console.error("error ", err);
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
      <View style={styles.listContainer}>
        {loading ? (
          <Text>Carregando...</Text>
        ) : (
          <FlatList
            style={styles.list}
            data={users}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <UsersList data={item} />}
          />
        )}
      </View>
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
  list: {},
  listContainer: {
    marginHorizontal: 8,
    marginTop: 14,
  },
});
