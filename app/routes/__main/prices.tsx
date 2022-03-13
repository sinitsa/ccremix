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
import {  Alert } from "@chakra-ui/react";
import { FormTextarea } from '~/components/FormTextarea';
import { PricesApi } from '~/api/prices';
import { z } from 'zod';

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
  return (
    <div>
      <div className="sm:px-10 p-5">
        <h2 className="mt-6 text-xl">PRICES: {title}</h2>
        <p className="py-2">
          {res}<br />
        </p>
        <br />
        <Link to="/dashboard/prices">Prices update</Link>
        <p>{JSON.stringify(data)}</p>
        <br /><br />
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
      </div>
    </div>
  );
}


