import type { MetaFunction, LinksFunction, LoaderFunction } from 'remix';
import { useLoaderData, ActionFunction, json, Outlet } from 'remix';
import DashboardLayout from "~/layouts/Dashboard";
import React from 'react';
import { getSession } from '~/services/session.server';

export let loader: LoaderFunction = async ({ request, context, params }) => {
    let url = new URL(request.url);
    let type = url.searchParams.get('type');
    const session = await getSession(
      request.headers.get("Cookie")
    );

    return json({
        title: 'Готовые компании',
        type,
        session
    //    fres: await fres.json(),
      //  ttt: JSON.stringify(ttt)
      })    
}

export default function MainLayoutOutlet({ children }: React.PropsWithChildren<{}>) {
    let { title, type, session } = useLoaderData();
    //const data = useActionData();

    return (
    <>
        <DashboardLayout firstName="Готовые фирмы" firstLink="/" secondName={type}>
            <Outlet />
        </DashboardLayout>
    </>
    );
  }