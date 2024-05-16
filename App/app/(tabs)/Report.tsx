import { ScrollView, StyleSheet, Image, Pressable, Dimensions } from 'react-native';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { stocks } from './Home';
import StockCardEdit from '@/components/StockCardEdit';
import SearchBar from '@/components/SearchBar';
import { Feather, Entypo, FontAwesome6, FontAwesome } from '@expo/vector-icons';

const _width  = Dimensions.get('screen').width
const _height  = Dimensions.get('screen').height

export default function Stocks() {

  const navigation = useNavigation();

  const [phrase, setPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    navigation.setOptions({headerTitleAlign : 'center' ,headerTitleStyle : {color:'#53845D', fontWeight:'bold', fontFamily:'Poppins-Regular', fontSize:24} });  }, 
    [navigation]);

    useEffect(() => {
      const unsubscribe = navigation.addListener("blur", () => {
        
        setPhrase("");
      });
  
      return unsubscribe;
    }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={{flex : 2.5, width:'90%', alignItems:'center', borderWidth:0, borderColor:'#f000ff'}}>
        <Text style={{alignSelf:'flex-start', fontSize:20, fontFamily:'Poppins-Regular', color : '#767676', fontWeight : 'bold'}}>Statistic</Text>
        <Image source={require('../../assets/images/Stat.png')} resizeMode='contain' style={{width:'100%', height:'90%' ,borderColor:'#000ff0', borderWidth:0}}></Image>
      </View>
      <View style={{flex : 2, width:'90%', alignItems:'center', borderWidth:0, borderColor:'#f000ff', backgroundColor:'#FAFAFA'}}>
        <View style={{flex:3, gap:15, flexDirection : 'row', flexWrap:'wrap', justifyContent:'space-evenly', alignItems:'stretch', backgroundColor:'#FAFAFA'}}>
          <Pressable style={{borderRadius : 10,width:'45%', height : '35%', backgroundColor:'#ffffff', borderWidth:0, borderColor:'#aa00ff', alignItems:'center', padding:10, flexDirection:'row'}}>
            <View style={{height:_height*0.05, width:_height*0.05, backgroundColor:'#A2CF6E', justifyContent:'center', alignItems:'center', borderRadius:5}}>
              <FontAwesome name='line-chart' size={_height*0.035} color={'#ffffff'}/>
            </View>
            <Text style={{marginHorizontal:20}}>Profit</Text>
          </Pressable>
          <Pressable style={{borderRadius : 10,width:'45%', height : '35%', backgroundColor:'#ffffff', borderWidth:0, borderColor:'#aa00ff', alignItems:'center', padding:10, flexDirection:'row'}}>
            <View style={{height:_height*0.05, width:_height*0.05, backgroundColor:'#4BAEE6', justifyContent:'center', alignItems:'center', borderRadius:5}}>
              <Feather name='box' size={_height*0.035} color={'#ffffff'}/>
            </View>
            <Text style={{marginHorizontal:20}}>Profit</Text>
          </Pressable>
          <Pressable style={{borderRadius : 10,width:'45%', height : '35%', backgroundColor:'#ffffff', borderWidth:0, borderColor:'#aa00ff', alignItems:'center', padding:10, flexDirection:'row'}}>
            <View style={{height:_height*0.05, width:_height*0.05, backgroundColor:'#FFC008', justifyContent:'center', alignItems:'center', borderRadius:5}}>
              <Feather name='user' size={_height*0.035} color={'#ffffff'}/>
            </View>
            <Text style={{marginHorizontal:20}}>Profit</Text>
          </Pressable>
          <Pressable style={{borderRadius : 10,width:'45%', height : '35%', backgroundColor:'#ffffff', borderWidth:0, borderColor:'#aa00ff', alignItems:'center', padding:10, flexDirection:'row'}}>
            <View style={{height:_height*0.05, width:_height*0.05, backgroundColor:'#F24D1F', justifyContent:'center', alignItems:'center', borderRadius:5}}>
              <Feather name='book' size={_height*0.035} color={'#ffffff'}/>
            </View>
            <Text style={{marginHorizontal:20}}>Profit</Text>
          </Pressable>
        </View>
      </View>
      <View style={{flex : 2.5, width:'90%', alignItems:'center', borderWidth:0, borderColor:'#f000ff', backgroundColor:'#FAFAFA', gap:10}}>
        <Text style={{alignSelf:'flex-start', fontSize:20, fontFamily:'Poppins-Regular', color : '#767676', fontWeight : 'bold'}}>Export</Text>
        <View style={{flex:3, gap:25, flexDirection : 'row', flexWrap:'nowrap', justifyContent:'space-evenly', alignItems:'flex-start', padding : 20, backgroundColor:'#FAFAFA'}}>
          <Pressable style={{flex:1,borderRadius:10, width:'25%', height : '85%', backgroundColor:'#ffffff', borderWidth:0, borderColor:'#aa00ff', justifyContent:'center', alignItems:'center', gap:10}}>
            <View style={{backgroundColor:'#4BAEE6', height:_height*0.05, width : _height*0.05,justifyContent:'center', alignItems:'center', borderRadius:5}}>
              <Feather name="printer" color={'#ffffff'} size={_height*0.04} style={{borderWidth:0, borderColor:'#ff0000'}}></Feather>
            </View>
            <Text>Print</Text>
          </Pressable>
          <Pressable style={{flex:1,borderRadius:10, width:'25%', height : '85%', backgroundColor:'#ffffff', borderWidth:0, borderColor:'#aa00ff', justifyContent:'center', alignItems:'center', gap:10}}>
            <View style={{backgroundColor:'#A2CF6E', height:_height*0.05, width : _height*0.05,justifyContent:'center', alignItems:'center', borderRadius:5}}>
              <Entypo name="spreadsheet" color={'#ffffff'} size={_height*0.04} style={{borderWidth:0, borderColor:'#ff0000'}}/>
            </View>
            <Text>Excel</Text>
          </Pressable>
          <Pressable style={{flex:1,borderRadius:10, width:'25%', height : '85%', backgroundColor:'#ffffff', borderWidth:0, borderColor:'#aa00ff', justifyContent:'center', alignItems:'center', gap:10}}>
            <View style={{backgroundColor:'#F24D1F', height:_height*0.05, width : _height*0.05,justifyContent:'center', alignItems:'center', borderRadius:5}}>
              <FontAwesome6 name="file-pdf" color={'#ffffff'} size={_height*0.04} style={{borderWidth:0, borderColor:'#ff0000'}}></FontAwesome6>
            </View>
            <Text>Pdf</Text>
          </Pressable>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom : 0,
    flex : 1,
    borderColor : '#111111',
    borderWidth : 0,
    backgroundColor : '#FAFAFA',
    alignItems : 'center',
    gap : 20
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
