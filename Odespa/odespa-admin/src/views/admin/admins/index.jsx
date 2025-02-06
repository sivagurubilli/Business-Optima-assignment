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
import { Itemsperpage, pagesToShowInitially } from '../../../utils/constants';
import AdminService from '../../../services/admin.service';
import ChangePasswordModel from '../../../utils/models/ChangePassword';

const AllAdmins = () => {
  const [adminData, setadminData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(Itemsperpage);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
   const [isOpen, setIsOpen] = useState(false);
    const [adminId, setAdminId] = useState(null);
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

  useEffect(() => {
    getadminData();
  }, [currentPage,itemsPerPage]);

  const getadminData = async () => {
    setLoading(true); // Start loading
    try {
      const response = await AdminService.getAllAdmins();
      if (response) {
        setadminData(response.details);
        setTotalData(response.details.length);
      }
    } catch (error) {
      alert(error?.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false); // End loading
    }
  };


  const ChangePassword = (adminData) => {
    onOpen();
    setAdminId(adminData._id);
    // navigate(`/admin/admin-data/edit/${adminData._id}`);
  };

  const gotoView =(id)=>{
    navigate(`/admin/admin-data/${id}`);
  }

  const gotoCreate = () => {
    navigate(`/admin/create-admin`);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const filteredData = useMemo(() => {
    return adminData?.filter((adminData) =>
      adminData?.name?.toLowerCase().includes(searchInput?.toLowerCase()),
    );
  }, [adminData, searchInput]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData?.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  useEffect(() => {
    setTotalData(filteredData.length);
  }, [filteredData]);

  return (
    <Box>
           <ChangePasswordModel
                isOpen={isOpen}
                onClose={onClose}
                adminId={adminId}
              />
      <Flex w="100%" justifyContent="flex-end">
        <Button colorScheme="blue" onClick={gotoCreate}>
          Create Admin
        </Button>

      </Flex>

      <div
        className="text-start mt-5 mb-2 ms-1"
        style={{ fontWeight: '500',marginBottom:'10px' }}
      >
        <Link style={{ color: 'blue' }} to="/admin/default">
          Dashboard
        </Link>
        &nbsp;&#8811; Admin
      </div>
      <Card>
        <Box>
          <Flex p="5">
            <Text p="2" mb={2}>
              Search by Admin name :
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
              <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="40px" />
            </Box>
          ) : (
                      <Box overflowX="auto">
            
            <Table variant="striped" colorScheme="gray">
              <Thead bg="#F4F7FE">
                <Tr>
                  <Th textAlign="center">Name </Th>
                  <Th textAlign="center">Email </Th>
                  <Th textAlign="center">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {paginatedData?.map((adminData) => (
                  <Tr key={adminData._id} textAlign="center">
                   
                    <Td textAlign="center" >
                      {adminData?.name}
                    </Td>
                    <Td textAlign="center" >
                        {adminData?.email}
                    </Td>
                    
                    <Td textAlign="center" verticalAlign="middle">
                      <Flex justifyContent="center" gap={2}>
                      <Button
                          size="sm"
                          colorScheme="teal"
                          onClick={() => gotoView(adminData._id)}
                        >
                          View
                        </Button>

                        <Button
                          size="sm"
                          colorScheme="teal"
                          onClick={() => ChangePassword(adminData)}
                        >
                           Change Password 
                        </Button>
                        {/* <Button
                          size="sm"
                          colorScheme="red"
                          onClick={() => handleDelete(adminData._id)}
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
            <Select
  value={itemsPerPage}
  onChange={(e) => setItemsPerPage(Number(e.target.value))}
  maxW="100px"
  border="1px solid grey"
  borderColor="grey"     
  borderRadius="md"     
>
  <option value={5}>5</option>
  <option value={10}>10</option>
  <option value={15}>15</option>
  <option value={20}>20</option>
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

export default AllAdmins;
