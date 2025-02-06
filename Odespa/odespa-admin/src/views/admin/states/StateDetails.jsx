import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Image,
  Text,
  Heading,
  Spinner,
  Flex,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Link, useParams, useNavigate } from "react-router-dom";
import StateService from "../../../services/state.service";

function StateDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [State, setState] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStateDetails = async () => {
      try {
        const response = await StateService.viewstate(id);
        setState(response.details);
      } catch (error) {
        toast({
          title: "Error fetching State details",
          description: error?.response?.data?.error || "An error occurred",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStateDetails();
  }, [id, navigate, toast]);

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!State) {
    return null;
  }

  return (
    <Box p={4}>
      <div
        className="text-start mt-5 mb-2 ms-1 m-3"
        style={{ fontWeight: "500", marginBottom: "10px" }}
      >
        <Link style={{ color: "blue" }} to="/admin/default">
          Dashboard
        </Link>
        &nbsp;&#8811;
        <Link style={{ color: "blue" }} to="/admin/states">
          {" "}
          States
        </Link>
        &nbsp;&#8811; State Details
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
            <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={4}>
              <Box>
                <Image
                  src={State.image}
                  alt={State.name}
                  borderRadius="md"
                  boxSize="200px"
                  objectFit="cover"
                />
              </Box>
              <Box>
                <Heading as="h2" size="lg" mb={4}>
                  {State.name}
                </Heading>
                <Text fontSize="lg" mb={2}>
                  <strong>Status:</strong>{" "}
                  {State.status.charAt(0).toUpperCase() + State.status.slice(1)}
                </Text>
              </Box>
            </Grid>

            <Flex mt={6} justifyContent="flex-end">
              <Button
                colorScheme="blue"
                mr="3"
                onClick={() => navigate(`/admin/state/edit/${id}`)}
              >
                Edit
              </Button>
              <Button colorScheme="red" onClick={() => navigate("/admin/states")}>
                Back to List
              </Button>
            </Flex>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default StateDetails;
