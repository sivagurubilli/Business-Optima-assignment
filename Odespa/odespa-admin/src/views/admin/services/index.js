import React, { useEffect, useState, useMemo } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button, Badge, Flex, Image, Input, Select, Card, Text, SkeletonText } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Itemsperpage, pagesToShowInitially } from '../../../utils/constants';
import ServicesService from '../../../services/services.service';

const ServicesList = () => {
  const [servicess, setservicess] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(Itemsperpage);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getServices();
  }, [currentPage,itemsPerPage]);

  const getServices = async () => {
    setLoading(true);
    try {
      const response = await ServicesService.getservices({ page: currentPage,
        limit: itemsPerPage});
      if (response) {
        setservicess(response.details); // Set services data to states
        setTotalData(response.totalDataCount);
      }
    } catch (error) {
      alert('An error occurred while fetching services data');
    } finally {
      setLoading(false);
    }
  };


  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const filteredData = useMemo(() => {
    return servicess.filter((services) =>
      services?.name?.toLowerCase()?.includes(searchInput?.toLowerCase())
    );
  }, [servicess, searchInput]);




  

  return (
    <Box>
      <Flex w="100%" justifyContent="flex-end">
        <Button colorScheme="blue" onClick={() => navigate('/admin/service/add')}>
          Add Service
        </Button>
      </Flex>
      
            <div
              className="text-start mt-5 mb-2 ms-1"
              style={{ fontWeight: '500', marginBottom: '10px' }}
            >
              <Link style={{ color: 'blue' }} to="/admin/default">
                Dashboard
              </Link>
              &nbsp;&#8811; Services
            </div>

      <Card>
        <Box>
          <Flex p="5">
            <Text p="2" mb={2}>Search by Services Name:</Text>
            <Input
              placeholder="Search"
              value={searchInput}
              onChange={handleSearchChange}
              maxW="300px"
            />
          </Flex>

          {loading ? (
            <Box p={10}>
              <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="40px" />
            </Box>
          ) : (
          <Box overflowX="auto">
            <Table variant="striped" colorScheme="gray">
              <Thead bg="#F4F7FE">
                <Tr>
                  <Th textAlign="center">#</Th> {/* Add Index Header */}
                  <Th textAlign="center">Service Name</Th>
                  <Th textAlign="center">Code</Th>
                  <Th textAlign="center">Duration IN MINutes</Th>
                  <Th textAlign="center">Price </Th>
                  <Th textAlign="center">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredData.map((services,index) => (
                  <Tr key={services._id} textAlign="center">
                                         <Td textAlign="center" >
                                                  {(currentPage - 1) * itemsPerPage + index + 1}
                                                  </Td>
                    <Td textAlign="center">{services.name}</Td>
                    <Td textAlign="center">{services?.code}</Td>
                   
                    <Td textAlign="center">{services?.duration}</Td>
                    <Td textAlign="center">{services?.price_info?.sale_price}</Td>
                    <Td textAlign="center">
                    <Flex justifyContent="center" gap={2}>

                    <Button size="sm" colorScheme="teal" onClick={() => navigate(`/admin/service/${services._id}`)}>
                        View
                      </Button>
                      <Button size="sm" colorScheme="teal" onClick={() => navigate(`/admin/service/edit/${services._id}`)}>
                        Edit
                      </Button>
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
            <Text p="2" mb={2}>Show</Text>
            <Select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))} maxW="100px">
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={25}>25</option>
              <option value={50}>50</option>


            </Select>
            <Text p="2" mb={2}>Entries</Text>
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

export default ServicesList;
