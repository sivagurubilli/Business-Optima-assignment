import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Grid,
  GridItem,
  Flex,
  Text,
  useToast,
  FormErrorMessage,
  useColorModeValue,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import AdminService from '../../../services/admin.service';

function CreateAdmin() {
  const toast = useToast();
  const navigate = useNavigate();
  const textColor = useColorModeValue('navy.700', 'white');
  const brandStars = useColorModeValue('red.500', 'red.400');

  // Validation schema
  const validationSchema = Yup.object().shape({
        name: Yup.string().required('name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      // Remove confirmPassword before sending to backend
      const { confirmPassword, ...adminData } = data;
      const response = await AdminService.createAdmin(adminData);
      if (response) {
        toast({
          title: 'Admin created successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/admin/all-admins');
      }
    } catch (error) {
      toast({
        title: 'Error creating admin',
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
        <Link style={{ color: 'blue' }} to="/admin/admins">
          Admins
        </Link>
        &nbsp;&#8811; Create Admin
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
                {/* ]Name */}

                <FormControl mb="4">
                                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                                     Name  {' '}<Text as="span" color={brandStars}>
                                                          *
                                                        </Text>
                                  </FormLabel>
                                  <Input
                                    type="text"
                                    placeholder="Enter name"
                                    {...register('name')}
                                    isInvalid={!!errors.name}
                                  />
                                  {errors.name && (
                                    <Text color="red.500" fontSize="sm" mt="1">
                                      {errors.name.message}
                                    </Text>
                                  )}
                                </FormControl>
                {/* Email */}
                <FormControl mb="4" isInvalid={!!errors.email}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Email{' '}
                    <Text as="span" color={brandStars}>
                      *
                    </Text>
                  </FormLabel>
                  <Input placeholder="Enter email" {...register('email')} />
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>

                {/* Password */}
                <FormControl mb="4" isInvalid={!!errors.password}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Password{' '}
                    <Text as="span" color={brandStars}>
                      *
                    </Text>
                  </FormLabel>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    {...register('password')}
                  />
                  <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                </FormControl>

                {/* Confirm Password */}
                <FormControl mb="4" isInvalid={!!errors.confirmPassword}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Confirm Password{' '}
                    <Text as="span" color={brandStars}>
                      *
                    </Text>
                  </FormLabel>
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    {...register('confirmPassword')}
                  />
                  <FormErrorMessage>
                    {errors.confirmPassword?.message}
                  </FormErrorMessage>
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

export default CreateAdmin;
