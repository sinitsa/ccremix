import { Link, useActionData } from '@remix-run/react';
import type { MetaFunction, LinksFunction, LoaderFunction } from 'remix';
import { json, ActionFunction, useLoaderData, Form, useSearchParams  } from 'remix';
import { withZod } from "@remix-validated-form/with-zod";
import { priceInputSchema } from '~/api/types/Price.zod';
import {
  ValidatedForm,
  validationError,
} from "remix-validated-form";
import { FormInput } from '~/components/FormInput';
import { Messages } from '~/components/Messages/Messages';
import { SubmitButton } from '~/components/SubmitButton';
import {  Alert, AlertIcon, AlertTitle, Box, Button, Flex, Text, useColorMode, useColorModeValue, FormControl, Textarea, FormLabel } from "@chakra-ui/react";
import { FormTextarea } from '~/components/FormTextarea';
import { PricesApi } from '~/api/prices';
import DashboardLayout from "~/layouts/Dashboard";
import { z } from 'zod';
import Card from '~/components/Card/Card';
import CardBody from "~/components/Card/CardBody.js";
import CardHeader from "~/components/Card/CardHeader.js";
import { getSession } from '~/services/session.server';
import { MessageApi } from '~/api/messages';
import React from 'react';

export const validator = withZod(priceInputSchema)

export const action: ActionFunction = async ({
  request,
}: {
  request: Request;
}) => {
  const data = await validator.validate(await request.formData());
  if (data.error) return validationError(data.error);
  
  const res = await PricesApi.set(data as unknown as z.infer<typeof priceInputSchema>)

  return json(res);
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

export let loader: LoaderFunction = async ({ request } : {request: Request}) => {
//  const q = await db.list()
  const session = await getSession(
    request.headers.get("Cookie")
  );

  const messages = await MessageApi.get(session.data.user.login)

  return {
    title: 'Test',
    res: '',
    session,
    messages
  };
};

export default function MessagesPage() {
  let { title, res, session, messages } = useLoaderData();
  const data = useActionData();
  const iconBlue = useColorModeValue("blue.500", "blue.500");
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("#dee2e6", "transparent");
  const { colorMode } = useColorMode();
  const [sent, setSent] = React.useState<string>('');

  const handleSubmit = async (event) => {
      event.preventDefault();
      const res = await MessageApi.send({login: session.data.user.login, message: event.target.comment.value})
      setSent('Ваш комментарий успешно отправлен! Спасибо.')
      console.log('Ураа ' + JSON.stringify(res))
  }

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
            Ваши сообщения
          </Text>
{/*           <Button variant={colorMode === "dark" ? "primary" : "dark"}>
            ADD A NEW CARD
          </Button>
 */}        </Flex>
      </CardHeader>
      <CardBody>


        <Form method="post" onSubmit={handleSubmit}>
          {sent === '' ? (
                <>
                  <Textarea id="comment" name="comment" placeholder="Ваш комментарий"></Textarea>
                  <Button variant={colorMode === "dark" ? "primary" : "dark"} mr={3} type="submit" disabled={false}>
                    Отправить комментарий
                  </Button>
                </> ) : (
                  <Alert status="success">
                    <AlertIcon />
                    <AlertTitle>{sent}</AlertTitle>
                  </Alert>
                )}

        </Form>

        <Messages data={messages} />

      </CardBody>
    </Card>
  </>
    );
}


