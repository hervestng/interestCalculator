import { Button, Flex, HStack, Img , Text, Box} from '@chakra-ui/react'
import React from 'react'
import logo from '../assets/HerVest Logo.svg'
import TopDrawer from './Drawer'

const Navbar = () => {
  return (
    <>
    <Flex justify="space-between" display={["none","none","none","flex"]}>
        <a href=' https://hervest.ng'><Img src={logo} objectFit="contain"/></a>
        <HStack spacing={10}>
          <a className='hover-underline' href='https://learn.hervest.ng/'>
            <Text cursor="pointer" fontSize="12px" color="#5B2E4F" fontWeight="400">Learn</Text>
          </a>
          <a className='hover-underline' href='https://hervest.ng/#invest'>
            <Text cursor="pointer" fontSize="12px" color="#5B2E4F" fontWeight="400" >Save & Invest</Text>
          </a>
          <a className='hover-underline' href="https://hervest.ng/faqs/">
            <Text cursor="pointer" fontSize="12px" color="#5B2E4F" fontWeight="400">FAQs</Text>
          </a>
          <a className='hover-underline' href='http://hervestng.app.link/'>
            <Text cursor="pointer" fontSize="12px" color="#5B2E4F" fontWeight="400">Log in</Text>
          </a>
        </HStack>
        <a href="http://hervestng.app.link/"><Button p="11px 36px 11px 36px" bg="#5B2E4F" fontSize="14px" color="#fff" borderRadius="6px" _hover={{color:"#5B2E4F", border:"1px solid #5B2E4F", bg:"#fff"}}>SIGN UP</Button></a>
    </Flex>
    <Box display={["block","block","block","none"]}>
        <TopDrawer/>
    </Box>
    </>
  )
}

export default Navbar
