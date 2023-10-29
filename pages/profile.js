import { useQueries } from "@/hooks/useQuaries";
import Sidebar from "@/layouts";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  Grid,
  GridItem,
  Card,
  CardBody,
} from "@chakra-ui/react";
import Cookies from "js-cookie";

export default function SocialProfileWithImage() {
  const { data, isLoading } = useQueries({
    prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/user/me",
    headers: { Authorization: `Bearer ${Cookies.get("user_token")}` },
  });
  console.log(data);
  return (
    <Sidebar>
      <Box>
        <Grid
          h="200px"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={4}
        >
          <GridItem
            colSpan={5}
            bg={"blackAlpha.400"}
            rounded={"md"}
            overflow={"auto"}
            minH={"100vh"}
          >
            <Box
              p={3}
              m={3}
              bg={useColorModeValue("white", "gray.800")}
              boxShadow={"2xl"}
              rounded={"md"}
              overflow={"hidden"}
            >
              <Stack spacing={0} align={"center"} mb={5}>
                <Avatar
                  size={"xl"}
                  src={
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                  }
                  css={{
                    border: "2px solid white",
                  }}
                />
              </Stack>
              <Stack spacing={0} align={"center"} mb={5}>
                <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                  {data?.data?.name}
                </Heading>
                <Text color={"gray.500"}>{data?.data?.email}</Text>
              </Stack>

              <Stack direction={"row"} justify={"center"} spacing={6}>
                <Stack spacing={0} align={"center"}>
                  <Text fontSize={"md"}>Hobi:</Text>
                  <Text fontWeight={600}>
                    {data?.data?.hobby ? data.data.hobby : "Hobi Belum Diisi"}
                  </Text>
                </Stack>
                <Stack spacing={0} align={"center"}>
                  <Text fontSize={"md"}>No.Handphone</Text>
                  <Text fontWeight={600}>
                    {data?.data?.phone
                      ? data.data.phone
                      : "Nomor Handphone Belum Diisi"}
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </Sidebar>
  );
}
