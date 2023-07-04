import { Alert, Button, StyleSheet, Text, View, TextInput } from "react-native";
import { useState } from "react";
function BadgerRegisterScreen(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordcheck, setPasswordCheck] = useState('');
    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>Join BadgerChat!</Text>
        <Text>Username:</Text>
        <TextInput style={styles.input}
        onChangeText={setUsername}
        value={username}></TextInput>
        <Text>Password:</Text>
        <TextInput style={styles.input}
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}></TextInput>
        <Text>Confirm Password:</Text>
        <TextInput style={styles.input}
        secureTextEntry={true}
        onChangeText={setPasswordCheck}
        value={passwordcheck}></TextInput>
        <Button color="crimson" title="Signup" onPress={() => {
            if (password === ""){
                Alert.alert("Please enter a password")
            }
            else if (!(password === passwordcheck)){
                Alert.alert("Passwords do not match!")
                
            }
            else{
                props.handleSignup(username, password);
            }

        }} />
        <Button color="grey" title="Nevermind!" onPress={() => props.setIsRegistering(false)} />
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

export default BadgerRegisterScreen;