import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  Text,
  Spinner,
  SkeletonText,
  Input,
  Select,
  Card,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import BookingService from '../../../services/booking.service';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import { Itemsperpage, pagesToShowInitially } from '../../../utils/constants';
import AdminService from '../../../services/admin.service';

const UsersList = () => {
  const [Users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
   const [searchInput, setSearchInput] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(Itemsperpage);
    const [totalData, setTotalData] = useState(0);
  const navigate = useNavigate();


  // Fetch Users using your Userservice
  useEffect(() => {
    getUsers();
}, [currentPage,itemsPerPage]);

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await AdminService.getAllUsers({ page: currentPage,
        limit: itemsPerPage});
      console.log(response)
      if (response) {
        setUsers(response.details); // Set categories data to states
        setTotalData(response.totalDataCount);
      }
    } catch (error) {
      alert('An error occurred while fetching categories data');
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
    return Users.filter((Users) =>
      Users?.name?.toLowerCase()?.includes(searchInput?.toLowerCase())
    );
  }, [Users, searchInput]);

  // Navigate to the Edit page for a given booking
  const gotoView = (booking) => {
    navigate(`/admin/Users/view/${booking._id}`);
  };

  return (
    <Box>
      <Flex w="100%" justifyContent="flex-end">
        <Button colorScheme="blue" onClick={() => navigate('/admin/guest/add')}>
          Add Users
        </Button>
      </Flex>
      
            <div
              className="text-start mt-5 mb-2 ms-1"
              style={{ fontWeight: '500', marginBottom: '10px' }}
            >
              <Link style={{ color: 'blue' }} to="/admin/default">
                Dashboard
              </Link>
              &nbsp;&#8811; Users
            </div>

      <Card>
        <Box>
          <Flex p="5">
            <Text p="2" mb={2}>Search by User Name:</Text>
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
                <Th textAlign="center">#</Th>
                  <Th textAlign="center">User Name</Th>
                  <Th textAlign="center">Email</Th>
                  <Th textAlign="center">Contact No</Th>
                  <Th textAlign="center">Gender</Th>
                  <Th textAlign="center">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredData.map((guest,index) => (
                  <Tr key={guest._id} textAlign="center">
                         <Td textAlign="center" >
                {(currentPage - 1) * itemsPerPage + index + 1}
                       </Td>
                    <Td textAlign="center">{guest.name}</Td>
                    <Td textAlign="center">{guest?.email}</Td>
                    <Td textAlign="center">{guest?.contactNo}</Td>

                                       <Td textAlign="center">{guest?.gender =="male" ?"Male":"Female"}</Td>
                    <Td textAlign="center">
                    <Flex justifyContent="center" gap={2}>
                  
                    <Button size="sm" colorScheme="teal" onClick={() => navigate(`/admin/guest/${guest._id}`)}>
                        View
                      </Button>
                      <Button size="sm" colorScheme="teal" onClick={() => navigate(`/admin/guest/edit/${guest._id}`)}>
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
            <Select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))} maxW="100px"
             border="1px solid grey"
               borderColor="grey"     
                 borderRadius="md" >
                  <option value={5}>5</option>
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

export default UsersList;
