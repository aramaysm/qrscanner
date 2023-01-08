import React, { useState } from 'react';

import { SafeAreaView, StyleSheet, View, FlatList, Image } from 'react-native';

const App_Layout = () => {
    const [dataSource, setDataSource] = useState([]);
  
    useState(() => {
      let items = Array.apply(null, Array(60)).map((v, i) => {
        return { id: i, src: 'http://placehold.it/200x200?text=' + (i + 1) };
      });
      setDataSource(items);
    }, []);
  
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={dataSource}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
              <Image style={styles.imageThumbnail} source={{ uri: item.src }} />
            </View>
          )}
          //Setting the number of column
          numColumns={3}
          keyExtractor={(item, index) => index}
        />
      </SafeAreaView>
    );
  };
export default App_Layout;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    imageThumbnail: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
    },
  });
  