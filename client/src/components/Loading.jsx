export default function Loading({ type = "fullscreen", text = "Loading..." }) {
  if (type === "fullscreen") {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100 bg-opacity-75 transition-opacity duration-300 z-50">
        <div className="flex items-center justify-center h-screen w-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (type === "card") {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow border border-gray-200 transition-colors duration-200">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        {text && (
          <p className="mt-4 text-gray-600 transition-colors duration-200">
            {text}
          </p>
        )}
      </div>
    );
  }

  return null;
}
