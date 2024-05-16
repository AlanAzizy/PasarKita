import { View, StyleSheet, Text, TextInput, Dimensions, Image } from "react-native"
import { useEffect } from "react";
import { Link, router, useNavigation } from "expo-router";
import useFonts from "@/components/useFonts";
import Button from "@/components/Button";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

const _height  = Dimensions.get('screen').height
const fix_height = _height;
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
                <TextInput style={{width:"100%", borderColor:"#E8ECF4", borderWidth:2, height:_height*0.07, backgroundColor:"#F7F8F9", borderRadius:8, color:"#8391A1", padding:20, marginVertical:6}}
                
                placeholder="Name"
                keyboardType="numeric"/>
                <TextInput style={{width:"100%", borderColor:"#E8ECF4", borderWidth:2, height:_height*0.07, backgroundColor:"#F7F8F9", borderRadius:8, color:"#8391A1", padding:20, marginVertical:6}}
                
                placeholder="Email"
                keyboardType="numeric"/>
                <TextInput style={{width:"100%", borderColor:"#E8ECF4", borderWidth:2, height:_height*0.07, backgroundColor:"#F7F8F9", borderRadius:8, color:"#8391A1", padding:20, marginVertical:6}}
                
                placeholder="Phone Number"
                keyboardType="numeric"/>
                <TextInput style={{width:"100%", borderColor:"#E8ECF4", borderWidth:2, height:_height*0.07, backgroundColor:"#F7F8F9", borderRadius:8, color:"#8391A1", padding:20, marginVertical:6}}
                
                placeholder="Password"
                keyboardType="numeric"/>
                
            </View>
            <View style={{flex:3, borderWidth:0, borderColor:"#ff1111", width:"100%", justifyContent:"center", alignItems:"center"}}>
                <Button
                    onPress={()=>{router.navigate('../(tabs)/Home')}}
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
                <View style={{flex:4, borderWidth:0, borderColor:"#ff1111", width:"100%", flexDirection:"row", justifyContent:"space-between", alignItems:"flex-end", gap:12}}>
                    <View style={{ borderWidth:1, borderColor:"#E8ECF4", width:"30%", height:"70%", borderRadius:6, flex:1, justifyContent:'center', alignItems:'center'}}> 
                        <FontAwesome name="facebook-f" size={32} color={'#4092FF'}/>
                    </View>
                    <View style={{ borderWidth:1, borderColor:"#E8ECF4", width:"30%", height:"70%", borderRadius:6, flex:1, justifyContent:'center', alignItems:'center'}}> 
                        <Image style={{height:32, width:32, borderColor:'#ff0000', borderWidth:0}} source={require('../../assets/images/google.png')}/>
                    </View>
                    <View style={{ borderWidth:1, borderColor:"#E8ECF4", width:"30%", height:"70%", borderRadius:6, flex:1, justifyContent:'center', alignItems:'center'}}> 
                        <FontAwesome name="apple" size={32} color="black" />    
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
        backgroundColor:"#ffffff",
        minHeight : fix_height *0.8
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