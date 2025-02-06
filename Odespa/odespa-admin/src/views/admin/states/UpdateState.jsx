import React, { useEffect, useState } from 'react';
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
  useColorModeValue,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CountryService from '../../../services/country.service';
import StateService from '../../../services/state.service';

function UpdateState() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [countries, setCountries] = useState([]);
  const [stateDetails, setStateDetails] = useState(null);
  const textColor = useColorModeValue('navy.700', 'white');
  const brandStars = useColorModeValue('red.500', 'red.400');
  const validationSchema = Yup.object().shape({
    country_id: Yup.string().required('Please Select Country'),
    name: Yup.string().required('State name is required'),
    status: Yup.string().required('Please select status'),
    
  });
  useEffect(() => {
    fetchCountries();
    fetchStateDetails();
  }, []);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      country_id: stateDetails?.country_id,
      name: stateDetails?.name,
      status: stateDetails?.status,
    },
  });

  useEffect(() => {
    if (stateDetails) {
      reset({
        country_id: stateDetails.country_id || '',
        name: stateDetails.name || '',
        status: stateDetails.status || '',
      });
    }
  }, [stateDetails, reset]);

  const fetchCountries = async () => {
    try {
      const response = await CountryService.getcountries();
      setCountries(response.details);
    } catch (error) {
      toast({
        title: 'Error fetching countries',
        description: error?.response?.data?.error || 'An error occurred',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const fetchStateDetails = async () => {
    try {
      const response = await StateService.viewstate(id);
      setStateDetails(response.details[0]);
      reset(response);
    } catch (error) {
      toast({
        title: 'Error fetching state details',
        description: error?.response?.data?.error || 'An error occurred',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await StateService.updatestate({ data, id });
      if (response) {
        toast({
          title: 'State updated successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/admin/states');
      }
    } catch (error) {
      toast({
        title: 'Error updating state',
        description: error?.response?.data?.error || 'An error occurred',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const cancelHandler = () => {
    navigate('/admin/states');
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
        <Link style={{ color: 'blue' }} to="/admin/states">
          {' '}
          States
        </Link>
        &nbsp;&#8811; Update State
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
                <FormControl mb="4" isInvalid={!!errors.country_id}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Country{' '}
                    <Text as="span" color={brandStars}>
                      *
                    </Text>
                  </FormLabel>
                  <Select
                    id="country_id"
                    placeholder="Select country"
                    {...register('country_id')}
                  >
                    {countries?.map((country) => (
                      <option key={country._id} value={country._id}>
                        {country.name}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>
                    {errors.country_id?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl mb="4" isInvalid={!!errors.name}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    State Name{' '}
                    <Text as="span" color={brandStars}>
                      *
                    </Text>
                  </FormLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter state name"
                    {...register('name')}
                  />
                  <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </FormControl>

                <FormControl mb="4" isInvalid={!!errors.status}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Status{' '}
                    <Text as="span" color={brandStars}>
                      *
                    </Text>
                  </FormLabel>
                  <Select
                    id="status"
                    placeholder="Select status"
                    {...register('status')}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Select>
                  <FormErrorMessage>{errors.status?.message}</FormErrorMessage>
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
                  Update
                </Button>
              </Flex>
            </form>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default UpdateState;
