import { Form, Link, useActionData } from '@remix-run/react';
import type { MetaFunction, LinksFunction, LoaderFunction } from 'remix';
import { useLoaderData, ActionFunction, json } from 'remix';
import { KVUsers } from '~/api/KVUsers';
import { PricesApi } from '~/api/prices';
import AuthLayout from "~/layouts/Auth";
import Card from "~/components/Card/Card";
import SignIn from "~/views/Pages/SignIn.js";
import Footer from "~/components/Footer/Footer.js";
import AuthNavbar from "~/components/Navbars/AuthNavbar.js";
import { Alert, Box, Portal, useStyleConfig } from "@chakra-ui/react";
import { ValidatedForm, validationError } from 'remix-validated-form';
import { FormInput } from '~/components/FormInput';
import { SubmitButton } from '~/components/SubmitButton';
import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { tablesProjectData, tablesTableData } from "~/variables/general";
import React from 'react';
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
    ttt: JSON.stringify({})
  };
};

export default function Screen() {
  let { title, ttt } = useLoaderData();
  //const data = useActionData();
  const wrapper = React.createRef();
  const navRef = React.useRef();
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
    <SignIn />
  </>
  );
}
