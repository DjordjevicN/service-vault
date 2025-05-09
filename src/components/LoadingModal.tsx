import { motion } from "framer-motion";

type LoadingModalProps = {
  show: boolean;
};

const LoadingModal = ({ show }: LoadingModalProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-80">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-gray-900 text-white p-6 rounded-2xl flex flex-col items-center gap-4 shadow-xl"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-t-transparent border-white rounded-full"
        />
        <p className="text-sm text-gray-300">Loading, please wait...</p>
      </motion.div>
    </div>
  );
};

export default LoadingModal;
