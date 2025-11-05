import { useState, useEffect } from "react";

interface Restaurant {
  id: number;
  aliasId: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  imageUrl?: string | null;
  imageCaption?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  detail?: {
    logoUrl?: string;
    coverUrl?: string;
  };
  rating?: {
    rating: number;
  };
  location?: {
    address?: string;
    city?: {
      id: number;
      name: string;
    };
  };
  cuisineTypes?: string[];
}

interface StaticListViewerProps {
  restaurants: Restaurant[];
  showCityFilter?: boolean;
  selectedCityId?: number | null;
}

export function StaticListViewer({
  restaurants,
  showCityFilter = false,
  selectedCityId,
}: StaticListViewerProps) {
  // Get unique cities from restaurants
  const cities = Array.from(
    new Set(restaurants.map((r) => r.location?.city?.id).filter(Boolean)),
  )
    .map((cityId) => {
      const restaurant = restaurants.find(
        (r) => r.location?.city?.id === cityId,
      );
      return {
        id: cityId as number,
        name: restaurant?.location?.city?.name || "",
      };
    })
    .sort((a, b) => a.id - b.id);

  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [selectedCity, setSelectedCity] = useState<number | null>(
    cities.length > 0 ? cities[0].id : null,
  );

  const ITEMS_PER_PAGE = 9;

  // Use prop if provided, otherwise use internal state
  const activeCity =
    selectedCityId !== undefined ? selectedCityId : selectedCity;

  // Reset to page 1 when city changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCity]);

  // Filter restaurants by selected city
  const filteredRestaurants = activeCity
    ? restaurants.filter((r) => r.location?.city?.id === activeCity)
    : restaurants;

  // Pagination calculations
  const totalPages = Math.ceil(filteredRestaurants.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentRestaurants = filteredRestaurants.slice(startIndex, endIndex);

  const handleCityChange = (cityId: number | null) => {
    setSelectedCity(cityId);
    setCurrentPage(1); // Reset to first page when changing city
  };

  const changePage = (newPage: number, newDirection: "left" | "right") => {
    setDirection(newDirection);
    setIsAnimating(true);

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Wait for slide out animation to complete
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsAnimating(false);
    }, 500);
  };

  const handlePreviousPage = () => {
    const newPage = Math.max(currentPage - 1, 1);
    if (newPage !== currentPage) {
      changePage(newPage, "left");
    }
  };

  const handleNextPage = () => {
    const newPage = Math.min(currentPage + 1, totalPages);
    if (newPage !== currentPage) {
      changePage(newPage, "right");
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      const newDirection = page > currentPage ? "right" : "left";
      changePage(page, newDirection);
    }
  };

  if (restaurants.length === 0) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-8">
        <div className="flex max-w-md flex-col items-center gap-4 text-center">
          <h2 className="mb-2 text-2xl font-medium text-white">
            No Restaurants Yet
          </h2>
          <p className="text-base leading-relaxed text-white/60">
            No restaurants have been added to this list yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden px-4 pt-16 pb-32">
      {/* City Filter */}
      {showCityFilter && cities.length > 0 && (
        <div className="mb-16 flex items-center justify-center gap-6">
          {cities.map((city, index) => (
            <div key={city.id} className="flex items-center gap-6">
              <button
                onClick={() => handleCityChange(city.id)}
                className={`text-2xl leading-[1.2] tracking-[-0.5px] transition-colors ${
                  selectedCity === city.id
                    ? "text-[#fed9a1]"
                    : "text-white hover:text-white/80"
                }`}
                style={{ fontFamily: "Avenir, sans-serif" }}
              >
                {city.name}
              </button>
              {index < cities.length - 1 && (
                <span className="text-2xl text-white/50">•</span>
              )}
            </div>
          ))}
        </div>
      )}

      <div
        className={`mx-auto grid max-w-[1240px] grid-cols-1 gap-x-10 gap-y-1 transition-all duration-500 ease-in-out md:grid-cols-2 lg:grid-cols-3 ${
          isAnimating
            ? direction === "right"
              ? "-translate-x-12 opacity-0"
              : "translate-x-12 opacity-0"
            : "translate-x-0 opacity-100"
        }`}
      >
        {currentRestaurants.map((restaurant) => (
          <div
            key={restaurant.aliasId || restaurant.id}
            className="border-b border-[#282828] p-4"
          >
            <div className="flex items-center gap-4">
              {/* Restaurant Image */}
              <div className="h-[84px] w-[84px] flex-shrink-0 overflow-hidden rounded-lg bg-gray-800">
                {restaurant.detail?.logoUrl || restaurant.detail?.coverUrl ? (
                  <img
                    src={
                      restaurant.detail.logoUrl || restaurant.detail.coverUrl
                    }
                    alt={restaurant.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-700" />
                )}
              </div>

              {/* Restaurant Info */}
              <div className="flex min-w-0 flex-1 flex-col gap-[6px]">
                <h3 className="truncate text-base leading-4 font-[860] text-white">
                  {restaurant.name}
                </h3>

                {restaurant.location?.address && (
                  <p className="truncate text-xs leading-[18px] text-[#d1d1d1]">
                    {restaurant.location.address}
                  </p>
                )}

                <div className="flex items-start gap-1 text-xs leading-[18px] text-[#d1d1d1]">
                  {restaurant.rating?.rating && (
                    <>
                      <span>★ {restaurant.rating.rating.toFixed(1)}</span>
                      {restaurant.cuisineTypes &&
                        restaurant.cuisineTypes.length > 0 && (
                          <>
                            <span>•</span>
                            <span className="truncate">
                              {restaurant.cuisineTypes[0]}
                            </span>
                          </>
                        )}
                    </>
                  )}
                  {!restaurant.rating?.rating &&
                    restaurant.cuisineTypes &&
                    restaurant.cuisineTypes.length > 0 && (
                      <span className="truncate">
                        {restaurant.cuisineTypes[0]}
                      </span>
                    )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-16 flex items-center justify-center gap-4">
          {/* Previous Arrow */}
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="text-white/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Previous page"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`flex h-[32px] min-w-[32px] items-center justify-center rounded text-sm ${
                  currentPage === page
                    ? "font-medium text-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Next Arrow */}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="text-white/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Next page"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
