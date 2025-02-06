import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  Heading,
  Text,
  Spinner,
  Flex,
  Button,
  useToast,
  VStack,
  HStack,
  Badge,
  SkeletonText,
} from '@chakra-ui/react';
import { Link, useParams, useNavigate } from 'react-router-dom';

function AdminDetails() {
  const navigate = useNavigate();
  const toast = useToast();
  let data = JSON.parse(localStorage.getItem("userdata"))
  const [user, setUser] = useState(data); // State to hold user details

  if (!user) {
    return (
      <Box textAlign="center" mt={10}>
        <Heading size="md" mb={4}>
          User Not Found
        </Heading>
        <Button onClick={() => navigate('/admin/all-admins')} colorScheme="blue">
          Back 
        </Button>
      </Box>
    );
  }

  const {
    name,
    email,
  } = user?.data;

  return (
    <Box p={4}>
         
        
      {/* Breadcrumb */}
      <div
        className="text-start mt-5 mb-2 ms-1 m-3"
        style={{ fontWeight: '500' }}
      >
        <Link style={{ color: 'blue' }} to="/admin/default">
          Dashboard
        </Link>
        &nbsp;&#8811;
        <Link style={{ color: 'blue' }} to="/admin/all-admins">
          {' '}
          Admins
        </Link>
        &nbsp;&#8811; Admin Details
      </div>

      {/* User Details Card */}
      <Card
        className="d-flex justify-center"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p="5"
        bg=""
        borderRadius="md"
        boxShadow="md"
      >
        <Card w="50%" p="5" borderRadius="md" boxShadow="md">
        <Box display="flex" flexDirection="column" alignItems="center">
  <Heading as="h3" size="md" mb={4}>
    Admin Details
  </Heading>
</Box>

          <VStack spacing={4} align="stretch">
            <HStack justifyContent="space-between">
              <Text>Name:</Text>
              <Text>{name || 'N/A'}</Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text>Email:</Text>
              <Text>{email || 'N/A'}</Text>
            </HStack>
          </VStack>
        </Card>
      </Card>
    </Box>
  );
}

export default AdminDetails;
