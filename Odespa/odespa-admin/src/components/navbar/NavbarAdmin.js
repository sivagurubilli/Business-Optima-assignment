// Chakra Imports
import { Box, Flex, Text, useDisclosure, Avatar, Menu, MenuButton, MenuList, MenuItem, IconButton, useColorModeValue } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';  // Example icon from react-icons
import { useNavigate } from 'react-router-dom';
import { logout } from '../../helpers/helper';

export default function AdminNavbar(props) {
  const [scrolled, setScrolled] = useState(false);
  const { onOpen, brandText, secondary, message } = props;
const navigate = useNavigate()
  useEffect(() => {
    window.addEventListener('scroll', changeNavbar);
    return () => {
      window.removeEventListener('scroll', changeNavbar);
    };
  });

  const changeNavbar = () => {
    if (window.scrollY > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const handleLogout =()=>{
logout()
navigate("/auth/sign-in")
  }

  const bgColor = useColorModeValue('white', 'gray.800'); // White background in light mode, dark mode in dark mode
const userData = JSON.parse(localStorage.getItem("userdata"))
  return (
    <Box bg={bgColor} boxShadow="sm" 	 
>
      <Flex
        w="100%"
        h="80px"
        align="center"
        justify="space-between"
		p="4"
        borderColor={useColorModeValue('gray.200', 'gray.700')}  // Border color based on the color mode
      >
        {/* Left Side: Icon (Example using a hamburger menu) */}
        <Box display="flex" alignItems="center"  >
          {/* <IconButton
            icon={<HiMenu />}
            aria-label="Open sidebar"
            variant="link"
            onClick={onOpen} // If you have a sidebar, you can toggle it here
            mr={4}
            display={{ base: 'block', md: 'none' }}  // Display only on small screens
          /> */}
        
        </Box>

        {/* Right Side: Username and Logout Dropdown */}
        <Box display="flex" alignItems="center">
          {/* Username Dropdown */}
		  <Text>{userData?.data?.name }</Text>

          <Menu>
            <MenuButton
              as={IconButton}
              icon={<Avatar size="sm" name="User" />}
              aria-label="User menu"
              variant="link"
              ml={4}
            />
            <MenuList>
            <MenuItem onClick={() => navigate("/admin/profile-data")}>Profile Details</MenuItem>
              <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
}

AdminNavbar.propTypes = {
  brandText: PropTypes.string,
  variant: PropTypes.string,
  secondary: PropTypes.bool,
  fixed: PropTypes.bool,
  onOpen: PropTypes.func,
  message: PropTypes.string,
};
