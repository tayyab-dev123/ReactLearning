import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { Product } from "./pages/Product";
import { Pricing } from "./pages/Pricing";
import { AppLayout } from "./pages/AppLayout";
import { PageNotFound } from "./pages/PageNotFound";
import { Login } from "./components/Login";
import { CityList } from "./components/CityList";
import { CountryList } from "./components/CountryList";
import { useEffect, useState } from "react";
import City from "../starter/components/City";
import Form from "./components/Form";

const BASE_URL = "http://localhost:9000";

export default function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate to="cities" replace={true} />} />
            <Route
              path="cities"
              element={<CityList isLoading={isLoading} cities={cities} />}
            />
            <Route path="cities/:id" element={<City />} />
            <Route
              path="countries"
              element={<CountryList isLoading={isLoading} cities={cities} />}
            />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
