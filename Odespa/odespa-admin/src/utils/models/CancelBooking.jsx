import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

const CancelBookingModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">Cancel Booking</ModalHeader>
        <ModalBody>
          <Text fontSize="md" textAlign="center">
            Are you sure you want to cancel  booking?
          </Text>
        </ModalBody>
        <ModalFooter display="flex" justifyContent="center">
          <Button  mr="2" colorScheme="red" onClick={onClose}>
            No
          </Button>
          <Button colorScheme="teal" onClick={onConfirm}>
            Yes, Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CancelBookingModal;
