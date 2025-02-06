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
  Textarea,
} from '@chakra-ui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ServicesService from '../../../services/services.service';  // Service for API calls

function UpdateService() {
  const { id } = useParams();  // Get the service ID from the URL parameters
  const navigate = useNavigate();
  const toast = useToast();
  const textColor = useColorModeValue('navy.700', 'white');
  const brandStars = useColorModeValue('red.500', 'red.400');
  
  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Service name is required'),
    description: Yup.string(),
    price: Yup.number().required('Price is required').positive('Price must be a positive number'),
    image: Yup.string()
      .required('Please enter image URL')
      .url('Please enter a valid image URL'),
    duration: Yup.string().required('Duration is required'),
    status: Yup.string().required('Please select status'),
  });

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  
  });

  // Fetch service data on component mount
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await ServicesService.viewservices(id); 
        if (response) {
          const service = response.details[0];
          setValue('name', service.name);
          setValue('description', service.description);
          setValue('price', service.price);
          setValue('image', service.image);
          setValue('duration', service.duration);
          setValue('status', service.status);
        }
      } catch (error) {
        toast({
          title: 'Error fetching service data',
          description: error?.response?.data?.error || 'An error occurred',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };
    fetchServiceData();
  }, [id, setValue, toast]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      let updateData ={
        ...data,
        id
      }
      const response = await ServicesService.updateservices( updateData); 
      if (response) {
        toast({
          title: 'Service updated successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/admin/services');
      }
    } catch (error) {
      toast({
        title: 'Error updating service',
        description: error?.response?.data?.error || 'An error occurred',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Cancel handler to navigate back
  const cancelHandler = () => {
    navigate('/admin/services');
  };

  return (
    <Box p={4}>
      <div className="text-start mt-5 mb-2 ms-1 m-3" style={{ fontWeight: '500', marginBottom: '10px' }}>
        <Link style={{ color: 'blue' }} to="/admin/default">
          Dashboard
        </Link>
        &nbsp;&#8811;
        <Link style={{ color: 'blue' }} to="/admin/services">
          {' '}
          Services
        </Link>
        &nbsp;&#8811; Update Service
      </div>

      <Grid templateColumns="repeat(12, 1fr)" gap={4}>
        <GridItem colSpan={12}>
          <Box p={6} border="1px solid #E2E8F0" borderRadius="md" bg="white" boxShadow="sm">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                {/* Name Field */}
                <FormControl mb="4" isInvalid={!!errors.name}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Service Name{' '}
                    <Text as="span" color={brandStars}>
                      *
                    </Text>
                  </FormLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter service name"
                    {...register('name')}
                  />
                  <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </FormControl>

                {/* Price Field */}
                <FormControl mb="4" isInvalid={!!errors.price}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Price{' '}
                    <Text as="span" color={brandStars}>
                      *
                    </Text>
                  </FormLabel>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Enter price"
                    {...register('price')}
                  />
                  <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
                </FormControl>

                {/* Duration Field */}
                <FormControl mb="4" isInvalid={!!errors.duration}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Duration{' '}
                    <Text as="span" color={brandStars}>
                      *
                    </Text>
                  </FormLabel>
                  <Input
                    id="duration"
                    type="text"
                    placeholder="Enter service duration"
                    {...register('duration')}
                  />
                  <FormErrorMessage>{errors.duration?.message}</FormErrorMessage>
                </FormControl>

                {/* Image Link Field */}
                <FormControl mb="4" isInvalid={!!errors.image}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Image Link{' '}
                    <Text as="span" color={brandStars}>
                      *
                    </Text>
                  </FormLabel>
                  <Input
                    type="url"
                    placeholder="Enter image link"
                    {...register('image')}
                  />
                  <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
                </FormControl>

                {/* Description Field */}
                <FormControl mb="4" isInvalid={!!errors.description}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Description{' '}
                  </FormLabel>
                  <Textarea
                    id="description"
                    placeholder="Enter service description"
                    {...register('description')}
                  />
                  <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
                </FormControl>

                {/* Status Field */}
                <FormControl mb="4" isInvalid={!!errors.status}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Status{' '}
                    <Text as="span" color={brandStars}>
                      *
                    </Text>
                  </FormLabel>
                  <Select id="status" placeholder="Select status" {...register('status')}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Select>
                  <FormErrorMessage>{errors.status?.message}</FormErrorMessage>
                </FormControl>
              </Grid>

              <Flex mt={6} justifyContent="center">
                <Button type="button" colorScheme="red" mr="3" onClick={cancelHandler}>
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

export default UpdateService;
