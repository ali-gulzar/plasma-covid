import * as React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons, AntDesign, Feather, MaterialIcons, Entypo } from '@expo/vector-icons';
import { FloatingAction } from "react-native-floating-action";
import ElevatedView from 'react-native-elevated-view'

const actions = [
  {
    text: "Become a donor",
    icon: <AntDesign name="star" size={20} color="white"/>,
    name: "camera",
    position: 1,
    color: "#FF652F"
  },
  {
    text: "Delete your information",
    icon: <MaterialCommunityIcons name="delete-forever" size={20} color="white"/>,
    name: "gallery",
    position: 2,
    color: "#2f95dc"
  }
];

export default function DonorScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Covid Plasma Finder</Text>
      </View>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <ElevatedView elevation={3} style={styles.elevatedViewContainer}>
            <View style={styles.nameContainer}>
              <MaterialIcons name="person" size={20} color="white" />
              <Text style={styles.personName}>Muhammad Ali Gulzar</Text>
            </View>
            <View style={styles.nameContainer}>
              <Entypo name="drop" size={20} color="white"/>
              <Text style={styles.personName}>B+</Text>
            </View>
            <View style={styles.nameContainer}>
              <Entypo name="location" size={20} color="white"/>
              <Text style={styles.personName}>Lahore</Text>
            </View>
            <View style={styles.nameContainer}>
              <MaterialIcons name="contact-phone" size={20} color="white"/>
              <Text style={styles.contactNumber}>+923016826111</Text>
            </View>
        </ElevatedView>
      </ScrollView>
      <FloatingAction
        actions={actions}
        floatingIcon={<Feather name="plus" size={40} color="white"/>}
        onPressItem={name => this.handlePress(name)}
        showBackground={false}
        color="#1C3334"
      />
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
    fontSize: 20,
    fontFamily: 'space-mono'
  },
  contentContainer: {
    paddingTop: 30,
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
