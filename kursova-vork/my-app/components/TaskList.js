import { FlatList, RefreshControl,Alert,View,TextInput,Text,StyleSheet,ScrollView} from 'react-native';
import React, { useState, useEffect ,useCallback, useContext } from 'react';
import { getTasks,deleteTask } from '../mobile/screens/api';
import TaskItem from './TaskItem';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from "../context-store/context";
import { Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TaskList = () => {

  const [tasks, setTasks] = useState([])
  const [refreshing,setRefreshing] = useState(false)
 const [search, setSearch] = useState('')
  const [masterData,setMasterData] = useState([]);
  const {theme} = useContext(ThemeContext)
    
  const loadTasks = async () => {
     AsyncStorage.getItem('User').then((id)=>{
      
    getTasks(id).then((t)=>
    {
      const data = t;
      setTasks(data);
      setMasterData(data)
    })
    
    
  })

}



 const searchFilter = (text) =>
  {
   if(text)
   {
     const newData = masterData.filter((item)=>{
       const itemData = item.title ? item.title.toUpperCase() 
       : ''.toUpperCase();
       const textData = text.toUpperCase();
       return itemData.indexOf(textData) > -1;
     });
     setTasks(newData);
     setSearch(text)
   }
   else
   {
     setTasks(masterData);
     setSearch(text);
   }
  } 
  

const isFocused = useIsFocused();

  useEffect(() => {

    loadTasks();
  }, [isFocused])

    const handleDelete = async (id) =>
    {
      Alert.alert("Delete Task", "Are you sure you want to delete the task", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Ok",
          onPress: async () => {
            await deleteTask(id);
            await loadTasks();
          },
        },
      ]);
    }
    
  const renderItem = ({ item }) => {
   
    return <TaskItem task={item} handleDelete={handleDelete} />;
  };
  
  const onRefresh = React.useCallback( async ()=>
  {
    setRefreshing(true);
    await loadTasks();
    setRefreshing(false);
  })

  return (
    <ScrollView  style={{width:'100%'}}>
    
   <TextInput
      placeholder='Search Title'
      value={search}
      placeholderTextColor='#ffffff'
     style={[inputSty[`input${theme}`]]}
     /*  underLineColorAndroid = "transparent" */
      onChangeText={(text)=>{searchFilter(text)}}
       />
       <View style={{bottom: 32,left:275}}>
   <Ionicons name="search" color={'white'} size={18} />
   </View>
    <FlatList
      style={{ width: '100%' }}
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}
        colors={['#78e08f']}
        progressBackgroundColor="#0a3d62" />
      }
      
    />
    
     </ScrollView>
  );
};
const inputSty = StyleSheet.create({
  inputlight:
  {
    borderColor:'black',
    width:'70%',
    borderWidth:1,
    alignSelf:'center',
    backgroundColor:'grey',
    color:'white',
    marginBottom:5,
    borderRadius: 5,
    padding: 3
  },
  inputdark:
  {
    borderColor:'black',
    width:'70%',
    borderWidth:1,
    alignSelf:'center',
    backgroundColor:'grey',
    color:'white',
    marginBottom:5,
    borderRadius: 5,
    padding: 3
  }

})


export default TaskList

