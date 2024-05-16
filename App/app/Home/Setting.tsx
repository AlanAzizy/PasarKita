import { View, StyleSheet, Dimensions, Text, Pressable } from "react-native";
import { useEffect } from "react";
import { router, useNavigation } from "expo-router";
import useFonts from "@/components/useFonts";
import { AntDesign, Feather, FontAwesome6, MaterialIcons } from "@expo/vector-icons";

const _width  = Dimensions.get('screen').width
const _height  = Dimensions.get('screen').height

export default function Setting(){

    const navigation = useNavigation();

    useEffect(()=> {
        useFonts();
    })

    useEffect(() => {
        navigation.setOptions({headerTitleAlign : 'center' ,headerTitleStyle : {color:'#53845D', fontWeight:'bold', fontFamily:'Poppins-Regular', fontSize:24}, title:"Settings" });
      }, [navigation]);


    return (
        <View style={styles.container}>
            <View style={styles.account}>
                <Text style={styles.subTitle}>Account</Text>
                <View style={styles.account_2}>
                    <Pressable onPress={()=>router.push('/Home/Profile')} style={styles.menu}>
                        <Feather name="user" size={20}/>
                        <Text style={styles.menuText}>Edit Profile</Text>
                    </Pressable>
                    <Pressable style={styles.menu}>
                        <MaterialIcons name="security" size={20}/>
                        <Text style={styles.menuText}>Security</Text>
                    </Pressable>
                    <Pressable style={styles.menu}>
                        <Feather name="bell" size={20}/>
                        <Text style={styles.menuText}>Notification</Text>
                    </Pressable>
                    <Pressable style={styles.menu}>
                        <Feather name="lock" size={20}/>
                        <Text style={styles.menuText}>Privacy</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.about}>
                <Text style={styles.subTitle}>Support & About</Text>
                <View style={styles.account_2}>
                    <Pressable style={styles.menu}>
                        <Feather name="credit-card" size={20}/>
                        <Text style={styles.menuText}>My Subscription</Text>
                    </Pressable>
                    <Pressable style={styles.menu}>
                        <AntDesign name="questioncircleo" size={20}/>
                        <Text style={styles.menuText}>Help & Support</Text>
                    </Pressable>
                    <Pressable style={styles.menu}>
                        <Feather name="info" size={20}/>
                        <Text style={styles.menuText}>Terms and policies</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.action}>
                <Text style={styles.subTitle}>Action</Text>
                <View style={styles.account_2}>
                    <Pressable style={styles.menu}>
                        <  Feather name="flag" size={20}/>
                        <Text style={styles.menuText}>Report a Problem</Text>
                    </Pressable>
                    <Pressable style={styles.menu} onPress={()=>router.navigate('../Login/_Welcome')}>
                        <FontAwesome6 name="arrow-right-to-bracket" size={20}/>
                        <Text style={styles.menuText}>Logout</Text>
                    </Pressable>
                </View>
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
        backgroundColor : '#fafafa',
        alignItems : 'center'
    },
    account : {
        width : '90%',
        height : _height*0.22,
        marginVertical : 5,
        marginTop : 20,
        borderWidth : 0,
        borderColor : '#00ff00'
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
    subTitle : {
        fontSize : 20,
        color : '#53845D',
        marginLeft : 15,
        marginVertical : 2
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
    }
})