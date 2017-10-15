import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  GestureResponderEvent,
} from 'react-native';

const styles: any = StyleSheet.create({
  cell: {
    flex: 1,
    flexDirection: 'column',
  },
  bottom_right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 3,
  },
  title: {
    color: '#337ab7',
    fontSize: 18,
    fontWeight: 'bold'
  },
  tags: {
    marginTop: 4,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems:'center',
  },
  tagText: {
    marginLeft: 10,
    padding: 2,
    borderRadius: 4,
    backgroundColor: '#DDDDDD',
    minHeight: 20,
  },
});

interface Props {
  item: any
  onPressTitle?: (link: string)=>void
}

export default class QiitaTableCell extends React.Component<Props, {}> {
  render() {
    const tagNames = this.props.item.tags.map((tag: any)=> tag.name);
  
    return (
      <View style={styles.cell}>
        <Text style={styles.title}
          onPress={() => {
            if (this.props.onPressTitle) {
              this.props.onPressTitle(this.props.item.url);
            }
          }}
        >{this.props.item.title}</Text>
        <View style={styles.tags}>
          {tagNames.map((tagName: string) => (
            <View style={styles.tagText}>
              <Text>{tagName}</Text>
            </View>
          ))}
        </View>
        <View style={styles.bottom_right}>
          <Text>likes: {this.props.item.likes_count}</Text>
          <Text> </Text>
          <Text>comments: {this.props.item.comments_count}</Text>
        </View>
      </View>
    );
  }
}