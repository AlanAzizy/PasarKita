import { View, StyleSheet, ScrollView, Dimensions, Text, Pressable, FlatList } from "react-native"
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import {LinearGradient} from "expo-linear-gradient";
import useFonts from "@/components/useFonts";
import { AntDesign, Feather } from "@expo/vector-icons";
import HistoryItem,{history} from "@/components/HistoryItem";
import AddHistory from "@/components/AddHistory";
import StockCard from "@/components/StockCard";

const _width  = Dimensions.get('screen').width
const _height  = Dimensions.get('screen').height

const orderHistory = [{},
{
    id : 403,
    nominal : 45789,
    number : 8,
    status : 'In Progress'
},
{
    id : 402,
    nominal : 48897,
    number : 3,
    status : 'Completed'
},
{
    id : 400,
    nominal : 45789,
    number : 8,
    status : 'In Progress'
},
{
    id : 401,
    nominal : 48897,
    number : 3,
    status : 'Completed'
},
{
    id : 399,
    nominal : 45789,
    number : 8,
    status : 'In Progress'
},
{
    id : 405,
    nominal : 48897,
    number : 3,
    status : 'Completed'
}]

export default function Home(){

    const navigation = useNavigation();

    useEffect(()=> {
        useFonts();
    })

    useEffect(() => {
        navigation.setOptions({ title:"Home"});
      }, [navigation]);


    return(
        <ScrollView style={styles.container} contentContainerStyle={{alignItems:'center'}}>
            <LinearGradient colors={['#7EB143', '#A2CF6E']} style={styles.banner}>
                <Text style={styles.banner_1}>
                    January Profit
                </Text>
                <Text style={styles.banner_2}>
                    Rp21.300.000
                </Text>
                <View style={styles.banner_3}>
                    <Text style={{flex:1,color:'#f5f5f5', fontSize:15, fontFamily:'Poppins-Regular'}}>
                        Today
                    </Text>
                    <Text style={{flex:1,color:'#f5f5f5', fontSize:15, fontFamily:'Poppins-Regular'}}>
                        2.5%
                    </Text>
                    <Text style={{flex:2,color:'#f5f5f5', fontSize:15, fontFamily:'Poppins-Regular'}}>
                        Rp575.25
                    </Text>
                    <Text style={{flex:1,color:'#f5f5f5', fontSize:15, fontFamily:'Poppins-Regular'}}>
                        Details
                    </Text>
                </View>
                
            </LinearGradient>
            <Pressable style={styles.print} onPress={()=>console.log('kontol')}>
                <View style={{flex: 1,backgroundColor:'#4BAEE6', height : _height*0.06, width: _height*0.06, marginRight:'3%',alignItems:'center', justifyContent:'center', borderRadius:5}}>
                    <Feather name="printer" color={'#ffffff'} size={_height*0.045} style={{borderWidth:0, borderColor:'#ff0000'}}></Feather>
                </View>
                <View style={{flex:3}}>
                    <Text style={{color:'#767676', fontSize:20, fontFamily:'Poppins-Regular', fontWeight:'bold'}}>Print report</Text>
                    <Text style={{color:'#767676', fontSize:15, fontFamily:'Poppins-Regular'}}>Today</Text>
                </View>
                <View style={{flex:1, flexGrow : 1, justifyContent:'center', alignItems:'flex-end', paddingRight:20}}>
                    <AntDesign name="right" size={_height*0.025}></AntDesign>
                </View>
            </Pressable>
            <View style={styles.history}>
                <Text style={{fontSize:24, fontFamily:'Poppins-Regular', color:'#53845D', fontWeight:'bold', textAlign:'left', borderColor:'#ff0000', borderWidth:0}}>Order History</Text>
                <FlatList
                style={{marginVertical:10}}
                horizontal={true}
                data={orderHistory}
                renderItem={({item}) => {
                return  (item.id==undefined)? <AddHistory/> : <HistoryItem id={item.id} nominal={item.nominal} number={item.number} status={item.status}/>
                }
            }
            />
            </View>
            <View style={styles.stocks}>
                <Text style={{fontSize:24, fontFamily:'Poppins-Regular', color:'#53845D', fontWeight:'bold', textAlign:'left', borderColor:'#ff0000', borderWidth:0}}>My Stocks</Text>
                {orderHistory.map((item)=>item.id ? <StockCard id={item.id} nominal={item.nominal} number={item.number} status={item.status}/> : "")}
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container : {
        flex : 1,
        width : '100%',
        height : '100%',
        borderWidth : 0,
        borderColor : '#0ff000',
        backgroundColor : '#fafafa',
        
    },
    banner : {
        flex:1,
        height : 0.22*_height,
        width : '92%',
        borderWidth : 2,
        borderColor : '#fff0f0',
        marginHorizontal : 'auto',
        borderRadius : 10,
        padding : '5%',
    },
    banner_1 : {
        flex : 2,
        color : '#F5F5F5',
        fontSize : 20,
        fontFamily : 'Poppins-Regular' 
    },
    banner_2 : {
        flex : 6,
        color : '#F5F5F5',
        fontSize : 25,
        fontFamily : 'Poppins-Regular',
        fontWeight : 'bold'
    },
    banner_3 : {
        flex : 1.5,
        color : '#F5F5F5',
        flexDirection : 'row',
        justifyContent : 'space-between',
    },
    print : {
        flex : 1,
        height : 0.08*_height,
        width : '92%',
        backgroundColor : '#ffffff',
        borderWidth : 0,
        borderColor : '',
        borderRadius : 12,
        padding : '3%',
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : '3%',
    },
    history : {
        height : _height*0.19,
        width:'90%',
        borderWidth:0,
        borderColor : '#fff000'
    },
    stocks : {
        flex:1,
        borderWidth:0,
        borderColor:'#111111',
        width : "90%",
        borderRadius : 12,
        marginHorizontal : 10,
        padding : 5,
        justifyContent : 'space-between'
    }
})