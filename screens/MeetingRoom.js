import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import StartMeeting from '../components/StartMeeting';
import { initSocket } from '../socket';
import { io } from "socket.io-client";
import { Camera } from 'expo-camera';

let socket;

const MeetingRoom = () => {
    const [name, setName] = useState();
    const [roomId, setRoomId] = useState();
    const [activeUsers, setActiveUsers] = useState();
    const [startCamera, setStartCamera] = useState(false);

    const startCameraHandler = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status === "granted") {
            setStartCamera(true);
        } else {
            Alert.alert("Access denied!");
        }
    }

    const joinRoom = () => {
        startCameraHandler();
        socket.emit('join-room', { roomId: roomId, userName: name })
    }

    useEffect(() => {
        socket = io("https://dd4b-2401-4900-74dd-f45f-d0fd-a6ff-91c4-1c19.ngrok-free.app")
        socket.on('connection', () => {
            console.log("connected")
        })

        // socket.on('all-users', users => {
        //     console.log("Active users");
        //     console.log(users)
        //     setActiveUsers(users);
        // })
    }, [])




    return (
        <View style={styles.container}>
            {startCamera ? (
                <Camera
                    type={"front"}
                    style={{ width: "100%", height: 600 }}
                >

                </Camera>
            ) : (
                <StartMeeting
                    name={name}
                    setName={setName}
                    roomId={roomId}
                    setRoomId={setRoomId}
                    joinRoom={joinRoom}
                />
            )}
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