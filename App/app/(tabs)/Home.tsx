import { View, StyleSheet, ScrollView, Dimensions, Text, Pressable, FlatList } from "react-native"
import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {LinearGradient} from "expo-linear-gradient";
import useFonts from "@/components/useFonts";
import { AntDesign, Feather } from "@expo/vector-icons";
import HistoryItem,{history} from "@/components/HistoryItem";
import AddHistory from "@/components/AddHistory";
import StockCard from "@/components/StockCard";
import { PreventRemoveContext } from "@react-navigation/native";
import CreateOrder from "@/components/Modals/Tenant/CreateOrder";

const _width  = Dimensions.get('screen').width
const _height  = Dimensions.get('screen').height

export const orderHistory = [{},
{
    cashier_id : 112,
    date : '22-05-2024',
    id : 403,
    nominal : 45789,
    number : 8,
    status : 'In Progress'
},
{
    cashier_id : 112,
    date : '22-05-2024',
    id : 402,
    nominal : 48897,
    number : 3,
    status : 'Completed'
},
{
    cashier_id : 112,
    date : '22-05-2024',
    id : 400,
    nominal : 45789,
    number : 8,
    status : 'In Progress'
},
{
    cashier_id : 112,
    date : '22-05-2024',
    id : 401,
    nominal : 48897,
    number : 3,
    status : 'Completed'
},
{
    cashier_id : 112,
    date : '22-05-2024',
    id : 399,
    nominal : 45789,
    number : 8,
    status : 'In Progress'
},
{
    cashier_id : 112,
    date : '22-05-2024',
    id : 405,
    nominal : 48897,
    number : 3,
    status : 'Completed'
},
{
    cashier_id : 112,
    date : '22-05-2024',
    id : 390,
    nominal : 45789,
    number : 8,
    status : 'In Progress'
},
{
    cashier_id : 112,
    date : '22-05-2024',
    id : 500,
    nominal : 48897,
    number : 3,
    status : 'Completed'
}]

export const stocks = [{},
    {
        price : 150,
        id : 403,
        prev_number : 45789,
        current_number : 8,
        name : 'In Progress'
    },
    {
        price : 150,
        id : 402,
        prev_number : 48897,
        current_number : 3,
        name : 'Completed'
    },
    {
        price : 150,
        id : 400,
        prev_number : 45789,
        current_number : 8,
        name : 'In Progress'
    },
    {
        price : 150,
        id : 401,
        prev_number : 48897,
        current_number : 3,
        name : 'Completed'
    },
    {
        price : 150,
        id : 399,
        prev_number : 45789,
        current_number : 8,
        name : 'In Progress'
    },
    {
        price : 150,
        id : 405,
        prev_number : 48897,
        current_number : 3,
        name : 'Completed'
    },
    {
        price : 150,
        id : 390,
        prev_number : 45789,
        current_number : 8,
        name : 'In Progress'
    },
    {
        price : 150,
        id : 500,
        prev_number : 48897,
        current_number : 3,
        name : 'Completed'
    }]

export default function Home(){

    const navigation = useNavigation();

    const [isCreateOrderModal, setIsCreateOrderModal] = useState(false);

    useEffect(()=> {
        useFonts();
    })

    useEffect(() => {
        navigation.setOptions({ title:"Home"});
      }, [navigation]);

    
    const closeModals = () => {
        setIsCreateOrderModal(false)
    }  


    return(
        <>
        <CreateOrder visible={isCreateOrderModal} close={closeModals}/>
        <ScrollView style={isCreateOrderModal ? styles.fake_container:styles.container} contentContainerStyle={{alignItems:'center'}}>
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
            <Pressable style={styles.print} onPress={()=>console.log('awkowkwowkok')}>
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
                <Pressable  onPress={()=>router.push('/Tenant.tsx/History')} style={{flex : 1, flexDirection : 'row', alignItems:'center', }}>
                    <Text style={{fontSize:24, fontFamily:'Poppins-Regular', color:'#53845D', fontWeight:'bold', textAlign:'left', borderColor:'#ff0000', borderWidth:0}}>Order History</Text>
                    <AntDesign name="right" style={{marginLeft:4}} size={_height*0.022}></AntDesign>
                </Pressable>
                <FlatList
                style={{marginVertical:0, borderWidth:0, borderColor : '#11111', height:_height*0.08}}
                horizontal={true}
                data={orderHistory}
                renderItem={({item}) => {
                return  (item.id==undefined)? <AddHistory add={()=>setIsCreateOrderModal(true)}/> : <HistoryItem id={item.id} nominal={item.nominal} number={item.number} status={item.status}/>
                }
            }
            />
            </View>
            <View style={styles.stocks}>
                <Text style={{fontSize:24, fontFamily:'Poppins-Regular', color:'#53845D', fontWeight:'bold', textAlign:'left', borderColor:'#ff0000', borderWidth:0}}>My Stocks</Text>
                {stocks.map((item)=>item.id ? <StockCard id={item.id} name={item.name} current_number={item.current_number} prev_number={item.prev_number} price={item.price}/> : "")}
            </View>
        </ScrollView>

        </>
    )
}


const styles = StyleSheet.create({
    container : {
        flex : 1,
        width : '100%',
        height : '100%',
        borderWidth : 0,
        borderColor : '#0ff000',
        backgroundColor :'#fafafa',
        
    },
    fake_container : {
        flex : 1,
        width : '100%',
        height : '100%',
        borderWidth : 0,
        borderColor : '#0ff000',
        backgroundColor :'rgb(202,202,202,0.4)',
        
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
        marginTop : 10
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
        height : _height*0.2,
        width:'90%',
        borderWidth:0,
        borderColor : '#fff000',
        justifyContent : 'flex-end'
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