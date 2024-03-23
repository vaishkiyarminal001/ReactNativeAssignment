import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Password validation
    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return;
    }

    if (!/\d/.test(password) || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[^a-zA-Z0-9]/.test(password)) {
      Alert.alert('Error', 'Password must contain at least one digit, one lowercase letter, one uppercase letter, and one special character');
      return;
    }

    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      // Handle sign-in success
      console.log('User signed in with email:', userCredential.user);
      // Navigate to the next screen upon successful sign-in
    } catch (error) {
      // Handle sign-in error
      console.error('Email sign-in error:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { type, user } = await GoogleSignin.signIn();
      if (type === 'success') {
        // Convert Google user credentials to Firebase credential
        const googleCredential = auth.GoogleAuthProvider.credential(user.idToken);
        // Sign in with Firebase using Google credentials
        await auth().signInWithCredential(googleCredential);
        // If successful, navigate to the next screen or perform any other actions
        console.log('User signed in with Google:', auth().currentUser);
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      Alert.alert('Error', 'Failed to sign in with Google.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{ height: 40, width: '80%', borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={{ height: 40, width: '80%', borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign In with Email" onPress={handleEmailSignIn} />
      <Button title="Sign In with Google" onPress={handleGoogleSignIn} />
      <Text style={{ marginTop: 20 }} onPress={() => navigation.navigate('ForgotPassword')}>
        Forgot Password?
      </Text>
      <Text style={{ marginTop: 10 }} onPress={() => navigation.navigate('SignUp')}>
        Don't have an account? Sign Up
      </Text>
    </View>
  );
}
