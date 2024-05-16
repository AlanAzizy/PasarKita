import { ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { stocks } from './Home';
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
        <View style={{width:'90%', margin : 15}}>
          <SearchBar clicked={clicked} searchPhrase={phrase} setClicked={setClicked} setSearchPhrase={setPhrase}/>
        </View>
        <ScrollView style={styles.container}>
          <View style={{width:'95%', marginHorizontal:'2.5%'}}>
          {stocks.map((item)=>item.id ? <StockCardEdit key={item.id} id={item.id} current_number={item.current_number} prev_number={item.prev_number} name={item.name} price={item.price}/> : "")}
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
