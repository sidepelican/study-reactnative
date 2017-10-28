import * as React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  FlatListProperties,
  ActivityIndicator,
} from 'react-native';
import QiitaTableCell from './QiitaTableCell';

interface Props {
  tabLabel: string,
  onOpenUrl: (url: string)=>void,
}

interface State {
  isLoading: boolean,
  data: ReadonlyArray<any>,
}

export default class QiitaTable extends React.Component<Props, State> {
  state = {
    isLoading: false,
    data: [],
  }
  
  componentDidMount() {
    this.fetchArticlesList();
  }

  fetchArticlesList() {
    this.setState({isLoading: true});

    return fetch('https://qiita.com//api/v2/tags/' + this.props.tabLabel + '/items')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        data: responseJson,
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  _onPressItem(url: string) {
    // const replace = /http:/;
    // this.setState({
    //   showModal: true,
    //   webviewUrl: url.replace(replace, "https:")
    // });
    this.props.onOpenUrl(url.replace(/http:/, "https:"));
  }
  
  render() {
    if (this.state.isLoading) {
      const styles: any = StyleSheet.create({
        indicator: {flex: 1, paddingTop: 20}
      });
      return (
        <View style={styles.indicator}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <FlatList
        data={this.state.data}
        keyExtractor={(item: any, index: number) => item.id}
        renderItem={({item}) => 
          <QiitaTableCell item={item} onPressTitle={(url)=>this._onPressItem(url)} />
        }
      />
    );
  }
}