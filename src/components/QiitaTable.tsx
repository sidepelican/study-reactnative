import * as React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  FlatListProperties,
  ActivityIndicator,
  Modal,
  WebView,
} from 'react-native';
import QiitaTableCell from './QiitaTableCell';

interface Props {
  tabLabel: string
}

interface State {
  isLoading: boolean,
  data: ReadonlyArray<any>,
  showModal: boolean,
  webviewUrl: string,
}

export default class QiitaTable extends React.Component<Props, State> {
  state = {
    isLoading: false,
    data: [],
    showModal: false,
    webviewUrl: "",
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
    const replace = /http:/;
    this.setState({
      showModal: true,
      webviewUrl: url.replace(replace, "https:")
    });
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
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
          <WebView source={{uri: this.state.webviewUrl}} />
        </Modal>
        <FlatList
          data={this.state.data}
          keyExtractor={(item: any, index: number) => item.id}
          renderItem={({item}) => 
            <QiitaTableCell item={item} onPressTitle={(url)=>this._onPressItem(url)} />
          }
        />
      </View>
    );
  }
}