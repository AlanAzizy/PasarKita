import { Link } from "expo-router";
import { View } from "react-native";



export default function AllRoute(){


    return (
        <View style={{backgroundColor:'#f0f0f0', flex:1, width:'100%', height:"100%", borderWidth : 0, borderColor:"#ffff11", padding:10}}>
            <Link href="/Login/_Welcome" style={{color:'#1111ff'}}>Welcome</Link>
            <Link href="/(tabs)" style={{color:'#1111ff'}} >Home</Link>
        </View>
    )
}