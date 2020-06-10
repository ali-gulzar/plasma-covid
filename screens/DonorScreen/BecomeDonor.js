import * as React from 'react';
import { StyleSheet, View, Text, Dimensions, ActivityIndicator, Keyboard } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import t from 'tcomb-form-native';
import ElevatedView from 'react-native-elevated-view';
import * as firebase from 'firebase';
import cities from '../../assets/cities/data.json';


const Form = t.form.Form;

const BloodTypes = t.enums({
  Aplus: 'A+',
  Aminus: 'A-',
  Bplus: 'B+',
  Bminus: 'B-',
  Oplus: 'O+',
  Ominus: 'O-',
  ABplus: 'AB+',
  ABminus: 'AB-',
});

const Cities = t.enums(cities);

const Donor = t.struct({
  name: t.String,
  bloodType: BloodTypes,
  location: Cities,
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

  const [disableButton, setDisableButton] = React.useState(false);

  function handleSubmit () {
    const value = form.getValue();
    if (value !== null) {
      setDisableButton(true);
      Keyboard.dismiss();
      const ref = firebase.database().ref('donors')
      const key = ref.push().key;
        ref.child(key).set({
          name: value.name,
          bloodType: value.bloodType,
          location: value.location,
          contactNumber: value.contactNumber
      })
      setDisableButton(false);
      props.close("donor",value.name + " added in the list of donors.");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Become A Donor</Text>
        <ElevatedView elevation={10}>
          <TouchableOpacity onPress={() => props.close("donor", "close")}>
            <View style={styles.closeModalButton}>
              <Text style={{color: 'white', fontFamily: 'space-mono'}}>X</Text>
            </View>
          </TouchableOpacity>
        </ElevatedView>

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
    backgroundColor: "#C3073F",
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addInformationButton: {
    backgroundColor: "#C3073F",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    height: 40,
    borderRadius: 30,
    width: Dimensions.get('window').width / 2,
  }
});
