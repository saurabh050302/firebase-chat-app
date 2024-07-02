import React, { useState } from 'react'
import { Text, Avatar, HStack, VStack, SlideFade } from '@chakra-ui/react'

import getFormattedTime from "../utils/getDate"

const Message = ({ text, uri, createdAt, user = "other" }) => {

    const [showTimeStamp, setShowTimeStamp] = useState(false);
    const handleMouseIn = () => { setShowTimeStamp(true) }
    const handleMouseOut = () => { setShowTimeStamp(false) }

    return (
        <HStack
            maxW={"80%"}
            alignSelf={user === "me" ? "flex-end" : "flex-start"}
            flexDir={user === "me" && "row-reverse"}
        >
            <Avatar size={"md"} src={uri} />
            <VStack gap={0}>
                <Text
                    w={"full"}
                    bgColor={"gray.200"}
                    px={"2"} py={"1"}
                    rounded={"md"}
                    onMouseEnter={handleMouseIn}
                    onMouseLeave={handleMouseOut}
                >
                    {text}
                </Text>
            </VStack >
            <Text
                alignSelf={"end"}
                fontSize={"x-small"}
                py={user === "me" ? 3 : 1}
                w={"7em"}
                textAlign={user === "me" ? "right" : "left"}
            >
                <SlideFade direction='bottom' in={showTimeStamp}>
                    {getFormattedTime(createdAt * 1000)}
                </SlideFade>
            </Text>
        </HStack >
    )
}

export default Message