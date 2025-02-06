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
import CityService from '../../../services/city.service';

const validationSchema = Yup.object().shape({
  country_id: Yup.string().required('Please select a country'),
  state_id: Yup.string().required('Please select a state'),
  name: Yup.string().required('City name is required'),
  status: Yup.string().required('Please select status'),
    longitude: Yup.number().required('Please enter longitude') ,
      latitude :Yup.number().required('Please enter longitude'),
  image: Yup.string().required('Please enter image URL').url('Please enter a valid image URL'),
});

function UpdateCity() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [cityDetails, setCityDetails] = useState(null);
 const [selectedState,setSelectedState] = useState(null)
  const textColor = useColorModeValue('navy.700', 'white');
  const brandStars = useColorModeValue('red.500', 'red.400');

  const { handleSubmit, register, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // Fetch countries
  useEffect(() => {
    async function fetchCountries() {
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
    }
    fetchCountries();
  }, []);

  // Fetch city details
  useEffect(() => {
    async function fetchCityDetails() {
      try {
        const response = await CityService.viewcity(id);
        setCityDetails(response.details[0]);
      } catch (error) {
        toast({
          title: 'Error fetching city details',
          description: error?.response?.data?.error || 'An error occurred',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
    fetchCityDetails();
  }, [id]);

  // Set form values and states once city details are available
  useEffect(() => {
    if (cityDetails) {
      // Set default values from city details
      setValue('country_id', cityDetails?.country_id?._id || null);
      setValue('state_id', cityDetails?.state_id?._id || null);
      setValue('name', cityDetails?.name || '');
      setValue('status', cityDetails?.status || '');
      setValue('image', cityDetails?.image || '');
      setValue("longitude",cityDetails.longitude);
      setValue("latitude",cityDetails.latitude);
      setSelectedCountry(cityDetails?.country_id?._id || '');
    }
  }, [cityDetails, setValue]);

  // Fetch states based on selected country
  useEffect(() => {
    if (selectedCountry) {
      async function fetchStates() {
        try {
          const response = await StateService.getstatesbycountry(selectedCountry);
          setStates(response.details);
  
          // Set state_id if cityDetails are available and state is already defined
          if (cityDetails && cityDetails.state_id) {
            setSelectedState(cityDetails.state_id?._id); // Set the state_id from city details

          }
        } catch (error) {
          setStates([]);
          toast({
            title: 'Error fetching states',
            description: error?.response?.data?.error || 'An error occurred',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      }
      fetchStates();
    }
  }, [selectedCountry, cityDetails, setValue]);
  console.log(selectedState)
  const onSubmit = async (data) => {

    try {
      let data1={
        ...data,
        id
      }
      const response = await CityService.updatecity(data1);
      if (response) {
        toast({
          title: 'City updated successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/admin/cities');
      }
    } catch (error) {
      toast({
        title: 'Error updating city',
        description: error?.response?.data?.error || 'An error occurred',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const cancelHandler = () => {
    navigate('/admin/cities');
  };

  return (
    <Box p={4}>
      <div className="text-start mt-5 mb-2 ms-1 m-3" style={{ fontWeight: '500', marginBottom: '10px' }}>
        <Link style={{ color: 'blue' }} to="/admin/default">
          Dashboard
        </Link>
        &nbsp;&#8811;
        <Link style={{ color: 'blue' }} to="/admin/cities">
          Cities
        </Link>
        &nbsp;&#8811; Update City
      </div>
      <Grid templateColumns="repeat(12, 1fr)" gap={4}>
        <GridItem colSpan={12}>
          <Box p={6} border="1px solid #E2E8F0" borderRadius="md" bg="white" boxShadow="sm">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                {/* Country Dropdown */}
                <FormControl mb="4" isInvalid={!!errors.country_id}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Country
                    <Text as="span" color={brandStars}>*</Text>
                  </FormLabel>
                  <Select
                    id="country_id"
                    placeholder="Select country"
                    {...register('country_id')}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    value={selectedCountry}
                  >
                    {countries.map((country) => (
                      <option key={country._id} value={country._id}>
                        {country.name}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>{errors.country_id?.message}</FormErrorMessage>
                </FormControl>

                {/* State Dropdown */}
                <FormControl mb="4" isInvalid={!!errors.state_id}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    State
                    <Text as="span" color={brandStars}>*</Text>
                  </FormLabel>
                  <Select id="state_id" placeholder="Select state" 
                  {...register('state_id')}       
                               value={selectedState}
                               onChange={(e) => setSelectedState(e.target.value)}>
                    {states.map((state) => (
                      <option key={state._id} value={state._id}>
                        {state.name}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>{errors.state_id?.message}</FormErrorMessage>
                </FormControl>

                {/* City Name */}
                <FormControl mb="4" isInvalid={!!errors.name}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    City Name
                    <Text as="span" color={brandStars}>*</Text>
                  </FormLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter city name"
                    {...register('name')}
                  />
                  <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </FormControl>

                {/* Status */}
                <FormControl mb="4" isInvalid={!!errors.status}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Status
                    <Text as="span" color={brandStars}>*</Text>
                  </FormLabel>
                  <Select id="status" placeholder="Select status" {...register('status')}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Select>
                  <FormErrorMessage>{errors.status?.message}</FormErrorMessage>
                </FormControl>

                <FormControl mb="4" isInvalid={!!errors.image}>
                                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                                    Latitude <Text as="span" color={brandStars}>
                                      *
                                    </Text>
                                  </FormLabel>
                                  <Input
                                    id="latitude"
                                    type="double"
                                    placeholder="Enter latitude"
                                    {...register('latitude')}
                                  />
                                  <FormErrorMessage>{errors.latitude?.message}</FormErrorMessage>
                                </FormControl>


                  <FormControl mb="4" isInvalid={!!errors.image}>
                                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                                    Longitude  <Text as="span" color={brandStars}>
                                      *
                                    </Text>
                                  </FormLabel>
                                  <Input
                                    id="longitude"
                                    type="double"
                                    placeholder="Enter image link"
                                    {...register('longitude')}
                                  />
                                  <FormErrorMessage>{errors.longitude?.message}</FormErrorMessage>
                                </FormControl>
                              
                

                {/* Image Link */}
                <FormControl mb="4" isInvalid={!!errors.image}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Image Link
                    <Text as="span" color={brandStars}>*</Text>
                  </FormLabel>
                  <Input
                    id="image"
                    type="url"
                    placeholder="Enter image link"
                    {...register('image')}
                  />
                  <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
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

export default UpdateCity;
