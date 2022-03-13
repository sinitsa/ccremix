import { Form, Link, useActionData } from '@remix-run/react';
import type { MetaFunction, LinksFunction, LoaderFunction } from 'remix';
import { useLoaderData, ActionFunction, json } from 'remix';
import { KVUsers } from '~/api/KVUsers';
import { PricesApi } from '~/api/prices';
import DashboardLayout from "~/layouts/Dashboard";
import Footer from "~/components/Footer/Footer.js";
import Card from "~/components/Card/Card";
import SignIn from "~/views/Pages/SignIn.js";
import AdminNavbar from "~/components/Navbars/AdminNavbar.js";
import { Alert, Box, Portal, Stack, useColorMode, useStyleConfig } from "@chakra-ui/react";
import { ValidatedForm, validationError } from 'remix-validated-form';
import { FormInput } from '~/components/FormInput';
import { SubmitButton } from '~/components/SubmitButton';
import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { tablesProjectData, tablesTableData } from "~/variables/general";
import React, { useState } from 'react';
import Sidebar from '~/components/Sidebar/Sidebar';
import { ArgonLogoDark, ArgonLogoLight, ChakraLogoDark, ChakraLogoLight } from '~/components/Icons/Icons';
import routes from "~/routes.js";
import Configurator from "~/components/Configurator/Configurator";
// Custom Chakra theme
import FixedPlugin from "../components/FixedPlugin/FixedPlugin";
// Custom components
import MainPanel from "../components/Layout/MainPanel";
import PanelContainer from "../components/Layout/PanelContainer";
import PanelContent from "../components/Layout/PanelContent";
import bgAdmin from "~/assets/img/admin-background.png";


export const loginSchema = z.object({
  login: z.string().email(),
  password: z.string().nonempty('Password must be not empty'),
});
export const validator = withZod(loginSchema)

export const action: ActionFunction = async ({
  request,
}: {
  request: Request;
}) => {
  const data = await validator.validate(await request.formData());
  if (data.error) return validationError(data.error);
  
  return json(data);
};


export let meta: MetaFunction = () => {
  return {
    title: 'remix-worker-template',
    description: 'All-in-one remix starter template for Cloudflare Workers',
  };
};

export let links: LinksFunction = () => {
  return [];
};

export let loader: LoaderFunction = async ({ request, context }) => {
  // const u = new KVUsers()
  //let res = await PricesApi.get();
  let fres
  //fres = await fetch('https://api.lawsvc.ru/price/get')
  const { DB } = context.env;
//  const ttt = await DB.list()
  return {
    title: 'SIGN IN',
  //  ttt: JSON.stringify(ttt)
  };
};

export default function Dash(props: any) {
  let { title } = useLoaderData();
  //const data = useActionData();
  const { ...rest } = props;
  // states and functions
  const [fixed, setFixed] = useState(false);
  const { colorMode } = useColorMode();

/*   <div>
  <ValidatedForm validator={validator} method="post">
  <FormInput name="login" label="Login" />
  <FormInput name="password" label="Password" />
  <SubmitButton />
</ValidatedForm>
</div>
 */
  return (
    <>

<div>
      <div className="sm:px-10 p-5">
        <h2 className="mt-6 text-xl">Dashboard: {title}</h2>
        <p className="py-2">
          WORKING LINKS  ;) <br />
          Index!!<Link to="/">Index</Link><br />
          Companies Index!!<Link to="/list">Companies list</Link><br />
           Newlogin here (l: tester@text.com p: supeqqr) !!<Link to="/login">Login</Link><br />
           When Dashboard<Link to="/dashboard">Dashboard</Link><br />
           When Prices upload <Link to="/dashboard/prices">Prices</Link><br />
           Checkout new Messages<Link to="/dashboard/messages">Messages</Link><br />
          Checkout <Link to="/logout">Logout page</Link><br />
 
        </p>
        <br />
        <Link to="/dashboard/prices">Prices update</Link>

      </div>
    </div>
    

  </>
  );
}
