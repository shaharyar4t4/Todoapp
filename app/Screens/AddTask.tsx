import MainLayout from '@/components/Layouts/MainLayout';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import moment from 'moment';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { IStackScreen } from '../Navigations/Stack/AllScreen';

export interface Ifield {
    title: string;
    category: "goal" | "notes" | "event";
    notes?: string;
    date: Date;
    time: Date;
}

type propsType = NativeStackScreenProps<IStackScreen, "AddTask">

const AddTask = (props: propsType) => {
    const { navigation } = props;
    const [fields, setFields] = useState<Ifield>({
        title: "",
        category: "notes",
        notes: "",
        date: new Date(),
        time: new Date(),
    });
    const handleChange = (key: keyof Ifield, value: string) => {
        setFields((prev => ({ ...prev, [key]: value }))
        );
    }
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
    const handleDateChange = (event:any, selectedDate?: Date) =>{
        if(selectedDate){
            setFields((prev) => ({ ...prev, date: selectedDate }));
        }
        setShowDatePicker(false);
    }
      const handleTimeChange = (event:any, selectedTime?:Date) =>{
        if(selectedTime){
            setFields((prev) => ({ ...prev, time: selectedTime }));
        }
        setShowTimePicker(false);
    }
    console.log(fields, ",<--payload");


    // save the data in the local storage
    // show the data which is entered by the user
    const handleSave = async () => {
        if(!fields.title){
            Alert.alert("Error", "Please enter a title for the task");
            return;
        }
        let todoItem:any = await AsyncStorage.getItem("todoItem");
        todoItem = todoItem ? JSON.parse(todoItem) : [];

        let newTodoItem = {
            id:todoItem?.length +1,
            title: fields.title,
            category: fields.category,
            notes: fields.notes,
            date: fields.date,
            time: fields.time,
            completed: false,
        }
        todoItem.unshift(newTodoItem);

        await AsyncStorage.setItem("todoItem", JSON.stringify(todoItem));
        navigation.navigate("Home");
        
    }
    
    return (
        <MainLayout>
            <View
                style={{
                    height: 70,
                    backgroundColor: '#4A3780',
                    padding: 10,
                    zIndex: 1
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Entypo name="cross" size={24} color="black" />
                </TouchableOpacity>
                <Text style={{ color: '#fff', fontSize: 16, textAlign: "center", fontWeight: "900", alignSelf: "center", verticalAlign: "middle", }}>Add New Task</Text>
            </View>
            <ScrollView contentContainerStyle={{ minHeight: "100%" }}>
                <View style={styles.container}>
                    <View style={{ marginTop: 20 }}>

                        {/*for the title */}
                        <Text style={styles.label}>Task Title</Text>
                        <TextInput style={styles.textInput}
                            placeholder='Task Title'
                            placeholderTextColor="grey"
                            value={fields.title}
                            onChangeText={(text) => handleChange('title', text)}
                        />
                    </View>


                    {/*for the date and time*/}
                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 20 }}>
                       {/*only for date Picker*/}
                        <View >
                            <Text style={styles.label}>Date</Text>
                            <View style={styles.customStyle}>
                                <Text style={styles.customText}>{moment(fields?.date).format("MM/DD/YYYY")}</Text>

                                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                                    <Entypo name="calendar" size={20} color="#4A3780" />

                                </TouchableOpacity>
                            </View>
                        </View>
                        {
                            showDatePicker && <DateTimePicker
                            mode='date'
                            display='default'
                            value={fields.date} 
                            onChange ={handleDateChange}

                            />
                        }

                        {/*only for Time Picker*/}
                        <View>
                            <Text style={styles.label}>Time</Text>
                            <View style={styles.customStyle}>
                                <Text style={styles.customText}>{moment(fields?.time).format("hh: mm A")}</Text>
                                <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                                    <AntDesign name="clockcircleo" size={20} color="#4A3780" />
                                </TouchableOpacity>

                            </View>
                        </View>
                        {
                            showTimePicker &&
                          <DateTimePicker
                            mode='time'
                            display='default'
                            value={fields.date} 
                            onChange ={handleTimeChange}
                            />
                            
                        }

                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>

                        {/*for the categroy */}
                        <Text style={styles.label}>Category</Text>
                        <TouchableOpacity
                            onPress={() => handleChange('category', 'notes')}

                            style={[styles.iconContainer, { backgroundColor: "#DBECF6", borderWidth: 3, borderColor: fields.category === "notes" ? "#4A3780" : "#fff" }]}
                        >
                            <FontAwesome6 name="file-text" size={25} color="#194A66" />
                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={() => handleChange('category', 'goal')}
                            style={[styles.iconContainer, { backgroundColor: "#FEF5D3", borderWidth: 3, borderColor: fields.category === "goal" ? "#4A3780" : "#fff" }]}>
                            <AntDesign name="Trophy" size={25} color="#403100" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleChange('category', 'event')}
                            style={[styles.iconContainer, { backgroundColor: "#E7E2F3", borderWidth: 3, borderColor: fields.category === "event" ? "#4A3780" : "#fff" }]}>
                            <MaterialIcons name="event" size={25} color="#4A3780" />
                        </TouchableOpacity>
                    </View>

                    {/*for the notes */}
                    <View>
                        <Text style={styles.label}>Notes</Text>
                        <TextInput style={[styles.textInput, { textAlignVertical: 'top', height: 150 }]}
                            placeholder='Notes'
                            placeholderTextColor="grey"
                            multiline
                            numberOfLines={5}
                            value={fields.notes}
                            onChangeText={(text) => handleChange('notes', text)}
                        />
                    </View>
                </View>
            </ScrollView>

             {/* Save Button */}
            <TouchableOpacity style={styles.btn} onPress={handleSave}>
                <Text style={styles.btnText}>{"Save"}</Text>
            </TouchableOpacity>
        </MainLayout>

    )
}

export default AddTask
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F5F9",
        paddingHorizontal: 20,
        gap: 20
    },
    iconContainer: {
        width: 50, height: 50, borderRadius: "50%", alignItems: "center", justifyContent: "center",
    },
    label: {
        fontSize: 14,
        letterSpacing: .5,
        fontWeight: "bold"
    },
    textInput: {
        borderWidth: .6,
        borderColor: "#c4c4c4",
        padding: 12,
        marginTop: 10,
        borderRadius: 4,
        backgroundColor: "#fff",
        fontSize: 16


    },

    btn: {
        backgroundColor: "#4A3780",
        position: "absolute",
        bottom: 45,
        left: 15,
        right: 15,
        paddingVertical: 15,
        borderRadius: 26
    },
    btnText: {
        textAlign: "center",
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold"
    },

    customStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: .6,
        borderColor: "#c4c4c4",
        padding: 12,
        marginTop: 10,
        borderRadius: 4,
        backgroundColor: "#fff",
        flex: 1,
        gap: 10,
    },
    customText: {
        fontSize: 16,
        color: "#000"
    }

})