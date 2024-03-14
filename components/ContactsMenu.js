import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react';
import AntDesign from "react-native-vector-icons/AntDesign";

const contactsMenuButtons = [
    {
        type: "starred",
        name: "Starred"
    },
    {
        type: "contact",
        name: "Satyajit Sahoo",
        photo: require("../assets/client-1.jpg")
    },
    {
        type: "contact",
        name: "John Doe",
        photo: require("../assets/client-2.jpg")
    },
    {
        type: "contact",
        name: "Jane Doe",
        photo: require("../assets/client-3.jpg")
    }
]

const ContactsMenu = () => {
    return (
        <View style={styles.container}>
            {
                contactsMenuButtons.map((contact, index) => {
                    {/* contact container */ }
                    return (
                        <View style={styles.row} key={index}>
                            {/* Image */}
                            {contact.type === "starred" ? (

                                < View style={styles.starredIcon} >
                                    <AntDesign name='star' size={30} color={"#efefef"} />
                                </View>
                            ) : (
                                <Image
                                    source={contact.photo}
                                    style={styles.image}
                                />
                            )}
                            {/* Text */}
                            <Text style={styles.text}>
                                {contact.name}
                            </Text>
                        </View >
                    )
                })
            }
        </View >
    )
}

export default ContactsMenu

const styles = StyleSheet.create({
    container: {

    },
    row: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
    },
    starredIcon: {
        backgroundColor: "#333333",
        width: 55,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    text: {
        color: 'white',
        paddingLeft: 15,
        fontSize: 18,
    },
    image: {
        width: 55,
        height: 55,
        borderRadius: 20,
    }
})