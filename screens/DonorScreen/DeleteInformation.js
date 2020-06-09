import * as React from 'react';
import { StyleSheet, View, Text, Dimensions, ActivityIndicator, Keyboard } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import t from 'tcomb-form-native';
import ElevatedView from 'react-native-elevated-view';
import Toast from 'react-native-root-toast';
import * as firebase from 'firebase';

const Form = t.form.Form;

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
  bloodType: BloodTypes,
  contactNumber: t.Number
});


const formStyles = {
  ...Form.stylesheet,
  controlLabel: {
    error: {
      color: 'black'
    }
  }
}

const options = {
  fields: {
    bloodType: {
      error: 'Please select your blood type.'
    },
    contactNumber: {
      error: 'Please provide a valid phone number so that patients can contact you.',
      maxLength: 11
    },
  },
}


export default function DeleteInformation(props) {

  const [disableButton, setDisableButton] = React.useState(false);

  function handleSubmit () {
    const value = form.getValue();
    if (value !== null) {
      setDisableButton(true);
      Keyboard.dismiss();
      // Delete Information
      const ref = firebase.database().ref('delete')
      const key = ref.push().key;
        ref.child(key).set({
            value,
      })
      setDisableButton(false);
      props.close("delete", "Request sent to delete personal information.");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Delete Information</Text>
        <TouchableOpacity onPress={() => props.close("delete", "close")}>
          <View style={styles.closeModalButton}>
            <Text style={{color: 'white'}}>X</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Form type={Donor} ref={c => form = c} options={options}/>
        <TouchableOpacity style={{alignItems: 'center'}} onPress={() => handleSubmit()} disabled={disableButton}>
          <ElevatedView elevation={5} style={styles.deleteInformationButton}>
            {disableButton ? <ActivityIndicator/> : <Text style={{color: 'white', fontFamily: 'space-mono'}}>Delete</Text>}
          </ElevatedView>
        </TouchableOpacity>
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
    paddingTop: 30,
  },
  closeModalButton: {
    width: 30,
    height: 30,
    backgroundColor: '#2f95dc',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteInformationButton: {
    backgroundColor: '#2f95dc',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    height: 40,
    borderRadius: 30,
    width: Dimensions.get('window').width / 3,
  }
});
