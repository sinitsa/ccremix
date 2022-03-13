import { Link, Outlet, ShouldReloadFunction } from '@remix-run/react';
import type { MetaFunction, LinksFunction, LoaderFunction } from 'remix';
import { useLoaderData, json } from 'remix';
import { KVUsers } from '~/api/KVUsers';
import { PricesApi } from '~/api/prices';
import BizTable from '~/components/Tables/BizTable';
import DashboardLayout from "~/layouts/Dashboard";
import Card from '~/components/Card/Card';
import CardBody from "~/components/Card/CardBody.js";
import CardHeader from "~/components/Card/CardHeader.js";
import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { getSession } from '~/services/session.server';
//import dd from '~/assets/okved_2014.json'
export let meta: MetaFunction = () => {
  return {
    title: 'remix-worker-template',
    description: 'All-in-one remix starter template for Cloudflare Workers',
  };
};

export let links: LinksFunction = () => {
  return [];
};

export let loader: LoaderFunction = async ({ request, context, params }) => {
  let url = new URL(request.url);
  let type = url.searchParams.get('type');
  // const session = await getSession(
  //   request.headers.get("Cookie")
  // );
  // const u = new KVUsers()
  let res = await PricesApi.get();
  let okved = await PricesApi.okved();
/*  let okved: any = {}
  for (let i = 0; i < dd.RECORDS.length; i++) {
    okved[dd.RECORDS[i]['native_code']] = dd.RECORDS[i]['name']
  }
 */   const { DB } = context.env;

//  const ttt = await DB.list()
  return json({
    title: 'Готовые компании',
    type,
    res,
    okved,
//    session
//    fres: await fres.json(),
  //  ttt: JSON.stringify(ttt)
  })
};

/* export let unstable_shouldReload: ShouldReloadFunction = ({ prevUrl, url }) => {
  return true;
};
 */
export default function Index() {
  let { title, type, res, okved, session } = useLoaderData();
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <>
      <br /><br />
    <Card p='16px' mt='24px'>
      <CardHeader>
        <Flex
          justify='space-between'
          align='center'
          minHeight='60px'
          w='100%'>
          <Text fontSize='lg' color={textColor} fontWeight='bold'>
            Добавить прайс-лист
          </Text>
{/*           <Button variant={colorMode === "dark" ? "primary" : "dark"}>
            ADD A NEW CARD
          </Button>
 */}        </Flex>
      </CardHeader>
      <CardBody>
          All-in-one remix starter template for Cloudflare Workers. <br />
          Checkout <Link to="/login">Login page</Link> also <br />
          Checkout <Link to="/signin">Signin page</Link> also<br />
          Checkout <Link to="/dash">Dash page</Link> also<br />
          Checkout <Link to="/prices">Prices page</Link> also<br />
          </CardBody>
    </Card>
    <Outlet />
    <BizTable name={title} data={res} okved={okved} login={session?.data.user.login} />
    </>
  );
}
