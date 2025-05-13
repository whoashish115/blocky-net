import React from 'react'
import Box from '@mui/material/Box';
import styled from '@emotion/styled';

const Loader = ({small}) => {
    const StyledLoader = styled("span")(
        ({ theme }) => ({
            position: "relative",
            ["&::before,&::after"]: {
                content: "''",
                position: 'relative',
                display: 'block'
            },
            ["&::before"]: {
                animation: "spinner 2.5s cubic-bezier(0.75, 0, 0.5, 1) infinite normal",
                width: small ? "20px" :"50px",
                height: small ? "20px" :"50px",
                backgroundColor: theme.palette.primary.main,
            },
            ["&::after"]: {
                animation: !small && "shadow 2.5s cubic-bezier(0.75, 0, 0.5, 1) infinite normal",
                bottom: small ? "-0":"-30px",
                height: small ? "0":"5px",
                borderRadius: "50%",
                backgroundColor:theme.palette.mode == "dark" ?  "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"

            },
            "@keyframes spinner": {
                "0%": {
                    borderRadius: theme.shape.borderRadius /2,
                },
                "50%": {
                    borderRadius: "50%",
                    transform: "scale(0.5) rotate(360deg)"
                },
                "100%": {
                    borderRadius: theme.shape.borderRadius /2,
                    transform: "scale(1) rotate(720deg)"
                }
            },
            "@keyframes shadow": {
                "50%": {
                    transform: "scale(0.5)",
                    backgroundColor: "rgba(255, 255, 255, 0.1)"
                },
            },
        })
    );
    return (
        <Box>
            <StyledLoader />
        </Box>
    )
}

export default Loader