import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Grid,
  GridItem,
  Flex,
  Text,
  useToast,
  FormErrorMessage,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CountryService from '../../../services/country.service';

function AddCountry() {
  const navigate = useNavigate();
  const toast = useToast();
  const textColor = useColorModeValue('navy.700', 'white');
  const brandStars = useColorModeValue('red.500', 'red.400');

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Country name is required'),
    status: Yup.string().required('Please select Status'),
   
  });

  // React Hook Form setup
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      status: 'active',
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await CountryService.createcountry(data);
      if (response) {
        toast({
          title: 'Country created successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/admin/countries');
      }
    } catch (error) {
      toast({
        title: 'Error creating country',
        description: error?.response?.data?.error || 'An error occurred',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const cancelHandler = () => {
    navigate(-1);
  };

  return (
    <Box p={4}>
      <div
        className="text-start mt-5 mb-2 ms-1 m-3"
        style={{ fontWeight: '500', marginBottom: '10px' }}
      >
        <Link style={{ color: 'blue' }} to="/admin/default">
          Dashboard
        </Link>
        &nbsp;&#8811;
        <Link style={{ color: 'blue' }} to="/admin/countries">
          {' '}
          Countries
        </Link>
        &nbsp;&#8811; Add Country
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid
                templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
                gap={4}
              >
                <FormControl mb="4">
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Country Name  {' '}<Text as="span" color={brandStars}>
                                          *
                                        </Text>
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter country name"
                    {...register('name')}
                    isInvalid={!!errors.name}
                  />
                  {errors.name && (
                    <Text color="red.500" fontSize="sm" mt="1">
                      {errors.name.message}
                    </Text>
                  )}
                </FormControl>

                <FormControl mb="4" isInvalid={!!errors.status}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Status {' '}<Text as="span" color={brandStars}>
                                          *
                                        </Text>
                  </FormLabel>
                  <Select placeholder="Select status" {...register('status')}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Select>
                  {errors.status && (
                    <Text color="red.500" fontSize="sm" mt="1">
                      {errors.status.message}
                    </Text>
                  )}
                </FormControl>

              
              </Grid>

              <Flex mt={6} justifyContent="center">
                <Button
                  type="button"
                  colorScheme="red"
                  mr="3"
                  onClick={cancelHandler}
                >
                  Cancel
                </Button>
                <Button colorScheme="blue" type="submit">
                  Submit
                </Button>
              </Flex>
            </form>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default AddCountry;
