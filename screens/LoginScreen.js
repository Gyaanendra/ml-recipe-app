import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://ml-recipe-api.onrender.com/api/login', {
                email,
                password,
            });
            // Handle successful login, e.g., navigate to main app
            navigation.navigate('Main');
        } catch (error) {
            console.error('Login error:', error);
            // Handle login error
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleLogin} />
            <Text style={styles.signupText}>
                Don't have an account?{' '}
                <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>
                    Create one
                </Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    signupText: {
        marginTop: 16,
        textAlign: 'center',
    },
    link: {
        color: 'blue',
    },
});

export default LoginScreen;