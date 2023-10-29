import { useMutation } from "@/hooks/useMutation";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const { mutate } = useMutation();
  const router = useRouter();
  const toast = useToast();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async () => {
    const response = await mutate({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/login",
      payload,
    });
    if (!response?.success) {
      toast({
        title: "Login Gagal.",
        description: "Email atau password tidak sesuai.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else {
      Cookies.set("user_token", response?.data?.token, {
        expires: new Date(response?.data?.expires_at),
        path: "/",
      });
      router.push("/");
    }
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Silahkan Login</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={payload?.email}
                onChange={(e) =>
                  setPayload({ ...payload, email: e.target.value })
                }
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={payload?.password}
                onChange={(event) =>
                  setPayload({ ...payload, password: event.target.value })
                }
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Text>
                  Belum punya akun?
                  <Link className="text-blue-500 ml-1" href={"/register"}>
                    Daftar Disini
                  </Link>
                </Text>
              </Stack>
              <Button
                onClick={() => handleSubmit()}
                w={"full"}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
