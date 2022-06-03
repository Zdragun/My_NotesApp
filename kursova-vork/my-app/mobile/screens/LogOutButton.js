import React, {useContext} from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "./AuthProvider";
import {ThemeContext} from '../../context-store/context';


const LogoutButton = () => {
    const {theme} = useContext(ThemeContext)
    const { logout } = useContext(AuthContext);
   
    return(
            <TouchableOpacity
               
                onPress={() => {
                    logout();
                }}
            >
                <View style={{alignItems:'center',justifyContent:'flex-end'}}>
                <Text  style={style[`b${theme}`]}>
                    Log out
                </Text>
                </View>
            </TouchableOpacity>
    )
};

const style = StyleSheet.create({
    blight:
    {
        color:'aquamarine',
        fontSize:20,
    },
    bdark:
    {
        color:'aquamarine',
        fontSize:20,
        borderColor:'lightblue',
        textAlign:'center',
        justifyContent:'center',
         backgroundColor:'darkblue',
         borderRadius:10,
         width:'20%'
    }
})

export default LogoutButton;