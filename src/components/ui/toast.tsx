'use client';

import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
  ReactNode,
} from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { FaCircleXmark, FaTriangleExclamation, FaX } from 'react-icons/fa6';

type ToastType = 'success' | 'error' | 'warning';

type ToastState = { id: string; type: ToastType; message: string };

type ToastContextType = (type: ToastType, message: string) => void;

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const SuccessIcon = () => <FaRegCheckCircle className="w-6 h-6 text-success" />;
const ErrorIcon = () => <FaCircleXmark className="w-6 h-6 text-danger" />;
const WarningIcon = () => <FaTriangleExclamation className="w-6 h-6 text-warning" />;
const CloseIcon = () => <FaX className="w-4 h-4" />;

const toastConfig = {
  success: { icon: <SuccessIcon />, barClass: 'bg-success' },
  error: { icon: <ErrorIcon />, barClass: 'bg-danger' },
  warning: { icon: <WarningIcon />, barClass: 'bg-warning' },
};

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [progress, setProgress] = useState(100);
  const DURATION = 3000;

  useEffect(() => {
    const autoCloseTimer = setTimeout(onClose, DURATION);
    const progressInterval = setInterval(() => {
      setProgress((prev) => prev - 100 / (DURATION / 100));
    }, 100);

    return () => {
      clearTimeout(autoCloseTimer);
      clearInterval(progressInterval);
    };
  }, [onClose]);

  const config = toastConfig[type] || toastConfig.success;

  return (
    <div className="toast">
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">{config.icon}</div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-text">{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={onClose}
              className="bg-background rounded-md inline-flex text-text focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
            >
              <span className="sr-only">Close</span>
              <CloseIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-1 bg-foreground/80 w-full">
        <div
          className={`h-full ${config.barClass}`}
          style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
        ></div>
      </div>
    </div>
  );
};

const ToastContext = createContext({} as ToastContextType);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = Date.now().toString();
    setToasts((prevToasts) => [...prevToasts, { id, type, message }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className="fixed top-16 md:top-12 right-2 z-50 w-[90%] md:w-full max-w-sm">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const addToast = useContext(ToastContext);
  if (addToast === null) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return addToast;
};
