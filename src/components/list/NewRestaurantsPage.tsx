import { useState, useEffect } from "react";

interface Restaurant {
  id: number;
  aliasId: string;
  name: string;
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

interface NewRestaurantsCitySelectorProps {
  restaurants: Restaurant[];
}

export function NewRestaurantsCitySelector({
  restaurants,
}: NewRestaurantsCitySelectorProps) {
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

  // Read initial city from localStorage or use first city
  const getInitialCity = () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("new-restaurants-city");
      if (stored) {
        const cityId = parseInt(stored);
        if (cities.find((c) => c.id === cityId)) {
          return cityId;
        }
      }
    }
    return cities.length > 0 ? cities[0].id : null;
  };

  const [selectedCity, setSelectedCity] = useState<number | null>(
    getInitialCity,
  );

  useEffect(() => {
    if (selectedCity !== null) {
      localStorage.setItem("new-restaurants-city", selectedCity.toString());
      // Dispatch custom event to notify other components
      window.dispatchEvent(
        new CustomEvent("cityChange", { detail: selectedCity }),
      );
    }
  }, [selectedCity]);

  return (
    <div className="flex items-center justify-center gap-6 pt-6">
      {cities.map((city, index) => (
        <div key={city.id} className="flex items-center gap-6">
          <button
            onClick={() => setSelectedCity(city.id)}
            className={`text-2xl leading-[120%] font-normal tracking-[-0.5px] transition-colors ${
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
  );
}
