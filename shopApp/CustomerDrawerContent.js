import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()} style={styles.closeButton}>
          <Ionicons name="close" size={30} color="black"  style={{marginLeft:-230}}/>
        </TouchableOpacity>
      </View>
      <DrawerItemList {...props} itemStyle={styles.drawerItem} />
      <DrawerItem
        label="Help"
        onPress={() => alert('Link to help')}
        labelStyle={styles.helpItem}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
    marginBottom: 20,
     padding:0
  },
  closeButton: {
    padding: 10,
  },
  drawerItem: {
    marginHorizontal: 0,
    padding:0
  },
  helpItem: {
    color: 'blue',
     padding:2
  },
});

export default CustomDrawerContent;
