import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, Modal, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons, AntDesign, Feather, MaterialIcons, Entypo } from '@expo/vector-icons';
import { FloatingAction } from "react-native-floating-action";
import ElevatedView from 'react-native-elevated-view';
import Toast from 'react-native-root-toast';
import * as firebase from 'firebase';
import { Dropdown } from 'react-native-material-dropdown';

import BecomeDonor from './DonorScreen/BecomeDonor';
import DeleteInformation from './DonorScreen/DeleteInformation';
import cities from '../assets/cities/value_data.json';

var filter = require('lodash.filter');

const actions = [
  {
    text: "Become a donor",
    icon: <AntDesign name="star" size={20} color="white"/>,
    name: "donor",
    position: 1,
    color: "#FF652F"
  },
  {
    text: "Delete your information",
    icon: <MaterialCommunityIcons name="delete-forever" size={20} color="white"/>,
    name: "delete",
    position: 2,
    color: "#2f95dc"
  }
];

export default function DonorScreen() {
  
  const [loadingData, setLoadingData] = useState(true); 
  const [data, setData] = useState([]);
  const [showBecomeDonor, setShowBecomeDonor] = useState(false);
  const [showDeleteInformation, setShowDeleteInformation] = useState(false);
  const [filterBlood, setFilterBlood] = useState("");
  const [filterCity, setFilterCity] = useState("");

  const bloodTypes = [{
    value: 'All'
  }, {
    value: 'A+',
  }, {
    value: 'A-',
  }, {
    value: 'B+',
  }, {
    value: 'B-',
  }, {
    value: 'O+',
  }, {
    value: 'O-',
  }, {
    value: 'AB+',
  }, {
    value: 'AB-',
  }]
  const pakCities = cities;

  useEffect(() => {
    firebase.database().ref("donors").on('value', async function (snapshot) {
      if (snapshot.val()) {
        let fetchedData = Object.values(snapshot.val());
        if (filterBlood !== "" && filterBlood !== "All") {
          fetchedData = filter(fetchedData, function (o) {
            return setCorrectBloodTypeString(o.bloodType) == filterBlood
          })
        }
        if (filterCity !== "" && filterCity !== "All") {
          fetchedData = filter(fetchedData, function (o) {
            return setCorrectBloodTypeString(o.location) == filterCity
          })
        }
        await setData(fetchedData);
        setLoadingData(false);
      }
    })
  }, [filterBlood, filterCity])

  function closeModal (which, message) {
    if (which == "donor") {
      setShowBecomeDonor(false);

    } else {
      setShowDeleteInformation(false);
    }
    if (message !== "close") {
      Toast.show(message, {
        duration: 1500,
        position: 50,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: "#2f95dc",
        paddingTop: 20,
        opacity: 0.95
      });
    }
  }
  
  function becomeDonor () {
    return(
        <Modal animationType="slide" visible={showBecomeDonor} onRequestClose={() => setShowBecomeDonor(false)}>
          <BecomeDonor close={closeModal} />
        </Modal>
    )
  }
  
  function deleteInformation () {
    return(
        <Modal animationType="slide" visible={showDeleteInformation} onRequestClose={() => setShowDeleteInformation(false)}>
          <DeleteInformation close={closeModal} />
        </Modal>
    )
  }

  function handlePress (name) {
    if (name === "donor" ) {
      setShowBecomeDonor(true);
    } else if (name === "delete") {
      setShowDeleteInformation(true);
    }
  }

  function setCorrectBloodTypeString (string) {
    if (string.includes("plus")) {
      return string.replace("plus", "+")
    } else {
      return string.replace("minus", "-")
    }
  }

  function filterCityData (value) {
    setFilterCity(value);
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Covid Plasma Finder</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <View style={{flex: 1, marginLeft: 10, marginRight: 10}}>
          <Dropdown
            ref={c => blood = c}
            label='Select Blood Type'
            data={bloodTypes}
            onChangeText={value => setFilterBlood(value)}
          />
        </View>
        <View style={{flex: 1, marginLeft: 10, marginRight: 10}}>
          <Dropdown
            label='Select City'
            data={pakCities}
            onChangeText={value =>   setFilterCity(value)}
          />
        </View>
      </View>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {loadingData ? <ActivityIndicator/> :
          data.map((item, index) => <ElevatedView elevation={3} style={styles.elevatedViewContainer} key={index}>
            <View style={styles.nameContainer}>
              <MaterialIcons name="person" size={20} color="white" />
              <Text style={styles.personName}>{item.name}</Text>
            </View>
            <View style={styles.nameContainer}>
              <Entypo name="drop" size={20} color="white"/>
              <Text style={styles.personName}>{setCorrectBloodTypeString(item.bloodType)}</Text>
            </View>
            <View style={styles.nameContainer}>
              <Entypo name="location" size={20} color="white"/>
              <Text style={styles.personName}>{item.location}</Text>
            </View>
            <View style={styles.nameContainer}>
              <MaterialIcons name="contact-phone" size={20} color="white"/>
              <Text style={styles.contactNumber}>{`+92${item.contactNumber}`}</Text>
            </View>
          </ElevatedView>)
        }
      </ScrollView>
      <FloatingAction
        actions={actions}
        floatingIcon={<Feather name="plus" size={40} color="white"/>}
        onPressItem={name => handlePress(name)}
        showBackground={false}
        color="#1C3334"
      />
      {becomeDonor()}
      {deleteInformation()}
    </View>
  );
}

DonorScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 30
  },
  header: {
    fontSize: 25,
    fontFamily: 'space-mono'
  },
  contentContainer: {
    paddingTop: 15,
  },
  elevatedViewContainer: {
    width: Dimensions.get('window').width - 40,
    height: 160,
    marginLeft: 20,
    backgroundColor: '#376E65',
    borderRadius: 20,
    justifyContent: 'space-evenly',
    marginBottom: 10
  },
  button: {
    width: Dimensions.get('window').width - 40,
    height: 150,
  },
  nameContainer: {
    flexDirection: 'row',
    marginLeft: 30,
  },
  personName: {
    fontSize: 15,
    fontFamily: 'hello-brilliant',
    marginLeft: (Dimensions.get('window').width - 20) / 3,
    color: 'white'
  },
  contactNumber: {
    fontSize: 15,
    marginLeft: (Dimensions.get('window').width - 20) / 3,
    fontWeight: '300',
    color: 'white'
  }
});
