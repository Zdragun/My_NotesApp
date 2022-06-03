import React, { useCallback, useEffect, useState,useContext } from "react";
import { Text, View , TouchableOpacity,Alert, Button, ScrollView, RefreshControl, StyleSheet} from "react-native";
import LogoutButton from "./LogOutButton";
import { countTask } from "./api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from "../../context-store/context";


const Setting = () => {
  const [count, setCount] = useState();
  const [refresing,setRefreshing] = useState(false);
  const {toggleTheme,theme} = useContext(ThemeContext);


  const getCntOfTas = async () => {
    AsyncStorage.getItem('User').then((id) => {

      countTask(id).then((t) => {
        const data = t;
        setCount(data);

      })

    })
  }

 
  console.log(count);

  const handleCount = async () =>
  {
    Alert.alert("Count of Tasks","Total: " +  count.toString(), [
      {
        text: "Ok",
        style: "destructive",
        onPress: async () => {
       
         await countTask();
        },
      },
    ]);
  }

  


  useEffect(() => {
    getCntOfTas();
  }, [])




 

   
  const onRefresh = React.useCallback( async ()=>
  {
    setRefreshing(true);
    await getCntOfTas();
    setRefreshing(false);
  })


  return (

    <View style={[styleSettings[`container${theme}`]]}>


      <ScrollView   style={[{height:'100%', color: '#ffffff' }]}
      refreshControl={<RefreshControl refreshing={refresing} onRefresh={onRefresh}/>}>
        <View style={{flexDirection:'row'}}>
        <Text style={styleSettings[`tex${theme}`]}>Watch amount of your Notes: </Text>
    <TouchableOpacity  style={styleSettings[`but${theme}`]} onPress={()=>handleCount()}>
      <Text style={{color:'#fff'}}>Get Count</Text>
     

      </TouchableOpacity>
      
      </View>
      
   
      
      </ScrollView>
    <Button title="Switch Mode" onPress={()=>toggleTheme()}></Button>
      <LogoutButton/>
  
    </View>
  )
}

const styleSettings = StyleSheet.create({
  containerlight:
  {
    height:'100%',backgroundColor: '#222f3e'
  },
  containerdark:
  {
    height:'100%',backgroundColor: '#f2f2f8'
  },
  texlight:
  {
    color: '#ffffff',
    marginTop:12,
    marginRight:5
  },
  texdark:
  {
    color: 'black',
    marginTop:12,
    marginRight:5
  },
  butlight:
  {
    backgroundColor: "green",
    padding:7,
    marginBottom:15,
    borderColor:'red',
    marginTop:5,
     borderRadius:5
  },
  butdark:
  {
    backgroundColor: "#2195f2",
    padding:7,
    marginBottom:15,
    borderColor:'red',
    marginTop:5,
     borderRadius:5
  }
})

export default Setting;