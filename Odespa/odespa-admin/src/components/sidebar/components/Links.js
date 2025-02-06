/* eslint-disable */
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
// chakra imports
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, HStack, Text, useColorModeValue } from "@chakra-ui/react";

export function SidebarLinks(props) {
  //   Chakra color mode
  let location = useLocation();
  let activeColor = useColorModeValue("orange", "white");
  let inactiveColor = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.600");
  let activeIcon = useColorModeValue("orange", "white");
  let textColor = useColorModeValue("secondaryGray.500", "white");
  let brandColor = useColorModeValue("brand.500", "brand.400");

  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createLinks = (routes) => {
    return routes
      .filter((route) => route.name) 
      .map((route, index) => {
        if (route.items) {
          return (
            <Accordion allowToggle key={index} defaultIndex={-1}>
            <AccordionItem border="none">
              <h2>
                <AccordionButton
                  _expanded={{ bg: "orange.100" }}
                  borderRadius="md"
                  
                  pt="18px"
                  pb="12px"
                >
                 <Flex w="100%"  alignItems="center" justifyContent="center">
                      <Box
                        color={
                         textColor
                        }
                        me="15px"
                      >
                        {route.icon}
                      </Box>
                      <Text
                        me="auto"
                        color={
                          textColor
                        }
                        fontWeight={
                          "normal"
                        }
                      >
                        {route.name}
                      </Text>
                    </Flex>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={2}>
                {createLinks(route.items)} {/* Recursive call for nested routes */}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        );
      
        } else if (
          route.layout === "/admin" ||
          route.layout === "/auth" ||
          route.layout === "/rtl"
        ) {
          return (
            <NavLink key={index} to={route.layout + route.path}>
              {route.icon ? (
                <Box>
                  <HStack
                                    
                    spacing={
                      activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                    }
                    py="5px"
                    ps="10px"
                  >
                    <Flex w="100%" alignItems="center" justifyContent="center">
                      <Box
                        color={
                          activeRoute(route.path.toLowerCase())
                            ? activeIcon
                            : textColor
                        }
                        me="18px"
                      >
                        {route.icon}
                      </Box>
                      <Text
                        me="auto"
                        color={
                          activeRoute(route.path.toLowerCase())
                            ? activeColor
                            : textColor
                        }
                        fontWeight={
                          activeRoute(route.path.toLowerCase())
                            ? "bold"
                            : "normal"
                        }
                      >
                        {route.name}
                      </Text>
                    </Flex>
                    <Box
                      h="36px"
                      w="4px"
                      bg={
                        activeRoute(route.path.toLowerCase())
                          ? brandColor
                          : "transparent"
                      }
                      borderRadius="5px"
                    />
                  </HStack>
                </Box>
              ) : (
                <Box>
                  <HStack
                    spacing={
                      activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                    }
                    py="5px"
                    ps="10px"
                    style={{border:"1px solid red"}}
                  >
                    <Text
                      me="auto"
                      color={
                        activeRoute(route.path.toLowerCase())
                          ? activeColor
                          : inactiveColor
                      }
                      fontWeight={
                        activeRoute(route.path.toLowerCase()) ? "bold" : "normal"
                      }
                    >
                      {route.name}
                    </Text>
                    <Box h="36px" w="4px" bg="brand.400" borderRadius="5px" />
                  </HStack>
                </Box>
              )}
            </NavLink>
          );
        }
      });
  };

  //  BRAND
  return createLinks(routes);
}

export default SidebarLinks;
