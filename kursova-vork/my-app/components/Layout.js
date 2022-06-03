import { View, StatusBar, StyleSheet } from 'react-native'
import React,{useContext} from 'react'
import {ThemeContext} from '../context-store/context';

const Layout = ({children}) => {

    const {theme} = useContext(ThemeContext)

    return <View style={[styles.container,styles[`container${theme}`]]}><StatusBar backgroundColor='#ffffff'/>{children}</View>;
    
}



const styles = StyleSheet.create({
    container:
    {
        backgroundColor: '#222f3e',
        padding: 20,
        flex:1,
        alignItems:'center'
    },
    containerlight:
    {
      backgroundColor: '#222f3e'
    },
    containerdark:
    {
     backgroundColor: '#f2f2f8'
    }
})




export default Layout