import React from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  Flex
} from "@chakra-ui/react";

export default function ImageModal({ isOpen, onClose, modalData }) {
  const { user, urls } = modalData || {};
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="4xl"
      motionPreset="slideInBottom"
      isCentered
    >
      <ModalOverlay />
      <ModalContent h="650px" w="800px">
        <ModalCloseButton />
        <ModalBody>
          <Box w="full" h="full">
            <Flex w="full" h="500px" position="relative">
              <Image
                pt="50px"
                width="full"
                borderRadius="10px"
                cursor="pointer"
                src={urls?.small}
                alt={urls?.alt_description}
                objectFit="cover"
              />
            </Flex>

            <Box textTransform='capitalize' pt="3">
              <Box
                mt="3"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                {user?.name}
              </Box>
              {user?.location}
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
