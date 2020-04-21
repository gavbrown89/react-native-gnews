import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    StatusBar,
    FlatList,
    SafeAreaView,
    ActivityIndicator,
} from 'react-native';
import axios from 'axios';

import Logo from '../assets/images/logo.png';

var dataArray = [];

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        }
    }
    componentDidMount() {
        this.fetchTopNews();
    }
    fetchTopNews = () => {
        axios({
            url: 'https://gnews.io/api/v3/search?q=example&token=YOUR_GNEWS_TOKEN',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.data)
        .then((data) => {
            console.log(data);
            dataArray.push(data);
            console.log('myData', dataArray)
            for (var i = 0; i < dataArray.length; i++) {
                this.setState({
                    newsData: dataArray[i].articles,
                });
                var Data = this.state.newsData;
                Data.forEach(function (o) {
                    Object.keys(o).forEach(function (k) {
                        if (o[k] === null) {
                            o[k] = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR6rQUQCwBXWv0XhEUVRuCjFzd5kewZps8VLXxcB9KhMqHKtal-&usqp=CAU';
                        }
                    });
                });
            } 
            console.log('TestData', this.state.newsData);
            this.setState({
                isLoading: false,
            });             
        })
      .catch(function (error) {
        if (error.response) {
          console.log('data', error.response.data);
          console.log('Status', error.response.status);
          console.log('Headers', error.response.headers);
        } else if ('Error request', error.request) {
          console.log('request', error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log('Error config', error.config);
      });   
    }
    render() {
        if (this.state.isLoading == true) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <StatusBar hidden={true} />
                    <ActivityIndicator size='large' color='#13AEE5' />                    
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} /> 
                <View style={styles.header}>
                    <Image source={Logo} style={{ width: 100, height: 33 }} />
                </View>   
                <SafeAreaView>
                    <FlatList 
                        data={this.state.newsData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => this.renderItem(item)}
                        renderItem={({item}) => <View style={styles.post}>
                            <View style={{ flexDirection: 'row'}}>
                                <Image         
                                    source={{
                                        uri: item.image,
                                    }}
                                    style={styles.newsImg}
                                />
                                <View style={styles.postText}>
                                    <Text style={styles.newsTitle}>
                                        {item.title}
                                    </Text>
                                    <Text style={styles.newsDesc}>
                                        {item.description}
                                    </Text>
                                </View>
                            </View>
                        </View>}
                    />
                </SafeAreaView>
            </View>
        )
    }
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,        
    },
    post: {
        padding: 5,
        borderBottomWidth: 0.5,
        borderColor: '#ccc'
    },
    postText: {
        flex: 1,
        paddingLeft: 2,
        paddingRight: 2
    },
    newsImg: {
        width: 80, 
        height: 80,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    newsTitle: {
        color: '#13AEE5',
        fontWeight: 'bold'
    },
    newsDesc: {
        fontSize: 10,
    }, 
})