/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {HomeScreen, SearchScreen, FavoriteScreen, UserScreen} from '../screens';
import {SCREEN} from '../routes/routes';
import {Image, TouchableOpacity, View, Animated} from 'react-native';
import {COLORS, icons} from '../constants';
import {Path, Svg} from 'react-native-svg';

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({accessibilityState, children, onPress}) => {
  var isSelected = accessibilityState.selected;
  const animation = new Animated.Value(0);

  const animateToValue = toValue => {
    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  if (isSelected) {
    animateToValue(1);
    return (
      <Animated.View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <Animated.View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            top: 0,
          }}>
          <View style={{flex: 1, backgroundColor: COLORS.white}}></View>
          <Svg width={75} height={80} viewBox="0 0 75 80">
            <Path
              d="M75.2 0v80H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={COLORS.white}
            />
          </Svg>

          <View style={{flex: 1, backgroundColor: COLORS.white}}></View>
        </Animated.View>

        <TouchableOpacity
          style={{
            top: -22.5,
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: COLORS.white,
            opacity: animation,
            transform: [
              {
                translateY: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [10, 0],
                }),
              },
            ],
          }}
          onPress={onPress}
          onPressIn={() => animateToValue(1)}
          onPressOut={() => animateToValue(0)}>
          {children}
        </TouchableOpacity>
      </Animated.View>
    );
  } else {
    animateToValue(0);
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          height: 80,
          backgroundColor: COLORS.white,
        }}
        activeOpacity={1}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }
};

export default function Tabs() {
  return (
    <Tab.Navigator
      tabBar={props => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: 'transparent',
          borderTopColor: 'transparent',
        },
      }}>
      <Tab.Screen
        name={SCREEN.HOME_SCREEN}
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.cutlery}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name={SCREEN.SEARCH_SCREEN}
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.search}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name={SCREEN.FAVORITE_SCREEN}
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.like}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name={SCREEN.USER_SCREEN}
        component={UserScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.user}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
}
