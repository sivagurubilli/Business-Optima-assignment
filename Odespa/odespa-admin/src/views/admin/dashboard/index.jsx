import React from 'react';
import {
  Box,
  Flex,
  Text,
  Link as ChakraLink,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link, Outlet } from 'react-router-dom';
import { FaHome, FaCity, FaMapMarkerAlt, FaPlusCircle } from 'react-icons/fa';

const Dashboard = () => {
  const bg = useColorModeValue('gray.100', 'gray.900');
  const textColor = useColorModeValue('gray.800', 'white');
  const linkColor = useColorModeValue('blue.500', 'blue.300');

  const menuItems = [
    { name: 'Home', icon: FaHome, path: '/admin/default' },
    { name: 'Cities', icon: FaCity, path: '/admin/cities' },
    { name: 'Locations', icon: FaMapMarkerAlt, path: '/admin/locations' },
    { name: 'Add Location', icon: FaPlusCircle, path: '/admin/add-location' },
  ];

  return (
    <Flex h="100vh" bg={bg}>
      {/* Sidebar */}
     

      {/* Main Content */}
      <Box flex="1" p={6} overflowY="auto">
        <Text fontSize="2xl" fontWeight="bold" color={textColor} mb={6}>
          Welcome to the Dashboard
        </Text>

        {/* Placeholder for dynamic content */}
        <Outlet />
      </Box>
    </Flex>
  );
};

export default Dashboard;
