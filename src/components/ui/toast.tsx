'use client';

import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
  ReactNode,
} from 'react';

type ToastType = 'success' | 'error' | 'warning';

type ToastState = { id: string; type: ToastType; message: string };

type ToastContextType = (type: ToastType, message: string) => void;

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const SuccessIcon = () => (
  <svg
    className="w-6 h-6 text-green-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);
const ErrorIcon = () => (
  <svg
    className="w-6 h-6 text-red-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);
const WarningIcon = () => (
  <svg
    className="w-6 h-6 text-yellow-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    ></path>
  </svg>
);
const CloseIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    ></path>
  </svg>
);

const toastConfig = {
  success: { icon: <SuccessIcon />, barClass: 'bg-success' },
  error: { icon: <ErrorIcon />, barClass: 'bg-error' },
  warning: { icon: <WarningIcon />, barClass: 'bg-warnig' },
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
    <div className="relative w-full max-w-sm bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden my-2 animate-fade-in-right">
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">{config.icon}</div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900">{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={onClose}
              className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="sr-only">Close</span>
              <CloseIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-1 bg-gray-200 w-full">
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
      <div className="fixed top-5 right-5 z-50 w-full max-w-sm">
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
