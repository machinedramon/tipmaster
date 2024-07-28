import { Grid, Paper, Box, Typography, CircularProgress } from "@mui/material";
import { useHistory } from "../context/HistoryContext";
import { motion } from "framer-motion";

export const Content = () => {
  const { records, loading } = useHistory();

  if (loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <CircularProgress />
      </Box>
    );
  }

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: (custom) => ({
      opacity: 1,
      transition: { delay: custom * 0.01 },
    }),
  };

  return (
    <Grid
      container
      sx={{ overflow: "auto", height: "100%", marginBottom: "8px" }}
    >
      {records.map((record, index) => {
        const date = new Date(record.created_at);
        const dateString = date.toLocaleDateString(); // 'MM/DD/YYYY'
        const timeString = date.toLocaleTimeString(); // 'HH:MM:SS AM/PM'

        return (
          <Grid
            item
            xs={12}
            sm={6}
            md={2}
            lg={1.5}
            xl={1.5}
            key={record.id}
            className="px-0 py-0"
            id="teste"
            style={{ padding: "0" }}
          >
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              custom={index}
              className="flex flex-col items-center justify-center"
            >
              <Paper
                elevation={3}
                sx={{
                  height: 80,
                  width: 80,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor:
                    record.color === "white"
                      ? "#FFFFFF"
                      : record.color === "red"
                      ? "#F12C4C"
                      : "#252F38",
                  color: record.color === "white" ? "#000000" : "#FFFFFF",
                  borderRadius: "4px",
                }}
              >
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    border: `3px solid ${
                      record.color === "white" ? "#000000" : "#FFFFFF"
                    }`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "700", fontSize: "0.8rem" }}
                  >
                    {record.roll}
                  </Typography>
                </Box>
              </Paper>
              <Typography
                variant="caption"
                sx={{
                  fontSize: "0.65rem",
                  fontWeight: "700",
                  marginTop: "4px",
                  color: "#7f848c",
                }}
                className="flex flex-col items-center"
              >
                <span>{dateString}</span>
                <span>{timeString}</span>
              </Typography>
            </motion.div>
          </Grid>
        );
      })}
    </Grid>
  );
};
