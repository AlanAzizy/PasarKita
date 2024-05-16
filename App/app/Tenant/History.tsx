import { View, StyleSheet, Dimensions, Text, Pressable, TextInput, Image, ScrollView } from "react-native";
import { useEffect } from "react";
import { useNavigation, router } from "expo-router";
import useFonts from "@/components/useFonts";
import { AntDesign, Feather, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import Button from "@/components/Button";
import { Table, Rows, Row, TableWrapper } from 'react-native-table-component';
import { orderHistory } from "../(tabs)/Home";

const _width  = Dimensions.get('screen').width
const _height  = Dimensions.get('screen').height

export default function Histroy(){

    const navigation = useNavigation();

    const tableHead = ['Order ID', 'Date', 'Cashier ID', 'Total']

    useEffect(()=> {
        useFonts();
    })

    useEffect(() => {
        navigation.setOptions({headerTitleAlign : 'center' ,headerTitleStyle : {color:'#53845D', fontWeight:'bold', fontFamily:'Poppins-Regular', fontSize:24}, title:"Order Histroy" });
      }, [navigation]);


    return (
        <View style={styles.container}>
            <Text style={{fontSize:16, fontFamily:'Poppins-Regular', marginTop:15, marginBottom:5}}>01-05-2024 to 14-05-2024</Text>
            <ScrollView style={{width:'95%', marginTop: 10 ,borderColor : '#ff0000', borderWidth : 0,}}>
                <Table>
                    <Row data={tableHead} style={styles.tableHead} textStyle={{textAlign:'center', fontFamily:'Poppins-Regular', fontSize:16}}></Row>
                    <TableWrapper>
                        {orderHistory.map((item, index)=>
                        <Row key={item.id}
                            data={[item.id,item.date,item.cashier_id,item.nominal]}
                            style={index%2==1?{backgroundColor : '#F3F9ED', height:_height*0.04,}:{}}
                            textStyle={styles.rowStyle}
                        />)
                        }
                    </TableWrapper>
                </Table>
            </ScrollView>
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
        alignItems : 'center'
    },
    tableHead : {
        height : _height*0.05,
        borderWidth : 0,
        borderColor : '#111111',
        backgroundColor : '#DBECC7',
        textAlign : 'center',
        justifyContent : 'center'
    },
    rowStyle : {
        textAlign : 'center',
        fontFamily : 'Poppins-Regular',
        fontSize : 14
    }
})