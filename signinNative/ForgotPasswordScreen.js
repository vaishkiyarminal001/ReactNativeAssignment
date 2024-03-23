import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    try {
      await auth().sendPasswordResetEmail(email);
      // Handle password reset email sent successfully
      Alert.alert('Password Reset Email Sent', 'Check your email to reset your password.');
    } catch (error) {
      // Handle password reset error
      console.error('Password reset error:', error.message);
      Alert.alert('Error', error.message);
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
      <Button title="Reset Password" onPress={handleForgotPassword} />
    </View>
  );
};

export default ForgotPasswordScreen;
