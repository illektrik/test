import React from 'react';
import {View, Text, StyleSheet, FlatList, Image, Button, TextInput} from 'react-native';
import {graphql} from 'react-apollo';
import {connect} from 'react-redux'
import { useMutation } from "@apollo/react-hooks";

import {ALL_PRODUCTS, DELETE_PRODUCT} from "../queries";

const ProductsScreen = ({userId, data: {products, refetch, variables}, loading, navigation}) => {
  if (loading || !products) return <Text>Loading...</Text>;

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [{query: ALL_PRODUCTS}]
  });

  const deletingProduct = async item => {
    await deleteProduct({
      variables: {
        id: item.id
      }
    })
  };

  return (
    <View>
      <View>
        <TextInput style={styles.searchBar} placeholder="Search" onPress={() => {}}/>
      </View>
      <View style={styles.sort}>
        <Button style={styles.sortBtn} title="Name"/>
        <Button
          style={styles.sortBtn}
          title="Price"
          onPress={() => {
            refetch({orderBy: 'price_DESC'});
            console.log(variables)
          }}
        />
      </View>
      <FlatList
        keyExtractor={item => item.id}
        data={products}
        renderItem={({item}) =>(
          <View style={styles.raw}>
            <Image style={styles.images} source={{ uri: `http://localhost:4000/${item.pictureUrl}`}}/>
            <View style={styles.right}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price}</Text>
              <View style={styles.editDelete}>
                <Button title="Edit" onPress={() => {
                  navigation.navigate('Edit product', {item})
                } }/>
                <Button title="Delete" onPress={() => deletingProduct(item)}/>
              </View>
            </View>
          </View>
        ) }
      />
    </View>
  )
};

const styles = StyleSheet.create({
  images: {
    height: 100,
    width: 100,
  },
  raw: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
  },
  right: {
    flex: 1,
    marginLeft: 10,
    marginRight: 30,
    alignItems: 'flex-end'
  },
  name: {
    fontSize: 40
  },
  price: {
    fontSize: 30
  },
  editDelete: {
    flexDirection: 'row'
  },
  sort: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  sortBtn: {
    flex: 1
  },
  searchBar: {
    margin: 10,
    borderBottomWidth: 1,
  }
});

export default connect(state => ({userId: state.user.userId}))(graphql(ALL_PRODUCTS)(ProductsScreen));