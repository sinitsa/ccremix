import { Link, useActionData } from '@remix-run/react';
import type { MetaFunction, LinksFunction, LoaderFunction } from 'remix';
import { json, ActionFunction, useLoaderData } from 'remix';
import { withZod } from "@remix-validated-form/with-zod";
import { priceInputSchema } from '~/api/types/Price.zod';
import {
  ValidatedForm,
  validationError,
} from "remix-validated-form";
import { FormInput } from '~/components/FormInput';
import { SubmitButton } from '~/components/SubmitButton';
import {  Alert, Box, Button, Flex, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FormTextarea } from '~/components/FormTextarea';
import { PricesApi } from '~/api/prices';
import DashboardLayout from "~/layouts/Dashboard";
import { z } from 'zod';
import Card from '~/components/Card/Card';
import CardBody from "~/components/Card/CardBody.js";
import CardHeader from "~/components/Card/CardHeader.js";

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
  return {
    title: 'Test',
    res: ''
  };
};

export default function Prices() {
  let { title, res } = useLoaderData();
  const data = useActionData();
  const iconBlue = useColorModeValue("blue.500", "blue.500");
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("#dee2e6", "transparent");
  const { colorMode } = useColorMode();

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

        <p>{JSON.stringify(data)}</p>

        <ValidatedForm validator={validator} method="post">
          <FormInput name="prefix" label="Prefix" />
          <FormInput name="type" label="Type" />
          <FormTextarea name="body" label="Body" />
          {data && (
            <Alert
              variant="info"
              title={data.type + '-' + data.prefix}
            />
          )}
          <SubmitButton />
        </ValidatedForm>

      </CardBody>
    </Card>
  </>
    );
}


