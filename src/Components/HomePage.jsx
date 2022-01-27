import { Box, InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React from "react";
import "../Global.css";

export default function HomePage() {
  return (
    <Box bg="#D3D3D3" w="100%" p={20}>
      <InputGroup >
        <InputLeftElement
          marginLeft='140px'
          top='11px'
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
          fontSize='lg'
        />
        <Input
          className="noHover"
          width="80%"
          height="60px"
          backgroundColor="white"
          color="black"
          type="tel"
          placeholder="Search for photo"
        />
      </InputGroup>
    </Box>
  );
}
