import { View, StyleSheet, Text, Image, Dimensions } from "react-native"
import { useEffect } from "react";
import { Link, useNavigation, router } from "expo-router";
import Button from "@/components/Button";
import useFonts from '../../components/useFonts';


const _width  = Dimensions.get('screen').width
const _height  = Dimensions.get('screen').height


export default function Welcome(){
    
    const navigation = useNavigation();

    useEffect(()=> {
        useFonts();
    })

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
      }, [navigation]);


    return(
        <View style={styles.container}>
            <View style={styles.firstView}>

            </View>
            <View style={styles.secondView}>
                <Image source={require('../../assets/images/splash-icon.png')} style={styles.iconStyle}></Image>
            </View>
            <View style={styles.thirdView}>
                
            </View>
            <View style={styles.fourthView}>
                <View style={{width:'100%', flex:3, alignItems:'center', justifyContent:'space-between'}}>
                    <Button
                    onPress={()=>{router.push('../Login/LoginScreen')}}
                    title="Login"
                    styles={styles.buttonLogin}
                    isLight={true}
                    size={18}
                    />
                    <Button
                    onPress={()=>{router.push('/Login/RegisterScreen')}}
                    title="Register"
                    styles={styles.registerLogin}
                    isLight={false}
                    size={18}
                    />
                </View>
                <Link style={{flex:3, textAlignVertical:'bottom', marginBottom:20, fontFamily:'Poppins-Regular', color:'#35C2C1', width:"100%", borderWidth:0, borderColor:"#111111", textAlign:"center"}} push href="/">Continue as guest</Link>
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
        justifyContent : 'center'
    },
    iconStyle : {
        resizeMode : 'contain',
        width : _width*0.58 ,
        height : _width*0.58,
        borderWidth : 0,
        borderColor : '#0f00f0',
    },
    firstView : {
        flex : 3,
        width : '100%',
        borderWidth : 0,
        borderColor : '#0000f0',
    },
    secondView : {
        flex : 4,
        width : '100%',
        borderWidth : 0,
        borderColor : '#0000f0',
        alignItems : 'center',
        justifyContent : 'center'
    },
    thirdView : {
        flex : 0.5,
        width : '100%',
        borderWidth : 0,
        borderColor : '#0000f0',
    },
    fourthView : {
        flex : 3,
        width : _width*0.88,
        borderWidth : 0,
        borderColor : '#0000f0',
        alignItems : 'center',
        justifyContent : 'space-evenly'
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
    registerLogin: {
        backgroundColor : '#ffffff',
        width : '90%',
        height : _height*0.06,
        borderWidth : 3,
        borderColor : '#53845D',
        borderRadius : 5,
        justifyContent : 'center'
    }
})