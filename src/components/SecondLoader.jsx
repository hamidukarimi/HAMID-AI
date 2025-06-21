import { motion } from "framer-motion";

const SecondLoader = () => {
  const text = "HAMID AI";

  return (
    <div className="second-loader bg-black flex justify-center items-center h-screen">
      <div className="flex space-x-1 text-white text-5xl font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>
        {text.split("").map((letter, index) => (
          <motion.span
            key={index}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default SecondLoader;