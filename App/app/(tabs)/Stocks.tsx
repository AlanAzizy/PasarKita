import { ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { orderHistory } from './Home';
import StockCardEdit from '@/components/StockCardEdit';
import SearchBar from '@/components/SearchBar';

export default function Stocks() {

  const navigation = useNavigation();

  const [phrase, setPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    navigation.setOptions({headerTitleAlign : 'left' ,headerTitleStyle : {color:'#53845D', fontWeight:'bold', fontFamily:'Poppins-Regular', fontSize:24} });  }, 
    [navigation]);

    useEffect(() => {
      const unsubscribe = navigation.addListener("blur", () => {
        
        setPhrase("");
      });
  
      return unsubscribe;
    }, [navigation]);

  return (
    <View style={{flex : 1, justifyContent:'center', alignItems:'center'}}>
        <SearchBar clicked={clicked} searchPhrase={phrase} setClicked={setClicked} setSearchPhrase={setPhrase}/>
        <ScrollView style={styles.container}>
          <View style={{width:'95%', marginHorizontal:'2.5%'}}>
          {orderHistory.map((item)=>item.id ? <StockCardEdit id={item.id} nominal={item.nominal} number={item.number} status={item.status}/> : "")}
          </View>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom : 0,
    flex : 1,
    borderColor : '#111111',
    borderWidth : 0
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
