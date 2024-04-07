/* eslint-disable react-native/no-inline-styles */
import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {SIZES, FONTS} from '../constants';
import CategoryItem from './CategoryItem';

export default function Categories({categories}) {
  return (
    <View style={{padding: SIZES.padding * 2}}>
      <Text style={{...FONTS.h1}}>Main</Text>
      <Text style={{...FONTS.h1}}>Categories</Text>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={item => (
          <CategoryItem categories={categories} item={item} />
        )}
        contentContainerStyle={{paddingVertical: SIZES.padding * 2}}
      />
    </View>
  );
}
