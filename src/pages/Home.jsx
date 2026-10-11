import { useEffect, useState } from "react";
import { StarWarsCard } from "../components/StarWarsCard";
import { getEntityImage } from "../utils/getEntityImage";
import useGlobalReducer from "../hooks/useGlobalReducer";

const categories = [
  { key: "people", title: "Characters" },
  { key: "planets", title: "Planets" },
  { key: "vehicles", title: "Vehicles" },
];

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadCategory = async (category) => {
      try {
        const response = await fetch(
          `https://www.swapi.tech/api/${category}?page=1&limit=10&expanded=true`,
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        dispatch({
          type: `set_${category}`,
          payload: data.results,
        });
      } catch (error) {
        console.error(error);

        setErrors((previous) => ({
          ...previous,
          [category]: "Could not load this list.",
        }));
      }
    };

    Promise.all(categories.map(({ key }) => loadCategory(key))).finally(() =>
      setLoading(false),
    );
  }, [dispatch]);
  return (
    <main className="container py-4">
      <h1 className="mb-4">Star Wars Blog</h1>

      {categories.map(({ key, title }) => (
        <section className="mb-5" key={key}>
          <h2 className="text-danger mb-3">{title}</h2>

          {errors[key] ? (
            <p className="alert alert-danger" role="alert">
              {errors[key]}
            </p>
          ) : loading ? (
            <p>Loading…</p>
          ) : (
            <div className="row g-3">
              {store[key].map((item) => (
                <div className="col-12 col-md-6 col-lg-4" key={item.uid}>
                  <StarWarsCard
                    item={item}
                    category={key}
                    imageUrl={getEntityImage(key, item.uid)}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </main>
  );
};
