import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator
} from 'react-native';


export default class QiitaTable extends React.PureComponent {
  state = {
    isLoading: false,
    ds: [],
  }
  
  componentDidMount() {
    this.fetchArticlesList();
  }

  fetchArticlesList() {
    this.setState({isLoading: true});

    return fetch('https://qiita.com//api/v2/tags/iOS/items')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        ds: responseJson,
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }
  
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <FlatList
        data={this.state.ds}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => <Text>{item.title}</Text>}
      /> 
    );
  }
}