import {
  Grid,
  Paper,
  Typography,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import useAnalyzeAndPredict from "../utils/functions/AnalyzeAndPredict";
import InfoIcon from "@mui/icons-material/Info";

export const PredictionDisplay = () => {
  const { probabilities } = useAnalyzeAndPredict();

  if (!probabilities) {
    return null;
  }

  return (
    <Box sx={{ marginBottom: "32px" }}>
      <Typography
        variant="h6"
        align="center"
        sx={{ color: "#ABAFB7", marginBottom: 4 }}
      >
        Prediction Probabilities
        <Tooltip title="This shows the predicted probabilities for the next roll.">
          <IconButton sx={{ color: "#ABAFB7", marginLeft: 1 }}>
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </Typography>
      <Grid
        container
        wrap="nowrap"
        alignItems="center"
        className=" flex justify-center items-center gap-8"
      >
        <Grid item alignItems="center" id="teste">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Paper
              elevation={3}
              sx={{
                padding: 1,
                backgroundColor: "#FFFFFF",
                color: "#000000",
                textAlign: "center",
                fontSize: "0.75rem",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="body2">White</Typography>
              <Typography variant="button">
                {probabilities.white.toFixed(2)}%
              </Typography>
            </Paper>
          </motion.div>
        </Grid>
        <Grid item>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Paper
              elevation={3}
              sx={{
                padding: 1,
                backgroundColor: "#252F38",
                color: "#FFFFFF",
                textAlign: "center",
                fontSize: "0.75rem",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="body2">Black</Typography>
              <Typography variant="button">
                {probabilities.black.toFixed(2)}%
              </Typography>
            </Paper>
          </motion.div>
        </Grid>
        <Grid item>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Paper
              elevation={3}
              sx={{
                padding: 1,
                backgroundColor: "#F12C4C",
                color: "#FFFFFF",
                textAlign: "center",
                fontSize: "0.75rem",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="body2">Red</Typography>
              <Typography variant="button">
                {probabilities.red.toFixed(2)}%
              </Typography>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};
