import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList, InputAccessoryView } from 'react-native';

//Custom component
import GoalItem from './components/GoalItem';

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);

  // Functions can be defined in 2 ways:
  
  // - Type 1: Normal Syntax

  // function goalInputHandler(enteredText){
  //   setEnteredGoal(enteredText);
  // }

  // - Type 2: JavaScript Syntax

  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText);
  }

  const addGoalHandler = goalTitle => {
    // setCourseGoals(currentGoals => [...courseGoals, enteredGoal]); // ...courseGoals is a spread operator from JavaScript. It takes an existing array, pulls out all the elements and then adds them to new array. Now we add new element enteredGoal.
    
    // Setting IDs to the list
    
    setCourseGoals(currentGoals => [
      ...courseGoals, 
      {id: Math.random().toString(), value: enteredGoal}
    ]);
  }

  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.id != goalId);
    });
  }

  return (
    <View style={styles.screen}>
      {/* ----- INPUT PART----- */}
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.inputField}
          placeholder="Enter goal"
          onChangeText={goalInputHandler} 
          value={enteredGoal}
        />

        <Button 
          title="ADD"
          onPress={addGoalHandler}
        />
      </View>

      {/* -----OUTPUT PART----- */}
      {/* ScrollView for limited number of items. */}
      {/* <ScrollView>
        {courseGoals.map((goal) => 
          <View key={goal} style={styles.outputField}>
            <Text>{goal}</Text>
          </View>
        )}
      </ScrollView> */}

      {/* FlatList for unlimited or huge number of items. Similar to recycler View in android */}
      <FlatList
        //Add KeyExtractor only if IDs are assigned
        keyExtractor = {(item, index) => item.id}
        data = {courseGoals}
        renderItem = {itemData => 
          //Using custom component
          //If not setting any IDs for the list itemData.item is sufficient
          <GoalItem 
            id = {itemData.item.id}
            title = {itemData.item.value}
            onDelete = {removeGoalHandler}  
          />
        }
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 40
  },

  inputContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },

  inputField: {
    width: '80%', 
    borderBottomColor: 'black', 
    borderBottomWidth: 1
  },  
});
