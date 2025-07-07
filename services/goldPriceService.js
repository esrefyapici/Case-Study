import axios from "axios";

export const getGoldPrice = async () => {
  try {
    const response = await axios.get("https://www.goldapi.io/api/XAU/USD", {
      headers: {
        "x-access-token": process.env.GOLD_API_KEY,
        "Content-Type": "application/json",
      },
    });

    const ouncePrice = response.data.price;
    const gramPrice = ouncePrice / 31.1035;
    return Number(gramPrice.toFixed(2));
  } catch (err) {
    console.error("Could not get gold price, returning default value.");
    return 1; // fallback
  }
};
