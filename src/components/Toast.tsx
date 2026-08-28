import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Sparkles, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 max-w-sm p-4 rounded-2xl clay-card-yellow border-2 border-white shadow-2xl flex items-center justify-between gap-3 text-left"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-[#2ea06c] text-white flex items-center justify-center shrink-0 text-xs shadow-sm">
            <Check className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-[#111d23] leading-snug">{message}</span>
        </div>
        <button
          onClick={onDismiss}
          className="text-[#8d7169] hover:text-[#111d23] p-1 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
