
// Keep this here!
import 'react-native-gesture-handler';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import BadgerLoginScreen from './components/BadgerLoginScreen';
import BadgerLogoutScreen from './components/BadgerLogoutScreen';
import BadgerConversionScreen from './components/BadgerConversionScreen';

import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import BadgerLandingScreen from './components/BadgerLandingScreen';
import BadgerChatroomScreen from './components/BadgerChatroomScreen';
import BadgerRegisterScreen from './components/BadgerRegisterScreen';


const ChatDrawer = createDrawerNavigator();

export default function App() {
  const [guest, setGuest] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);
  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }
  
  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    return result
  }
  useEffect(() => {
    
    fetch('https://cs571.org/s23/hw10/api/chatroom',{
	        method: 'GET',
            headers: {
                'X-CS571-ID': 'bid_71f141b472043380fc9d',
        }
        })
        .then((response) => {
	  
	        var ret = response.json();
	        //console.log(newsinfo);
	        return ret;
      
	  
        }
        )
        .then((data)=>{
            var sg = data;
            setChatrooms(sg)
        }); // for example purposes only!
  }, []);

  function handleLogin(username, password) {
    // hmm... maybe this is helpful!
    fetch('https://cs571.org/s23/hw10/api/login',{
	        method: 'POST',
            headers: {
                'X-CS571-ID': 'bid_71f141b472043380fc9d',
                'Content-Type': 'application/json',
        },
            body: JSON.stringify({
              "username": username,
              "password": password
          })
        })
        .then((response) => {
	  
	        var ret = response.json();
	        //console.log(newsinfo);
          if (response.status == 200){
            setIsLoggedIn(true);
          }else{
            Alert.alert("Incorrect login, please try again!")
          }
	        return ret;
      
	  
        }
        )
        .then((data)=>{
            var sg = data;
            console.log(sg.token);
            save("token", sg.token);
        }); // I should really do a fetch to login first!
  }
  function handleLogout(){
    SecureStore.deleteItemAsync("token");
    setIsLoggedIn(false);
  }
  

  function handleSignup(username, password) {
    // hmm... maybe this is helpful!
    console.log(username);
    console.log(password);
    fetch('https://cs571.org/s23/hw10/api/register',{
	        method: 'POST',
            headers: {
                'X-CS571-ID': 'bid_71f141b472043380fc9d',
                'Content-Type': 'application/json',
        },
            body: JSON.stringify({
              "username": username,
              "password": password
          })
        })
        .then((response) => {
          if (response.status == 200){
            setIsLoggedIn(true);
          }else{
            Alert.alert("Invalid account name, please try again!")
          }
          
          return response.json()
	  
        }
        )
        .then((data)=>{
            var sg = data;
            save("token", sg.token);
        });
   // I should really do a fetch to register first!
  }

  if (isLoggedIn) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator >
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} guest = {guest}/>
          {
            chatrooms.map(chatroom => {
              return <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom} guest = {guest} getvaluefor = {getValueFor}/>}

              </ChatDrawer.Screen>
            })
            
          }
          <ChatDrawer.Screen key="logout" name = "Logout" options={{
          drawerItemStyle: { backgroundColor: 'crimson' },
          drawerLabelStyle: { color: 'white' },
          }}>
            {(props) => <BadgerLogoutScreen handleLogout = {handleLogout}></BadgerLogoutScreen>}
          </ChatDrawer.Screen>
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else if(guest){
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator >
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} guest = {guest}/>
          {
            chatrooms.map(chatroom => {
              return <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom} guest = {guest} getvaluefor = {getValueFor}/>}

              </ChatDrawer.Screen>
            })
            
          }
          <ChatDrawer.Screen key="signup" name = "Signup" options={{
          drawerItemStyle: { backgroundColor: 'crimson' },
          drawerLabelStyle: { color: 'white' },
          }}>
            {(props) => <BadgerConversionScreen setGuest = {setGuest} setIsRegistering={setIsRegistering}></BadgerConversionScreen>}
          </ChatDrawer.Screen>
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  }else if (isRegistering) {
    return <BadgerRegisterScreen handleSignup={handleSignup} setIsRegistering={setIsRegistering} />
  } else {
    return <BadgerLoginScreen setGuest = {setGuest} handleLogin={handleLogin} setIsRegistering={setIsRegistering} />
  }
}


