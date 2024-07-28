import { TextField, Button } from "@mui/material";
import { motion } from "framer-motion";

export const Login = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center h-screen bg-[#0F1923]"
    >
      <div className="w-full max-w-md p-8 space-y-8 bg-[#1A242D] rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <h2 className="text-lg text-[#ABAFB7]">Login</h2>
        </div>
        <form className="space-y-6">
          <TextField
            fullWidth
            label="Email"
            variant="filled"
            InputLabelProps={{
              style: { color: "#ABAFB7" },
            }}
            InputProps={{
              style: { color: "#ABAFB7" },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="filled"
            InputLabelProps={{
              style: { color: "#ABAFB7" },
            }}
            InputProps={{
              style: { color: "#ABAFB7" },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: "#A81E35", color: "#ABAFB7" }}
          >
            Sign In
          </Button>
        </form>
      </div>
    </motion.div>
  );
};
