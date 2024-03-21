import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import StartMeeting from '../components/StartMeeting';
import { initSocket } from '../socket';
import { io } from "socket.io-client";
import { Camera } from 'expo-camera';
import FontAwesome from "react-native-vector-icons/FontAwesome";

let socket;

const items = [
    {
        id: 1,
        name: "microphone",
        title: "Mute",
        customColor: "#efefef"
    },
    {
        id: 2,
        name: "video-camera",
        title: "Stop Video",
    },
    {
        id: 3,
        name: "upload",
        title: "Share Screen",
    },
    {
        id: 4,
        name: "group",
        title: "Participants",
    },
]

const MeetingRoom = () => {
    const [name, setName] = useState();
    const [roomId, setRoomId] = useState();
    const [activeUsers, setActiveUsers] = useState(["Satyajit", "John"]);
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
        socket = io("https://70e1-106-222-187-101.ngrok-free.app")
        socket.on('connection', () => {
            console.log("connected")
        })

        socket.on('all-users', users => {
            console.log("Active users");
            console.log(users)
            users = users.filter(user => (user.userName !== name))
            setActiveUsers(users);
        })
    }, [])




    return (
        <View style={styles.container}>
            {startCamera ? (
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.activeUsersContainer}>
                        <View style={styles.cameraContainer}>
                            <Camera
                                type={"front"}
                                style={{
                                    width: activeUsers.length === 0 ? "100%" : 200,
                                    height: activeUsers.length === 0 ? 600 : 200
                                }}
                            >
                            </Camera>
                            {
                                activeUsers.map((user, index) => {
                                    <View style={styles.activeUserContainer} key={index}>
                                        <Text style={{ color: "white" }}>{user.userName}</Text>
                                    </View>
                                })
                            }
                        </View>
                    </View>
                    <View style={styles.menu}>
                        {
                            items.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        style={styles.tile}
                                        key={index}
                                    >
                                        <FontAwesome name={item.name} size={24} color={"#efefef"} />
                                        <Text style={styles.textTile}>{item.title}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </SafeAreaView>
            ) : (
                <StartMeeting
                    name={name}
                    setName={setName}
                    roomId={roomId}
                    setRoomId={setRoomId}
                    joinRoom={joinRoom}
                />
            )
            }
        </View >
    )
}

export default MeetingRoom

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1c1c1c",
        flex: 1
    },
    tile: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginTop: 15
    },
    textTile: {
        color: "white",
        marginTop: 10,
    },
    menu: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 20
    },
    cameraContainer: {
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
    },
    activeUsersContainer: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
    },
    activeUserContainer: {
        borderColor: "gray",
        borderWidth: 1,
        width: 200,
        height: 200,
        justifyContent: "center",
        alignItems: "center",
    },
})