import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import t from 'tcomb-form-native';

const BloodTypes = t.enums({
  Aplus: 'A+',
  Aminus: 'A-',
  Bplus: 'B+',
  Bminus: 'B-',
  Olus: 'O+',
  Ominus: 'O-',
  ABplus: 'AB+',
  ABminus: 'AB-',
});

const Donor = t.struct({
  name: t.String,
  bloodType: BloodTypes,
  location: t.String,
  contact: t.Number
});

const Form = t.form.Form;

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
        <Form type={Donor} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  headerContainer: {
    marginTop: 40,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10
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
  },
  buttonContainer: {
    backgroundColor:'red'
  }
});
