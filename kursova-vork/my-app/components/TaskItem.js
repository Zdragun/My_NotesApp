import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import React,{useContext,useEffect,useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from "../context-store/context";
import { Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TaskItem = ({task,handleDelete}) => {

  const {theme} = useContext(ThemeContext)
 
    
    const navigation = useNavigation()


    
  
  return (  
    
    <View  style={[styles[`itemContainer${theme}`]]}>
   

      <TouchableOpacity style={[styles[`width${theme}`]]} onPress={() => navigation.navigate("TaskFormScreen",{screen:'Update Task', id:task.id, editing:true})}
      >
      <Text  style={[styles[`itemTitle${theme}`]]}>{task.title}</Text>
    
      <Text  style={styles[`itemDescription${theme}`]}>{task.description}</Text>
   
      </TouchableOpacity>

    <TouchableOpacity  style={styles.buttonStyle} onPress={()=>handleDelete(task.id)}>
    <Ionicons name="trash" size={15} />
    </TouchableOpacity>

    </View>
    
  )
}


const styles = StyleSheet.create({
    itemContainerlight:{
      width:'100%',
        backgroundColor: '#333333',
        padding: 20,
        marginVertical: 8,
        borderRadius: 5,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',

    },
    itemContainerdark:{
      width:'100%',
      backgroundColor: 'lightblue',
      padding: 20,
      marginVertical: 8,
      borderRadius: 5,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
  
      
  },
  widthlight:
  {
    width:'80%',
  },
  widthdark:
  {
    width:'80%'
  },
  buttonStyle:
  {
    backgroundColor: "#ee5253",
    padding:7,
    marginLeft:15,
    borderColor:'red',
   borderRadius:5
  },

    itemTitlelight:
    {
        fontSize:25,
        color: '#afa691'
    },
    itemTitledark:
    {
        fontSize:25,
        color: '#000000'
    },
    itemDescriptionlight:{
        color:'#ffffff',
       
    },
    itemDescriptiondark:{
      color:'grey',
      
  },
})




export default TaskItem