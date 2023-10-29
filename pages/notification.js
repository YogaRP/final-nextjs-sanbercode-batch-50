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
  Heading,
  Icon,
  IconButton,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { FiHeart, FiMessageSquare } from "react-icons/fi";

export default function Notification() {
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
              <CardBody>
                <Flex spacing="4">
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Avatar
                      name="Segun Adebayo"
                      src="https://bit.ly/sage-adebayo"
                    />
                    <Box>
                      <Heading size="sm">Segun Adebayo</Heading>
                      <Text>26 Oktober 2023: 23.08</Text>
                    </Box>
                    <Text>Telah Mengomentari anda pada postingan:</Text>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </Box>
    </Sidebar>
  );
}
