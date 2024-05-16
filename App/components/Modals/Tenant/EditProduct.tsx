import SearchBar from "@/components/SearchBar";
import { AntDesign } from "@expo/vector-icons";
import { Modal, View, StyleSheet, Text, TextInput, Dimensions, FlatList, Pressable, ScrollView } from "react-native";
import { useContext, useEffect, useState } from "react";
import Button from "@/components/Button";
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

export default function EditProduct({visible, close} : modalProp){

    const [name, setName] = useState("");
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);


    const addItem = (item : Product) => {

    }

    const isValid = (name!=="" && price>0)

    return (
        <Modal visible={visible} transparent={true}>
            <View style={styles.container}>
                <View style={{minHeight:100, height : 'auto', width:'65%', backgroundColor:'#ffffff', borderRadius:10, padding : 15}}>
                    <View style={{height:_height*0.05, justifyContent:'space-between', flexDirection:'row', alignItems:'center', borderWidth : 0, borderColor : '#0f0ff0'}}>
                        <Text style={{fontSize:20, color:'#53845D', fontFamily:'Poppins-Regular', fontWeight:'bold'}}>Edit Product</Text>
                        <AntDesign.Button name="close" iconStyle={{width:16, }} size={20} color={'#B0B0B0'} backgroundColor={'#ffffff'} onPress={close}/>
                    </View>
                    <View style={{height : 'auto', zIndex : 2, justifyContent:'space-around', flexDirection:'column', borderColor : '#fff00f', borderWidth : 0}}>
                        <Text style={{fontSize:18, color:'#767676', fontFamily:'Poppins-Regular', fontWeight:'bold'}}>Product Name</Text>
                        <TextInput style={{width:"100%", borderColor:"#E8ECF4", borderWidth:2, height:_height*0.05, backgroundColor:"#F7F8F9",padding:10, borderRadius:8, color:"#8391A1", marginVertical:1}}
                        onChangeText={(value)=>setName(value)}
                        placeholder="Product Name"
                        keyboardType="default"
                        />
                        <Text style={{fontSize:18, color:'#767676', fontFamily:'Poppins-Regular', fontWeight:'bold'}}>Stock</Text>
                        <TextInput style={{width:"100%", borderColor:"#E8ECF4", borderWidth:2, height:_height*0.05, backgroundColor:"#F7F8F9",padding:10, borderRadius:8, color:"#8391A1", marginVertical:1}}
                        onChangeText={(value)=>setStock(Number(value))}
                        placeholder="Product Stock"
                        keyboardType="numeric"
                        />
                        <Text style={{fontSize:18, color:'#767676', fontFamily:'Poppins-Regular', fontWeight:'bold'}}>Price</Text>
                        <TextInput style={{width:"100%", borderColor:"#E8ECF4", borderWidth:2, height:_height*0.05, backgroundColor:"#F7F8F9",padding:10, borderRadius:8, color:"#8391A1", marginVertical:1}}
                        onChangeText={(value)=>setPrice(Number(value))}
                        placeholder="Product Price"
                        keyboardType="numeric"
                        />
                    </View>
                    <View style={{maxHeight:_height*0.2 ,height : _height*0.08, justifyContent:'center', flexDirection:'column', alignItems:'center', borderColor : '#fff000', borderWidth : 0}}>
                        <Button 
                            onPress={()=>{
                                    setName("");
                                    setPrice(0);
                                    setStock(0);
                                    close();
                            }}
                            styles={(name!=="" && price>0) ? styles.buttonEnable : styles.buttonDisabled}
                            title="Edit Product"
                            isLight={(name!=="" && price>0)}
                            size={16}
                        />
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
        backgroundColor : '#FFC008',
        width : '100%',
        height : _height*0.05,
        borderWidth : 0,
        borderColor : '#ff00f0',
        borderRadius : 5,
        textAlignVertical:'center',
        justifyContent : 'center',
        zIndex : 0
    },
    buttonDisabled : {
        backgroundColor : '#CACACA',
        width : '100%',
        height : _height*0.05,
        borderWidth : 0,
        borderColor : '#ff00f0',
        borderRadius : 5,
        textAlignVertical:'center',
        justifyContent : 'center',
        zIndex : 0
    }
})