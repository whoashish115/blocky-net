import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Link from "next/link"

const InternalServerError = () => {
  return (
      <Box width={"100%"} minHeight={"100vh"} display='flex' justifyContent="center" alignItems="center">
      <Box  m={2}>
      <Paper sx={{ p: { xs: 1.5, md: 2.5 }, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",maxWidth:1000,padding:3 }} >
          <Typography variant="h5" textAlign="center" gutterBottom>
          500 | Internal Server Error
          </Typography>
          <Link href="/">
            <Button variant="contained">Go Back to Home Page</Button>
          </Link>
        </Paper>
      </Box>
    </Box>
  )
}

export default InternalServerError