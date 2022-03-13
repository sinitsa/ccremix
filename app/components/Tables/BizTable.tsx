// Chakra imports
import {
    Flex,
    Table,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    useDisclosure
} from "@chakra-ui/react";
import React, { useState } from "react";
import { z } from "zod";
import { okvedSchema, priceRowSchema } from "~/api/types/Price.zod";
// Custom components
import Card from "~/components/Card/Card.js";
import CardBody from "~/components/Card/CardBody.js";
import CardHeader from "~/components/Card/CardHeader.js";
import TableRow from "~/components/Tables/TableRow";
import { useSearchParams } from "remix"
import { BizModal } from "../Modal/BizModal";
  
function BizTable(params: {name: string, data: z.infer<typeof priceRowSchema>[], okved: z.infer<typeof okvedSchema>, login: string}) {
    const { name, data, okved, login } = params
    const textColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [sid, setSid] = useState('');
    
    let [searchParams] = useSearchParams();
    let stype = searchParams.get("type") || ''
    let sname = searchParams.get("name");
    let skind = searchParams.get("kind");
    let sprice = Number(searchParams.get("price"));
    let sbank = Number(searchParams.get("bank"));

//    let sid = searchParams.get("id") || ''
    let mdata = data.filter((row) => {
      if (sid && row.id !== sid)
        return false
      return true
  })
    
    const rdata = data.filter((row) => {
        if (stype && row.type !== stype)
          return false
        if (sname && (row.name.indexOf(sname) === -1 ) && (String(row.id).indexOf(sname) === -1))
          return false;
        if (skind && String(row.kind).indexOf(skind) === -1)
          return false;
        if (sprice && (sprice < Number(row.price)))
          return false
        if (((sbank===1) && (String(row.bank).length < 10)) || ((sbank===-1) && (String(row.bank).length > 9)))
          return false
        return true
    })
    const getOkved = (code: string) => {
      let res = ''
      const c = code.substr(0,4)
      if (okved[code])
        res = okved[code]
      else if ((code[4]==='0') && okved[c])
        res = okved[c]

      return res
    }
    let md: any = mdata[0]
    md['okved'] = getOkved(String(md.kind))

    return (
      <>
      <BizModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} data={md} login={login} />
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
          <CardHeader p="6px 0px 22px 0px">
            <Text fontSize="xl" color={textColor} fontWeight="bold">
              {name} ({rdata.length})
            </Text>
          </CardHeader>
          <CardBody>
            {/* <div>{JSON.stringify(rdata)}</div> */}
            <Table variant="simple" color={textColor}>
              <Thead>
                <Tr my=".8rem" pl="0px" color="gray.400" >
                  <Th pl="0px" borderColor={borderColor} color="gray.400" >
                    Фирма
                  </Th>
                  <Th borderColor={borderColor} color="gray.400" >Регистрация</Th>
                  <Th borderColor={borderColor} color="gray.400" >Счёт, Карты, ЭЦП</Th>
                  <Th borderColor={borderColor} color="gray.400" >Основной вид деятельности</Th>
                  <Th borderColor={borderColor} color="gray.400" >Цена</Th>
                </Tr>
              </Thead>
              <Tbody>
                {rdata.map((row, index, arr) => {
                  return (
                    <TableRow
                      {...row}
                      key={row.id}
                      setSid={setSid}
                      onOpen={onOpen}
                      okved={getOkved(String(row.kind))}
                      isLast={index === arr.length - 1 ? true : false}
                    />
                  );
                })}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      </Flex>
      </>
    );
  }
  
  export default BizTable;
  