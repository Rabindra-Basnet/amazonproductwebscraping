import config from "@/lib/config/config";
import axios from 'axios'
import * as cheerio from "cheerio";
import crypto from 'crypto'
import { extractPrice, extractCurrency, extractDescription } from "../utlis";


export async function scrapeAmazonProduct(url: string) {
    if (!url) return;

    // BrightData proxy configuration
  //    curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_fec09715-zone-web_unlock:sgm49auecruq -k "https://geo.brdtest.com/mygeo.json"
  // curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_17060bb1-zone-web_unlocker1:r51856ya7o0c -k "https://geo.brdtest.com/mygeo.json"
    
    const username = config.brightUsername;
    const password = config.brightPassword;

    const port = 22225;
    // const session_id = (1000000 * Math.random()) | 0 // this can be used as it can be predictible to hackers
    const session_id = crypto.randomBytes(16).toString('hex')
  console.log("Given value is session ID:", session_id)
  
  const options = {
      host: 'brd.superproxy.io',
      port,
      auth: {
          username: `${username}-session-${session_id}`,
          password: password
      },
      rejectUnauthorized: false
    }

  try {
      const response = await axios.get(url, options);
      console.log(response.data)
      // cheerio
    const $ = cheerio.load(response.data);

    const title = $("#productTitle").text().trim();

    const currentPrice = extractPrice(
      $('.priceToPay span.a-price-whole'),
      $('a.size.base.a-color-price'),
      $('.a-button-selected .a-color-base'),
      $('span.a-price.a-text-price.a-size-medium.apexPriceToPay span.a-offscreen')
    );

    const originalPrice = extractPrice(
      $('#priceblock_ourprice'),
      $('#priceblock_dealprice'),
      // $('.a-price.a-text-price span.a-offscreen'),
      $('#listPrice'),
      $('span.a-price.a-text-price > span.a-offscreen').first(),
    );
      
    const outOfStock = $('#availability > span.a-size-base.a-color-price.a-text-bold').text().trim().toLowerCase() === "currently unavailable";
    
    const images = $('#imgTagWrapperId').attr('data-a-dynamic-image') ||
      $('#landingImage').attr('data-a-dynamic-image') || '{}'
    const imageUrls = Object.keys(JSON.parse(images))
    
    const currency = extractCurrency(
      $('.a-price-symbol')
    );
    
    const discountRate = $('span.savingsPercentage').text().replace(/[-%]/g, '')
    
    const description = extractDescription($)

    console.log({ title, currentPrice, originalPrice, outOfStock, imageUrls, currency, discountRate })

    // construct data object with scraped info 
    const data = {
      url,
      currency: currency || '$',
      image: imageUrls[0],
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      discountRate: Number(discountRate),
      category: 'category',
      reviewsCount: 100,
      stars:4.5,
      isOutOfStock: outOfStock,
      description,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
    }
    return data;
  } catch (error:any) {
    throw new Error(`failed to scrape product: ${error.message}`)
  }
}