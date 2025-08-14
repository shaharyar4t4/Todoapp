import { ITodoItem } from '@/app/Screens/Home';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import moment from 'moment';
import React, { PropsWithChildren } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Iprop = PropsWithChildren<{
    item: ITodoItem
}>

const Todocard = ({ item }: Iprop) => {
    const renderIcon = (key: string): React.ReactElement => {
        switch (key) {
            case 'file':
                return <View style={[styles.iconContainer, { backgroundColor: "#DBECF6" }]}>
                    <FontAwesome6 name="file-text" size={25} color="#194A66" />
                </View>
            case 'goal':

            default:
                return <View style={[styles.iconContainer, { backgroundColor: "#DBECF6" }]}>
                    <FontAwesome6 name="file-text" size={25} color="#194A66" />
                </View>
        }
    }

    return (
        <View>
            <View style={[styles.todoItem, { borderBottomWidth: .3 }]}>
                <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                  {renderIcon(item?.category)}
                    <View>
                        <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
                            <Text style={[styles.title]}>{item.title}</Text>
                        </View>
                        <View style={{ flexDirection: "row", gap: 10, marginTop: 0 }}>
                            <Text style={[styles.time]}>{moment(item.date).format("MMMM DD, YYYY")}</Text>

                            <Text style={[styles.time]}>{moment(item.time).format("h:mm A")}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <TouchableOpacity >
                        <MaterialIcons name="check-box-outline-blank" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Todocard

const styles = StyleSheet.create({
    todoItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 18,

        borderBottomColor: "#c4c4c4"
    },
    iconContainer: {
        width: 50, height: 50, borderRadius: "50%", alignItems: "center", justifyContent: "center",
    },
    title: {
        fontWeight: "bold",
        fontSize: 16
    },
    time: {
        fontSize: 14
    },

});