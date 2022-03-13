import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { SessionApi } from "~/api/session";
import { sessionStorage } from "~/services/session.server";
import { Session } from "~/types/session";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator = new Authenticator<Session>(sessionStorage);

// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({ form }) => {
    let login = String(form.get('login'))
    let password = String(form.get('password'))
    let session = await SessionApi.doLogin({login, password});
    // the type of this user must match the type you pass to the Authenticator
    // the strategy will automatically inherit the type if you instantiate
    // directly inside the `use` method
    if (session.login)
        return Promise.resolve(session as Session);
    
    return Promise.reject(Error('Auth error'))
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "user-pass"
);