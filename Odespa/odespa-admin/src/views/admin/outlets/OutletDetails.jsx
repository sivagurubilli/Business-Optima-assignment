import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardBody,
  Heading,
  Text,
  Flex,
  Button,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import OutletService from '../../../services/outlets.service';

function OutletDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [outlet, setOutlet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOutletDetails = async () => {
      try {
        const response = await OutletService.viewoutlets(id);
        setOutlet(response?.details?.[0]); // Ensure the data structure is correctly mapped
      } catch (error) {
        toast({
          title: 'Error fetching outlet details',
          description: error?.response?.data?.message || 'An error occurred',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOutletDetails();
  }, [id, toast]);

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!outlet) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Text fontSize="lg" color="red.500">
          Outlet details not found.
        </Text>
      </Flex>
    );
  }

  // Destructure outlet details
  const {
    name,
    address_info: { address_1, address_2, city, zip_code } = {},
    contact_info: { phone_1, phone_2, email } = {},
    currency: { name: currencyName, code: currencyCode, symbol } = {},
    additional_info,
  } = outlet;

  // Helper function to render a key-value row.
  // The key container (left 50%) is right-aligned and the value container (right 50%) is left-aligned.
  const renderRow = (keyLabel, value) => (
    <Flex justify="space-between" align="center" mb={4} >
      <Box width="50%" textAlign="left">
        <Text fontWeight="bold">{keyLabel}:</Text>
      </Box>
      <Box width="50%" textAlign="right">
        <Text>{value || 'N/A'}</Text>
      </Box>
    </Flex>
  );

  return (
    <div>
    <Box mb={4}  fontWeight="bold">
    <Link style={{ color: 'blue' }} to="/admin/dashboard">
      Dashboard
    </Link>
    &nbsp;&#8811;&nbsp;
    <Link style={{ color: 'blue' }} to="/admin/outlets">
      Outlets
    </Link>
    &nbsp;&#8811;&nbsp; Outlet Details
  </Box>
    <Flex minH="100vh" align="center" justify="center" bg="gray.50" p={4}>
      {/* Outer Card */}
      <Card w={{ base: '90%', md: '60%' }} boxShadow="lg" borderRadius="md">
        <CardBody p={6}>
          {/* Breadcrumb */}
        

          {/* Outlet Name */}
          <Heading as="h2" size="lg" mb={6} textAlign="center">
            {name}
          </Heading>

          {/* Inner Card for Outlet Details */}
          <Card variant="outline" mb={6}>
            <CardBody >
              {renderRow("Address", `${address_1 || ''} ${address_2 || ''}`)}
              {renderRow("City", city)}
              {renderRow("Zip Code", zip_code)}
              {renderRow("Phone 1", phone_1?.number)}
              {renderRow("Phone 2", phone_2?.number || 'N/A')}
              {renderRow("Email", email)}
              {renderRow("Currency", `${currencyName} (${currencyCode}) ${symbol || ''}`)}
            </CardBody>
          </Card>

          {/* Inner Card for Additional Info, if available */}
          {additional_info && Object.keys(additional_info).length > 0 && (
            <Card variant="outline" mb={6}>
              <CardBody>
                <Heading as="h3" size="md" mb={4}>
                  Additional Info
                </Heading>
                {Object.entries(additional_info)
                  .filter(([key]) => key !== '__v' && key !== '_id')
                  .map(([key, value], index) => (
                    <React.Fragment key={index}>
                      {renderRow(key, value)}
                    </React.Fragment>
                  ))}
              </CardBody>
            </Card>
            
          )}

          {/* Buttons */}
          <Flex mt={6} justify="space-between">
            <Button
              colorScheme="blue"
              onClick={() => navigate(`/admin/outlet/edit/${id}`)}
            >
              Edit
            </Button>
            <Button colorScheme="red" onClick={() => navigate('/admin/outlets')}>
              Back to List
            </Button>
          </Flex>
        </CardBody>
      </Card>
    </Flex>
    </div>
  );
}

export default OutletDetails;
