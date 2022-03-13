// import
/* import Dashboard from "~/views/Dashboard/Dashboard.js";
import Tables from "~/views/Dashboard/Tables.js";
import Billing from "~/views/Dashboard/Billing.js";
import RTLPage from "~/views/RTL/RTLPage.js";
import Profile from "~/views/Dashboard/Profile.js";
import SignIn from "~/views/Pages/SignIn.js";
import SignUp from "~/views/Pages/SignUp.js";
 */
import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from "~/components/Icons/Icons";

var dashRoutes = [
  {
    path: "/?type=moscow",
    name: "Московские фирмы",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color='inherit' />,
    component: '',
    layout: "",
  },
  {
    path: "/?type=rus",
    name: "Российские фирмы",
    rtlName: "لوحة القيادة",
    icon: <StatsIcon color='inherit' />,
    component: '',
    layout: "",
  },
  {
    path: "/?type=int",
    name: "Заграничные фирмы",
    rtlName: "لوحة القيادة",
    icon: <CreditIcon color='inherit' />,
    component: '',
    layout: "",
  },
];
export default dashRoutes;
