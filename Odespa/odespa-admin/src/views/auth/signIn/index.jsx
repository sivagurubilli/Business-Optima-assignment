import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Button,
  Card,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import DefaultAuth from '../../../layouts/auth/Default';
import illustration from '../../../../src/assets/img/auth/auth.jpg';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import AuthService from '../../../services/auth.service';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email address'),

  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

function SignIn() {
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClick = () => setShow(!show);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await AuthService.login(data);
      if (response.data) {
        setLoading(false);
        alert('Login successful');
        navigate('/admin/default');
      } else {
        alert(response.message);
      }
    } catch (error) {
      setLoading(false);
      alert(error?.response?.data?.error || 'An error occurred');
      console.error('Login error', error);
    }
  };

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: '100%', md: 'max-content' }}
        w="100%"
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: '30px', md: '60px' }}
        px={{ base: '25px', md: '0px' }}
        mt={{ base: '40px', md: '14vh' }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Sign In
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your email and password to sign in!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: '100%', md: '420px' }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: 'auto', lg: 'unset' }}
          me="auto"
          mb={{ base: '20px', md: 'auto' }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mb="4">
              <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                Email <span color={brandStars}> * </span>
              </FormLabel>
              <Input
                type="email"
                placeholder="mail@simmmple.com"
                {...register('email')}
                isInvalid={!!errors.email}
              />
              {errors.email && (
                <Text color="red.500" fontSize="sm" mt="1">
                  {errors.email.message}
                </Text>
              )}
            </FormControl>

            <FormControl mb="4">
              <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                Password <span color={brandStars}> * </span>
              </FormLabel>
              <InputGroup size="md">
                <Input
                  type={show ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
                  {...register('password')}
                  isInvalid={!!errors.password}
                />
                <InputRightElement>
                  <Icon
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick}
                    cursor="pointer"
                  />
                </InputRightElement>
              </InputGroup>
              {errors.password && (
                <Text color="red.500" fontSize="sm" mt="1">
                  {errors.password.message}
                </Text>
              )}
            </FormControl>
            <Flex justifyContent={'center'}>
              <Button
                type="submit"
                size="sm"
                colorScheme="teal"
                w="50%"
                h="50"
                mb="24px"
                isLoading={loading}
              >
                Sign In
              </Button>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
