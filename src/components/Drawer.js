import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    Box,    
    Button,
    Img,
    Text,
    useDisclosure,
    Flex,
    VStack
  } from '@chakra-ui/react'
import { HiMenuAlt2 } from 'react-icons/hi'
import logo from '../assets/HerVest Logo.svg'



function  TopDrawer() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    return (
      <>
      <Box fontSize={20} onClick={onOpen}><HiMenuAlt2/></Box>
      
        <Drawer placement='top' onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth='1px'>
                 <Img src={logo}/></DrawerHeader>
            <DrawerBody>
             <Flex justifyContent="space-between"> 
                <Box>
                  <Text cursor="pointer" fontSize="12px" color="#5B2E4F" fontWeight="400">About</Text>
                  <Text cursor="pointer" fontSize="12px" color="#5B2E4F" fontWeight="400" >Insights</Text>
                  <Text cursor="pointer" fontSize="12px" color="#5B2E4F" fontWeight="400">Contact</Text>
                  <Text cursor="pointer" fontSize="12px" color="#5B2E4F" fontWeight="400">Log in</Text>
                </Box>
                <VStack>
                   <a href="http://hervestng.app.link/"><Button p={["7px 26px 7px 26px","11px 36px 11px 36px"]} bg="#5B2E4F" fontSize="12px" color="#fff" borderRadius="6px" _hover={{color:"#5B2E4F", border:"1px solid #5B2E4F", bg:"#fff"}}>SIGN UP</Button></a> 
                </VStack>
            </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

  export default TopDrawer