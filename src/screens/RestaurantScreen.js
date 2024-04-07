/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SIZES, FONTS, icons} from '../constants';
import {ArrowLeft, Card, HambergerMenu, Location} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {SCREEN} from '../routes/routes';

export default function RestaurantScreen({route}) {
  const [restaurant, setRestaurant] = useState(null);
  const scrollX = new Animated.Value(0);
  const navigation = useNavigation();
  const [orderItems, setOrderItems] = useState([]);
  let {item, currentLocation} = route.params;

  useEffect(() => {
    setRestaurant(item);
  });

  const editOrder = (action, menuId, price) => {
    let orderList = orderItems.slice();
    let item = orderList.filter(a => a.menuId === menuId);

    if (action === '+') {
      if (item.length > 0) {
        let newQty = item[0].qty + 1;
        item[0].qty = newQty;
        item[0].total = item[0].qty * price;
      } else {
        const newItem = {
          menuId: menuId,
          qty: 1,
          price: price,
          total: price,
        };
        orderList.push(newItem);
      }

      setOrderItems(orderList);
    } else {
      if (item.length > 0) {
        if (item[0]?.qty > 0) {
          let newQty = item[0].qty - 1;
          item[0].qty = newQty;
          item[0].total = newQty * price;
        }
      }

      setOrderItems(orderList);
    }
  };

  const getOrderQty = menuId => {
    let orderItem = orderItems?.filter(a => a.menuId === menuId);

    if (orderItem.length > 0) {
      return orderItem[0].qty;
    }

    return 0;
  };

  const getBasketItemCount = () => {
    return orderItems?.reduce((a, b) => a + b.qty, 0);
  };

  const sumOrder = () => {
    return orderItems?.reduce((a, b) => a + b.total, 0).toFixed(2);
  };

  const renderHeader = () => {
    return (
      <View style={{flexDirection: 'row', height: 50}}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <ArrowLeft size="32" color={COLORS.black} />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: 50,
              backgroundColor: COLORS.lightGray3,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: SIZES.radius,
              paddingHorizontal: SIZES.padding * 3,
            }}>
            <Text style={{...FONTS.h3}}>{restaurant?.name}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: 'center',
          }}>
          <HambergerMenu size="32" color={COLORS.black} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderFoodInfo = () => {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}>
        {restaurant?.menu.map((item, index) => (
          <View key={`menu-${index}`} style={{alignItems: 'center'}}>
            <View style={{height: SIZES.height * 0.35}}>
              <Image
                source={item.photo}
                resizeMode="cover"
                style={{
                  width: SIZES.width,
                  height: '100%',
                }}
              />

              <View
                style={{
                  position: 'absolute',
                  bottom: -20,
                  width: SIZES.width,
                  height: 50,
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    width: 50,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopLeftRadius: 25,
                    borderBottomLeftRadius: 25,
                  }}
                  onPress={() => editOrder('-', item.menuId, item.price)}>
                  <Text style={{...FONTS.body1}}>-</Text>
                </TouchableOpacity>

                <View
                  style={{
                    width: 50,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{...FONTS.h2}}>{getOrderQty(item.menuId)}</Text>
                </View>

                <TouchableOpacity
                  style={{
                    width: 50,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopRightRadius: 25,
                    borderBottomRightRadius: 25,
                  }}
                  onPress={() => editOrder('+', item.menuId, item.price)}>
                  <Text style={{...FONTS.body1}}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                width: SIZES.width,
                alignItems: 'center',
                marginTop: 15,
                paddingHorizontal: SIZES.padding * 2,
              }}>
              <Text
                style={{marginVertical: 10, textAlign: 'center', ...FONTS.h2}}>
                {item.name} - {item.price.toFixed(2)}
              </Text>
              <Text style={{...FONTS.body3}}>{item.description}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
              }}>
              <Image
                source={icons.fire}
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 10,
                }}
              />

              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.darkgray,
                }}>
                {item.calories.toFixed(2)} cal
              </Text>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    );
  };

  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: SIZES.padding,
        }}>
        {restaurant?.menu.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          const dotSize = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
            extrapolate: 'clamp',
          });
          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              opacity={opacity}
              style={{
                width: dotSize,
                height: dotSize,
                borderRadius: dotSize,
                backgroundColor: dotColor,
                marginHorizontal: 6,
              }}
            />
          );
        })}
      </View>
    );
  };

  const renderOrder = () => {
    return (
      <View>
        {renderDots()}

        <View
          style={{
            backgroundColor: COLORS.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            bottom: -35,
            paddingBottom: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
              borderBottomColor: COLORS.lightGray2,
              borderBottomWidth: 1,
            }}>
            <Text style={{...FONTS.h3}}>
              {getBasketItemCount()} items in cart
            </Text>
            <Text style={{...FONTS.h3}}>${sumOrder()}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Location size="30" color={COLORS.black} />
              <Text style={{marginLeft: SIZES.padding, ...FONTS.body3}}>
                Location
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Card size="30" color={COLORS.black} />
              <Text style={{marginLeft: SIZES.padding, ...FONTS.h4}}>8888</Text>
            </View>
          </View>
          <View
            style={{
              padding: SIZES.padding * 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: SIZES.width * 0.9,
                padding: SIZES.padding,
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                borderRadius: SIZES.radius,
              }}
              onPress={() =>
                navigation.navigate(SCREEN.ORDER_DELIVERY_SCREEN, {
                  restaurant,
                  currentLocation,
                })
              }>
              <Text style={{...FONTS.h2, color: COLORS.white}}>Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderFoodInfo()}
      {renderOrder()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
});
