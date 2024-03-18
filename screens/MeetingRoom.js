import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import StartMeeting from '../components/StartMeeting';
import { initSocket } from '../socket';
import { io } from "socket.io-client";

const socket = io('http://localhost:3001');

const MeetingRoom = () => {
    const [name, setName] = useState();
    const [roomId, setRoomId] = useState();

    useEffect(() => {
        console.log("calling meeting room useEffect")
        console.log(socket, ";;;")
        socket.on("connection", (socketId) => {
            console.log(socketId, ":::")
        })
        console.log("after socket")
    }, [])



    return (
        <View style={styles.container}>
            <StartMeeting
                name={name}
                setName={setName}
                roomId={roomId}
                setRoomId={setRoomId}
            />
        </View>
    )
}

export default MeetingRoom

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1c1c1c",
        flex: 1
    }
})