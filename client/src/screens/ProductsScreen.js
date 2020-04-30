import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, Image, Button, TextInput, ActivityIndicator} from 'react-native';
import {graphql} from 'react-apollo';
import {connect} from 'react-redux'
import { useMutation } from "@apollo/react-hooks";

import {ALL_PRODUCTS, DELETE_PRODUCT} from "../queries";

const ProductsScreen = ({userId, data: {productsConnection, refetch, variables, fetchMore, loading}, navigation}) => {
  if (loading || !productsConnection) return <Text>Loading...</Text>;

  const [query, setQuery] = useState('');
  const [startPagination, setStartPagination] = useState(false);

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
            !loading && refetch({orderBy: variables.orderBy === 'name_DESC' ? 'name_ASC' : 'name_DESC', after: null});
          }}
        />
        <Button
          style={styles.sortBtn}
          title="Price"
          onPress={() => {
            !loading && refetch({orderBy: variables.orderBy === 'price_DESC' ? 'price_ASC' : 'price_DESC', after: null});
          }}
        />
      </View>
      <FlatList
        keyExtractor={item => item.node.id}
        data={productsConnection.edges}
        style={styles.flatList}
        onMomentumScrollBegin={() => setStartPagination(true)}
        onEndReached={() => {
          if (!loading && productsConnection.pageInfo.hasNextPage && startPagination) {
            fetchMore({
              variables: {
                after: productsConnection.pageInfo.endCursor
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) {
                  return previousResult;
                }
                return {
                  productsConnection: {
                    __typename: 'ProductConnection',
                    pageInfo: fetchMoreResult.productsConnection.pageInfo,
                    edges: [
                      ...previousResult.productsConnection.edges,
                      ...fetchMoreResult.productsConnection.edges,
                    ],
                  },
                };
              },
            });
          }
          setStartPagination(false);
        } }
        onEndReachedThreshold={0}
        ListFooterComponent={() => {
          if (productsConnection.pageInfo.hasNextPage) return <ActivityIndicator size="small" color="black"/>
          return null
        }}
        renderItem={({item}) =>(
          <View style={styles.raw}>
            <Image style={styles.images} source={{ uri: `http://localhost:4000/${item.node.pictureUrl}`}}/>
            <View style={styles.right}>
              <Text style={styles.name}>{item.node.name}</Text>
              <Text style={styles.price}>${item.node.price}</Text>
              <View style={styles.editDelete}>
                <Button title="Edit" onPress={() => {
                  navigation.navigate('Edit product', {item})
                } }/>
                <Button title="Delete" onPress={() => deletingProduct(item.node)}/>
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

export default connect(state => (
  {userId: state.user.userId}))(graphql(ALL_PRODUCTS)(ProductsScreen)
);