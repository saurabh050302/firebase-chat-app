import React from 'react'
import { Text, Avatar, HStack } from '@chakra-ui/react'

const Message = ({ text, uri, user = "other" }) => {
    return (
        <HStack maxW={"80%"} alignSelf={user === "me" ? "flex-end" : "flex-start"} flexDir={user === "me" && "row-reverse"} >
            <Avatar size={"sm"} src={uri}></Avatar>
            <Text w={"full"} h={"full"} bgColor={"gray.200"} px={"2"} py={"1"} rounded={"md"} >{text}</Text>
        </HStack >
    )
}

export default Message