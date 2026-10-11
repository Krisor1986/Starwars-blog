import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { EntityDetails } from "../components/EntityDetails";
import { getEntityImage } from "../utils/getEntityImage";

const isResourceUrl = (value) =>
  typeof value === "string" &&
  /^https:\/\/(?:www\.)?swapi\.tech\/api\/[a-z]+\/\d+\/?$/.test(value);

const resolveName = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Could not load related resource");
    }

    const data = await response.json();
    const properties = data.result?.properties;

    return properties?.name || properties?.title || "Not available";
  } catch {
    return "Not available";
  }
};

export const Single = () => {
  const { category, uid } = useParams();
  const [item, setItem] = useState(null);
  const [properties, setProperties] = useState({});
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;

    setItem(null);
    setProperties({});
    setError("");

    const loadDetails = async () => {
      try {
        if (
          !["people", "planets", "vehicles"].includes(category) ||
          !/^\d+$/.test(uid)
        ) {
          throw new Error("Invalid resource");
        }

        const response = await fetch(
          `https://www.swapi.tech/api/${category}/${uid}`,
        );

        if (!response.ok) {
          throw new Error("Could not load details");
        }

        const data = await response.json();
        const record = data.result;

        if (!record?.properties) {
          throw new Error("Resource not found");
        }

        if (!active) return;

        const initialProperties = Object.fromEntries(
          Object.entries(record.properties).map(([field, value]) => [
            field,
            Array.isArray(value) || isResourceUrl(value)
              ? "Loading related information…"
              : value,
          ]),
        );

        setProperties(initialProperties);
        setItem({ ...record, uid: String(uid) });

        await Promise.all(
          Object.entries(record.properties).map(async ([field, value]) => {
            if (["created", "edited", "url"].includes(field)) return;
            if (!Array.isArray(value) && !isResourceUrl(value)) return;

            let resolvedValue;

            if (Array.isArray(value)) {
              const names = await Promise.all(
                value.map((entry) =>
                  isResourceUrl(entry) ? resolveName(entry) : entry,
                ),
              );
              resolvedValue = names.length ? names.join(", ") : "No records";
            } else {
              resolvedValue = await resolveName(value);
            }

            if (active) {
              setProperties((previous) => ({
                ...previous,
                [field]: resolvedValue,
              }));
            }
          }),
        );
      } catch (error) {
        if (active) {
          setError(error.message);
        }
      }
    };

    loadDetails();

    return () => {
      active = false;
    };
  }, [category, uid]);
  if (error) {
    return (
      <main className="container py-4">
        <p className="alert alert-danger" role="alert">
          {error}
        </p>
        <Link to="/">Back home</Link>
      </main>
    );
  }

  if (!item) {
    return <p className="container py-4">Loading details…</p>;
  }

  return (
    <main className="container py-4">
      <Link to="/" className="btn btn-outline-light mb-4">
        Back home
      </Link>

      <EntityDetails
        item={item}
        category={category}
        properties={properties}
        imageUrl={getEntityImage(category, uid)}
      />
    </main>
  );
};
