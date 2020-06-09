import * as React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons, AntDesign, Feather } from '@expo/vector-icons';
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
        <ElevatedView elevation={3} style={styles.stayElevated}>
          <TouchableOpacity>
            <Text>Something</Text>
          </TouchableOpacity>
        </ElevatedView>
      </ScrollView>
      <FloatingAction
        actions={actions}
        floatingIcon={<Feather name="plus" size={40} color="white"/>}
        onPressItem={name => this.handlePress(name)}
        showBackground={false}
        color="#272727"
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
  stayElevated: {
    width: Dimensions.get('window').width - 40,
    height: 100,
    marginLeft: 20,
    backgroundColor: 'white',
    borderRadius: 20
  }
});
