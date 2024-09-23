"use client";

import { Badge, Flex, Image, Text } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import ReportDrawer from "./ReportDrawer";

const Header = () => {
  const pathName = usePathname();

  // Condicional para não renderizar nada se for a página inicial
  if (pathName === "/") {
    return null;
  }

  return (
    <Flex bg="#0582ca" alignItems="center" justifyContent="space-between">
      <Flex alignItems="center">
        <Image
          src="/assets/LembreBem-icon.png"
          alt="Logo - Lembre Bem"
          boxSize="45px"
          marginX={2}
        />
        <Badge fontSize={"12px"} colorScheme="blue" whiteSpace="pre-wrap" variant={"solid"} fontWeight="600" wordBreak="break-word">
        Lembre Bem
        </Badge>
      </Flex>
      <Flex alignItems="center" marginX={2}>
        {/* <ReportDrawer />  Descomente esta linha para exibir o drawer */}
      </Flex>
    </Flex>
  );
};

export default Header;
