import React, { useContext } from 'react'
import AuthScreen from '../mobile/screens/AuthScreen';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../mobile/screens/AuthProvider';
import AppTabs from '../Pages/pages';

import {ThemeProvider} from '../context-store/context';


const Navigator = () => {

  const { token } = useContext(AuthContext);

  return (

      <NavigationContainer>
        {(token === null) ? <AuthScreen /> : <ThemeProvider><AppTabs /></ThemeProvider>}
      </NavigationContainer>

  
  )
}

export default Navigator

