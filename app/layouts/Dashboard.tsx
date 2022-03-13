import Footer from "~/components/Footer/Footer.js";
import AdminNavbar from "~/components/Navbars/AdminNavbar.js";
import { Box, Portal, Stack, useColorMode } from "@chakra-ui/react";
import React, { useState } from 'react';
import Sidebar from '~/components/Sidebar/Sidebar';
import { LogoDark, LogoLight, ChakraLogoDark, ChakraLogoLight } from '~/components/Icons/Icons';
import routes from "~/routes.js";
import MainPanel from "../components/Layout/MainPanel";
import PanelContainer from "../components/Layout/PanelContainer";
import PanelContent from "../components/Layout/PanelContent";
import bgAdmin from "~/assets/img/admin-background.png";
import LogoWhite from "~/assets/img/cbp_logo_w.png";
import LogoBlue from "~/assets/img/cbp_logo_b.png";

export default function DashboardLayout(props: React.PropsWithChildren<{}>) {
  const { children, ...rest } = props;
  // states and functions
  const [fixed, setFixed] = useState(false);
  const { colorMode } = useColorMode();
    return (
      <>
    <Box>
      <Box
        minH='40vh'
        w='100%'
        position='absolute'
        bgImage={colorMode === "light" ? bgAdmin : "none"}
        bg={colorMode === "light" ? bgAdmin : "navy.900"}
        bgSize='cover'
        top='0'
      />
      <Sidebar
        routes={routes}
        logo={
          <Stack direction='row' spacing='12px' align='center' justify='center'>
            {colorMode === "dark" ? (
              <img src={LogoWhite} width="180" alt="Logo"/>
            ) : (
              <img src={LogoBlue} width="180" alt="Logo"/>
            )}
          </Stack>
        }
        display='none'
        {...rest}
      />
      <MainPanel
        w={{
          base: "100%",
          xl: "calc(100% - 275px)",
        }}>
        <Portal>
          <AdminNavbar
            {...rest}
            fixed={true}
          />
        </Portal>

          <PanelContent>
            <PanelContainer>
{children}
            </PanelContainer>
          </PanelContent>

        <Footer />


      </MainPanel>
    </Box>
    </>
    );
  }
  