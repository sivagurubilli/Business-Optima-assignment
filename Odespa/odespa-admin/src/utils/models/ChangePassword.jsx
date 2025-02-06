import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import AdminService from "../../services/admin.service";

const ChangePasswordModel = ({ isOpen, onClose, adminId }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onConfirm = async (data) => {
   

    try {
         const response = await AdminService.ChangeAdminPassword({adminId});
     
      if (response) {
        setSuccessMessage("Password changed successfully.");
        setError(""); // Clear any previous errors
        onClose(); // Close the modal after success
      } else {
        setError(response.data.error || "Something went wrong.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Server error.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">Change Admin Password</ModalHeader>
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Current Password</FormLabel>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired mt="4">
            <FormLabel>New Password</FormLabel>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </FormControl>

          {error && (
            <Text color="red.500" mt="2">
              {error}
            </Text>
          )}
          {successMessage && (
            <Text color="green.500" mt="2">
              {successMessage}
            </Text>
          )}
        </ModalBody>
        <ModalFooter display="flex" justifyContent="center">
          <Button mr="2" colorScheme="red" onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="teal" onClick={onConfirm}>
            Change Password
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChangePasswordModel;
