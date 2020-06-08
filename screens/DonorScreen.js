import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons, AntDesign, Feather } from '@expo/vector-icons';
import { FloatingAction } from "react-native-floating-action";

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
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

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
  contentContainer: {
    paddingTop: 30,
  },
});
