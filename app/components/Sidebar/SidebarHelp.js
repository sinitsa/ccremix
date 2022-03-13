import {
  Button,
  Flex,
  Image,
  Link,
  Stack,
  Select,
  SelectField,
  SelectFieldProps,
  Text,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import SidebarHelpImage from "~/assets/img/SidebarHelpImage.png";
import React from "react";
import { Form, useSearchParams } from "remix";

export function SidebarHelp(props) {
  // Pass the computed styles into the `__css` prop
  const { children, sidebarVariant, ...rest } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const { colorMode } = useColorMode();
  let [searchParams] = useSearchParams();
  let type = searchParams.get("type") || ''
  let name = searchParams.get("name");
  let kind = searchParams.get("kind");
  let price = Number(searchParams.get("price"));
  let bank = Number(searchParams.get("bank"));
  return (
    <Stack
      justify='center'
      direction='column'
      align='center'
      spacing='20px'
      mb="22px"
      mt="auto"
      mx='20px'>
      <Form method="get" action="/">
        <Input type="hidden" id="type" name="type" value={type} />
        <Flex direction='column' textAlign='center'>
          <Text fontSize='14px' color={textColor} fontWeight='bold'>
            Уточните параметры поиска
          </Text>
          <FormControl width="95%">
            <FormLabel fontSize='14px' htmlFor="name">Название / ID</FormLabel>
            <Input id="name" name="name" type="text" />
          </FormControl>
          <FormControl width="95%">
            <FormLabel fontSize='14px' htmlFor="bank">Счёт в банке</FormLabel>
            <Select fontSize='14px' id="bank" name="bank">
              <option value="0">Неважно</option>
              <option value="1">Со счётом</option>
              <option value="-1">Без счёта</option>
          </Select>
          </FormControl>
          <FormControl width="95%">
            <FormLabel fontSize='14px' htmlFor="kind">Код деятельности</FormLabel>
            <Input id="kind" name="kind" type="text" />
          </FormControl>
          <FormControl width="95%">
            <FormLabel fontSize='14px' htmlFor="price">Цена до</FormLabel>
            <Input id="price" name="price" type="text" />
          </FormControl>
          <FormControl width="95%">
            <Button variant='primary' type='submit' minW='100%'>
              Выбрать
            </Button>
          </FormControl>
        </Flex>
{/*       <Link href='https://www.creative-tim.com/product/argon-dashboard-chakra-pro' minW='100%'>
        
          <Button
            variant={colorMode === "light" ? 'dark' : "navy"}
            minW='100%'
            mb={"12px"}>
            UPGRADE TO PRO
          </Button>
        
      </Link>
 */}      </Form>
    </Stack>
  );
}
