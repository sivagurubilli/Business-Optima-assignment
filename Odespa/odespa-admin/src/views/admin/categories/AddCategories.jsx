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
import { Link, useNavigate } from 'react-router-dom';
import { MultiSelect } from 'chakra-multiselect';
import CategoriesService from '../../../services/category.service';
import ServicesService from '../../../services/services.service';

function AddCategory() {
  const [services, setservices] = useState([]);
  const [selectedcategories, setselectedcategories] = useState([]);
  const toast = useToast();
  const textColor = useColorModeValue('navy.700', 'white');
  const brandStars = useColorModeValue('red.500', 'red.400');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await ServicesService.getservices({limit:1000});
        setservices(response.details);
      } catch (error) {
        console.log(error)
        toast({
          title: 'Error fetching services',
          description: error?.response?.data?.error || 'An error occurred',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
    fetchServices();
  }, [toast]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Category name is required'),
    code: Yup.string().required(' Code is required'),
    description: Yup.string(),

    image: Yup.string()
      .url('Image URL must be valid')
      .required('Please enter  image url'),
    services: Yup.array()
      .min(1, 'At least one service must be selected')
      .required('services are required'),
    status: Yup.string().required('Please select status'),
  });

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      services: [],
      name: '',
      code:"",
      description:"",
      status: 'active',
      image: '',
    },
  });

  const onSubmit = async (data1) => {
    try {
      let data = {
        ...data1,
        services: selectedcategories.map((item) => item.value),
      };
      const response = await CategoriesService.createcategories(data);
      if (response) {
        toast({
          title: 'Category created successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/admin/categories');
      }
    } catch (error) {
      toast({
        title: 'Error creating category',
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
        &nbsp;&#8811; Add Categories
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
                {/* Category Name */}
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

                {/* City Selection (Multi-Select with Chakra UI) */}
                <FormControl mb="4" isInvalid={!!errors.services}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Select Services{' '}
                    <Text as="span" color={brandStars}>
                      *
                    </Text>
                  </FormLabel>

                  <Controller
                    name="services"
                    control={control} // This comes from useForm
                    render={({ field }) => (
                      <MultiSelect
                        options={services.map((city) => ({
                          label: city.name,
                          value: city._id,
                        }))}
                        value={field.value}
                        placeholder="Select services"
                        onChange={(value) => {
                          setselectedcategories(value); // Optional: Update local state
                          field.onChange(value); // Notify react-hook-form about the change
                        }}
                      />
                    )}
                  />

                  <FormErrorMessage>
                    {errors.services?.message}
                  </FormErrorMessage>
                </FormControl>

               

                <FormControl mb="4" isInvalid={!!errors.description}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Description{' '}
                   
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

export default AddCategory;
