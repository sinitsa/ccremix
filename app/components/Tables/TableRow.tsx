import {
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue
} from "@chakra-ui/react";
import { z } from "zod";
import { priceRowSchema } from "~/api/types/Price.zod";

function TablesTableRow(row : z.infer<typeof priceRowSchema> & {okved: string, isLast: boolean, setSid: (sid: string) => void, onOpen: () => void}) {
//  const { logo, name, email, subdomain, domain, status, date, isLast } = props;

  const textColor = useColorModeValue("gray.500", "white");
  const titleColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const where = Number(row.where) > 0 ? 'ИФНС ' + row.where : row.where
  return (
    <Tr>
      <Td
        minWidth={{ sm: "250px" }}
        pl="0px"
        borderColor={borderColor}
        borderBottom={row.isLast ? "none" : undefined}
      >
        <Flex paddingLeft={0} paddingRight={0} direction="column">
          <Text
            fontSize="md"
            color={titleColor}
            fontWeight="bold"
            minWidth="100%"
          >
            <Button onClick={()=>{row.setSid(String(row.id));row.onOpen();}}>{row.name}</Button>
          </Text>
          <Text marginLeft="7px" marginTop="3px" fontSize="sm" color={textColor} fontWeight="bold">
            {row.id}
          </Text>
        </Flex>
      </Td>

      <Td borderColor={borderColor} borderBottom={row.isLast ? "none" : undefined}>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {where}
          </Text>
          <Text fontSize="sm" color="gray.400" fontWeight="bold">
            {row.address}
          </Text>
          <Text fontSize="sm" color="gray.400" fontWeight="normal">
            {row.date}
          </Text>
        </Flex>
      </Td>
      <Td borderColor={borderColor} borderBottom={row.isLast ? "none" : undefined}>
        <Badge
          bg={String(row.bank).length > 9 ? "green.400" : bgStatus}
          color={row.bank !== "без счета" ? "white" : "white"}
          fontSize="14px"
          p="3px 10px"
          borderRadius="8px"
          whiteSpace="normal"
        >
          {String(row.bank).length > 9 ? 'Есть' : 'Нет'}
        </Badge>
      </Td>
      <Td borderColor={borderColor} borderBottom={row.isLast ? "none" : undefined}>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {row.kind}{row.okved && (
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {row.okved}
            </Text>  )}
        </Text>
      </Td>
      <Td borderColor={borderColor} borderBottom={row.isLast ? "none" : undefined}>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {row.price}&nbsp;₽
        </Text>
      </Td>
    </Tr>
  );
}

export default TablesTableRow;
