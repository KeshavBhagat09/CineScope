import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Logo from '../assets/Logo.png'; // Make sure this path is correct

const Loader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust this time as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: loading ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950"
    >
      <motion.div
        initial={{ scale: 5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <motion.img
          src={Logo}
          alt="CineScope Logo"
          className="w-64 h-auto" // Adjust size as needed
        />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-4 text-white text-3xl font-bold tracking-widest"
        >
           {/* Adjust text as needed */}
        </motion.h1>
      </motion.div>
    </motion.div>
  );
};

export default Loader;
