import Loadable from 'react-loadable';
import Loading from '@/components/Loading'
const Dashboard = Loadable({loader: () => import('@/views/dashboard'),loading: Loading});
const Table = Loadable({ loader: () => import('@/views/table'), loading: Loading });
const Map = Loadable({loader: () => import('@/views/map'),loading: Loading});
const Error404 = Loadable({loader: () => import('@/views/error/404'),loading: Loading});
const User = Loadable({loader: () => import('@/views/user'),loading: Loading});
const About = Loadable({loader: () => import('@/views/about'),loading: Loading});

export default [
  { path: "/dashboard", component: Dashboard, roles: ["admin","editor","guest"] },
  { path: "/table", component: Table, roles: ["admin", "editor", "guest"] },
  { path: "/map", component: Map, roles: ["admin", "editor", "guest"] },
  { path: "/user", component: User, roles: ["admin", "editor", "guest"] },
  { path: "/about", component: About, roles: ["admin", "editor", "guest"] },
  { path: "/error/404", component: Error404 },
];
