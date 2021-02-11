import { Redirect } from 'react-router-dom';

// Dashboard
import Dashboard from '../pages/Dashboard/index';

const userRoutes = [
  { path: '/dashboard', component: Dashboard },

  // this route should be at the end of all other routes
  { path: '/', exact: true, component: () => <Redirect to='/dashboard' /> },
];

/* const authRoutes = [
    { path: "/logout", component: Logout },
    { path: "/login", component: Login },
    { path: "/forgot-password", component: ForgetPwd },
    { path: "/register", component: Register },
]   */

export { userRoutes /* authRoutes */ };
