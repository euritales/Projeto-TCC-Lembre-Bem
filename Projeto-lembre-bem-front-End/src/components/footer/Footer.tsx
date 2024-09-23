"use client";

import { Flex, IconButton, Link, Box, Text } from "@chakra-ui/react";
import { FaHome, FaBell, FaUsers, FaPills, FaTasks } from "react-icons/fa";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathName = usePathname();

  
    if (pathName === "/") {
      return null;
    }

  return (
    <Box width="100%" boxShadow="md">
      <Flex
        bg={"#FFFFFF"}
        borderY={"1px solid gray"}
        justifyContent="space-around"
        px={2}
      >
        <Link w={"auto"} as={NextLink} href="/home">
          <Flex flexDir={"column"}>
            <IconButton
              icon={<FaTasks fontSize="24px" />}
              aria-label="Hoje"
              variant="ghost"
              colorScheme="teal"
              color={pathName === "/home" ? "#006494" : "#59656f"}
              _hover={{ background: "transparent" }}
            />
            <Text color={pathName === "/home" ? "#006494" : "#59656f"}  as={pathName === "/home" ? 'u' : undefined} fontWeight={"600"}>
            Hoje
            </Text>
          </Flex>
        </Link>
        <Link as={NextLink} href="/treatments">
          <Flex justifyContent={"center"} flexDir={"column"}>
            <IconButton
              icon={<FaPills fontSize="24px" />}
              aria-label="Tratamentos"
              variant="ghost"
              color={pathName === "/treatments" ? "#006494" : "#59656f"}
              _hover={{ background: "transparent" }}
            />
            <Text color={pathName === "/treatments" ? "#006494" : "#59656f"}  as={pathName === "/treatments" ? 'u' : undefined} fontWeight={"600"}>
              Tratamentos
            </Text>
          </Flex>
        </Link>
        <Link as={NextLink} href="/dependents">
          <Flex flexDir={"column"}>
            <IconButton
              icon={<FaUsers fontSize="24px" />}
              aria-label="Dependentes"
              variant="ghost"
              color={pathName === "/dependents" ? "#006494" : "#59656f"}
              _hover={{ background: "transparent" }}
            />
            <Text color={pathName === "/dependents" ? "#006494" : "#59656f"} as={pathName === "/dependents" ? 'u' : undefined} fontWeight={"600"}>
              Dependentes
            </Text>
          </Flex>
        </Link>

        <Link as={NextLink} href="/reminders">
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            flexDir={"column"}
          >
            <IconButton
              icon={<FaBell fontSize="24px" />}
              aria-label="Lembretes"
              variant="ghost"
              color={pathName === "/reminders" ? "#006494" : "#59656f"}
              _hover={{ background: "transparent" }}
            />
            <Text color={pathName === "/reminders" ? "#006494" : "#59656f"}  as={pathName === "/reminders" ? 'u' : undefined} fontWeight={"600"}>
              Lembretes
            </Text>
          </Flex>
        </Link>
      </Flex>
    </Box>
  );
};

export default Footer;
