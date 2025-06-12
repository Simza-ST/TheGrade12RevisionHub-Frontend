const LoadingSpinner = () => (
    <>
        <div className="flex min-h-screen bg-gradient-to-br from-teal-900 via-gray-900 to-red-900 justify-center items-center">
            <div className="custom-spin rounded-full h-[3rem] w-[3rem] border-t-2 border-b-2 border-teal-400"></div>
        </div>
    </>
);
export default LoadingSpinner;