import React, { useEffect, useState } from 'react';
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
  Select,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import BookingService from '../../../services/booking.service';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import { Itemsperpage, pagesToShowInitially } from '../../../utils/constants';

const BookingsTable = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
   const [searchInput, setSearchInput] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(Itemsperpage);
    const [totalData, setTotalData] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getBookings();
  }, [currentPage,itemsPerPage]);

  // Fetch bookings using your BookingService
  const getBookings = async () => {
    setLoading(true);
    try {
      const response = await BookingService.getbookings({ page: currentPage,
        limit: itemsPerPage});
      if (response) {
        setBookings(response.details);
      }
    } catch (error) {
      console.log(error)
      alert(error?.response?.data?.error || 'An error occurred while fetching bookings');
    } finally {
      setLoading(false);
    }
  };

  // Navigate to the Edit page for a given booking
  const gotoView = (booking) => {
    navigate(`/admin/Bookings/view/${booking._id}`);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };



  return (
    <Box p={4}>
      {/* Breadcrumb */}
      <div
        className="text-start mt-5 mb-2 ms-1"
        style={{ fontWeight: '500', marginBottom: '10px' }}
      >        <Link style={{ color: 'blue' }} to="/admin/dashboard">
          Dashboard
        </Link>
        &nbsp;&#8811;&nbsp;
          Bookings
      </div>

      {/* Main Card Container */}
      <Box borderWidth="1px" borderRadius="md" boxShadow="md" p={4} bg="white">
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
                <Th textAlign="center">Booking ID</Th>
                <Th textAlign="center">Booking Date</Th>
                <Th textAlign="center">Outlet</Th>
                <Th textAlign="center">Guest(s)</Th>
                <Th textAlign="center">Services</Th>
                <Th textAlign="center">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {bookings.map((booking, index) => {
                // For guests, simply join the guest IDs; if enriched, you might use guest names instead.
                const guestList = booking?.guests
                  .map((g) => g.guestDetail?.first_name)
                  .join(', ');

                // For services, combine all service names from each guest's serviceDetails.
                const serviceNames = booking.guests
                  .flatMap((g) => (g.serviceDetails ? g.serviceDetails.map((s) => s.name) : []));
                // Remove duplicates if needed.
                const uniqueServiceNames = [...new Set(serviceNames)];
                const servicesStr = uniqueServiceNames.join(', ');

                // For outlet details, assume the first outlet contains the name.
                const outletName =
                  booking.outletDetails && booking.outletDetails.length > 0
                    ? booking.outletDetails[0].name
                    : 'N/A';

                return (
                  <Tr key={booking._id} textAlign="center">
                    <Td textAlign="center">
                      {(index + 1)}
                    </Td>
                    <Td textAlign="center">{booking.zenoti_service_booking_id}</Td>
                    <Td textAlign="center">
                      {moment(booking.date).format('YYYY-MM-DD')}
                    </Td>
                    <Td textAlign="center">{outletName}</Td>
                    <Td textAlign="center">{guestList || 'N/A'}</Td>
                    <Td textAlign="center">{servicesStr || 'N/A'}</Td>
                    <Td textAlign="center">
                      <Flex justifyContent="center">
                        <Button
                          size="sm"
                          colorScheme="teal"
                          onClick={() => gotoView(booking)}
                        >
                          View
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
          </Box>
        )}
      </Box>

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
              <option value={5}>5</option>
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

export default BookingsTable;
