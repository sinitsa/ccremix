import { Badge, Box, Flex } from "@chakra-ui/react";
import { z } from "zod";
import { messagesSchema } from "~/api/messages";
import { marked }  from "marked"

export function Messages({data}: {data: z.infer<typeof messagesSchema>[]} ) {


    return (
        <>
        <Flex direction='column' w='100%'>
                {data.map((row, index, arr) => {
                  return (
                    <Box p='1' key={"b"+row.id}>
                        <Message
                        {...row}
                        key={row.id} />
                    </Box>
                  )})}
        </Flex>
        </>
    )
}


export function Message(data: z.infer<typeof messagesSchema> ) {
    return (
    <>
        <Badge
          bg={data.from === 'tvuex' ? "blue.500" :  "green.400"}
          color="white"
          fontSize="14px"
          fontWeight="normal"
          p="3px 10px"
          borderRadius="8px"
          whiteSpace="normal"
          dangerouslySetInnerHTML={{__html: marked.parse(data.text)}}
        >
        </Badge>
    </>
    )
}

