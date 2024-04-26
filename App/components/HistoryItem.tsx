import { Feather, FontAwesome5 } from "@expo/vector-icons"
import { StyleSheet, View, Dimensions, Text } from "react-native"

const _width  = Dimensions.get('screen').width
const _height  = Dimensions.get('screen').height

export type history = {
    id : number,
    nominal : number,
    number : number,
    status : string
}

export default function HistoryItem({id,nominal, number, status} : history){

    return(
        <View style={styles.container}>
            <Text style={{color:'#5C5C5C', borderWidth:0,borderColor:'#00fff0', fontFamily:'Poppins-Regular', fontWeight:'bold'}}>{nominal}</Text>
            <Text style={{color:'#8C8C8C', borderWidth:0,borderColor:'#00fff0', fontFamily:'Poppins-Regular', fontSize:11}}>{`${number} items`}</Text>
            <View style={{display:'flex', flexDirection:'row',borderWidth:0,borderColor:'#00fff0', backgroundColor:(status=="Completed")?'#E0EBFF' :'#FFEDBD', height:'24%', width:'80%', padding:2, alignItems:'center', borderRadius:5}}>
                {status=="Completed"?<Feather name="check-square"/>:<FontAwesome5 name="clock" size={12}/>}
                <Text style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'#8C8C8C', marginLeft:3, textAlignVertical:'center'}}>
                {status}
                </Text>
            </View>
            <Text style={{color:'#FDFDFD', borderWidth:0,borderColor:'#00fff0', fontFamily:'Poppins-Regular', fontWeight:'bold', padding:2, backgroundColor:'#8BC34A', width:'70%', alignSelf:'center', borderRadius:5, textAlign:'center'}}>{`Order #${id}`}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        borderWidth:2,
        borderColor:'#111111',
        width : _width*0.32,
        height : _height*0.12,
        backgroundColor : '#ffffff',
        borderRadius : 12,
        marginHorizontal : 10,
        padding : 5,
        justifyContent : 'space-between'
    }
})