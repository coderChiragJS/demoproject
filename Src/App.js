import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context'; // Import SafeAreaProvider
import ListScreen from './ListScreen';
import 'react-native-gesture-handler';
import DetailScreen from './DetailScreen';
import FilterModal from './Modelscreen';
import AddProductScreen from './AddProductScreen';

const Stack = createStackNavigator();

const App = () => {
  
  return (
    <SafeAreaProvider>
      {/* Wrap the NavigationContainer with SafeAreaProvider */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="List" screenOptions={{headerTitleAlign: 'center',}}>
          <Stack.Screen name="All Product" component={ListScreen} />
          <Stack.Screen name="DetailScreen" component={DetailScreen} />
          <Stack.Screen name="FilterModal" component={FilterModal} />
          <Stack.Screen name="AddProduct" component={AddProductScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
