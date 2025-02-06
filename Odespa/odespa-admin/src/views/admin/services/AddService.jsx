import React, { useState } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ServicesService from '../../../services/services.service';

function AddService() {
  const navigate = useNavigate();
  const toast = useToast();
  const textColor = useColorModeValue('navy.700', 'white');
  const brandStars = useColorModeValue('red.500', 'red.400');

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Service name is required'),
    description: Yup.string().max(500, 'Description cannot exceed 500 characters'),
    status: Yup.string().required('Please select a status'),
    images: Yup.array()
      .of(
        Yup.string()
          .required('Image URL is required')
          .url('Please enter a valid URL')
      )
      .min(1, 'At least one image URL is required'),
    price: Yup.number()
      .required('Price is required')
      .positive('Price must be a positive number'),
    duration: Yup.number().required('Duration is required'),
    recovery_time: Yup.number().required('Recovery time is required'),
    code: Yup.string().required('Code is required'),

  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      description: '',
      images: [''],
      price: null,
      duration: null,
      code:"",
      status: 'active',
      recovery_time:null
    },
  });

  const [imageUrls, setImageUrls] = useState(['']);

  // Handle adding new image URL input
  const addImageUrl = () => {
    setImageUrls((prev) => [...prev, '']);
  };

  // Handle removing an image URL input
  const removeImageUrl = (index) => {
    const updatedUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(updatedUrls);
    setValue('images', updatedUrls);
  };

  // Handle image URL change
  const handleImageUrlChange = (index, value) => {
    const updatedUrls = [...imageUrls];
    updatedUrls[index] = value;
    setImageUrls(updatedUrls);
    setValue('images', updatedUrls);
  };

  // Handle form submission
  const onSubmit = async (data1) => {
    try {
   let   data={
  ...data1,
  price_info:data1.price,
  image_paths:data1.images
      }
      const response = await ServicesService.createservices(data);
      if (response) {
        toast({
          title: 'Service created successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/admin/services');
      }
    } catch (error) {
      toast({
        title: 'Error creating service',
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
          Services
        </Link>
        &nbsp;&#8811; Add Service
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
                    type="number"
                    placeholder="Enter service duration"
                    {...register('duration')}
                  />
                  <FormErrorMessage>{errors.duration?.message}</FormErrorMessage>
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

                  <FormControl mb="4" isInvalid={!!errors.code}>
                                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                                    Service Code{' '}
                                    <Text as="span" color={brandStars}>
                                      *
                                    </Text>
                                  </FormLabel>
                                  <Input
                                    id="code"
                                    type="text"
                                    placeholder="Enter service code"
                                    {...register('code')}
                                  />
                                  <FormErrorMessage>{errors.code?.message}</FormErrorMessage>
                                </FormControl>

                                <FormControl mb="4" isInvalid={!!errors.code}>
                                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                                     Recovery Time{' '}
                                    <Text as="span" color={brandStars}>
                                      *
                                    </Text>
                                  </FormLabel>
                                  <Input
                                    id="recovery_time"
                                    type="text"
                                    placeholder="Enter  recovery time"
                                    {...register('recovery_time')}
                                  />
                                  <FormErrorMessage>{errors.recovery_time?.message}</FormErrorMessage>
                                </FormControl>
                
                {/* Description Field */}
                <FormControl mb="4" isInvalid={!!errors.description}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Description
                  </FormLabel>
                  <Textarea
                    id="description"
                    placeholder="Enter service description"
                    {...register('description')}
                  />
                  <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
                </FormControl>

                                {/* Images Field */}

                <FormControl mb="4" isInvalid={!!errors.images}>
            
                    <Flex
  justifyContent={'space-between'}
  marginBottom={"10px"}
>  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Image URLs{' '}
                    <Text as="span" color={brandStars}>
                      *
                    </Text>                  </FormLabel>

  <Button className='sm' colorScheme="blue" onClick={addImageUrl}>
    Add Image URL
  </Button>

                  </Flex>       


                  {imageUrls.map((url, index) => (
                    <div>
                    <Flex key={index} alignItems="center" mb="2">
                      <Input
                        type="url"
                        placeholder="Enter image URL"
                        value={url}
                        onChange={(e) => handleImageUrlChange(index, e.target.value)}
                      />
                      {index > 0 && (
                        <Button ml="2" colorScheme="red" onClick={() => removeImageUrl(index)}>
                          Remove
                        </Button>
                      )}
                    </Flex>
                    </div>
                  ))}
                  
                  <FormErrorMessage>{errors.images?.message}</FormErrorMessage>
                </FormControl>

              
              </Grid>

              <Flex mt={6} justifyContent="center">
                <Button type="button" colorScheme="red" mr="3" onClick={cancelHandler}>
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

export default AddService;
