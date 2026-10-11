const imageBaseUrl =
  "https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images";

export const getEntityImage = (category, uid) =>
  ["people", "planets", "vehicles"].includes(category) && /^\d+$/.test(String(uid))
    ? `${imageBaseUrl}/${category}/${uid}.jpg`
    : undefined;
