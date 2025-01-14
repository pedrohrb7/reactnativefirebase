import { View, Text, StyleSheet } from "react-native";

const UsersList = ({ data }: { data: any }) => {
  return (
    <View style={styles.container}>
      <Text>{data.name}</Text>
      <Text>{data.username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 4,
    marginBottom: 12,
  },
});
export default UsersList;
