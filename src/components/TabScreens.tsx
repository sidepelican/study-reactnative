import * as React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
var ScrollableTabView = require('react-native-scrollable-tab-view');
import QiitaTable from './QiitaTable';

export default class TabScreens extends React.Component<{}, {}> {
  render() {
    return (
      <ScrollableTabView>
        <QiitaTable tabLabel="iOS" />
        <QiitaTable tabLabel="Swift" />
        <QiitaTable tabLabel="macOS" />
      </ScrollableTabView>
    );
  }
}