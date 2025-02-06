import React from "react";
import odespa from "../../../assets/img/profile/odespa-logo.png"

// Chakra imports
import { Flex, Image, useColorModeValue } from "@chakra-ui/react";

// Custom components
export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
         <h1 style={{fontSize:"30px" ,marginBottom:"10px"}}>
         <Image w="100px" h="80px" src={odespa}/> 

         </h1>
    </Flex>
  );
}

export default SidebarBrand;
