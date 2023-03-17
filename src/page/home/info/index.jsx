import { Image, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { Component, useState, useEffect } from 'react'
import { apiGet } from '../../../api/request';
import { Card, WhiteSpace, WingBlank } from '@ant-design/react-native';

export default function Info({ navigation }) {

  const [list, setList] = useState([]);

  useEffect(() => {
    apiGet({ url: 'list' })
    .then(res => {
        const { data = [] } = res;
        const list = data
        .filter(item => item.item_info && item.item_info.article_info && item.item_info.author_user_info)
        .map(item => ({
          image: item.item_info.article_info.cover_image || 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b795674cb3141338e3724e5c73a927d~tplv-k3u1fbpfcp-watermark.image?',
          title: item.item_info.article_info.title,
          author: item.item_info.author_user_info.user_name,
          avatar: item.item_info.author_user_info.avatar_large || 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b795674cb3141338e3724e5c73a927d~tplv-k3u1fbpfcp-watermark.image?',
        }));

        setList(list);
    })
    .catch(err => console.error(err));
  })

    return (
      <ScrollView>
        {
            list.map((item, index) => <NewsItem item={item} key={index} navigation={navigation} />)
        }
      </ScrollView>
    )
};

const NewsItem = ({ item, navigation }) => {
    return (
        <TouchableWithoutFeedback onPress={(e) => {
            navigation.navigate({ name: 'Search', params: item})
        }}>
            <View>
                <WingBlank size='lg'>
                    <Card>
                        <Card.Header title={item.title} />
                        <Card.Body>
                            <View>
                                <Image style={styles.image} source={{uri: item.image}} />
                            </View>
                        </Card.Body>
                        <Card.Footer 
                            content={
                                <Image style={styles.thumb} source={{uri: item.avatar}} />
                            }
                            extra={item.author}
                        />
                    </Card>
                </WingBlank>
                <WhiteSpace size='lg' />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {},
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover'
    },
    thumb: {
        width: 30,
        height: 30,
    }
})