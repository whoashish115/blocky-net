import React from "react";

import NextNProgress from "nextjs-progressbar";
import { useRouter } from "next/router"
import { ConfirmProvider } from "material-ui-confirm";
import { SizeContext } from '@bucky24/mobile-detect';

import NotFound from "../Error/404";
import UserHeader from "./UserHeader/Index"
import UserFooter from "./UserFooter"
import Notify from "../Notify/Index";
import lightTheme from "../../theme/lightTheme";
import darkTheme from "../../theme/darkTheme";
import AdminHeader from "../Admin/AdminHeader/Index"
import { postData } from "../../utils/fetchData";
import { DataContext } from "../../store/GlobalState";

import Box from "@mui/material/Box"
import Container from '@mui/material/Container'
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline"


const Index = ({ children, pageProps }) => {
  const { state, dispatch } = React.useContext(DataContext);
  const { theme, auth } = state
  const router = useRouter();
  
  // Views Count 
  const { isMobile, isTablet, isDesktop} = React.useContext(SizeContext);
  const deviceDetect = () => { if(isDesktop) return "desktop" ;else if(isTablet) return "tablet" ;else if(isMobile) return "mobile" ;else return "other"} 
  const device = deviceDetect()
  React.useEffect(async () => {
    if(!router.pathname.includes("/admin")){
      if (router.pathname == "/blog/[category]/[slug]") { await postData(`views/updateBlogViews?slug=${router.query.slug}`) }
      await postData(`views?slug=${router.asPath}&path=${router.pathname}&device=${device}`)
    }
  }, [router.pathname]);

  // Prevent User From entering Admin Panel
  var allowed = true;
  if (router.pathname.startsWith("/admin")) {
    if (Object.keys(auth).length === 0) {
      allowed = false;
    }
    else {
      if (auth.user.role === "admin") {
        allowed = true;
      }
      else {
        allowed = false;
      }
    }
  }
  const ComponentToRender = allowed ? children : <Box {...pageProps}><NotFound /></Box>;
  const isShowHeader = () => {
    if (
      router.pathname == "/auth/signin" ||
      router.pathname == "/auth/signup" ||
      router.pathname == "/auth/forgotpassword" ||
      router.pathname == "/auth/resetpassword/[token]" ||
      router.pathname == "/auth/user/activate/[token]" ||
      router.pathname == "/404" ||
      router.pathname == "/500"
    ) return false
    else return true
  }
  const showHeader = !isShowHeader()

  return (
    <ThemeProvider theme={theme == "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      <NextNProgress color={theme == "dark" ? darkTheme.palette.primary.main : lightTheme.palette.primary.main} height={2} showOnShallow={true} />
      <Notify />
      <ConfirmProvider defaultOptions={{ confirmationButtonProps: { variant: "contained", elevation: 0 }, cancellationButtonProps: { autoFocus: true } }}>
        <Container sx={{ padding: "0px !important ", maxWidth:'1800px !important', background: router.pathname.startsWith("/admin") && auth.user && auth.user.role == "admin" && theme == "light"  ? "rgba(255,255,255,0.25)" : ""}}>
          {
            showHeader ? ComponentToRender :
              (router.pathname.startsWith("/admin")
                ? (auth.user && auth.user.role == "admin" ? <AdminHeader>{ComponentToRender}</AdminHeader> : ComponentToRender)
                : ((router.pathname == "/blog/mysaved" && !auth.user) ? <Box {...pageProps}><NotFound /></Box> : <UserHeader footer={<UserFooter />}>{ComponentToRender}</UserHeader>))
          }
        </Container>
      </ConfirmProvider>
    </ThemeProvider>
  );
};

export default Index;
