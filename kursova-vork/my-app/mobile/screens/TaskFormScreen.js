import { Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect,useContext } from 'react';
import Layout from '../../components/Layout';
import { saveTask, getTask, updateTask } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../../context-store/context';

const TaskFormScreen = ({ navigation, route }) => {

  const [titleVal, SetTitleVal] = useState('');

  const [bbool, setBbool] = useState(false);
  const [task, setTask] = useState({
    title: '',
    description: '',
    user_id: -1
  });

  const { id,editing,screen } = route.params;
  const [isEditing, setIsEditing] = useState(editing)
   const {theme} = useContext(ThemeContext)
/*   console.log(screen); */

  useEffect(() => {
    
    AsyncStorage.getItem('User').then((id)=>
    {
        setTask({
          title: '',
          description: '',
          user_id: id
        })
    })
    console.log(screen);
   
    navigation.setOptions({ headerTitle: isEditing ? screen : screen});


    if (route.params && id) {
    
      (async () => {
        const task = await getTask(id);
        setTask({ title: task.title, description: task.description })
      })();
    }

  }, [screen]);



  const handleSubmit = async () => {
    try {
     
      if (!editing) {
        
        await saveTask({ ...task });
      } else {
        console.log(id, task)
        await updateTask(id, { ...task });
      }
      navigation.navigate("MainPageTabs");
    } catch (error) {
      console.log(error);
    }
  };


    const handleValidTitle = () => {
      if (task.title.length >= 13) {
        SetTitleVal('So huge name for Title');
        setBbool(true);
      }
      else {
        SetTitleVal('')
        setBbool(false)
      }
    }
    
  
   


  const handleChange = (name, value) => setTask({ ...task, [name]: value });

  return (
    <Layout>
      <TextInput style={[styles[`input${theme}`]]}
        placeholder='Write a Title'
        placeholderTextColor='#546574'
        onChangeText={(text) => {handleChange('title', text);handleValidTitle(text)}}
        value={task.title}
      />
   {titleVal ? <Text style={{ color: 'red' }}>{titleVal}</Text> : null} 

      <TextInput style={[styles[`inputdesc${theme}`]]}
        placeholder='Write a Description'
        placeholderTextColor='#546574'
        onChangeText={(text) => {handleChange('description', text)}}
        value={task.description}
        multiline={true}
        
      />
      {!editing ? (
        <TouchableOpacity style={styles.buttonSave} disabled={bbool} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save Task</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.buttonUpdate} disabled={bbool} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Update Task</Text>
        </TouchableOpacity>
      )}

    </Layout>
  );
}

const styles = StyleSheet.create({
  inputlight:
  {
    width: '90%',
    marginBottom: 7,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#10ac84',
    height: 35,
    color: '#ffffff',
    padding: 4,
    textAlign: 'center',
    borderRadius: 5,
  
  },
  inputdark:
  {
    width: '90%',
    marginBottom: 7,
    fontSize: 14,
    borderWidth: 1,
    borderColor: 'lightblue',
    height: 35,
    color: '#ffffff',
    padding: 4,
    backgroundColor: '#e3e3e8',
    textAlign: 'center',
    borderRadius: 5,
   
  },
  inputdesclight:
  {
    width: '90%',
    marginBottom: 7,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#10ac84',
    color: '#ffffff',
    padding: 4,
    alignItems:'flex-start',
    justifyContent:'flex-start',
    textAlignVertical:'top',
    borderRadius: 5,
    height: 300
    
  },
  inputdescdark:{
    width: '90%',
    marginBottom: 7,
    fontSize: 14,
    borderWidth: 1,
    borderColor: 'lightblue',
    color: '#000000',
  
    padding: 4,

    
    borderRadius: 5,
    alignItems:'flex-start',
    justifyContent:'flex-start',
    textAlignVertical:'top',
   height:300
  },

  buttonSave:
  {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#10ac84',
    width: '90%',
  },
  buttonUpdate: {
    padding: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 3,
    backgroundColor: "#e58e26",
    width: "90%",
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',

  },
})

export default TaskFormScreen

