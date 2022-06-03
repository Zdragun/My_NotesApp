import React, { useState, useContext } from 'react';
import { ImageBackground, View, Text, TouchableOpacity, TextInput, Alert, Button, } from 'react-native';
import { AuthContext } from './AuthProvider';
import styles from '../styles/stylesAuth';


const AuthScreen = () => {


    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordValid,setPasswordValidError] = useState('');
    const [emailValid,setEmailValidError] = useState('')
    const [emailValBool,setEmailValBool] = useState(false);


    const [isLogin, setIsLogin] = useState(true);

    const { login, signup, message, setMessage, isError, setIsError } = useContext(AuthContext);

    const handlePassvord = (vl) => {                         
     
        if (vl.length === 0) {
            setPasswordValidError('password must be entered');
            setEmailValBool(true);
            
           
        } else if (vl.length < 8) {
            setPasswordValidError('Password must be bigger than 8 symbols');
            setEmailValBool(true);
        }
        else
        {
            setPasswordValidError('')
            setEmailValBool(false);
            
           
        }
    }

    const handleValidEmail = val => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        
        if (val.length === 0) {
          setEmailValidError('email address must be enter');
          setEmailValBool(true)
          
        } else if (reg.test(val) === false) {
          setEmailValidError('enter valid email address');
          setEmailValBool(true);
        } else if (reg.test(val) === true) {
          setEmailValidError('');
          setEmailValBool(false)
        }
        };


    const onChangeHandler = () => {
        setIsLogin(!isLogin);
        setMessage('');
    };

    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + message;
    }

    
    
    return (

        <ImageBackground source={require('../public/images/1.jpg')} style={styles.image}>
            <View style={styles.card}>
                <Text style={styles.heading}>{isLogin ? 'Login' : 'Signup'}</Text>
                <View style={styles.form}>
                    <View style={styles.inputs}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#000" 
                            value={email}
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(value) => { setEmail(value);handleValidEmail(value)}}>
                        </TextInput>
                        {emailValid ? <Text style={{color:'red'}}>{emailValid}</Text> : null}

                        {!isLogin && <TextInput style={styles.input} placeholder="Name" placeholderTextColor="#000"   onChangeText={setName}></TextInput>}

                        <TextInput
                            secureTextEntry={true}
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#000" 
                            value={password}
                            onChangeText={(vl) => { setPassword(vl);handlePassvord(vl)}}>
                        </TextInput>
                        {passwordValid ? <Text style={{color:'red'}}>{passwordValid}</Text> : null}

                        <Text style={[styles.message, { color: isError ? 'red' : 'green' }]}>{message ? getMessage() : null}</Text>
                        <TouchableOpacity disabled={emailValBool}  style={styles.button}  onPress={() => {
                            if (isLogin) {
                                login(email, password)
                            }
                            else {
                                signup(email, name, password)
                                setIsLogin(true);
                            }
                        }}>
                            <Text   style={styles.buttonText}>Done</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonAlt} onPress={onChangeHandler}>
                            <Text style={styles.buttonAltText}>{isLogin ? 'Sign Up' : 'Log In'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};


export default AuthScreen;