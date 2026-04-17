// ============================================================
//  src/services/mandiService.js
//  Enriches Gemini crop recommendations with mandi price data.
// ============================================================
import  {getPriceForCrop}  from '../config/mandiPrices.js';

/**
 * Adds mandiPrice field to each crop in the topCrops array.
 * @param {object[]} topCrops
 * @returns {object[]}
 */
export function enrichWithMandiPrices(topCrops = []) {
  return topCrops.map(crop => ({
    ...crop,
    mandiPrice: getPriceForCrop(crop.mandiCropKey || crop.name),
  }));
}


