import React from "react";
import { View, Text, StyleSheet } from "react-native";

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Moore features comming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#333",
  },
});

export default ProfileScreen;
