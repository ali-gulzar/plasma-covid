import * as React from 'react';
import { StyleSheet, View, Text, Dimensions, ActivityIndicator, Keyboard } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import t from 'tcomb-form-native';
import ElevatedView from 'react-native-elevated-view';
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
  name: t.String,
  bloodType: BloodTypes,
  location: t.String,
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
    name: {
      error: 'Please provide a name of the donor.'
    },
    bloodType: {
      error: 'Please select your blood type.'
    },
    location: {
      error: 'Patients can easily find you using your location.',
    },
    contactNumber: {
      error: 'Please provide a valid phone number so that patients can contact you.',
      maxLength: 11
    },
  },
}


export default function BecomeDonor(props) {

  const [donor, setDonor] = React.useState([])
  const [disableButton, setDisableButton] = React.useState(false);

  function handleSubmit () {
    const value = form.getValue();
    console.warn(value)
    if (value !== null) {
      setDisableButton(true);
      Keyboard.dismiss();
      const ref = firebase.database().ref('donors')
      const key = ref.push().key;
        ref.child(key).set({
            value,
      })
      setDisableButton(false);
      props.close();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Become A Donor</Text>
        <TouchableOpacity onPress={() => props.close()}>
          <View style={styles.closeModalButton}>
            <Text style={{color: 'white', fontFamily: 'space-mono'}}>X</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Form type={Donor} ref={c => form = c} options={options}/>
        <TouchableOpacity style={{alignItems: 'center'}} onPress={() => handleSubmit()} disabled={disableButton}>
          <ElevatedView elevation={5} style={styles.addInformationButton}>
            {disableButton ? <ActivityIndicator/> : <Text style={{color: 'white', fontFamily: 'space-mono'}}>Become A Donor</Text>}
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
    backgroundColor: '#FF652F',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addInformationButton: {
    backgroundColor: '#FF652F',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    height: 40,
    borderRadius: 30,
    width: Dimensions.get('window').width / 2,
  }
});
