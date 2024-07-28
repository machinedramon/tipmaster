import { useRollStatus } from "../context/RollStatusContext";
import { Paper, Box, Typography, Tooltip, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import InfoIcon from "@mui/icons-material/Info";

const getColor = (color) => {
  switch (color) {
    case 0:
      return "#FFFFFF";
    case 1:
      return "#F12C4C";
    case 2:
      return "#252F38";
    default:
      return "#1A242D";
  }
};

const textColor = (color) => {
  return color === 0 ? "#000000" : "#FFFFFF";
};

const getStatusMessage = (status) => {
  switch (status) {
    case "waiting":
      return "Aguardando a rodada";
    case "rolling":
      return "Resultado capturado";
    case "complete":
      return "Rodada finalizada";
    default:
      return "";
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "waiting":
      return "#F5F5F5";
    case "rolling":
      return "#FFA726";
    case "complete":
      return "#66BB6A";
    default:
      return "#1A242D";
  }
};

export const ChartRollStatus = () => {
  const { gameData } = useRollStatus();

  if (!gameData) {
    return <div>Loading...</div>;
  }

  return (
    <Box className="w-[260px] bg-[#1A242D] text-white rounded-lg flex gap-4 items-center">
      <Paper
        elevation={3}
        sx={{
          height: 50,
          width: 50,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "4px",
          overflow: "hidden",
          backgroundColor:
            gameData.status !== "waiting"
              ? getColor(gameData.color)
              : "transparent",
          transition: "background-color 0.5s ease",
        }}
        className={gameData.status === "waiting" ? "roll-animated" : ""}
      >
        <motion.div
          animate={{
            backgroundColor:
              gameData.status === "waiting"
                ? "transparent"
                : getColor(gameData.color),
          }}
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background-color 0.5s ease",
          }}
        >
          <motion.div
            className={
              gameData.status === "waiting" ? "animate-ping scale-50" : ""
            }
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              border: `3px solid ${textColor(gameData.color)}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.5s ease",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "700",
                fontSize: "0.8rem",
                color: textColor(gameData.color),
              }}
            >
              {gameData.roll}
            </Typography>
          </motion.div>
        </motion.div>
      </Paper>
      <div>
        <Typography
          variant="body1"
          className="text-xl font-bold flex items-center justify-start"
        >
          Live Roll Status
          <Tooltip title="This status indicates the live progress of the current roll, showing whether it's waiting, rolling, or complete.">
            <IconButton
              sx={{ color: "#ABAFB7", marginLeft: "0.2rem", padding: "0" }}
            >
              <InfoIcon className="scale-75" />
            </IconButton>
          </Tooltip>
        </Typography>
        <Box className="flex items-center mt-1">
          <motion.div
            className="animate-pulse inline-block w-2 h-2 mr-2 rounded-full"
            style={{ backgroundColor: getStatusColor(gameData.status) }}
          />
          <Typography
            variant="body2"
            sx={{ color: "#ABAFB7", whiteSpace: "none" }}
          >
            {getStatusMessage(gameData.status)}
          </Typography>
        </Box>
      </div>
    </Box>
  );
};
