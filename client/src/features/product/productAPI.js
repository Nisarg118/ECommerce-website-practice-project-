export async function fetchAllProducts() {
  try {
    const response = await fetch("http://localhost:3000/products");
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export function fetchProductsByFilters(filter) {
  // filter = {"category":"smartphone"}
  // TODO : on server we will support multi values
  let queryString = "";
  for (let key in filter) {
    queryString += `${key}=${filter[key]}&`;
  }
  console.log("qureyString", queryString);
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch(
      "http://localhost:3000/products?" + queryString
    );
    const data = await response.json();
    resolve({ data });
  });
}
