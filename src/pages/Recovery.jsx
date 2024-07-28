import { TextField, Button, CircularProgress } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

export const Recovery = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateEmail(email)) {
      setLoading(true);
      setTimeout(() => {
        setEmailSent(true);
        setLoading(false);
      }, 3000);
    } else {
      toast.error("Please enter a valid email address.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center h-screen bg-[#0F1923]"
    >
      <AnimatePresence>
        {!emailSent && (
          <div className="w-full max-w-md p-8 space-y-8 bg-[#1A242D] rounded-lg shadow-lg">
            <motion.div
              key="form"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <div className="flex flex-col items-center">
                <h2 className="text-lg text-[#ABAFB7]">Recover Password</h2>
              </div>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="filled"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} style={{ color: "#ABAFB7" }} />
                  ) : (
                    "Send Recovery Email"
                  )}
                </Button>
              </form>
            </motion.div>{" "}
          </div>
        )}
        {emailSent && (
          <div className="w-full max-w-md p-8 space-y-8 bg-[#1A242D] rounded-lg shadow-lg">
            <motion.div
              key="confirmation"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 0.3,
              }}
            >
              <div className="flex flex-col items-center">
                <h2 className="text-lg text-[#ABAFB7]">Check Your Email</h2>
                <p className="text-[#ABAFB7]">
                  We have sent an email with instructions to reset your
                  password. Please check your inbox.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
