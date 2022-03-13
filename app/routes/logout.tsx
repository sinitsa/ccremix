import { Form, ActionFunction, LoaderFunction, redirect } from "remix";
import { authenticator } from "~/services/auth.server";

export let action: ActionFunction = async ({ request } : {request: Request}) => {
    await authenticator.logout(request, { redirectTo: "/login" });
  };


  export let loader: LoaderFunction = async ({ request } : {request: Request}) => {
   return await authenticator.logout(request, { redirectTo: "/login" });
  };

  export default function Screen() {
    return (
        <p>logout</p>
    );
  }