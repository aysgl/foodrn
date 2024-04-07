/* eslint-disable react/self-closing-comp */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {COLORS} from '../constants';
import {Car, Location} from 'iconsax-react-native';

export default function OrderDeliveryScreen({route, navigation}) {
  const [restaurant, setRestaurant] = useState(null);
  const [streetName, setStreetName] = useState('');
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [region, setRegion] = useState(null);

  const polylineCoordinates = [fromLocation, toLocation];
  useEffect(() => {
    let {restaurant, currentLocation} = route.params;
    // console.log('r', restaurant);
    // console.log('c', currentLocation);
    let fromLoc = currentLocation.gps;
    let toLoc = restaurant.location;
    let street = currentLocation.streetName;

    let mapRegion = {
      latitude: (fromLoc.latitude + toLoc.latitude) / 2,
      longitude: (fromLoc.longitude + toLoc.longitude) / 2,
      latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
      longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,
    };

    setRestaurant(restaurant);
    setStreetName(street);
    setFromLocation(fromLoc);
    setToLocation(toLoc);
    setRegion(mapRegion);
  }, []);

  return (
    <MapView style={{flex: 1}} initialRegion={region}>
      <Polyline
        coordinates={polylineCoordinates}
        strokeColor={COLORS.primary}
        strokeWidth={2}
      />
      <Marker
        coordinate={{
          latitude: toLocation?.latitude,
          longitude: toLocation?.longitude,
        }}>
        <Location size="32" color={COLORS.primary} variant="Bold" />
      </Marker>
      <Marker coordinate={fromLocation} anchor={{x: 0.5, y: 0.5}}>
        <Car size="32" color={COLORS.primary} variant="Bulk" />
      </Marker>
    </MapView>
  );
}
