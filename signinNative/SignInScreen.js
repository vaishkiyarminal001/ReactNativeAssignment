import { View, Text, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function SignInScreen({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = () =>{

    }

    const handleWithGoogle = async () =>{
        try{
            const {type, user} = await GoogleSignin.signInAsync();
            if(type === 'success'){

            }
        }catch(error){
            console.log("Google sign-in error:", error);
        }
    }




  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign In with Email" onPress={handleEmail} />
      <Button title="Sign In with Google" onPress={handleWithGoogle} />
      <Text onPress={() => navigation.navigate('ForgotPassword')}>Forgot Password?</Text>
      <Text onPress={() => navigation.navigate('SignUp')}>Don't have an account? Sign Up</Text>
    </View>
  )
}