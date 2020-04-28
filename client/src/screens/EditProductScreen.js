import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TextInput, Button, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {graphql} from 'react-apollo';
import {ReactNativeFile} from 'apollo-upload-client';

import {UPDATE_PRODUCT, ALL_PRODUCTS} from "../queries";
const EditProductScreen = (props) => {
  const item = (props.route.params.item);
  const [newProduct, setNewProduct] = useState({
    name: item.name,
    price: String(item.price),
    pictureUrl: `http://localhost:4000/${item.pictureUrl}`
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChangeText = (key, value) => {
    setNewProduct({...newProduct, [key]: value})
  };

  const {name, price, pictureUrl} = newProduct;

  const submit = async () => {
    if (isSubmitting) {
      return
    }
    const picture = new ReactNativeFile({
      uri: pictureUrl,
      type: 'img/png',
      name: 'name'
    });
    try {
      const {data} = await props.mutate({
        variables: {
          name, price: Number(price), picture, id: item.id
        },
        refetchQueries: [
          {query: ALL_PRODUCTS}
        ]
      });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
    setIsSubmitting(false);
    await props.navigation.navigate('Products');
  };

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  useEffect(() => {
    const action = () => getPermissionAsync();
    action();
  }, []);

  const _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setNewProduct({...newProduct, pictureUrl: result.uri});
      }
    } catch (E) {
      console.log(E);
    }
  };

  return (
    <View style={styles.center}>
      <View style={{ width: 200 }}>
        <TextInput
          onChangeText={text => onChangeText('name', text)}
          placeholder="name"
          value={name}
          style={styles.field}
          autoCapitalize="none"
        />
        <TextInput
          onChangeText={text => onChangeText('price', text)}
          placeholder="price"
          value={price}
          style={styles.field}
          autoCapitalize="none"
        />
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Button title="Pick an image from camera roll" onPress={_pickImage} />
          {pictureUrl && <Image source={{ uri: pictureUrl }} style={{ width: 200, height: 200 }} />}
        </View>
        <Button title="Save changes" onPress={submit}/>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  field: {
    marginBottom: 20,
    borderBottomWidth: 1,
    fontSize: 20
  }
});

export default graphql(UPDATE_PRODUCT)(EditProductScreen);