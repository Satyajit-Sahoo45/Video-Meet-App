import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

const StartMeeting = ({ name, setName, roomId, setRoomId }) => {
    return (
        <View style={styles.startMeetingContainer}>
            <View style={styles.info}>
                <TextInput
                    style={styles.textInput}
                    placeholder='Enter name'
                    placeholderTextColor="#767476"
                    value={name}
                    onChangeText={text => setName(text)}
                />
            </View>
            <View style={styles.info}>
                <TextInput
                    style={styles.textInput}
                    placeholder='Enter room id'
                    placeholderTextColor="#767476"
                    value={roomId}
                    onChangeText={text => setRoomId(text)}
                />
            </View>
            <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                    style={styles.startMeetingButton}
                    onPress={() => { }}
                >
                    <Text style={{ color: "white", fontWeight: "bold" }}>Start Meeting</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default StartMeeting

const styles = StyleSheet.create({
    startMeetingContainer: {
    },
    info: {
        width: "100%",
        backgroundColor: "#373538",
        height: 50,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#484648",
        padding: 12,
        justifyContent: "center",
    },
    textInput: {
        color: "white",
        fontSize: 18
    },
    startMeetingButton: {
        width: 350,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0470DC",
        height: 50,
        borderRadius: 15
    }
})