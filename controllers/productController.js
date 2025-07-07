import fs from "fs";
import { calculatePrice } from "../utils/calculatePrice.js";
import { getGoldPrice } from "../services/goldPriceService.js";

export const getProducts = async (req, res) => {
  try {
    const rawData = fs.readFileSync("./data/products.json");
    const products = JSON.parse(rawData);
    const goldPrice = await getGoldPrice();

    const { minPrice, maxPrice, minPopularity, maxPopularity } = req.query;

    let updatedProducts = products.map((product) => {
      const price = calculatePrice(product, goldPrice);
      return {
        ...product,
        price: parseFloat(price.toFixed(2)),
        popularityScoreOutOf5: parseFloat(
          (product.popularityScore / 20).toFixed(1)
        ),
      };
    });

    if (minPrice) {
      updatedProducts = updatedProducts.filter(
        (p) => p.price >= parseFloat(minPrice)
      );
    }

    if (maxPrice) {
      updatedProducts = updatedProducts.filter(
        (p) => p.price <= parseFloat(maxPrice)
      );
    }

    if (minPopularity) {
      updatedProducts = updatedProducts.filter(
        (p) => p.popularityScore >= parseFloat(minPopularity / 5)
      );
    }

    if (maxPopularity) {
      updatedProducts = updatedProducts.filter(
        (p) => p.popularityScore <= parseFloat(maxPopularity / 5)
      );
    }

    res.status(200).json(updatedProducts);
  } catch (error) {
    console.error("Products could not be received:", error);
    res.status(500).json({ error: "Server Error" });
  }
};
