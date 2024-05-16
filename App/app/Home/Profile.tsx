import { View, StyleSheet, Dimensions, Text, Pressable, TextInput, Image, KeyboardAvoidingView } from "react-native";
import { useEffect } from "react";
import { useNavigation, router } from "expo-router";
import useFonts from "@/components/useFonts";
import { AntDesign, Feather, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import Button from "@/components/Button";

const _width  = Dimensions.get('screen').width
const _height  = Dimensions.get('screen').height
const fix_height = _height;
export default function Profile(){

    const navigation = useNavigation();

    useEffect(()=> {
        useFonts();
    })

    useEffect(() => {
        navigation.setOptions({headerTitleAlign : 'center' ,headerTitleStyle : {color:'#53845D', fontWeight:'bold', fontFamily:'Poppins-Regular', fontSize:24}, title:"Edit Profile" });
      }, [navigation]);


    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100} style={{flex:13, width:'100%', justifyContent:'center', alignItems:'center', borderWidth : 0, borderColor:'#00ffff'}}>
                <View  style={{flex:5, borderWidth:0, borderColor:"#ff1111", width:"90%", justifyContent:'center', alignItems:'center',}}>
                    <Pressable onPress={()=>{console.log('kontol')}} style={{flex: 1,height:'auto', borderWidth:0, borderColor:"#ff1111", width:"auto", justifyContent:'center', alignItems:'center',}}>
                        <Image source={require('../../assets/images/pasar.jpg')} style={styles.image}></Image>
                    </Pressable>
                </View>
                <View  style={{flex:7, borderWidth:0, borderColor:"#ff1111", width:"90%", justifyContent:'center', zIndex:2, backgroundColor:'#ffffff',minHeight:fix_height*0.22,}}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput style={{width:"100%", borderColor:"#000ff0", borderWidth:0, height:fix_height*0.06, backgroundColor:"#F7F8F9", borderRadius:8, color:"#8391A1", padding:10, marginVertical:10}}
                    
                    placeholder="Enter Your Email Address"
                    keyboardType="numeric"/>
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={{width:"100%", borderColor:"#E8ECF4", borderWidth:0, height:fix_height*0.06, backgroundColor:"#F7F8F9", borderRadius:8, color:"#8391A1", padding:10, marginVertical:10}}
                    
                    placeholder="Enter Your Password"
                    keyboardType="numeric"/>
                    <Text style={styles.label}>Number</Text>
                    <TextInput style={{width:"100%", borderColor:"#E8ECF4", borderWidth:0, height:fix_height*0.06, backgroundColor:"#F7F8F9", borderRadius:8, color:"#8391A1", padding:10, marginVertical:10}}
                    
                    placeholder="Enter Your Email Address"
                    keyboardType="numeric"/>
                    <Text style={styles.label}>Password</Text>
                    <TextInput style={{width:"100%", borderColor:"#E8ECF4", borderWidth:0, height:fix_height*0.06, backgroundColor:"#F7F8F9", borderRadius:8, color:"#8391A1", padding:10, marginVertical:10}}
                    
                    placeholder="Enter Your Password"
                    keyboardType="numeric"/>
                </View>
            </KeyboardAvoidingView>
            <View style={{flex:3, justifyContent:'center', alignItems:'center', width:'70%'}}>
                <Button
                    onPress={()=>{console.log("jaran")}}
                    title="Save Changes"
                    styles={styles.save}
                    isLight={true}
                    size={18}
                    />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container : {
        flex : 1,
        width : '100%',
        height : '100%',
        borderWidth : 0,
        borderColor : '#0ff000',
        backgroundColor : '#ffffff',
        alignItems : 'center',
        minHeight : 0.8*fix_height
    },
    account : {
        width : '90%',
        height : _height*0.22,
        marginVertical : 5,
        marginTop : 20,
        borderWidth : 0,
        borderColor : '#00ff00'
    },
    image : {
        width : _height*0.15,
        height : _height*0.15,
        borderRadius : _height*0.075
    },
    about : {
        width : '90%',
        height : _height*0.20,
        marginVertical : 5,
        borderWidth : 0,
        borderColor : '#00ff00'
    },
    action : {
        width : '90%',
        height : _height*0.14,
        marginVertical : 5
    },
    label : {
        fontSize : 20,
        color : '#53845D',
        marginLeft : 5,
        marginTop : 1,
        fontWeight : 'bold',
        height: fix_height*0.03
    },
    account_2 : {
        backgroundColor : 'rgba(39,39,96,0.05)',
        width : '100%',
        height : '100%',
        flex : 1,
        borderWidth : 0,
        borderColor : '#ff0000',
        borderRadius : 5,
        padding : 8,
        justifyContent : 'center'
    },
    menu : {
        height : _height*0.04,
        borderWidth : 0,
        borderColor : '#000000',
        backgroundColor : 'none',
        marginVertical : 2,
        flex : 1,
        flexDirection : 'row',
        marginLeft :'5%',
        alignItems : 'center'
        
    },
    menuText : {
        color : '#000000',
        opacity : 2,
        marginLeft : '10%',
        fontSize : 18
    },
    save : {
        backgroundColor : '#53845D',
        width : '90%',
        height : _height*0.06,
        borderWidth : 0,
        borderColor : '#ff00f0',
        borderRadius : 15,
        textAlignVertical:'center',
        justifyContent : 'center'
    }
})