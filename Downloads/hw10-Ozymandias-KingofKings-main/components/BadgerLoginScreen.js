import { Alert, Button, StyleSheet, Text, View, TextInput } from "react-native";
import { useState } from "react";
function BadgerLoginScreen(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>BadgerChat Login</Text>
        <Text>Username:</Text>
        <TextInput style={styles.input}
        onChangeText={setUsername}
        value={username}></TextInput>
        <Text>Password:</Text>
        <TextInput style={styles.input}
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}></TextInput>
        <Button color="crimson" title="Login" onPress={() => {
            //Alert.alert("Hmmm...", "I should check the user's credentials first!");
            props.handleLogin(username, password)
        }} />
        
        <Button color="grey" title="Signup" onPress={() => props.setIsRegistering(true)} />
        <Button color="grey" title="Continue As Guest" onPress={() => props.setGuest(true)} />
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: 110,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
});

export default BadgerLoginScreen;