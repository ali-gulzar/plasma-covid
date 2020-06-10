import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ElevatedView from 'react-native-elevated-view';
import { FontAwesome, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import LottieView  from "lottie-react-native";

export default function StatisticScreen() {
  
  const [fetching, setFetching] = useState(true);
  const [covidData, setCovidData] = useState({});

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData () {
    setFetching(true);
    const data = await fetch('https://corona.lmao.ninja/v2/countries/pakistan');
    const stats = await data.json();
    setFetching(false);
    setCovidData(stats);
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Pakistan Statistics</Text>
      </View>
      {fetching ? <LottieView
          autoPlay
          loop
          source={require('../assets/animations/waitting.json')}
        /> :
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <ElevatedView elevation={10} style={[styles.cardContainer, {backgroundColor: '#3B8BEB'}]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <FontAwesome name="bed" size={80} color="white" style={{marginLeft: 20}} />
            </View>
            <View style={{marginRight: Dimensions.get('window').width / 8}}>
              <Text style={styles.title}>
                Total Cases
              </Text>
              <Text style={styles.value}>
                {covidData.cases}
              </Text>
              <Text style={styles.title}>
                Cases Today
              </Text>
              <Text style={styles.value}>
                {covidData.todayCases}
              </Text>
            </View>
          </View>
        </ElevatedView>
        <ElevatedView elevation={10} style={[styles.cardContainer, {backgroundColor: '#B23850'}]} >
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <FontAwesome5 name="band-aid" size={70} color="white" style={{marginLeft: 20}} />
            </View>
            <View style={{marginRight: Dimensions.get('window').width / 8}}>
              <Text style={styles.title}>
                Total Death
              </Text>
              <Text style={styles.value}>
                {covidData.deaths}
              </Text>
              <Text style={styles.title}>
                Death Today
              </Text>
              <Text style={styles.value}>
                {covidData.todayDeaths}
              </Text>
            </View>
          </View>
        </ElevatedView>
        <ElevatedView elevation={10} style={styles.cardContainer} >
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <AntDesign name="heart" size={80} color="white" style={{marginLeft: 20}} />
            </View>
            <View style={{marginRight: Dimensions.get('window').width / 20}}>
              <Text style={styles.title}>
                Total Recoveries
              </Text>
              <Text style={styles.value}>
                {covidData.recovered}
              </Text>
              <Text style={styles.title}>
                Recoveries Today
              </Text>
              <Text style={styles.value}>
                {covidData.todayRecovered}
              </Text>
            </View>
          </View>
        </ElevatedView>
      </ScrollView>
      }
      
    </View>
  );
}

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
    paddingTop: 30,
  },
  cardContainer: {
    width: Dimensions.get('window').width - 40,
    height: 200,
    marginLeft: 20,
    backgroundColor: '#00887A',
    borderRadius: 20,
    justifyContent: 'space-evenly',
    marginBottom: 10
  },
  title: {
    fontSize: 20,
    fontFamily: 'space-mono',
    color: 'white'
  },
  value: {
    fontSize: 15,
    fontFamily: 'space-mono',
    // color: 'white'
  }
});
