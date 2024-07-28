import { Typography, IconButton, Box } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#0F1923",
        color: "#ABAFB7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="body2" sx={{ mx: 2 }}>
        © 2024 TipMaster. All rights reserved.
      </Typography>
      <IconButton
        className="h-[10px]"
        color="inherit"
        aria-label="twitter"
        href="https://twitter.com"
      >
        <TwitterIcon />
      </IconButton>
      <IconButton
        className="h-[10px]"
        color="inherit"
        aria-label="facebook"
        href="https://facebook.com"
      >
        <FacebookIcon />
      </IconButton>
      <IconButton
        className="h-[10px]"
        color="inherit"
        aria-label="instagram"
        href="https://instagram.com"
      >
        <InstagramIcon />
      </IconButton>
      <IconButton
        className="h-[10px]"
        color="inherit"
        aria-label="linkedin"
        href="https://linkedin.com"
      >
        <LinkedInIcon />
      </IconButton>
    </Box>
  );
};
