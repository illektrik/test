import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, Image, Button, TextInput, ActivityIndicator} from 'react-native';
import {graphql} from 'react-apollo';
import {connect} from 'react-redux'
import { useMutation } from "@apollo/react-hooks";

import {ALL_PRODUCTS, DELETE_PRODUCT} from "../queries";

const ProductsScreen = ({userId, data: {products, refetch, variables}, loading, navigation}) => {
  if (loading || !products) return <Text>Loading...</Text>;

  const [query, setQuery] = useState('');

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
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            refetch({where: {
              name_contains: text
            }})
          } }
        />
      </View>
      <View style={styles.sort}>
        <Button
          style={styles.sortBtn}
          title="Name"
          onPress={() => {
            refetch({orderBy: variables.orderBy === 'name_DESC' ? 'name_ASC' : 'name_DESC'});
          }}
        />
        <Button
          style={styles.sortBtn}
          title="Price"
          onPress={() => {
            refetch({orderBy: variables.orderBy === 'price_DESC' ? 'price_ASC' : 'price_DESC'});
          }}
        />
      </View>
      <FlatList
        keyExtractor={item => item.id}
        data={products}
        style={styles.flatList}
        onEndReached={() => console.log('done!!')}
        onEndReachedThreshold={0}
        ListFooterComponent={() => <ActivityIndicator size="small" color="black" />}
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
  },
  flatList: {
    marginBottom: 100
  }
});

export default connect(state => ({userId: state.user.userId}))(graphql(ALL_PRODUCTS)(ProductsScreen));