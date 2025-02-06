import React from 'react';
import {
  RiDashboard3Fill ,
} from 'react-icons/ri';

import { Icon } from '@chakra-ui/react';
import { MdAdminPanelSettings, MdArrowDropDown, MdAssignment, MdCategory, MdEvent, MdHome, MdInfo, MdList, MdLocalOffer, MdLocationOn,  MdLock,  MdMedicalInformation,  MdOutlineAccessTimeFilled,  MdOutlineMap,  MdPerson,  MdPhotoLibrary, MdSupervisorAccount } from 'react-icons/md';

import { IoEarth } from 'react-icons/io5';
import { FaBook, FaBuilding, FaConciergeBell, FaStore, FaThLarge, FaUserFriends } from 'react-icons/fa';
import AdminDetails from './views/admin/admins/AdminDetails';
import CreateAdmin from './views/admin/admins/CreateAdmin';
import AllAdmins from './views/admin/admins';
import SignIn from "./views/auth/signIn/index"
import Banners from './views/admin/banners';
import AddBanner from './views/admin/banners/AddBanner';
import UpdateBanner from './views/admin/banners/UpdateBanner';
import Cities from './views/admin/cities';
import AddCity from './views/admin/cities/AddCity';
import UpdateCity from './views/admin/cities/UpdateCity';
import Services from './views/admin/services';
import AddService from './views/admin/services/AddService';
import UpdateService from './views/admin/services/UpdateService';
import Outlets from './views/admin/outlets';
import AddOutlet from './views/admin/outlets/AddOutlet';
import UpdateOutlet from './views/admin/outlets/UpdateOutlet';
import Dashboard from './views/admin/dashboard';
import OutletDetails from './views/admin/outlets/OutletDetails';
import AddCountry from './views/admin/countries/AddCountry';
import CountryDetails from './views/admin/countries/CountryDetails';
import UpdateCountry from './views/admin/countries/UpdateCountry';
import States from './views/admin/states';
import AddState from './views/admin/states/AddState';
import StateDetails from './views/admin/states/StateDetails';
import UpdateState from './views/admin/states/UpdateState';
import Countries from './views/admin/countries';
import Categories from './views/admin/categories';
import CategoriesByOutlet from './views/admin/categories/CategoriesByOutlet';
import ServicesByOutlet from './views/admin/services/ServiceByOutlet';
import AddCategory from './views/admin/categories/AddCategories';
import UpdateCategory from './views/admin/categories/UpdateCategories';
import BookingsTable from './views/admin/bookings';
import GuestsList from './views/admin/bookings/GuestList';
import UsersList from './views/admin/admins/GetUsers';

const routes = [
  {
    name: 'Dashboard',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={RiDashboard3Fill} width="20px" height="20px" color="inherit" />,
    component: <Dashboard />,
  },
  {
    name: 'Banners',
    layout: '/admin',
    path: '/banners',
    icon: <Icon as={MdPhotoLibrary} width="20px" height="20px" color="inherit" />, 
    component: <Banners />,
  },

  {
    layout: '/admin',
    path: '/banners/add',
    component: <AddBanner />,
  },
  {
    layout: '/admin',
    path: '/banners/edit/:id',
    component: <UpdateBanner />,
  },
  
  {
    name: 'Countries',
    layout: '/admin',
    path: '/countries',
    icon: (
      <Icon
        as={IoEarth}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <Countries />,
    secondary: true,
  },
  {
    layout: '/admin',
    path: '/country/add',
    component: <AddCountry />,
  },
  {
    layout: '/admin',
    path: '/country/:id',
    component: <CountryDetails />,
  },
  {
    layout: '/admin',
    path: '/country/edit/:id',
    component: <UpdateCountry />,
  },
  {
    name: 'States',
    layout: '/admin',
    path: '/states',
    icon: (
      <Icon
        as={MdOutlineMap }
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <States />,
    secondary: true,
  },
  {
    layout: '/admin',
    path: '/state/add',
    component: <AddState />,
  },
  {
    layout: '/admin',
    path: '/state/:id',
    component: <StateDetails />,
  },
  {
    layout: '/admin',
    path: '/state/edit/:id',
    component: <UpdateState/>,
  },
  
  {
    name: 'Cities',
    layout: '/admin',
    icon: <Icon as={FaBuilding  } width="20px" height="20px" color="inherit" />,
    path: '/cities',
    component: <Cities />,
  },
  {
    name: 'Outlets',
    layout: '/admin',
    icon: <Icon as={FaStore  } width="20px" height="20px" color="inherit" />,
    path: '/outlets',
    component: <Outlets />,
  },
  {
    layout: '/admin',
    path: '/city/add',
    component: <AddCity />,
  },
  {
    layout: '/admin',
    path: '/city/edit/:id',
    component: <UpdateCity />,
  },
  {
    name: 'Services',
    layout: '/admin',
    icon: <Icon as={FaConciergeBell  } width="20px" height="20px" color="inherit" />,
    path: '/services',
    component: <Services />,
  },
  {
    name: 'Categories',
    layout: '/admin',
    icon: <Icon as={FaThLarge  } width="20px" height="20px" color="inherit" />,
    path: '/categories',
    component: <Categories />,
  },  {
    name: 'Bookings',
    layout: '/admin',
    icon: <Icon as={FaBook  } width="20px" height="20px" color="inherit" />,
    path: '/bookings',
    component: <BookingsTable />,
  },
  {
    name: 'Users',
    layout: '/admin',
    icon: <Icon as={FaUserFriends  } width="20px" height="20px" color="inherit" />,
    path: '/users',
    component: <UsersList />,
  },
  {
    layout: '/admin',
    path: '/service/add',
    component: <AddService />,
  },
  
  {
    layout: '/admin',
    path: '/outlet/services/:id',
    component: <ServicesByOutlet />,
  },
  {
    layout: '/admin',
    path: '/service/edit/:id',
    component: <UpdateService />,
  },

 
  {
    layout: '/admin',
    path: '/categories/add',
    component: <AddCategory />,
  },
  {
    layout: '/admin',
    path: '/categories/edit/:id',
    component: <UpdateCategory />,
  },
  {
    layout: '/admin',
    path: '/outlet/categories/:id',
    component: <CategoriesByOutlet />,
  },
  {
    layout: '/admin',
    path: '/service/add',
    component: <AddService />,
  },
  {
    layout: '/admin',
    path: '/service/edit/:id',
    component: <UpdateService />,
  },

  
  {
    layout: '/admin',
    path: '/outlet/add',
    component: <AddOutlet />,
  },
  {
    layout: '/admin',
    path: '/outlet/edit/:id',
    component: <UpdateOutlet />,
  },
  {
    layout: '/admin',
    path: '/outlet/:id',
    component: <OutletDetails />,
  },
  {
    layout: '/admin',
    path: '/admin-data/:id',
    component: <AdminDetails />,
  },
  {
    layout: '/admin',
    path: '/create-admin',
    component: <CreateAdmin />,
  },


 
  {
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <SignIn />,
  },
];

export default routes;
