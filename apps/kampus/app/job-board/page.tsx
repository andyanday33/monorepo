import React from "react";
import { Box, Flex, Text } from "@radix-ui/themes";

export default function JobBoardHome() {
  return (
    <Box>
      <Flex direction={"column"} gap={"4"}>
        <Text as={"p"} weight={"medium"}>
          Kampus Jobs
        </Text>
      </Flex>
    </Box>
  );
}
