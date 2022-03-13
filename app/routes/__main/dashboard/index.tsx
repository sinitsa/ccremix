import { Link, Outlet } from '@remix-run/react';
import type { MetaFunction, LinksFunction, LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';
import DashboardLayout from '~/layouts/Dashboard';

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
  return {
    title: 'Test',
  };
};

export default function Dashboard() {
  let { title } = useLoaderData();

  return (


    <div>
      <div className="sm:px-10 p-5">
        <h2 className="mt-6 text-xl">Dashboard: {title}</h2>
        <p className="py-2">
          Dashboard here <br />
          Checkout <Link to="/logout">Logout page</Link><br />
          Checkout new Index!!<Link to="/">Companies list</Link><br />
          Checkout new Messages!!<Link to="/dashboard/messages">Messages</Link><br />
          Checkout new login!!<Link to="/signin">Signin</Link><br />
          Checkout new auth test<Link to="/indexx">indexx</Link><br />
        </p>
        <br />
        <Link to="/dashboard/prices">Prices update</Link>

      </div>
    </div>

  );
}
