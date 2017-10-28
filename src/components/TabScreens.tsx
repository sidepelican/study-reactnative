import * as React from 'react';
import {
  View,
  Modal,
  Button,
  WebView,
} from 'react-native';
var ScrollableTabView = require('react-native-scrollable-tab-view');
import QiitaTable from './QiitaTable';

export default class TabScreens extends React.Component<{}, {
  showModal: boolean,
  webviewUrl: string,
}> {
  state = {
    showModal: false,
    webviewUrl: "",
  }

  _onOpenUrl(url: string) {
    // this.props.navigation.navigate('Details', {url: url})
    this.setState({
      showModal: true,
      webviewUrl: url
    })
  }

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
          <WebView source={{uri: this.state.webviewUrl}} />
          <Button 
              onPress={()=>{this.setState({showModal: false})}} 
              title="Back"
            />
        </Modal>
        <ScrollableTabView>
          <QiitaTable tabLabel="iOS" onOpenUrl={(url)=>this._onOpenUrl(url)}/>
          <QiitaTable tabLabel="Swift" onOpenUrl={(url)=>this._onOpenUrl(url)}/>
          <QiitaTable tabLabel="macOS" onOpenUrl={(url)=>this._onOpenUrl(url)}/>
        </ScrollableTabView>
      </View>
    );
  }
}