import { View, StyleSheet, Text, TextInput, Dimensions } from "react-native"
import { useEffect } from "react";
import { Link, router, useNavigation } from "expo-router";
import useFonts from "@/components/useFonts";
import Button from "@/components/Button";

const _height  = Dimensions.get('screen').height

export default function LoginScreen(){
    
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
                <Text style={{fontFamily:"Poppins-Regular", color:"#53845D", width:"80%", fontSize:28, fontWeight:"bold"}}>Welcome back! Please login to your account</Text>
            </View>
            <View style={{flex:7, borderWidth:0, borderColor:"#ff1111", width:"90%"}}>
                <TextInput style={{width:"100%", borderColor:"#E8ECF4", borderWidth:2, height:"30%", backgroundColor:"#F7F8F9", borderRadius:8, color:"#8391A1", padding:10, marginVertical:10}}
                
                placeholder="Enter Your Email Address"
                keyboardType="numeric"/>
                <TextInput style={{width:"100%", borderColor:"#E8ECF4", borderWidth:2, height:"30%", backgroundColor:"#F7F8F9", borderRadius:8, color:"#8391A1", padding:10, marginVertical:10}}
                
                placeholder="Enter Your Password"
                keyboardType="numeric"/>
                <Link style={{flex:3, textAlignVertical:'bottom', fontFamily:'Poppins-Regular', color:'#8391A1', width:"100%", borderWidth:0, borderColor:"#111111", textAlign:"right"}} push href="/">Forgot password?</Link>
            </View>
            <View style={{flex:3, borderWidth:0, borderColor:"#ff1111", width:"100%", justifyContent:"center", alignItems:"center"}}>
                <Button
                    onPress={()=>{router.push('/Login/ChooseRole')}}
                    title="Login"
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
                        <Text style={{fontFamily:"Poppins-Regular", textAlign:"center", color:"#121212"}}>Or Login with</Text>
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
            <View style={{flex:7, borderWidth:0, borderColor:"#ff1111", width:"100%"}}>
                <Link style={{flex:3, textAlignVertical:'bottom', marginBottom:20, fontFamily:'Poppins-Regular', color:'#35C2C1', width:"100%", borderWidth:0, borderColor:"#111111", textAlign:"center"}} push href="/">Don't have an account? Register now</Link>
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