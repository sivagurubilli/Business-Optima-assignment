import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Badge,
  Flex,
  Image,
  Input,
  Select,
  Card,
  Text,
  Spinner,
  SkeletonText,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import StateService from "../../../services/state.service";
import { Itemsperpage, pagesToShowInitially } from "../../../utils/constants";
import CountryService from "../../../services/country.service";

const States = () => {
  const [states, setStates] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(Itemsperpage);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if(selectedCountry){
    getstates();
    }
  }, [selectedCountry,itemsPerPage,currentPage]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await CountryService.getcountries();
      setCountries(response.details);
      response.details.map((elem) => {
        if (elem.zenoti_country_id === 95) {
          setSelectedCountry(elem._id);
        }
      });
          } catch (error) {}
  };

  const getstates = async () => {
    setLoading(true); // Start loading
    try {
      const response = await StateService.getstatesbycountry(selectedCountry);
      if (response) {
        setStates(response.details);
        setTotalData(response.details.length);
      }
    } catch (error) {
      alert(error?.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleDelete = async (stateId) => {
    try {
      await StateService.deletestate(stateId);
      getstates();
      alert("State deleted successfully");
    } catch (error) {
      alert("Failed to delete state");
    }
  };

  const gotoEdit = (state) => {
    navigate(`/admin/state/edit/${state._id}`);
  };

  const gotoCreate = () => {
    navigate(`/admin/state/add`);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const filteredData = useMemo(() => {
    return states.filter((state) =>
      state.name.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [states, searchInput]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  useEffect(() => {
    setTotalData(filteredData.length);
  }, [filteredData]);

  return (
    <Box>
      <Flex w="100%" justifyContent="flex-end">
        <Button colorScheme="blue" onClick={gotoCreate}>
          Add State
        </Button>
      </Flex>

      <div
        className="text-start mt-5 mb-2 ms-1"
        style={{ fontWeight: "500", marginBottom: "10px" }}
      >
        <Link style={{ color: "blue" }} to="/admin/default">
          Dashboard
        </Link>
        &nbsp;&#8811; states
      </div>
      <Card>
        <Box>
          <Flex p="5" className="space-between">
            <Flex w="50%">
              <Text p="2" mb={2}>
                Search by State Name :
              </Text>
              <Input
                placeholder="Search"
                value={searchInput}
                onChange={handleSearchChange}
                maxW="300px"
              />
            </Flex>

            <Flex w="50%">
              <Text p="2" mb={2}>
                Select Country :
              </Text>
              <Select
                id="country_id"
                placeholder="Select country"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                maxW="300px"
              >
                {countries.map((country) => (
                  <option
                    key={country._id}
                    value={country._id}
                  >
                    {country.name}
                  </option>
                ))}
              </Select>
            </Flex>
          </Flex>

          {loading ? (
            <Box p={10}>
              <SkeletonText
                mt="4"
                noOfLines={6}
                spacing="4"
                skeletonHeight="40px"
              />
            </Box>
          ) : (
                      <Box overflowX="auto">
            <Table variant="striped" colorScheme="gray">
              <Thead bg="#F4F7FE">
                <Tr>
                                  <Th textAlign="center">#</Th> {/* Add Index Header */}
                  
                  <Th textAlign="center">State </Th>
                  <Th textAlign="center">Country </Th>
                  <Th textAlign="center">Status</Th>
                  <Th textAlign="center">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {paginatedData?.map((state,index) => (
                  <Tr key={state._id} textAlign="center">
                                         <Td textAlign="center" >
                                                  {(currentPage - 1) * itemsPerPage + index + 1}
                                                  </Td>
                    <Td textAlign="center" color={"blue"}>
                      <Link to={`/admin/state/${state?._id}`}>
                        {state?.name}
                      </Link>
                    </Td>
                    <Td textAlign="center">{state?.country_id?.name}</Td>
                    <Td textAlign="center" verticalAlign="middle">
                      <Badge
                        colorScheme={
                          state?.status === "active" ? "green" : "red"
                        }
                      >
                        {state?.status}
                      </Badge>
                    </Td>
                    <Td textAlign="center" verticalAlign="middle">
                      <Flex justifyContent="center" gap={2}>
                        <Button
                          size="sm"
                          colorScheme="teal"
                          onClick={() => gotoEdit(state)}
                        >
                          Edit
                        </Button>
                        {/* <Button
                          size="sm"
                          colorScheme="red"
                          onClick={() => handleDelete(state._id)}
                        >
                          Delete
                        </Button> */}
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            </Box>
          )}
        </Box>
      </Card>
      <Flex style={{ marginTop: "20px" }} justifyContent="space-between">
        <Box>
          <Flex>
            <Text p="2" mb={2}>
              Show
            </Text>
            <Select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              maxW="100px"
              border="1px solid grey"
              borderColor="grey"
              borderRadius="md"
            >
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </Select>

            <Text p="2" mb={2}>
              Entries
            </Text>
          </Flex>
        </Box>

        <div className="mr-5">
          {totalData / itemsPerPage > 1 && (
            <div className="mt-5 d-flex justify-content-end align-right">
              <ReactPaginate
                previousLabel="<"
                nextLabel=">"
                breakLabel="..."
                breakLinkClassName={"page-link"}
                pageCount={Math.ceil(totalData / itemsPerPage)}
                marginPagesDisplayed={1}
                pageRangeDisplayed={pagesToShowInitially}
                onPageChange={handlePageChange}
                containerClassName="pagination"
                activeClassName="active"
                pageLinkClassName="page-link"
                previousLinkClassName="page-link"
                nextLinkClassName="page-link"
                disabledClassName="disabled"
                forcePage={currentPage - 1}
              />
            </div>
          )}
        </div>
      </Flex>
    </Box>
  );
};

export default States;
