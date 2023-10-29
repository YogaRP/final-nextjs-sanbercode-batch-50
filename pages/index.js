import { useMutation } from "@/hooks/useMutation";
import { useQueries } from "@/hooks/useQuaries";
import Sidebar from "@/layouts";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Heading,
  Icon,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiChevronDown, FiHeart, FiMessageSquare } from "react-icons/fi";

export default function Home() {
  const router = useRouter();
  const [post, setPost] = useState("");
  const { data: posts, isLoading } = useQueries({
    prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all",
    headers: { Authorization: `Bearer ${Cookies.get("user_token")}` },
  });
  const { data: me } = useQueries({
    prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/user/me",
    headers: { Authorization: `Bearer ${Cookies.get("user_token")}` },
  });

  const handleSubmit = async () => {
    try {
      console.log(post);
      const response = await fetch(
        `https://paace-f178cafcae7b.nevacloud.io/api/post`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("user_token")}`,
          },
          body: JSON.stringify(post),
        }
      );
      const result = await response.json();
      console.log(response);
      console.log(result);
      if (result?.success) {
        router.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            <Card m={3}>
              <FormControl p={5}>
                <FormLabel textAlign={"center"}>
                  Upload Postingan Terbaru
                </FormLabel>
                <Textarea
                  value={post?.description || ""}
                  onChange={(event) =>
                    setPost({
                      ...post,
                      description: event.target.value,
                    })
                  }
                  bg={"blackAlpha.100"}
                  placeholder="Posting apa nih sekarang??"
                />
                <Button
                  onClick={() => handleSubmit()}
                  m={2}
                  colorScheme="blue"
                  float={"right"}
                >
                  Kirim Postingan
                </Button>
              </FormControl>
            </Card>
            {posts?.data?.map((post) => {
              return (
                <Card m={3} key={post.id}>
                  <CardHeader>
                    <Flex spacing="4">
                      <Flex
                        flex="1"
                        gap="4"
                        alignItems="center"
                        flexWrap="wrap"
                      >
                        <Avatar name={post.user.name} src="" />
                        <Box>
                          <Heading size="sm">{post.user.name}</Heading>
                          <Text>{post.updated_at.slice(0, 10)}</Text>
                        </Box>
                      </Flex>
                      {post.user.id == me?.data?.id && (
                        <Menu>
                          <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: "none" }}
                          >
                            <HStack>
                              <VStack
                                display={{ base: "none", md: "flex" }}
                                alignItems="flex-start"
                                spacing="1px"
                                ml="2"
                              ></VStack>
                              <Box display={{ base: "none", md: "flex" }}>
                                <FiChevronDown />
                              </Box>
                            </HStack>
                          </MenuButton>
                          <MenuList>
                            <MenuItem>Edit</MenuItem>
                            <MenuItem>Hapus</MenuItem>
                          </MenuList>
                        </Menu>
                      )}
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <Text>{post.description}</Text>
                  </CardBody>

                  <CardFooter
                    justify="space-between"
                    flexWrap="wrap"
                    sx={{
                      "& > button": {
                        minW: "136px",
                      },
                    }}
                  >
                    <Button flex="1" variant="ghost">
                      <Icon
                        mr="2"
                        fontSize="16"
                        _groupHover={{
                          color: "white",
                        }}
                        as={FiHeart}
                      />
                      {post.likes_count} Like
                    </Button>
                    <Button flex="1" variant="ghost">
                      <Icon
                        mr="2"
                        fontSize="16"
                        _groupHover={{
                          color: "white",
                        }}
                        as={FiMessageSquare}
                      />
                      {post.replies_count} Comment
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </GridItem>
        </Grid>
      </Box>
    </Sidebar>
  );
}
