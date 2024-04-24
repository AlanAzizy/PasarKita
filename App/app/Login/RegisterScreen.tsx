import { View, StyleSheet, Text, TextInput, Dimensions } from "react-native"
import { useEffect } from "react";
import { Link, router, useNavigation } from "expo-router";
import useFonts from "@/components/useFonts";
import Button from "@/components/Button";

const _height  = Dimensions.get('screen').height

export default function RegisterScreen(){
    
    const navigation = useNavigation();

    useEffect(()=> {
        useFonts();
    })

    useEffect(() => {
        navigation.setOptions({headerShown : true, title : ""});
      }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={{flex:4.5, borderWidth:0, borderColor:"#ff1111", width:"100%", justifyContent:"center", margin:5, padding:20}}>
                <Text style={{fontFamily:"Poppins-Regular", color:"#53845D", width:"80%", fontSize:28, fontWeight:"bold"}}>Please register to get started</Text>
            </View>
            <View style={{flex:11, borderWidth:0, borderColor:"#ff1111", width:"90%"}}>
                <TextInput style={{width:"100%", borderColor:"#E8ECF4", borderWidth:2, height:"20%", backgroundColor:"#F7F8F9", borderRadius:8, color:"#8391A1", padding:20, marginVertical:6}}
                
                placeholder="Name"
                keyboardType="numeric"/>
                <TextInput style={{width:"100%", borderColor:"#E8ECF4", borderWidth:2, height:"20%", backgroundColor:"#F7F8F9", borderRadius:8, color:"#8391A1", padding:20, marginVertical:6}}
                
                placeholder="Email"
                keyboardType="numeric"/>
                <TextInput style={{width:"100%", borderColor:"#E8ECF4", borderWidth:2, height:"20%", backgroundColor:"#F7F8F9", borderRadius:8, color:"#8391A1", padding:20, marginVertical:6}}
                
                placeholder="Phone Number"
                keyboardType="numeric"/>
                <TextInput style={{width:"100%", borderColor:"#E8ECF4", borderWidth:2, height:"20%", backgroundColor:"#F7F8F9", borderRadius:8, color:"#8391A1", padding:20, marginVertical:6}}
                
                placeholder="Password"
                keyboardType="numeric"/>
                
            </View>
            <View style={{flex:3, borderWidth:0, borderColor:"#ff1111", width:"100%", justifyContent:"center", alignItems:"center"}}>
                <Button
                    onPress={()=>{}}
                    title="Register"
                    styles={styles.buttonLogin}
                    isLight={true}
                    size={18}
                    />
            </View>
            <View style={{flex:4, borderWidth:0, borderColor:"#ff1111", width:"90%"}}>
                <View style={{flex:1, borderWidth:0, borderColor:"#ff1111", width:"100%", flexDirection:'row'}}>
                    <View style={{flex:1, borderWidth:0, borderColor:"#ff1111", width:"100%", justifyContent:'center'}}>
                        <View style={{ borderWidth:1, borderColor:"#E8ECF4", width:"100%", height:0}}> 
                        </View>
                    </View>
                    <View style={{flex:1, borderWidth:0, borderColor:"#ff1111", width:"100%"}}>
                        <Text style={{fontFamily:"Poppins-Regular", textAlign:"center", color:"#121212"}}>Or Register with</Text>
                    </View>
                    <View style={{flex:1, borderWidth:0, borderColor:"#ff111", width:"100%", justifyContent:'center'}}>
                        <View style={{ borderWidth:1, borderColor:"#E8ECF4", width:"100%", height:0}}> 
                        </View>
                    </View>
                </View>  
                <View style={{flex:4, borderWidth:0, borderColor:"#ff1111", width:"100%", flexDirection:"row", justifyContent:"space-between", alignItems:"flex-end"}}>
                    <View style={{ borderWidth:1, borderColor:"#E8ECF4", width:"30%", height:"70%", borderRadius:6}}> 
                    </View>
                    <View style={{ borderWidth:1, borderColor:"#E8ECF4", width:"30%", height:"70%", borderRadius:6}}> 
                    </View>
                    <View style={{ borderWidth:1, borderColor:"#E8ECF4", width:"30%", height:"70%", borderRadius:6}}> 
                    </View>
                </View>     
            </View>
            <View style={{flex:3, borderWidth:0, borderColor:"#ff1111", width:"100%"}}>
                <Link style={{flex:3, textAlignVertical:'bottom', marginBottom:20, fontFamily:'Poppins-Regular', color:'#35C2C1', width:"100%", borderWidth:0, borderColor:"#111111", textAlign:"center"}} push href="/">Already have an account? Login now</Link>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        width : '100%',
        height : '100%',
        alignItems : 'center',
        borderWidth : 0,
        borderColor : '#0ff000',
        justifyContent : 'center',
        backgroundColor:"#ffffff"
    },
    buttonLogin: {
        backgroundColor : '#53845D',
        width : '90%',
        height : _height*0.06,
        borderWidth : 0,
        borderColor : '#ff00f0',
        borderRadius : 5,
        textAlignVertical:'center',
        justifyContent : 'center'
    },
})