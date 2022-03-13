import * as React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    Input,
    Select,
    Textarea,
    FormControl,
    FormLabel,
    Alert,
    AlertIcon,
    InputGroup,
    InputLeftAddon,
    AlertTitle,
    AlertDescription,
    FormHelperText,
    useColorModeValue,
    useColorMode,
    Flex,
    Box
  } from "@chakra-ui/react"
import { getSession } from "~/services/session.server"
import { MessageApi } from "~/api/messages";
import { NavLink } from '@remix-run/react';
import { Form, useSearchParams } from "remix";

interface Props {
    data: any;
    login: string;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const BizModal: React.FC<Props> = ({isOpen, onOpen, onClose, data, login}) => {
    const iconBlue = useColorModeValue("blue.500", "blue.500");
    const textColor = useColorModeValue("gray.700", "white");
    const grayTextColor = useColorModeValue("gray.500", "white");
    const borderColor = useColorModeValue("#dee2e6", "transparent");
    const { colorMode } = useColorMode();
    const [sent, setSent] = React.useState<string>('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const message = 'Меня интересует готовая фирма __' + event.target.id.value + '__ _' + event.target.name.value + "_.\nПрошу сообщить ФИО учредителя и ОГРН." + (event.target.comment.value ? "\n> " + event.target.comment.value : '')
        const res = await MessageApi.send({login, message})
        setSent('Ваш запрос по фирме ' + event.target.name.value + ' успешно отправлен! Спасибо.')
        console.log('Ураа ' + JSON.stringify(res))
    }

    return (
    <>
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
            <Flex justify='space-between' align='center' mb='1rem' w='100%'>
              <Text fontSize='lg' color={textColor} fontWeight='bold'>
                {data.name}
              </Text>
              <Button
                variant='outlined'
                color={colorMode === "dark" && "white"}
                borderColor={colorMode === "dark" && "white"}
                _hover={colorMode === "dark" && "none"}
                marginRight="25px"
                minW='110px'
                maxH='35px'>
                    В избранное
              </Button>
            </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <Form onSubmit={handleSubmit}>
        <Input type="hidden" id="id" name="id" value={data.id} />
        <Input type="hidden" id="name" name="name" value={data.name} />
        <ModalBody>
            
        <Flex direction='column' w='100%'>

            <Flex direction='row' w='540px'>
                <Box p='2' border="1px" borderColor={grayTextColor} textAlign="center" width="30%">
                    <Text fontWeight="bold" fontSize="lg" mb="1rem">
                        {data.id}
                    </Text>
                    <Box p='2' border="1px" borderColor={grayTextColor}>
                    <Text fontSize="md" color={grayTextColor} fontWeight="bold">
                        {data.price} ₽
                    </Text>
                    </Box>
                </Box>
                <Box p='2' border="1px" borderColor={grayTextColor} width="35%">
                    <Text fontWeight="normal" color={textColor} mb="1rem">
                        Зарегистрировано
                    </Text>
                    <Text fontWeight="bold" mb="1rem">
                        {Number(data.where)>0 ? 'ИФНС ' + String(data.where) : ''}
                    </Text>
                </Box>
                <Box p='2' border="1px" borderColor={grayTextColor} width="35%">
                    <Text fontWeight="normal" mb="1rem">
                        {data.date}
                    </Text>
                    <Text fontWeight="normal" color={grayTextColor} mb="1rem">
                        {data.address}
                    </Text>
                </Box>
            </Flex>
            <Flex direction='row' w='540px'>
                <Box p='2' border="1px" borderColor={grayTextColor} width="30%">
                    <Text fontWeight="normal" color={grayTextColor} mb="1rem">
                        ФИО Учредителя
                    </Text>
                    <Text fontWeight="bold" color={textColor} mb="1rem">
                        ****************
                    </Text>
                    <Text fontWeight="normal" color={grayTextColor} mb="1rem">
                        ОГРН
                    </Text>
                    <Text fontWeight="bold" color={textColor} mb="1rem">
                        *************
                    </Text>
                </Box>
                <Box p='2' border="1px" borderColor={grayTextColor} width="70%">
                    <Flex direction='column' w='100%'>    
                        <Text fontWeight="bold" fontSize="lg" mb="1rem">
                            {data.bank}
                        </Text>
                        <Box p='2' border="1px" borderColor={grayTextColor}>
                            <Flex direction='row' w='100%'> 
                                <Text fontSize="md" color={textColor} fontWeight="normal" pb=".5rem">
                                    Основной вид деятельности
                                </Text>
                                <Text fontSize="md" marginLeft="10px" color={textColor} fontWeight="bold" pb=".5rem">
                                    {data.kind}
                                </Text>
                            </Flex>
                            {data.okved && (
                            <Text fontSize="sm" color={grayTextColor} fontWeight="normal">
                            {data.okved}
                            </Text>  )}
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        
          <FormControl id="comment">
          {sent === '' ? (
                <>
                <FormLabel htmlFor="comment">Если Вы заинтересованы в приобретении данной фирмы, отправьте нам запрос, при необходимости, указав комментарий.</FormLabel>
                <Textarea id="comment" name="comment" placeholder="Ваш комментарий"></Textarea>
                </> ) : ''}
            <Text fontSize="sm">После отправки сообщения, Вы всегда сможете проверить ответы и написать комментарии в разделе <NavLink style={{textDecoration: "underline"}} to="/dashboard/messages">Ваши Сообщения</NavLink></Text>
          </FormControl>
        </Flex>
        </ModalBody>

        <ModalFooter>
          {sent === '' ? (
          <>
          <Button variant={colorMode === "dark" ? "primary" : "dark"} mr={3} type="submit" disabled={false}>
            Отправить запрос
          </Button>
          <Button variant="ghost" onClick={onClose}>Отмена</Button>
          </>
          ): 
          <Alert status="success">
            <AlertIcon />
            <AlertTitle>{sent}</AlertTitle>
            <AlertDescription>В ближайшее время наш менеджер свяжется с Вами, и вышлет Вам запрошенную информацию.</AlertDescription>
          </Alert>
          }
        </ModalFooter>
        </Form>
      </ModalContent>
    </Modal>

      </>
    )
  }