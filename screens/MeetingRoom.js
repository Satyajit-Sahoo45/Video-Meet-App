import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import StartMeeting from '../components/StartMeeting';
import { initSocket } from '../socket';
import { io } from "socket.io-client";

let socket;

const MeetingRoom = () => {
    const [name, setName] = useState();
    const [roomId, setRoomId] = useState();
    const [activeUsers, setActiveUsers] = useState();

    const joinRoom = () => {
        socket.emit('join-room', { roomId: roomId, userName: name })
    }

    useEffect(() => {
        socket = io("https://13a2-2401-4900-313a-3533-892f-7df8-b0b-e08a.ngrok-free.app")
        socket.on('connection', () => {
            console.log("connected")
        })

        socket.on('all-users', users => {
            console.log("Active users");
            console.log(users)
            setActiveUsers(users);
        })
    }, [])




    return (
        <View style={styles.container}>
            <StartMeeting
                name={name}
                setName={setName}
                roomId={roomId}
                setRoomId={setRoomId}
                joinRoom={joinRoom}
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