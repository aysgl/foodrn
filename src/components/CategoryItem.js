/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES, FONTS} from '../constants';

export default function CategoryItem({item}) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  return (
    <TouchableOpacity
      style={{
        padding: SIZES.padding,
        paddingBottom: SIZES.padding * 2,
        backgroundColor:
          selectedCategory?.id === item.id ? COLORS.primary : COLORS.white,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SIZES.padding,
        ...styles.shadow,
      }}
      onPress={() => setSelectedCategory(item)}>
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor:
            selectedCategory?.id === item.id ? COLORS.white : COLORS.lightGray,
        }}>
        <Image
          source={item.icon}
          resizeMode="contain"
          style={{
            width: 30,
            height: 30,
          }}
        />
      </View>

      <Text
        style={{
          marginTop: SIZES.padding,
          color: selectedCategory?.id === item.id ? COLORS.white : COLORS.black,
          ...FONTS.body5,
        }}>
        {item.name}
      </Text>
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
