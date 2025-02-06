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
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { MultiSelect } from 'chakra-multiselect';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CityService from '../../../services/city.service';
import ServicesService from '../../../services/services.service';
import OutletService from '../../../services/outlets.service';

function UpdateOutlet() {
  const { id } = useParams(); // Get the outlet ID from the URL
  const navigate = useNavigate();
  const toast = useToast();
  const textColor = useColorModeValue('navy.700', 'white');
  const brandStars = useColorModeValue('red.500', 'red.400');
  const [cities, setCities] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
const [outletDetails,setOutletDetails] = useState(null)

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Outlet name is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('Please select a city'),
    status: Yup.string().required('Please select status'),
    image: Yup.string().required('Please enter image URL').url('Please enter a valid URL'),
    openingTimes: Yup.object().shape({
      mondayFriday: Yup.string().required('Opening time for Monday to Friday is required'),
      saturdaySunday: Yup.string().required('Opening time for Saturday and Sunday is required'),
    }),
    services: Yup.array().min(1, 'Please select at least one service').required('Services are required'),
  });
 
  useEffect(() => {
    // Fetch cities and services
    const fetchData = async () => {
      try {
        const cityResponse = await CityService.getcities();
        setCities(cityResponse.details);
      } catch (error) {
        toast({
          title: 'Error fetching cities',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }

      try {
        const serviceResponse = await ServicesService.getservices();
        setServices(serviceResponse.details);
      } catch (error) {
        toast({
          title: 'Error fetching services',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };
   

    // Fetch outlet data
    const fetchOutlet = async () => {
      try {
        const response = await OutletService.viewoutlets(id);
        const outlet = response.details[0];
        setOutletDetails(outlet)
      
        const serviceOptions = outlet.services.map((serviceId) => ({
          value: serviceId?._id,
          label: serviceId?.name || '',
        }));
        setSelectedServices(serviceOptions);
        setSelectedCity(outlet.city?._id)
      } catch (error) {
        toast({
          title: 'Error fetching outlet details',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchData();
    fetchOutlet();
  }, [id]);
  const { handleSubmit, register,control, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      address: '',
      city: '',
      status: 'active',
      image: '',
      openingTimes: { mondayFriday: '', saturdaySunday: '' },
      services: [],
    },
  });

  console.log(outletDetails)

  useEffect(() => {
    if (outletDetails) {
      setValue('name', outletDetails.name);
      setValue('address', outletDetails.address);
      setValue('city', outletDetails.city?._id);
      setValue('status', outletDetails.status);
      setValue('image', outletDetails.image);
      setValue('openingTimes.mondayFriday', outletDetails.openingTimes.mondayFriday);
      setValue('openingTimes.saturdaySunday', outletDetails.openingTimes.saturdaySunday);
      setValue('services', selectedServices);

    }
  }, [outletDetails]);



  const onSubmit = async (data) => {
    try {
      const updatedData = {
        ...data,
        id,
        services: selectedServices.map((item) => item.value),
      };

      await OutletService.updateoutlets(updatedData);
      toast({
        title: 'Outlet updated successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/admin/outlets');
    } catch (error) {
      toast({
        title: 'Error updating outlet',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const cancelHandler = () => {
    navigate('/admin/outlets');
  };


  return (
    <Box p={4}>
      <div className="text-start mt-5 mb-2 ms-1 m-3" style={{ fontWeight: '500', marginBottom: '10px' }}>
        <Link style={{ color: 'blue' }} to="/admin/default">Dashboard</Link>
        &nbsp;&#8811;
        <Link style={{ color: 'blue' }} to="/admin/outlets">Outlets</Link>
        &nbsp;&#8811; Update Outlet
      </div>
      <Grid templateColumns="repeat(12, 1fr)" gap={4}>
        <GridItem colSpan={12}>
          <Box p={6} border="1px solid #E2E8F0" borderRadius="md" bg="white" boxShadow="sm">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                {/* Outlet Name */}
                <FormControl mb="4" isInvalid={!!errors.name}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Outlet Name  {" "}
                    <Text as="span" color={brandStars}>*</Text>
                  </FormLabel>
                  <Input id="name" type="text" placeholder="Enter outlet name" {...register('name')} />
                  <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </FormControl>

                {/* Address */}
                <FormControl mb="4" isInvalid={!!errors.address}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Address  {" "}
                    <Text as="span" color={brandStars}>*</Text>
                  </FormLabel>
                  <Input id="address" type="text" placeholder="Enter address" {...register('address')} />
                  <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
                </FormControl>

                {/* City Dropdown */}
                <FormControl mb="4" isInvalid={!!errors.city}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    City  {" "}
                    <Text as="span" color={brandStars}>*</Text>
                  </FormLabel>
                  <Select id="city" placeholder="Select city"   onChange={(e) => setSelectedCity(e.target.value)}
                    value={selectedCity} {...register('city')}>
                    {cities?.map((city) => (
                      <option key={city._id} value={city._id}>{city.name}</option>
                    ))}
                  </Select>
                  <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
                </FormControl>

                {/* Image URL */}
                <FormControl mb="4" isInvalid={!!errors.image}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Image Link  {" "}
                    <Text as="span" color={brandStars}>*</Text>
                  </FormLabel>
                  <Input id="image" type="url" placeholder="Enter image URL" {...register('image')} />
                  <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
                </FormControl>

                {/* Opening Times */}
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                  <FormControl mb="4" isInvalid={!!errors.openingTimes?.mondayFriday}>
                    <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                      Monday to Friday  {" "}
                      <Text as="span" color={brandStars}>*</Text>
                    </FormLabel>
                    <Input id="openingTimes.mondayFriday" type="text" placeholder="08:00am - 03:00pm" {...register('openingTimes.mondayFriday')} />
                    <FormErrorMessage>{errors.openingTimes?.mondayFriday?.message}</FormErrorMessage>
                  </FormControl>

                  <FormControl mb="4" isInvalid={!!errors.openingTimes?.saturdaySunday}>
                    <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                      Saturday & Sunday  {" "}
                      <Text as="span" color={brandStars}>*</Text>
                    </FormLabel>
                    <Input id="openingTimes.saturdaySunday" type="text" placeholder="09:00am - 02:00pm" {...register('openingTimes.saturdaySunday')} />
                    <FormErrorMessage>{errors.openingTimes?.saturdaySunday?.message}</FormErrorMessage>
                  </FormControl>
                </Grid>

                {/* Services Multiselect */}
                <FormControl mb="4" isInvalid={!!errors.services}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Services  {" "}
                    <Text as="span" color={brandStars}>*</Text>
                  </FormLabel>
                                  <Controller
                  name="services"
                  control={control} // This comes from useForm
                  render={({ field }) => (
                    <MultiSelect
                      options={services.map((service) => ({
                        label: service.name,
                        value: service._id,
                      }))}
                      value={field.value}
                      placeholder="Select Services"
                      onChange={(value) => {
                        setSelectedServices(value); // Optional: Update local state
                        field.onChange(value); // Notify react-hook-form about the change
                      }}
                    />
                  )}
                />
  
                  <FormErrorMessage>{errors.services?.message}</FormErrorMessage>
                </FormControl>

                {/* Status */}
                <FormControl mb="4" isInvalid={!!errors.status}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Status {" "}
                    <Text as="span" color={brandStars}>*</Text>
                  </FormLabel>
                  <Select id="status" placeholder="Select status" {...register('status')}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Select>
                  <FormErrorMessage>{errors.status?.message}</FormErrorMessage>
                </FormControl>
              </Grid>

              <Flex mt={6} justifyContent="center">
                <Button type="button" colorScheme="red" mr="3" onClick={cancelHandler}>Cancel</Button>
                <Button colorScheme="blue" type="submit">Submit</Button>
              </Flex>
            </form>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default UpdateOutlet;
