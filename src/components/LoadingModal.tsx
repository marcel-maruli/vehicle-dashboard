import { LoadingSpinner } from "./LoadingSpinner";

const LoadingModal = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="rounded-lg bg-white p-6 shadow-lg flex flex-col justify-center items-center">
        <LoadingSpinner isOpen={isLoading} />
        <p className="mt-4 text-center text-gray-700">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default LoadingModal;
