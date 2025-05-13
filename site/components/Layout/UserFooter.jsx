import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import { alpha } from '@mui/material/styles'

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookOutlined from "@mui/icons-material/FacebookOutlined"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

const UserFooter = () => {
  return (
    <Paper sx={{ borderRadius: 0 }}>
      <Box component="footer" sx={{ p: 3, bottom: 0 }}>
        <Grid container spacing={4}>

          <Grid item xs={12}>
            <Grid container spacing={1.5}>

              <Grid item xs={12} sm={6} md={3} sx={{ textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>BLOG</Typography>
                <Typography variant="body2" color="text.secondary" sx={{textTransform:"capitalize"}}>An open platform where readers find dynamic thinking, and where expert and undiscovered voices can share their writing on Crypto Related topic.</Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={3} sx={{ textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>Quick Links</Typography>
                <Typography variant="body2">About Us</Typography>
                <Typography variant="body2">Terms And Conditions</Typography>
                <Typography variant="body2">Cookies Policy</Typography>
                <Typography variant="body2">DMCA</Typography>
                <Typography variant="body2">Privacy Policy</Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={3} sx={{ textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>Help And Feedback</Typography>
                <Typography variant="body2">Need Help ?</Typography>
                <Typography variant="body2">Contact Us</Typography>
                <Typography variant="body2">Support</Typography>
                <Typography variant="body2">Feedback</Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={3} sx={{ textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom sx={{pb:1}}>Follow Us On</Typography>
                <Box display="flex" justifyContent="center" alignItems={"center"} flexWrap="wrap">
                  <IconButton sx={{ color:"#fff", borderRadius: "8px !important", mr: 1, flex: "20%", background: alpha("#547dd1", 0.85), ["&:hover"]: { transition:"0.5s",background: "#547dd1" } }}><FacebookOutlined /></IconButton>
                  <IconButton sx={{ color:"#fff", borderRadius: "8px !important", mr: 1, flex: "20%", background: "linear-gradient(45deg, rgba(240, 148, 51, 0.85) 0%,rgba(230, 104, 60, 0.85) 25%, rgba(220, 39, 67, 0.85) 50%,rgba(204, 35, 102, 0.85) 75%, rgba(188, 24, 136, 0.85) 100%); ", ["&:hover"]: { transition:"0.5s",background: "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); " } }}><InstagramIcon /></IconButton>
                  <IconButton sx={{ color:"#fff", borderRadius: "8px !important", mr: 1, flex: "20%", background: alpha("#ff3333", 0.85), ["&:hover"]: { transition:"0.5s",background: "#ff3333" } }}><YouTubeIcon /></IconButton>
                  <IconButton sx={{ color:"#fff", borderRadius: "8px !important", mr: 1, flex: "20%", background: alpha("#0077b5", 0.85), ["&:hover"]: { transition:"0.5s",background: "#0077b5" } }}><LinkedInIcon /></IconButton>
                </Box>
              </Grid>

            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="overline" align="center" color="text.secondary" component="p">
              Copyright © 2022 Blocky Net | Created By Ashish Kumar | All Right Reserved
            </Typography>
          </Grid>

        </Grid>
      </Box>
    </Paper>
  )
}

export default UserFooter