import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export default function BecomeDonor(props) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Become A Donor</Text>
        <TouchableOpacity onPress={() => props.close()}>
          <View style={styles.closeModalButton}>
            <Text>X</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    marginTop: 30,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 20
  },
  header: {
    fontSize: 20,
    fontFamily: 'space-mono'
  },
  contentContainer: {
    paddingTop: 15,
  },
  closeModalButton: {
    width: 30,
    height: 30,
    backgroundColor: 'red',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
