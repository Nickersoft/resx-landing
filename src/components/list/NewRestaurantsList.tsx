import { useState, useEffect } from "react";
import { StaticListViewer } from "./StaticListViewer";

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

interface NewRestaurantsListProps {
  restaurants: Restaurant[];
}

export function NewRestaurantsList({ restaurants }: NewRestaurantsListProps) {
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
    // Listen for city changes from the selector
    const handleCityChange = (event: CustomEvent) => {
      setSelectedCity(event.detail);
    };

    window.addEventListener("cityChange", handleCityChange as EventListener);

    return () => {
      window.removeEventListener(
        "cityChange",
        handleCityChange as EventListener,
      );
    };
  }, []);

  return (
    <StaticListViewer restaurants={restaurants} selectedCityId={selectedCity} />
  );
}
