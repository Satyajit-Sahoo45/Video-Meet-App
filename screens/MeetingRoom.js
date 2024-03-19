import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import StartMeeting from '../components/StartMeeting';
import { initSocket } from '../socket';
import { io } from "socket.io-client";

const socket = io('https://13a2-2401-4900-313a-3533-892f-7df8-b0b-e08a.ngrok-free.app');

const MeetingRoom = () => {
    const [name, setName] = useState();
    const [roomId, setRoomId] = useState();

    useEffect(() => {
        console.log("calling meeting room useEffect")
        console.log(socket, ";;;")
        socket.connect("connect", (socketId) => {
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