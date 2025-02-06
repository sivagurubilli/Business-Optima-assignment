import React, { useEffect, useState, useMemo } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button, Badge, Flex, Image, Input, Select, Card, Text, SkeletonText } from '@chakra-ui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Categorieservice from '../../../services/category.service';
import { Itemsperpage, pagesToShowInitially } from '../../../utils/constants';

const CategoriesByOutlet = () => {
    const {id} = useParams()
  const [Categories, setCategories] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(Itemsperpage);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
  }, [currentPage]);

  const getCategories = async () => {
    setLoading(true);
    try {
      const response = await Categorieservice.getcategoriesbyoutlet({outletId:id, page: currentPage,
        limit: itemsPerPage});
      console.log(response)
      if (response) {
        setCategories(response.details); // Set outlet data to states
        setTotalData(response.totalDataCount);
      }
    } catch (error) {
      alert('An error occurred while fetching outlet data');
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
    return Categories.filter((outlet) =>
      outlet?.name?.toLowerCase()?.includes(searchInput?.toLowerCase())
    );
  }, [Categories, searchInput]);




  

  return (
    <Box>
      <Flex w="100%" justifyContent="flex-end">
        <Button colorScheme="blue" onClick={() => navigate('/admin/outlet/add')}>
          Add Category
        </Button>
      </Flex>
      
            <div
              className="text-start mt-5 mb-2 ms-1"
              style={{ fontWeight: '500', marginBottom: '10px' }}
            >
              <Link style={{ color: 'blue' }} to="/admin/default">
                Dashboard
              </Link>
              &nbsp;&#8811; Categories
            </div>

      <Card>
        <Box>
          <Flex p="5">
            <Text p="2" mb={2}>Search by Category Name:</Text>
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
            <Table variant="striped" colorScheme="gray">
              <Thead bg="#F4F7FE">
                <Tr>
                  <Th textAlign="center">Category Name</Th>
                  <Th textAlign="center">code</Th>
                  <Th textAlign="center">Description</Th>
                  <Th textAlign="center">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredData.map((outlet) => (
                  <Tr key={outlet._id} textAlign="center">
                    
                    <Td textAlign="center">{outlet.name}</Td>
                    <Td textAlign="center">{outlet?.code}</Td>
                                       <Td textAlign="center">{outlet?.description}</Td>
                    <Td textAlign="center">
                    <Flex justifyContent="center" gap={2}>
                  
                    <Button size="sm" colorScheme="teal" onClick={() => navigate(`/admin/outlet/${outlet._id}`)}>
                        View
                      </Button>
                      <Button size="sm" colorScheme="teal" onClick={() => navigate(`/admin/outlet/edit/${outlet._id}`)}>
                        Edit
                      </Button>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Box>
      </Card>

      <Flex style={{ marginTop: '20px' }} justifyContent="space-between">
        <Box>
          <Flex>
            <Text p="2" mb={2}>Show</Text>
            <Select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}maxW="100px"
  border="1px solid grey"
  borderColor="grey"     
  borderRadius="md" >
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

export default CategoriesByOutlet;
