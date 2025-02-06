import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  GridItem,
  Image,
  Text,
  Heading,
  Spinner,
  Flex,
  Button,
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
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!outlet) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Text fontSize="lg" color="red.500">
          Outlet details not found.
        </Text>
      </Flex>
    );
  }

  const {
    name,
    address_info: { address_1, address_2, city, zip_code } = {},
    contact_info: { phone_1, phone_2, email } = {},
    currency: { name: currencyName, code: currencyCode, symbol } = {},
    additional_info,
    culture_code_at_center,
  } = outlet;

  return (
    <Box p={4}>
      <div className="text-start mt-5 mb-2 ms-1 m-3" style={{ fontWeight: '500', marginBottom: '10px' }}>
        <Link style={{ color: 'blue' }} to="/admin/dashboard">
          Dashboard
        </Link>
        &nbsp;&#8811;
        <Link style={{ color: 'blue' }} to="/admin/outlets">
          Outlets
        </Link>
        &nbsp;&#8811; Outlet Details
      </div>

      <Grid templateColumns="repeat(12, 1fr)" gap={4}>
        <GridItem colSpan={12}>
          <Box
            p={6}
            border="1px solid #E2E8F0"
            borderRadius="md"
            bg="white"
            boxShadow="sm"
          >
            <Grid templateColumns={{ base: '1fr', md: '1fr 2fr' }} gap={4}>
              <Box>
                <Image
                  src={outlet?.image || '/placeholder.jpg'} // Add a placeholder image if none exists
                  alt={name || 'Outlet Image'}
                  borderRadius="md"
                  boxSize="300px"
                  objectFit="cover"
                />
              </Box>
              <Box>
                <Heading as="h2" size="lg" mb={4}>
                  {name}
                </Heading>
                <Text fontSize="lg" mb={2}>
                  <strong>Address:</strong> {`${address_1 || ''} ${address_2 || ''}`}
                </Text>
                <Text fontSize="lg" mb={2}>
                  <strong>City:</strong> {city}
                </Text>
                 <Text fontSize="lg" mb={2}>
                  <strong>Zip Code:</strong> {zip_code}
                </Text>
                <Text fontSize="lg" mb={2}>
                  <strong>Phone 1:</strong> {phone_1?.number}
                </Text>
                <Text fontSize="lg" mb={2}>
                  <strong>Phone 2:</strong> {phone_2?.number || 'N/A'}
                </Text>
                <Text fontSize="lg" mb={2}>
                  <strong>Email:</strong> {email || 'N/A'}
                </Text>
                <Text fontSize="lg" mb={2}>
                  <strong>Currency:</strong> {`${currencyName} (${currencyCode}) ${symbol || ''}`}
                </Text> 
                {/* <Text fontSize="lg" mb={2}>
                  <strong>Culture Code:</strong> {culture_code_at_center}
                </Text> */}
                <Text fontSize="lg" mb={2}>
                  <strong>Additional Info:</strong>  {additional_info && Object.keys(additional_info).length > 0 ? (
    Object.entries(additional_info).filter(([key]) => key !== '__v' && key !== '_id').map(([key, value], index) => (
      <Text key={index} as="span" display="block">
        <strong>{key}:</strong> {value || 'N/A'}
      </Text>
    ))
  ) : (
    'N/A'
  )}
                </Text> 
              </Box>
            </Grid>

            <Flex mt={6} justifyContent="flex-end">
              <Button
                colorScheme="blue"
                mr="3"
                onClick={() => navigate(`/admin/outlet/edit/${id}`)}
              >
                Edit
              </Button>
              <Button
                colorScheme="red"
                onClick={() => navigate('/admin/outlets')}
              >
                Back to List
              </Button>
            </Flex>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default OutletDetails;
