import { Button, Flex, HStack, Img , Text, Box} from '@chakra-ui/react'
import React from 'react'
import logo from '../assets/HerVest Logo.svg'
import TopDrawer from './Drawer'

const Navbar = () => {
  return (
    <>
    <Flex justify="space-between" display={["none","none","none","flex"]}>
        <Img src={logo}/>
        <HStack spacing={10}>
            <Text fontSize="14px" color="#5B2E4F" fontWeight="400">About</Text>
            <Text  fontSize="14px" color="#5B2E4F" fontWeight="400" >Insights</Text>
            <Text  fontSize="14px" color="#5B2E4F" fontWeight="400">Contact</Text>
            <Text fontSize="14px" color="#5B2E4F" fontWeight="400">Log in</Text>
        </HStack>
        <a href="https://app.hervest.ng/Signup"><Button p="11px 36px 11px 36px" bg="#5B2E4F" fontSize="14px" color="#fff" borderRadius="6px" _hover={{color:"#5B2E4F", border:"1px solid #5B2E4F", bg:"#fff"}}>SIGN UP</Button></a>
    </Flex>
    <Box display={["block","block","block","none"]}>
      <TopDrawer/>
     
    </Box>
    </>
  )
}

export default Navbar
