import { ITodoItem } from '@/app/Screens/Home';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import moment from 'moment';
import React, { PropsWithChildren } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Iprop = PropsWithChildren<{
    item: ITodoItem,
    selectTodoID?: number[],
    handleSelect?: (id: number) => void

}>

const Todocard = ({ item, handleSelect, selectTodoID }: Iprop) => {
    const renderIcon = (key: string): React.ReactElement => {
        switch (key) {
            case 'file':
                return <View style={[styles.iconContainer, { backgroundColor: "#DBECF6" }]}>
                    <FontAwesome6 name="file-text" size={25} color="#194A66" />
                </View>
            case 'goal':
                return <View style={[styles.iconContainer, { backgroundColor: "#FEF5D3" }]}>
                    <AntDesign name="Trophy" size={25} color="#403100" />
                </View>
            case 'event':
                return <View style={[styles.iconContainer, { backgroundColor: "#E7E2F3" }]}>
                    <MaterialIcons name="event" size={25} color="#4A3780" />
                </View>
            default:
                return <View style={[styles.iconContainer, { backgroundColor: "#DBECF6" }]}>
                    <FontAwesome6 name="file-text" size={25} color="#194A66" />
                </View>
        }
    }

    return (
        <View>
            <View style={[styles.todoItem, { borderBottomWidth: .3, opacity: item?.completed ? 0.5 : 1 }]}>
                <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                    {renderIcon(item?.category)}
                    <View>
                        <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
                            <Text style={[styles.title, item?.completed ? styles.disableline : {}]}>{item.title}</Text>
                            {
                                item?.notes && 
                                <TouchableOpacity onPress={() => { Alert.alert("Notes", item.notes) }}>
                                    <MaterialIcons name="speaker-notes" size={24} color="#4A3780" />
                                </TouchableOpacity>
                                
                            }

                        </View>
                        <View style={{ flexDirection: "row", gap: 10, marginTop: 0 }}>
                            <Text style={[styles.time, item?.completed ? styles.disableline : {}]}>{moment(item.date).format("MMMM DD, YYYY")}</Text>

                            <Text style={[styles.time, item?.completed ? styles.disableline : {}]}>{moment(item.time).format("h:mm A")}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    {
                        item.completed ?
                            <TouchableOpacity >
                                <MaterialIcons name="check-box" size={24} color="#4A3780" />
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={()=> handleSelect && handleSelect(item?.id)}>
                                {
                                    selectTodoID?.includes(item.id) ?
                                        <MaterialIcons name="check-box" size={24} color="#4A3780" /> :
                                        <MaterialIcons name="check-box-outline-blank" size={24} color="#4A3780" />
                                }
                            </TouchableOpacity>
                    }

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
    disableline: {
        color: "#c4c4c4",
        textDecorationLine: "line-through"
    }

});