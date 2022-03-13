import type { MetaFunction, LinksFunction, LoaderFunction } from 'remix';
import { useLoaderData, ActionFunction, json, Outlet } from 'remix';
import AuthLayout from "~/layouts/Auth";
import React from 'react';

export default function AuthLayoutOutlet({ children }: React.PropsWithChildren<{}>) {
   // let { title, ttt } = useLoaderData();
    //const data = useActionData();

    return (
    <>
        <AuthLayout>
            <Outlet />
        </AuthLayout>
    </>
    );
  }