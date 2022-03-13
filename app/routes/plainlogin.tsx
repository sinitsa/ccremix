// app/routes/login.tsx
import { Form, ActionFunction, LoaderFunction, redirect } from "remix";
import { authenticator } from "~/services/auth.server";
import { AuthorizationError } from "remix-auth";

// First we create our UI with the form doing a POST and the inputs with the
// names we are going to use in the strategy
export default function Screen() {
  return (
    <Form method="post">
      <input type="email" name="login" required />
      <input
        type="password"
        name="password"
        autoComplete="current-password"
        required
      />
      <button>Sign In</button>
    </Form>
  );
}

// Second, we need to export an action function, here we will use the
// `authenticator.authenticate method`
export let action: ActionFunction = async ({ request } : {request: Request}) => {
    return await authenticator.authenticate("user-pass", request, {
        successRedirect: "/dashboard",
        failureRedirect: "/login",
 //       throwOnError: true,
    });
}
/*     try {
        // we call the method with the name of the strategy we want to use and the
        // request object, optionally we pass an object with the URLs we want the user
        // to be redirected to after a success or a failure
    } catch (error ) {
        // Because redirects work by throwing a Response, you need to check if the
        // caught error is a response and return it or throw it again
        if (error instanceof Response) return null;
        console.log('Error caught! - ' + error)
        if (error instanceof AuthorizationError) {
          // here the error is related to the authentication process
          console.log('auth error')
          return error
        }
        console.log('Error: ' + JSON.stringify(error))
        return null
        // here the error is a generic error that another reason may throw
      }
}
 */
// Finally, we can export a loader function where we check if the user is
// authenticated with `authenticator.isAuthenticated` and redirect to the
// dashboard if it is or return null if it's not
export let loader: LoaderFunction = async ({ request } : {request: Request}) => {
  // If the user is already authenticated redirect to /dashboard directly
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/dashboard",
  });
};