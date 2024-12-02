"use server"
import connection from '@/utils/db';

export async function fetchMemoryProducts(filters) {
  const { type, priceRange } = filters;
  let priceCondition = "";

  if (priceRange) {
    const [minPrice, maxPrice] = priceRange.split
  }
}