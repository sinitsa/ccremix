// app/routes/login.tsx
import { Form, ActionFunction, LoaderFunction, redirect } from "remix";
import { authenticator } from "~/services/auth.server";
import { AuthorizationError } from "remix-auth";
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Icon,
  Link,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import signInImage from "~/assets/img/signInImage.png";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";

// First we create our UI with the form doing a POST and the inputs with the
// names we are going to use in the strategy
export default function LoginScreen() {
  const textColor = useColorModeValue("gray.700", "white");
  const bgForm = useColorModeValue("white", "navy.800");
  const titleColor = useColorModeValue("gray.700", "blue.500");
  const colorIcons = useColorModeValue("gray.700", "white");
  const bgIcons = useColorModeValue("trasnparent", "navy.700");
  const bgIconsHover = useColorModeValue("gray.50", "whiteAlpha.100");

  return (
    <>
    <Form method="post">
    <Flex position='relative' mb='40px'>
    <Flex
      minH={{ md: "1000px" }}
      h={{ sm: "initial", md: "75vh", lg: "85vh" }}
      w='100%'
      maxW='1044px'
      mx='auto'
      justifyContent='space-between'
      mb='30px'
      pt={{ md: "0px" }}>
      <Flex
        w='100%'
        h='100%'
        alignItems='center'
        justifyContent='center'
        mb='60px'
        mt={{ base: "50px", md: "20px" }}>
        <Flex
          zIndex='2'
          direction='column'
          w='445px'
          background='transparent'
          borderRadius='15px'
          p='40px'
          mx={{ base: "100px" }}
          m={{ base: "20px", md: "auto" }}
          bg={bgForm}
          boxShadow={useColorModeValue(
            "0px 5px 14px rgba(0, 0, 0, 0.05)",
            "unset"
          )}>
          <Text
            fontSize='xl'
            color={textColor}
            fontWeight='bold'
            textAlign='center'
            mb='22px'>
            Register With
          </Text>
          <HStack spacing='15px' justify='center' mb='22px'>
            <Flex
              justify='center'
              align='center'
              w='75px'
              h='75px'
              borderRadius='8px'
              border={useColorModeValue("1px solid", "0px")}
              borderColor='gray.200'
              cursor='pointer'
              transition='all .25s ease'
              bg={bgIcons}
              _hover={{ bg: bgIconsHover }}>
              <Link href='#'>
                <Icon as={FaFacebook} color={colorIcons} w='30px' h='30px' />
              </Link>
            </Flex>
            <Flex
              justify='center'
              align='center'
              w='75px'
              h='75px'
              borderRadius='8px'
              border={useColorModeValue("1px solid", "0px")}
              borderColor='gray.200'
              cursor='pointer'
              transition='all .25s ease'
              bg={bgIcons}
              _hover={{ bg: bgIconsHover }}>
              <Link href='#'>
                <Icon
                  as={FaApple}
                  color={colorIcons}
                  w='30px'
                  h='30px'
                  _hover={{ filter: "brightness(120%)" }}
                />
              </Link>
            </Flex>
            <Flex
              justify='center'
              align='center'
              w='75px'
              h='75px'
              borderRadius='8px'
              border={useColorModeValue("1px solid", "0px")}
              borderColor='gray.200'
              cursor='pointer'
              transition='all .25s ease'
              bg={bgIcons}
              _hover={{ bg: bgIconsHover }}>
              <Link href='#'>
                <Icon
                  as={FaGoogle}
                  color={colorIcons}
                  w='30px'
                  h='30px'
                  _hover={{ filter: "brightness(120%)" }}
                />
              </Link>
            </Flex>
          </HStack>
          <Text
            fontSize='lg'
            color='gray.400'
            fontWeight='bold'
            textAlign='center'
            mb='22px'>
            or
          </Text>
          <FormControl>
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
              Ваш EMail
            </FormLabel>
            <Input
              variant='auth'
              fontSize='sm'
              ms='4px'
              type='text'
              placeholder='Ваш EMail'
              name="login"
              id="login"
              mb='24px'
              size='lg'
            />
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
              Password
            </FormLabel>
            <Input
              variant='auth'
              fontSize='sm'
              ms='4px'
              type='password'
              placeholder='Your password'
              name="password"
              id="password"
              mb='24px'
              size='lg'
            />
            <FormControl display='flex' alignItems='center' mb='24px'>
              <Switch id='remember-login' colorScheme='blue' me='10px' />
              <FormLabel htmlFor='remember-login' mb='0' fontWeight='normal'>
                Запомнить меня
              </FormLabel>
            </FormControl>
            <Button
              fontSize='10px'
              variant='dark'
              fontWeight='bold'
              type="submit"
              w='100%'
              h='45'
              mb='24px'>
              ВОЙТИ
            </Button>
          </FormControl>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            maxW='100%'
            mt='0px'>
            <Text color={textColor} fontWeight='medium'>
              Ещё нет аккаунта? Зарегистрируйтесь! Форма не сложнее логина, обещаем ;)
              <Link
                color={titleColor}
                as='span'
                ms='5px'
                href='#'
                fontWeight='bold'>
                Регистрация
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Box
        overflowX='hidden'
        h='100%'
        w='100%'
        left='0px'
        position='absolute'
        bgImage={signInImage}>
        <Box
          w='100%'
          h='100%'
          bgSize='cover'
          bg='blue.500'
          opacity='0.8'></Box>
      </Box>
    </Flex>
  </Flex>
  </Form>
  </>
  );
}

// Second, we need to export an action function, here we will use the
// `authenticator.authenticate method`
export let action: ActionFunction = async ({ request } : {request: Request}) => {
    return await authenticator.authenticate("user-pass", request, {
        successRedirect: "/dashboard",
        failureRedirect: "/login",
 //       throwOnError: true,
    });
}
/*     try {
        // we call the method with the name of the strategy we want to use and the
        // request object, optionally we pass an object with the URLs we want the user
        // to be redirected to after a success or a failure
    } catch (error ) {
        // Because redirects work by throwing a Response, you need to check if the
        // caught error is a response and return it or throw it again
        if (error instanceof Response) return null;
        console.log('Error caught! - ' + error)
        if (error instanceof AuthorizationError) {
          // here the error is related to the authentication process
          console.log('auth error')
          return error
        }
        console.log('Error: ' + JSON.stringify(error))
        return null
        // here the error is a generic error that another reason may throw
      }
}
 */
// Finally, we can export a loader function where we check if the user is
// authenticated with `authenticator.isAuthenticated` and redirect to the
// dashboard if it is or return null if it's not
export let loader: LoaderFunction = async ({ request } : {request: Request}) => {
  // If the user is already authenticated redirect to /dashboard directly
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/dashboard",
  });
};