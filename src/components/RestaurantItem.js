/* eslint-disable no-undef */
/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES, FONTS, icons} from '../constants';
import {categoryData} from '../data/categoriesData';
import {useNavigation} from '@react-navigation/native';
import {SCREEN} from '../routes/routes';

export default function RestaurantItem({item}) {
  const navigation = useNavigation();
  const categories = categoryData;
  const currentLocation = {
    streetName: 'Kuching',
    gps: {
      latitude: 1.5496614931250685,
      longitude: 110.36381866919922,
    },
  };

  const getCategoryNameById = id => {
    let category = categories.filter(c => c.id === id);
    if (category.length > 0) return category[0].name;
  };

  return (
    <TouchableOpacity
      style={{marginBottom: SIZES.padding * 2}}
      onPress={() =>
        navigation.navigate(SCREEN.RESTAURANT_SCREEN, {
          item,
          currentLocation,
        })
      }>
      <View style={{marginBottom: SIZES.padding}}>
        <Image
          source={item.photo}
          resizeMode="cover"
          style={{width: '100%', height: 200, borderRadius: SIZES.radius}}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            height: 50,
            width: SIZES.width * 0.3,
            backgroundColor: COLORS.white,
            borderTopRightRadius: SIZES.radius,
            borderBottomLeftRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
            ...styles.shadow,
          }}>
          <Text style={{...FONTS.h4}}> {item.duration}</Text>
        </View>
      </View>
      <View>
        <Text style={{...FONTS.body2}}>{item.name}</Text>
      </View>
      <View style={{marginTop: SIZES.padding, flexDirection: 'row'}}>
        <Image
          source={icons.star}
          style={{
            width: 20,
            height: 20,
            tintColor: COLORS.primary,
            marginRight: 10,
          }}
        />
        <Text style={{...FONTS.body3}}>{item.rating}</Text>

        {item.categories.map(id => (
          <View style={{flexDirection: 'row'}} key={id}>
            <Text style={{...FONTS.body3}}>{getCategoryNameById(id)}</Text>
            <Text style={{...FONTS.h3, color: COLORS.darkgray}}>.</Text>
          </View>
        ))}
        {[1, 2, 3].map(priceRating => (
          <Text
            key={priceRating}
            style={{
              ...FONTS.body3,
              color:
                priceRating <= item.priceRating
                  ? COLORS.black
                  : COLORS.darkgray,
            }}>
            $
          </Text>
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});
