import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';

import DonorScreen from '../screens/DonorScreen';
import StatisticScreen from '../screens/StatisticScreen';
import Colors from '../constants/Colors';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Donors';

export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({ headerShown: false });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Donors"
        component={DonorScreen}
        options={{
          title: 'Donors',
          tabBarIcon: ({ focused }) => <DonorIcon focused={focused} name="ios-people" />,
        }}
      />
      <BottomTab.Screen
        name="Statistics"
        component={StatisticScreen}
        options={{
          title: 'Statistics',
          tabBarIcon: ({ focused }) => <StatisticsIcon focused={focused} name="graph" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function DonorIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={40}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}

function StatisticsIcon(props) {
  return (
    <SimpleLineIcons
      name={props.name}
      size={40}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
