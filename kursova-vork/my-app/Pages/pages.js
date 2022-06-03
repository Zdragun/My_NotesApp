import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from 'react-native-elements'
import React,{useContext} from "react";
import Setting from "../mobile/screens/Setting";
import HomePage from "../mobile/screens/HomePage";
import Ionicons from 'react-native-vector-icons/Ionicons';

import TaskFormScreen from "../mobile/screens/TaskFormScreen";
import { TouchableOpacity, Text,StyleSheet } from "react-native";
import {ThemeContext} from '../context-store/context';


const Tabs = createBottomTabNavigator();

const AppTabs = () => {

    const {theme} = useContext(ThemeContext)

    return (
        <Tabs.Navigator

            initialRouteName="MainPageTabs">
            <Tabs.Screen
                name="MainPageTabs"
                component={HomePage}
                options={({ navigation }) => ({
                    headerShown: true,
                    headerTitle: "Notes",
                    tabBarLabelStyle: { fontSize: 18 },
                    headerStyle: stylesHeaders[`header${theme}`],
                
                    headerTitleStyle: stylesHeaders[`tit${theme}`],

                    headerRight: () =>
                    (
                        <TouchableOpacity onPress={() => navigation.navigate('TaskFormScreen',{screen: 'Create Task',editing:false})}>
                            <Ionicons name="add" size={15} style={[stylesHeaders[`but${theme}`]]} />
                        </TouchableOpacity>
                    ),

                    tabBarLabel: "Home",
                    tabBarIcon: () => {
                        return <Ionicons name="home" size={18} />
                    }
                })}
            />

            <Tabs.Screen name="TaskFormScreen" component={TaskFormScreen} options={({navigation})=>({
                headerStyle: stylesHeaders[`header${theme}`],
                headerTitleStyle: stylesHeaders[`tit${theme}`],
              
                headerTintColor: '#ffffff',
                tabBarLabel: "New Task",
                tabBarStyle: { display: 'none' }, tabBarLabelStyle: { fontSize: 18 },
                headerLeft: () =>
                (
                    <TouchableOpacity onPress={() => navigation.navigate('MainPageTabs')}>
                     <Icon name="arrow-left"  style={{paddingTop:3}} size={30} color="black" type="entypo" />
                    </TouchableOpacity>
                ),
                tabBarIcon: () => {
                    return <Ionicons name="add" size={23}/>
                }
            })} />


            <Tabs.Screen
                name="SettingsTabs"
                component={Setting}
                options={{
                    headerShown: true,
                    headerTitle: "Settings",
                    tabBarLabel: "Settings",
                    tabBarLabelStyle: { fontSize: 18 },
                    headerStyle:  stylesHeaders[`header${theme}`],
                 
                    headerTitleStyle: stylesHeaders[`tit${theme}`],
                    tabBarIcon: () => {
                        return <Ionicons name="settings" size={18} />
                    }
                }}
            />

        </Tabs.Navigator>
    )
}
const stylesHeaders = StyleSheet.create({
    headerlight:
    {
      backgroundColor: '#222f3e',
      
    },
    headerdark:
    {

     backgroundColor: '#f2f2f8',
    borderBottomWidth: 3,
     borderBottomColor: "#2195f2"
    
    },

    titlight:
    {
        color:'#ffffff'
    },
    titdark:
    {
        color:'#2195f2'   
    },
    butlight:
    {
        color:'#ffffff', 
        backgroundColor:'green',
        marginRight:15,
        fontSize:20,
        padding:3,
        borderRadius:5
    },
    butdark:
    {
        backgroundColor:'#2195f2',
        marginRight:15,
        fontSize:20,
        padding:3,
        borderRadius:5,
        color:'#ffffff', 
    },
    
})




export default AppTabs;
