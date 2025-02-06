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
import BannerService from '../../../services/banner.service';

const Banners = () => {
  const [Banners, setBanners] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(Itemsperpage);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getBanners();
  }, [currentPage,itemsPerPage]);

  const getBanners = async () => {
    setLoading(true);
    try {
      const response = await BannerService.getbanners();
      if (response) {
        setBanners(response.details);
        setTotalData(response.details.length);
      }
    } catch (error) {
      alert(error?.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (BannerId) => {
    try {
      await BannerService.deleteBanner(BannerId);
      getBanners();
      alert('Banners deleted successfully');
    } catch (error) {
      alert('Failed to delete Banners');
    }
  };

  const gotoEdit = (Banner) => {
    navigate(`/admin/banners/edit/${Banner._id}`);
  };

  const gotoView = (Banner) => {
    navigate(`/admin/banners/${Banner._id}`);
  };

  const gotoCreate = () => {
    navigate(`/admin/banners/add`);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const filteredData = useMemo(() => {
    return Banners?.filter((Banner) =>
      Banner?.banner_text?.toLowerCase()?.includes(searchInput?.toLowerCase()),
    );
  }, [Banners, searchInput]);





  return (
    <Box>
      <Flex w="100%" justifyContent="flex-end">
        <Button colorScheme="blue" onClick={gotoCreate}>
          Add Banners
        </Button>
      </Flex>

      <div
        className="text-start mt-5 mb-2 ms-1"
        style={{ fontWeight: '500', marginBottom: '10px' }}
      >
        <Link style={{ color: 'blue' }} to="/admin/default">
          Dashboard
        </Link>
        &nbsp;&#8811; Banners
      </div>
      <Card>
        <Box>
          <Flex p="5">
            <Text p="2" mb={2}>
              Search by Banner Title :
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
                <Th textAlign="center">#</Th>
                  <Th textAlign="center">Banner text</Th>
                  <Th textAlign="center">Image</Th>
                  <Th textAlign="center">Status</Th>
                  <Th textAlign="center">City Name</Th>
                  <Th textAlign="center">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredData?.map((Banner,index) => (
                  <Tr key={Banner._id} textAlign="center">
                    <Td textAlign="center" >
                                                                      {(currentPage - 1) * itemsPerPage + index + 1}
                                                                      </Td>
                    <Td textAlign="center" >
                        {Banner.banner_text}
                    </Td>
                    <Td textAlign="center" verticalAlign="middle">
                      <Flex justifyContent="center" alignItems="center">
                        <Image
                          src={
                            Banner.image ||
                            'https://via.placeholder.com/50x50?text=No+Image'
                          }
                          alt={Banner.banner_text}
                          boxSize="50px"
                          objectFit="cover"
                          borderRadius="full"
                        />
                      </Flex>
                    </Td>

                    <Td textAlign="center" verticalAlign="middle">
                      <Badge
                        colorScheme={
                          Banner.status === 'active' ? 'green' : 'red'
                        }
                      >
                        {Banner.status}
                      </Badge>
                    </Td>
                    <Td textAlign="center" verticalAlign="middle">
                    
                        {Banner?.city?.name}
                      
                    </Td>
                    <Td textAlign="center" verticalAlign="middle">
                      <Flex justifyContent="center" gap={2}>
                        <Button
                          size="sm"
                          colorScheme="teal"
                          onClick={() => gotoEdit(Banner)}
                        >
                          Edit
                        </Button>
                        {/* <Button
                          size="sm"
                          colorScheme="red"
                          onClick={() => handleDelete(Banner._id)}
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

export default Banners;
