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
  FormErrorMessage,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import BannerService from '../../../services/banner.service';
import CityService from '../../../services/city.service';

function AddBanner() {
  const toast = useToast();
  const navigate = useNavigate();
  const textColor = useColorModeValue('navy.700', 'white');
  const brandStars = useColorModeValue('red.500', 'red.400');
  const [cities, setCities] = useState([]); // For city dropdown


  const validationSchema = Yup.object().shape({
    image: Yup.string()
      .required('Please enter image url')
      .url('Please enter a valid image URL'),
    banner_text: Yup.string().required('Banner text is required'),
        city: Yup.string().required('Please select a city'),
    status: Yup.string().required('Status is required'),
  });

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const cityResponse = await CityService.getcities();
        setCities(cityResponse.details);
      } catch (error) {
        toast({
          title: 'Error fetching cities',
          description: error?.response?.data?.error || 'An error occurred',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
    fetchData()
  },[])
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      status: 'active',
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await BannerService.createbanner(data);
      if (response) {
        toast({
          title: 'Banner created successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/admin/banners');
      }
    } catch (error) {
      toast({
        title: 'Error creating banner',
        description: error?.response?.data?.error || 'An error occurred',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
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
        <Link style={{ color: 'blue' }} to="/admin/banners">
          {' '}
          Banners
        </Link>
        &nbsp;&#8811; Add Banners
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
              
                {/* Banner Text */}
                <FormControl mb="4" isInvalid={!!errors.banner_text}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Banner Text{' '}
                    <Text as="span" color={brandStars}>
                      *
                    </Text>
                  </FormLabel>{' '}
                  <Input
                    type="text"
                    placeholder="Enter banner text"
                    {...register('banner_text')}
                  />
                  <FormErrorMessage>
                    {errors.banner_text?.message}
                  </FormErrorMessage>
                </FormControl>

                {/* Image Upload */}
                <FormControl mb="4" isInvalid={!!errors.image}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Image Link{' '}
                    <Text as="span" color={brandStars}>
                      *
                    </Text>
                  </FormLabel>{' '}
                  <Input type="text"   placeholder="Enter image URL" {...register('image')} />
                  <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
                </FormControl>

                {/* Status */}
                <FormControl mb="4" isInvalid={!!errors.status}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Status{' '}
                    <Text as="span" color={brandStars}>
                      *
                    </Text>
                  </FormLabel>{' '}
                  <Select placeholder="Select status" {...register('status')}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Select>
                  <FormErrorMessage>{errors.status?.message}</FormErrorMessage>
                </FormControl>

                  <FormControl mb="4" isInvalid={!!errors.city}>
                                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                                    City  {" "}
                                    <Text as="span" color={brandStars}>*</Text>
                                  </FormLabel>
                                  <Select id="city" placeholder="Select city" {...register('city')}>
                                    {cities?.map((city) => (
                                      <option key={city._id} value={city._id}>{city.name}</option>
                                    ))}
                                  </Select>
                                  <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
                                </FormControl>
              </Grid>

              <Flex mt={6} justifyContent="center">
                <Button colorScheme="red" mr="3" onClick={() => navigate(-1)}>
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

export default AddBanner;
