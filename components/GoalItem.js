//Build custom component

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const GoalItem = props => {
    return (
        <TouchableOpacity onPress={props.onDelete.bind(this, props.id)}>
            <View style={styles.outputField} >
                <Text>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    outputField: {
        padding: 10,  
    }
});

export default GoalItem;