import Footer from "~/components/Footer/Footer.js";
import AuthNavbar from "~/components/Navbars/AuthNavbar.js";
import { Box, Portal } from "@chakra-ui/react";
import React from "react";


export default function AuthLayout({ children }: React.PropsWithChildren<{}>) {
    const wrapper = React.createRef();
    const navRef = React.useRef();
    return (
      <>
       <Box ref={navRef} w='100%'>
        <Portal  containerRef={navRef}>
          <AuthNavbar logoText=''  />
        </Portal>
        <Box w='100%'>
          <Box ref={wrapper} w='100%'>

            {children}

          </Box>
        </Box>
        <Box px='24px' mx='auto' width='1044px' maxW='100%' mt='60px'>
          <Footer />
        </Box>
      </Box>  
    </>
    );
  }
  