import { StyleSheet, Text, View, Button, ScrollView, Modal, TextInput, Alert} from "react-native";
import { useState, useEffect } from "react";
import BadgerChatMessage from './BadgerChatMessage';
function BadgerChatroomScreen(props) {
    const [modalVisible, setmodalVisible] = useState(false);
    const [messages, setMessages] = useState([]);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    function getMessages(){
        fetch('https://cs571.org/s23/hw10/api/chatroom/'+props.name+'/messages',{
                method: 'GET',
                headers: {
                    'X-CS571-ID': 'bid_71f141b472043380fc9d',
            }
            })
            .then((response) => {
                var ret = response.json();
                //console.log(response.status);
                return ret;
          
          
            }
            )
            .then((data)=>{
                var sg = data;
                //console.log(sg.messages);
                setMessages(sg.messages)
            });
    }
    async function postMessage(title, body){
        fetch('https://cs571.org/s23/hw10/api/chatroom/'+props.name+'/messages',{
	        method: 'POST',
            headers: {
                'X-CS571-ID': 'bid_71f141b472043380fc9d',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ await props.getvaluefor("token"),
                
        },
            body: JSON.stringify({
              "title": title,
              "content": body
          })
        })
        .then((response) => {
          if (response.status == 200){
            Alert.alert("Successfully posted message!")
          }
          console.log(getvaluefor("token"))
          console.log(response.status);
          return response.json()
	  
        }
        )
        .then((data)=>{
            var sg = data;
        });
    } 
    useEffect(() => {
        getMessages();
      }, []);
    
    return <View style={{ flex: 1 }}>
        <Modal animationType="slide"
        transparent={false}
        visible={modalVisible}>
            <View style = {{
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
            margin: 10,
            }}>
                <Text>Title:</Text>
                <TextInput style={styles.input}
                onChangeText={setTitle}
                value={title}></TextInput>
                <Text>Body:</Text>
                <TextInput style={styles.inputbody}
                onChangeText={setBody}
                value={body}></TextInput>
                <Button color="crimson" title="Post" onPress={() => {
                    postMessage(title, body);
                    setmodalVisible(false);
                    setBody("");
                    setTitle("");
                }} />
                <Button color="grey" title="Cancel" onPress={() => {
                    setmodalVisible(false);
                    setBody("");
                    setTitle("");
                }} />
            </View>
            
        </Modal>
        <ScrollView contentContainerStyle = {{
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        margin: 10,
        gap:15
    }}>
        
        <Button color="crimson" title="Add Message" onPress={() => {
            if (props.guest){
                Alert.alert("Log in to post messages!");
            }else{
                setmodalVisible(true);
            }
            
        }} />
        <Button color="grey" title="Reload" onPress={() => {
            getMessages();
        }} />
        {messages.map(message=>{
            return <BadgerChatMessage key = {message.id} created = {message.created}
            title = {message.title} 
            poster = {message.poster}
            content = {message.content}></BadgerChatMessage>
        })}
        </ScrollView>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input:{
        width: 120,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    inputbody:{
        width: 200,
        height: 150,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
});

export default BadgerChatroomScreen;