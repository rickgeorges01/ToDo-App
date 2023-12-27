import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';

const Details  = ({navigation}:any) => {
  return (
    <View>
         <Text>Details</Text>
        <Button onPress={() => navigation.navigate('Details')} title={"Open details"} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Details ;
