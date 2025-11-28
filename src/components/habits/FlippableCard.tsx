import React from "react";
import { motion } from "framer-motion";

interface Props {
  flipped: boolean;
  front: React.ReactNode;
  back: React.ReactNode;
}

export default function FlippableCard({ flipped, front, back }: Props) {
  return (
    <div className="relative w-full h-full perspective">
      <motion.div
        className="relative w-full h-full preserve-3d lg:w-[135%]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: "easeInOut" }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden">{front}</div>

        {/* Back Side */}
        <div className="absolute inset-0 rotate-y-180 backface-hidden">
          {back}
        </div>
      </motion.div>
    </div>
  );
}
