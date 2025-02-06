import React, { useEffect, useState, useMemo } from 'react';
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
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import CountryService from '../../../services/country.service';
import { Itemsperpage, pagesToShowInitially } from '../../../utils/constants';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(Itemsperpage);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getCountries();
  }, [currentPage,itemsPerPage]);

  const getCountries = async () => {
    setLoading(true);
    try {
      const response = await CountryService.getcountries();
      if (response) {
        setCountries(response.details);
        setTotalData(response.details.length);
      }
    } catch (error) {
      alert(error?.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (countryId) => {
    try {
      await CountryService.deleteCountry(countryId);
      getCountries();
      alert('Country deleted successfully');
    } catch (error) {
      alert('Failed to delete country');
    }
  };

  const gotoEdit = (country) => {
    navigate(`/admin/country/edit/${country._id}`);
  };

  const gotoCreate = () => {
    navigate(`/admin/country/add`);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const filteredData = useMemo(() => {
    return countries.filter((country) =>
      country.name.toLowerCase().includes(searchInput.toLowerCase()),
    );
  }, [countries, searchInput]);

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
          Add Country
        </Button>
      </Flex>

      <div
        className="text-start mt-5 mb-2 ms-1"
        style={{ fontWeight: '500', marginBottom: '10px' }}
      >
        <Link style={{ color: 'blue' }} to="/admin/default">
          Dashboard
        </Link>
        &nbsp;&#8811; Countries
      </div>
      <Card>
        <Box>
          <Flex p="5">
            <Text p="2" mb={2}>
              Search by Country Name :
            </Text>
            <Input
              placeholder="Search"
              value={searchInput}
              onChange={handleSearchChange}
              maxW="300px"
            />
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
                  <Th textAlign="center">Country</Th>
                  <Th textAlign="center">phone code
                  </Th>
                  <Th textAlign="center">short name </Th>
                  <Th textAlign="center">Status</Th>
                  <Th textAlign="center">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {paginatedData?.map((country,index) => (
                  <Tr key={country._id} textAlign="center">
                     <Td textAlign="center" >
                              {(currentPage - 1) * itemsPerPage + index + 1}
                              </Td>
                    <Td textAlign="center" color={'blue'}>
                      <Link to={`/admin/country/${country?._id}`}>
                        {country?.name}
                      </Link>
                    </Td>
                    <Td textAlign="center" >
                      
                        {country?.phone_code}
                    </Td>
                    <Td textAlign="center" >
                      
                      {country?.short_name}
                  </Td>
                    <Td textAlign="center" verticalAlign="middle">
                      <Badge
                        colorScheme={
                          country?.status === 'active' ? 'green' : 'red'
                        }
                      >
                        {country?.status}
                      </Badge>
                    </Td>
                    <Td textAlign="center" verticalAlign="middle">
                      <Flex justifyContent="center" gap={2}>
                        <Button
                          size="sm"
                          colorScheme="teal"
                          onClick={() => gotoEdit(country)}
                        >
                          Edit
                        </Button>
                        {/* <Button
                          size="sm"
                          colorScheme="red"
                          onClick={() => handleDelete(country?._id)}
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
      <Flex style={{ marginTop: '20px' }} justifyContent="space-between">
        <Box>
          <Flex>
            <Text p="2" mb={2}>
              Show
            </Text>
            <Select value={itemsPerPage}  maxW="100px"
  border="1px solid grey"
  borderColor="grey"     
  borderRadius="md"  onChange={(e) => setItemsPerPage(Number(e.target.value))} >
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
                breakLinkClassName={'page-link'}
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

export default Countries;
