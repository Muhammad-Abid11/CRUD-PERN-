import { useEffect } from "react";
import {
  FiCheckCircle,
  FiXCircle,
  FiAlertTriangle,
  FiInfo,
  FiX,
} from "react-icons/fi";

const styles = {
  success: {
    bg: "bg-green-100",
    border: "border-green-300",
    text: "text-green-800",
    icon: <FiCheckCircle className="text-green-600" size={20} />,
  },
  error: {
    bg: "bg-red-100",
    border: "border-red-300",
    text: "text-red-800",
    icon: <FiXCircle className="text-red-600" size={20} />,
  },
  warning: {
    bg: "bg-yellow-100",
    border: "border-yellow-300",
    text: "text-yellow-800",
    icon: <FiAlertTriangle className="text-yellow-600" size={20} />,
  },
  info: {
    bg: "bg-blue-100",
    border: "border-blue-300",
    text: "text-blue-800",
    icon: <FiInfo className="text-blue-600" size={20} />,
  },
};

export default function Notification({
  type = "success",
  message = "",
  onClose = () => {},
  autoHide = true,
  duration = 3000,
}) {
  const style = styles[type];

  // Auto-hide logic
  useEffect(() => {
    if (!autoHide) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [autoHide, duration, onClose]);

  return (
    <div
      className={`${style.bg} ${style.border} ${style.text} 
      fixed top-5 right-5 z-50 border rounded-lg shadow-lg px-4 py-3 
      flex items-center gap-3 animate-fadeIn`}
    >
      {style.icon}

      <p className="font-medium">{message}</p>

      <button
        onClick={onClose}
        className="ml-2 text-gray-500 hover:text-gray-700"
      >
        <FiX size={18} />
      </button>
    </div>
  );
}
