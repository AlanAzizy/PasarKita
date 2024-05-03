import { Feather, FontAwesome5 } from "@expo/vector-icons"
import { StyleSheet, View, Dimensions, Text, Image } from "react-native"

const _width  = Dimensions.get('screen').width
const _height  = Dimensions.get('screen').height

export type history = {
    id : number,
    nominal : number,
    number : number,
    status : string
}

export default function StockCard({id,nominal, number, status} : history){

    return(
        <View style={styles.container}>
            <View style={{flexDirection:'row',borderWidth:0,borderColor:'#00fff0', height:_width*0.2, width:_width*0.2, padding:2, alignItems:'center', borderRadius:15}}>
                <Image style={{resizeMode:'contain', width:'100%'}} source={require('../assets/images/splash-icon.png')}/>
            </View>
            <View style={{flexDirection:'column',borderWidth:0,borderColor:'#ffffff', backgroundColor:'#FFFFFF', height:_width*0.12, width:_width*0.4, padding:2, paddingHorizontal:8,alignItems:'flex-start', borderRadius:5, }}>
                <Text style={{fontSize:16, fontFamily:'Poppins-Regular', color:'#8C8C8C'}}>{status}</Text>
                <Text>{id}</Text>
            </View>
            <View style={{flexDirection:'row',borderWidth:0,borderColor:'#ffffff', backgroundColor:'#FFFFFF', height:_width*0.12, width:_width*0.2, padding:2, alignItems:'center', justifyContent:'center', borderRadius:5}}>
                <Text style={{fontSize:16, fontFamily:'Poppins-Regular', color:(status=="Completed")?'#8BC34A':'#EA5C2F', textAlign:'center', marginHorizontal:4, textAlignVertical:'center'}}>{number}</Text>
                <Feather name="arrow-up" size={18} color={(status=="Completed")?'#8BC34A':'#EA5C2F'}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection : 'row',
        borderWidth:2,
        borderColor:'#CACACA',
        width : "90%",
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