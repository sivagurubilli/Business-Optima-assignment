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
import { Link, useNavigate, useParams } from 'react-router-dom';
import BannerService from '../../../services/banner.service';
import CityService from '../../../services/city.service';

function UpdateBanner() {
  const { id } = useParams();
  const [bannerDetails, setBannerDetails] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  const textColor = useColorModeValue('navy.700', 'white');
  const brandStars = useColorModeValue('red.500', 'red.400');
  const [cities, setCities] = useState([]);


  useEffect(() => {
    async function fetchData() {
      try {
        // Fetching banner details for updating
        const bannerResponse = await BannerService.viewbanner(id);
        setBannerDetails(bannerResponse.details[0] || {});


      } catch (error) {
        toast({
          title: 'Error loading data',
          description: error?.response?.data?.error || 'An error occurred',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
    fetchData();
  }, [id, toast]);
  const validationSchema = Yup.object().shape({
    image: Yup.string()
      .required('Please enter image url')
      .url('Please enter a valid image URL'),
    banner_text: Yup.string().required('Banner text is required'),
            city: Yup.string().required('Please select a city'),
    status: Yup.string().required('Status is required'),
  });

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: bannerDetails,
  });

  useEffect(() => {
    if (bannerDetails) {
      // Set default values from city details
      setValue('status',bannerDetails.status);
        setValue('image',bannerDetails.image);
        setValue('city',bannerDetails?.city?._id);
        setValue('banner_text',bannerDetails?.banner_text);
    }
  }, [bannerDetails, setValue]);

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




  const onSubmit = async (data) => {
    try {
      let updatedata ={
        ...data,
        id
      }
      const response = await BannerService.updatebanner(updatedata);
      if (response) {
        toast({
          title: 'Banner updated successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/admin/banners');
      }
    } catch (error) {
      toast({
        title: 'Error updating banner',
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
        &nbsp;&#8811; Update Banner
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

                {/* Image Link */}
                <FormControl mb="4" isInvalid={!!errors.image}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Image Link{' '}
                    <Text as="span" color={brandStars}>
                      *
                    </Text>
                  </FormLabel>{' '}
                  <Input type="text"  placeholder="Enter image URL" {...register('image')} />
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
                  {/* City Dropdown */}
                                <FormControl mb="4" isInvalid={!!errors.city}>
                                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                                    City  {" "}
                                    <Text as="span" color={brandStars}>*</Text>
                                  </FormLabel>
                                  <Select id="city" placeholder="Select city" 
                           {...register('city')}>
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

export default UpdateBanner;
