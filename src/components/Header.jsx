/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Badge from "@mui/material/Badge";
import fireBadge from "../assets/fire.gif";
import { styled } from "@mui/material/styles";

const FireBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "transparent",
    color: "#F12C4C",
  },
}));

export const Header = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();

  const menuItems = [
    {
      id: "blaze",
      label: "Blaze",
      subItems: [
        { name: "Double", route: "/blaze/double" },
        { name: "Crash", route: "/blaze/crash" },
        { name: "Slide", route: "/blaze/slide" },
        { name: "Crash2", route: "/blaze/crash2" },
        { name: "Fortune Double", route: "/blaze/fortune-double" },
      ],
    },
    {
      id: "jonbet",
      label: "Jonbet",
      subItems: [
        { name: "Double", route: "/jonbet/double" },
        { name: "Crash", route: "/jonbet/crash" },
        { name: "Fortune Double", route: "/jonbet/fortune-double" },
        { name: "Crash2", route: "/jonbet/crash2" },
        { name: "Slide", route: "/jonbet/slide" },
      ],
    },
    {
      id: "stake",
      label: "Stake",
      subItems: [
        { name: "Crash", route: "/stake/crash" },
        { name: "Slide", route: "/stake/slide" },
      ],
    },
    {
      id: "more-platforms",
      label: "More Platforms",
      subItems: [
        {
          name: "Brabet",
          games: [
            { name: "Crash", route: "/more-platforms/brabet/crash" },
            { name: "Double", route: "/more-platforms/brabet/double" },
          ],
        },
        {
          name: "Smash",
          games: [
            { name: "Crash", route: "/more-platforms/smash/crash" },
            { name: "Double", route: "/more-platforms/smash/double" },
          ],
        },
        {
          name: "6k",
          games: [
            { name: "Crash", route: "/more-platforms/6k/crash" },
            { name: "Double", route: "/more-platforms/6k/double" },
          ],
        },
        {
          name: "AggBet",
          games: [
            { name: "Crash", route: "/more-platforms/aggBet/crash" },
            { name: "Double", route: "/more-platforms/aggBet/double" },
          ],
        },
        {
          name: "Betnacional",
          games: [
            { name: "Aviator", route: "/more-platforms/betnacional/aviator" },
          ],
        },
        {
          name: "Gabe",
          games: [
            { name: "Crash", route: "/more-platforms/gabe/crash" },
            { name: "Double", route: "/more-platforms/gabe/double" },
          ],
        },
        {
          name: "Bc.game",
          games: [{ name: "Crash", route: "/more-platforms/bcgame/crash" }],
        },
        {
          name: "Betfair",
          games: [
            { name: "Aviator", route: "/more-platforms/betfair/aviator" },
            { name: "Spaceman", route: "/more-platforms/betfair/spaceman" },
          ],
        },
        {
          name: "Betfiery",
          games: [
            { name: "Crash", route: "/more-platforms/betfiery/crash" },
            { name: "Double", route: "/more-platforms/betfiery/double" },
          ],
        },
        {
          name: "Winmi",
          games: [
            { name: "Crash", route: "/more-platforms/winmi/crash" },
            { name: "Double", route: "/more-platforms/winmi/double" },
          ],
        },
        {
          name: "813bet",
          games: [
            { name: "Crash", route: "/more-platforms/813bet/crash" },
            { name: "Double", route: "/more-platforms/813bet/double" },
          ],
        },
        {
          name: "Estrelabet",
          games: [
            { name: "Spaceman", route: "/more-platforms/estrelabet/spaceman" },
            { name: "Stelar", route: "/more-platforms/estrelabet/stelar" },
            { name: "Aviator", route: "/more-platforms/estrelabet/aviator" },
          ],
        },
        {
          name: "Betbry",
          games: [
            { name: "Crash", route: "/more-platforms/betbry/crash" },
            { name: "Double", route: "/more-platforms/betbry/double" },
          ],
        },
        {
          name: "Arbety",
          games: [
            { name: "Double", route: "/more-platforms/arbety/double" },
            { name: "Crash", route: "/more-platforms/arbety/crash" },
          ],
        },
        {
          name: "Chillbet",
          games: [
            { name: "Double", route: "/more-platforms/chillbet/double" },
            { name: "Crash", route: "/more-platforms/chillbet/crash" },
          ],
        },
      ],
    },
    {
      id: "plans",
      label: "Plans",
      subItems: [
        { name: "Basic", route: "/plans/basic" },
        { name: "Premium", route: "/plans/premium" },
        { name: "Enterprise", route: "/plans/enterprise" },
      ],
    },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setActiveMenu(null);
  };

  return (
    <div className="relative bg-[#0F1923] w-full text-[#ABAFB7]">
      <nav className="w-full flex justify-between items-center p-4">
        <div className="text-2xl font-bold">TipMaster</div>
        <div className="flex space-x-4">
          {menuItems.map((item) => {
            const badgeContent =
              item.id === "blaze" ||
              item.id === "jonbet" ||
              item.id === "stake" ? (
                <FireBadge
                  badgeContent={
                    <img
                      src={fireBadge}
                      style={{
                        height: "28px",
                        filter:
                          "brightness(0) saturate(100%) invert(25%) sepia(44%) saturate(4562%) hue-rotate(335deg)  brightness(98%) contrast(93%)",
                      }}
                    />
                  }
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <button className="px-4 py-2 bg-[#1A242D] rounded flex items-center hover:scale-105 transition-transform ease-in-out duration-300">
                    {item.label}
                    <KeyboardArrowDownIcon />
                  </button>
                </FireBadge>
              ) : item.id === "plans" ? (
                <Badge
                  variant="dot"
                  overlap="rectangular"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  classes={{ badge: "animate-pulse bg-red-500" }}
                >
                  <button className="px-4 py-2 bg-[#1A242D] rounded flex items-center hover:scale-105 transition-transform ease-in-out duration-300">
                    {item.label}
                    <KeyboardArrowDownIcon />
                  </button>
                </Badge>
              ) : (
                <button className="px-4 py-2 bg-[#1A242D] rounded flex items-center hover:scale-105 transition-transform ease-in-out duration-300">
                  {item.label}
                  <KeyboardArrowDownIcon />
                </button>
              );

            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveMenu(item.id)}
                onMouseLeave={() => setActiveMenu(null)}
                className="relative group"
              >
                {badgeContent}
                <AnimatePresence>
                  {activeMenu === item.id && (
                    <motion.div
                      className={`absolute top-full right-[0px] transform mt-2 bg-[#1A242D] rounded shadow-lg z-10 p-4 min-w-max ${
                        item.id === "more-platforms"
                          ? "grid grid-cols-5 gap-4"
                          : "grid grid-cols-1"
                      }`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.subItems.map((subItem, index) => {
                        if (subItem.route) {
                          return (
                            <button
                              key={index}
                              onClick={() => handleNavigate(subItem.route)}
                              className="block w-full px-4 py-2 text-left hover:bg-[#2D3A45]"
                            >
                              {subItem.name}
                            </button>
                          );
                        } else {
                          return (
                            <div key={index}>
                              <div className="font-bold px-4 py-2">
                                {subItem.name}
                              </div>
                              {subItem.games.map((game, gameIndex) => (
                                <button
                                  key={gameIndex}
                                  onClick={() => handleNavigate(game.route)}
                                  className="block w-full px-4 py-2 text-left hover:bg-[#2D3A45]"
                                >
                                  {game.name}
                                </button>
                              ))}
                            </div>
                          );
                        }
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        <div className="flex space-x-4">
          <button
            className="px-4 py-2 bg-[#1A242D] rounded hover:scale-105 transition-transform ease-in-out duration-300"
            onClick={() => handleNavigate("/signup")}
          >
            Sign Up
          </button>
          <button
            className="px-4 py-2 bg-[#1A242D] rounded hover:scale-105 transition-transform ease-in-out duration-300"
            onClick={() => handleNavigate("/login")}
          >
            Log In
          </button>
        </div>
      </nav>
    </div>
  );
};
