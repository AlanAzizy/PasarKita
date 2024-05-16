import SearchBar from "@/components/SearchBar";
import { AntDesign } from "@expo/vector-icons";
import { Modal, View, StyleSheet, Text, TextInput, Dimensions, FlatList, Pressable, ScrollView } from "react-native";
import { useContext, useEffect, useState } from "react";
import Product, { products } from "@/components/Interface/Product";
import OrderItem from "@/components/OrderItem";
import { OrderContext } from "@/components/Context/OrderContext";

export type orderItem = {
    product : Product,
    num : number
}

type modalProp = {
    visible : boolean,
    close : () => void,
}

const _height  = Dimensions.get('screen').height
const fix_height = _height;

export default function DeleteProduct({visible, close} : modalProp){

    return (
        <Modal visible={visible} transparent={true}>
            <View style={styles.container}>
                <View style={{minHeight:100, height : 'auto', width:'65%', backgroundColor:'#ffffff', borderRadius:10, padding : 15, justifyContent:'space-between'}}>
                    <View style={{height:_height*0.05, justifyContent:'space-between', flexDirection:'row', alignItems:'center', borderWidth : 0, borderColor : '#0f0ff0'}}>
                        <Text style={{fontSize:20, color:'#53845D', fontFamily:'Poppins-Regular', fontWeight:'bold'}}>Delete Product</Text>
                        <AntDesign.Button name="close" iconStyle={{width:16, }} size={20} color={'#B0B0B0'} backgroundColor={'#ffffff'} onPress={close}/>
                    </View>
                    <View style={{height : _height*0.15, zIndex : 2, justifyContent:'space-around', flexDirection:'column', borderColor : '#fff00f', borderWidth : 0}}>
                        <Text style={{textAlign:'center',fontSize:18, color:'#767676', fontFamily:'Poppins-Regular', fontWeight:'bold', marginVertical:10}}>Are you sure you want to delete product ?</Text>
                        <Text style={{textAlign:'center',fontSize:14, color:'#767676', fontFamily:'Poppins-Regular',marginVertical:10}}>Once confirmed, this action cannot be undone</Text>                        
                    </View>
                    <View style={{maxHeight:_height*0.2 ,height : _height*0.08, width:'100%',justifyContent:'space-evenly', flexDirection:'row', alignItems:'center', borderColor : '#fff000', borderWidth : 0}}>
                        <Pressable 
                            onPress={()=>{
                                    close();
                            }}
                         
                            style={styles.buttonDisabled}
                        >
                            <Text style={{textAlign:'center',fontSize:18, color:'#767676', fontFamily:'Poppins-Regular', fontWeight:'bold'}}>Cancel</Text>                        
                        </Pressable>
                        <Pressable 
                            onPress={()=>{
                                    close();
                            }}
                         
                            style={styles.buttonEnable}
                        >
                            <Text style={{textAlign:'center',fontSize:18, color:'#fafafa', fontFamily:'Poppins-Regular', fontWeight:'bold'}}>Delete</Text>                        
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    container : {
        flex : 1,
        width : '100%',
        height : '100%',
        borderWidth : 4,
        borderColor : '#ffffff',
        alignItems : 'center',
        justifyContent : 'center',
        position : 'absolute',
        backgroundColor : 'rgba(202,202,202,0.4)',
        zIndex : 1
    },
    modal : {

    },
    buttonEnable : {
        backgroundColor : '#EA5C2F',
        width : '45%',
        height : _height*0.045,
        borderWidth : 0,
        borderColor : '#ff00f0',
        borderRadius : 5,
        textAlignVertical:'center',
        justifyContent : 'center',
        zIndex : 0
    },
    buttonDisabled : {
        backgroundColor : '#CACACA',
        width : '45%',
        height : _height*0.045,
        borderWidth : 0,
        borderColor : '#ff00f0',
        borderRadius : 5,
        textAlignVertical:'center',
        justifyContent : 'center',
        zIndex : 0
    }
})