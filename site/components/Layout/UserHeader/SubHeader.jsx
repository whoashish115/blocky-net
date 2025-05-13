import React from 'react'

import { useTheme } from '@emotion/react'
import { Pagination, Autoplay, FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css";

import { getData } from "../../../utils/fetchData"

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Image from 'next/image'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import Button from '@mui/material/Button'
const CryptoIcon = ({ cryptoCurrency }) => {
  let iconSrc = null;
  try {
    iconSrc = require(`cryptocurrency-icons/32/icon/${cryptoCurrency.symbol.toLowerCase()}.png`);
  } catch (err) {
    iconSrc = null;
  }

  return (
    <>
      {iconSrc && (
        <Image
          width={35}
          height={35}
          src={iconSrc}
          alt={cryptoCurrency.symbol}
        />
      )}
    </>
  );
};
const SubHeader = () => {
    const theme = useTheme()
    const [data, setData] = React.useState([]);
    React.useEffect(async () => {
        const res = await getData("cryptoCurrency")
        if (res.err) setData([])
        else if (res.error) setData([])
        else (setData(res.data))
    }, [])

    return (
        <Collapse in={data?.length !== 0}>
            {data && data?.length !== 0 && <AppBar position="static" sx={{ background: (theme) => { return theme.palette.background.paperSecondary }, ["& .MuiPaper-root"]: { boxShadow: "none" } }} color="inherit" elevation={0}>
                <Toolbar variant="dense" sx={{ alignItems: "center", paddingX: "8px !important", ["& .swiper-wrapper"]: { transitionTimingFunction: 'linear !important' } }}>
                    <Swiper modules={[Pagination, Autoplay, FreeMode]} freeMode loop loopAdditionalSlides={20} slidesPerView={"auto"} autoplay={{ delay: 0, disableOnInteraction: false }} speed={4000}>
                        {data.map((cryptoCurrency) =>
                            <SwiperSlide key={cryptoCurrency.id} style={{ width: "auto" }}>
                                <Box sx={{ display: "inline" }}>
                                    <Button color="inherit" sx={{ width: 'auto', background: (theme) => { return theme.palette.background.paper }, ["&:hover"]: { background: (theme) => { return theme.palette.background.default } }, paddingX: 2.5, paddingY: 1, margin: 1, marginRight: 0, boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1);" }}>
                                        <CryptoIcon cryptoCurrency={cryptoCurrency}/>
                                        <Box pl={1}>
                                            <Typography variant='subtitle2' sx={{ lineHeight: 0, pt: 2, pb: 0.5 }} >
                                                {cryptoCurrency.name}
                                            </Typography>
                                            <Typography variant='caption'>
                                                {cryptoCurrency.symbol}
                                            </Typography>
                                        </Box>
                                     <Box pl={1}>
                                           <Typography variant='subtitle2' sx={{ lineHeight: 0, pt: 2, pb: 0.5, height: "100%" }}>
                                                {"$" + parseFloat(cryptoCurrency.current_price).toFixed(4)}
                                            </Typography>
                                            <Typography variant='caption' color="text.secondary" sx={{ lineHeight: .5, pt: 0.5, pb: 0.5, height: "100%" }}>
                                                24h
                                                <Box sx={{ pl: .5, display: "inline", color: cryptoCurrency.price_change_24h > 0 ? theme.palette.success.main : theme.palette.error.main }}>
                                                    {parseFloat(Math.abs(cryptoCurrency.price_change_24h)/Math.abs(cryptoCurrency.current_price)).toFixed(2) + "%"}
                                                </Box>
                                            </Typography>
                                        </Box>
                                    </Button>
                                </Box>
                            </SwiperSlide>)}
                    </Swiper>
                </Toolbar>
            </AppBar>}
        </Collapse>
    )
}

export default SubHeader