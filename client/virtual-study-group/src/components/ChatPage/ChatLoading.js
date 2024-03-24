import { Stack } from '@chakra-ui/layout'
import { Skeleton } from '@chakra-ui/react'
import React from 'react'

const ChatLoading=()=>{
    {console.log("1")}
    return(
        <Stack>
            <Skeleton height="45px"/>
            <Skeleton height="45px"/>
            <Skeleton height="45px"/>
            <Skeleton height="45px"/>
            <Skeleton height="45px"/>
            <Skeleton height="45px"/>
            <Skeleton height="45px"/>
            <Skeleton height="45px"/>
            <Skeleton height="45px"/>
            <Skeleton height="45px"/>
            <Skeleton height="45px"/>
            <Skeleton height="45px"/>
            <Skeleton height="45px"/>
            <Skeleton height="45px"/>
        </Stack>
    )
}

export default ChatLoading