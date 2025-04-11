const ShimmerCard = () => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg animate-pulse">
      {/* Image placeholder */}
      <div className="bg-gray-200 h-48 w-full"></div>

      {/* Content placeholders */}
      <div className="p-4">
        {/* Title placeholder */}
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>

        {/* Description placeholder */}
        <div className="space-y-3">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        </div>

        {/* Date/time placeholder */}
        <div className="mt-4 space-y-2">
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerCard;
