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
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MultiSelect } from 'chakra-multiselect';
import CategoriesService from '../../../services/category.service';
import ServicesService from '../../../services/services.service';

function UpdateCategory() {
  const [services, setservices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toast = useToast();
  const textColor = useColorModeValue('navy.700', 'white');
  const brandStars = useColorModeValue('red.500', 'red.400');
  const navigate = useNavigate();
  const { id } = useParams();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Category name is required'),
    code: Yup.string().required('Code is required'),
    description: Yup.string(),
    image: Yup.string().url('Image URL must be valid').required('Please enter an image URL'),
    services: Yup.array()
      .min(1, 'At least one service must be selected')
      .required('Services are required'),
    status: Yup.string().required('Please select a status'),
  });
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
   
  });
  useEffect(() => {
    async function fetchData() {
      try {
        const servicesResponse = await ServicesService.getservices({ limit: 1000 });
        setservices(servicesResponse.details);
        const categoryResponse = await CategoriesService.viewcategories(id); 
        setSelectedCategories(categoryResponse.details[0])     
        // Pre-fill form with existing category data
         } catch (error) {
        toast({
          title: 'Error fetching data',
          description: error?.response?.data?.error || 'An error occurred',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
    fetchData();
  }, [id, toast]);


  useEffect(()=>{
    if(selectedCategories){
    const { name, code, description, image, status, services } = selectedCategories
    setValue('name', name);
    setValue('code', code);
    setValue('description', description || '');
    setValue('image', image);
    setValue('status', status);
    setValue('services', services?.map((service) => ({ label: service.name, value: service._id })));
    setSelectedServices(services?.map((service) => ({ label: service.name, value: service._id })));
    }
  },[selectedCategories])

 

  const onSubmit = async (data1) => {
    try {
      let data = {
        ...data1,
        id,
        services: selectedServices.map((item) => item.value),
      };
      const response = await CategoriesService.updatecategories( data);
      if (response) {
        toast({
          title: 'Category updated successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/admin/categories');
      }
    } catch (error) {
      toast({
        title: 'Error updating category',
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
        <Link style={{ color: 'blue' }} to="/admin/categories">
          {' '}
          Categories
        </Link>
        &nbsp;&#8811; Update Categories
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
                <FormControl mb="4" isInvalid={!!errors.name}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Category Name{' '}
                    <Text as="span" color={brandStars}>
                      *
                    </Text>
                  </FormLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter category name"
                    {...register('name')}
                  />
                  <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </FormControl>

                <FormControl mb="4" isInvalid={!!errors.code}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Category Code{' '}
                    <Text as="span" color={brandStars}>
                      *
                    </Text>
                  </FormLabel>
                  <Input
                    id="code"
                    type="text"
                    placeholder="Enter category code"
                    {...register('code')}
                  />
                  <FormErrorMessage>{errors.code?.message}</FormErrorMessage>
                </FormControl>

                <FormControl mb="4" isInvalid={!!errors.image}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Category Image{' '}
                    <Text as="span" color={brandStars}>
                      *
                    </Text>
                  </FormLabel>
                  <Input
                    id="image"
                    type="url"
                    placeholder="Enter image URL"
                    {...register('image')}
                  />
                  <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
                </FormControl>

                <FormControl mb="4" isInvalid={!!errors.services}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Select Services{' '}
                    <Text as="span" color={brandStars}>
                      *
                    </Text>
                  </FormLabel>
                  <Controller
                    name="services"
                    control={control}
                    render={({ field }) => (
                      <MultiSelect
                        options={services.map(service => ({
                          label: service?.name,
                          value: service?._id,
                        }))}
                        value={field.value}
                        placeholder="Select services"
                        onChange={value => {
                          setSelectedServices(value);
                          field.onChange(value);
                        }}
                      />
                    )}
                  />
                  <FormErrorMessage>{errors.services?.message}</FormErrorMessage>
                </FormControl>
                <FormControl mb="4" isInvalid={!!errors.description}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Description
                  </FormLabel>
                  <Textarea
                    id="description"
                    placeholder="Enter description"
                    {...register('description')}
                  />
                  <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
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

export default UpdateCategory;
