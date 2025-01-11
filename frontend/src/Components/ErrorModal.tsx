import { useSelector, useDispatch } from "react-redux";
import { hideModal } from "../store/modalSlice";
import { RootState } from "../store";

const ErrorModal = () => {
  const dispatch = useDispatch();
  const { isOpen, error } = useSelector((state: RootState) => state.modal);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 
        animate-[fadeIn_0.2s_ease-out]"
      onClick={() => dispatch(hideModal())}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md relative 
          animate-[slideIn_0.3s_ease-out_forwards] opacity-0 scale-95
          transform transition-all duration-200 hover:scale-[1.02]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Content Container */}
        <div className="flex flex-col items-center text-center">
          {/* Modal Header */}
          <div className="w-full p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-red-600">Error</h3>
          </div>

          {/* Modal Body */}
          <div className="w-full p-8">
            <p className="text-gray-700 text-lg">
              {error?.message || "An unexpected error occurred"}
            </p>
          </div>

          {/* Modal Footer */}
          <div className="w-full p-6 border-t border-gray-200">
            <button
              onClick={() => dispatch(hideModal())}
              className="px-6 py-2.5 bg-red-600 text-white rounded-lg
                hover:bg-red-700 active:bg-red-800
                transform transition-all duration-200
                hover:shadow-lg active:scale-95
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Okay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
