import { Feather, FontAwesome5, FontAwesome6 } from "@expo/vector-icons"
import { StyleSheet, View, Dimensions, Text, Image, Pressable } from "react-native"
import { Stocks } from "./StockCard";

type addModalType = {
    stock : Stocks,
    openEdit : () => void,
    openDelete : ()=>void
}


const _width  = Dimensions.get('screen').width
const _height  = Dimensions.get('screen').height

export default function StockCardEdit({stock, openEdit, openDelete} : addModalType){

    const {name, id, current_number, price} = stock

    return(
        <View style={styles.container}>
            <View style={{flexDirection:'row',borderWidth:0,borderColor:'#00fff0', flex:1, width:'auto', padding:2, alignItems:'center', borderRadius:15}}>
                <Image style={{resizeMode:'contain', width:'100%'}} source={require('../assets/images/splash-icon.png')}/>
            </View>
            <View style={{flex : 4, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                <View style={{flexDirection:'column',borderWidth:0,borderColor:'#ffff00', backgroundColor:'#FFFFFF', height:'100%',flex:3, padding:2, paddingHorizontal:8,alignItems:'flex-start', borderRadius:5, }}>
                    <Text style={{fontSize:16, fontFamily:'Poppins-Regular', color:'#8C8C8C'}}>{name}</Text>
                    <Text>Stok</Text>
                    <Text>Price</Text>
                </View>
                <View style={{flexDirection:'row',borderWidth:0,borderColor:'#ff00ff', backgroundColor:'#FFFFFF', height:'100%', flex:1, padding:2, marginTop:5,paddingHorizontal:8,alignItems:'flex-start', alignSelf:'flex-start', justifyContent:'space-evenly', borderRadius:5, }}>
                    <Pressable style={{width:'auto', height:'auto'}} onPress={openEdit}>
                    <FontAwesome6 name="pen-to-square" size={18} color={'#469ED0'}/>
                    </Pressable>
                    <Pressable style={{width:'auto', height:'auto'}} onPress={openDelete}>
                    <Feather name="trash-2" size={18} color={'#ff1111'}/>
                    </Pressable>
                </View>
                <View style={{flexDirection:'column',borderWidth:0,borderColor:'#ffff00', backgroundColor:'#FFFFFF', height:'100%',flex:2, padding:2, paddingHorizontal:8,alignItems:'flex-end', borderRadius:5, }}>
                    <Text style={{fontSize:16, fontFamily:'Poppins-Regular', color:'#8C8C8C'}}>{id}</Text>
                    <Text>{current_number}</Text>
                    <Text>{price}</Text>                
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection : 'row',
        borderWidth:0,
        borderColor:'#CACACA',
        width : "100%",
        height : _height*0.12,
        backgroundColor : '#ffffff',
        borderRadius : 1,
        marginVertical: 2,
        padding : 5,
        justifyContent : 'space-between',
        borderBottomWidth : 2,
        alignItems : 'center'
    }
})