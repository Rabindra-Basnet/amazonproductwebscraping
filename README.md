## This is the nextjs Project with the typescript used

## Tech Used
    NextJs
    BrightData
    Cheerio
    Nodemailer
    MongoDb
    HeadlessUi
    Tailwind Css

## Features
    Header with Carousel: Using Carousel showCasng product images
   
    Product Page Scraping: A search bar allows user to input the ONly 
    
    Amazon product link to scrape the product details
    
    Display Scraped Product as it is stored in MOngoDb
    
    Track Option with email Notifications
    
    Automated Cron Jobs: it is used to automate the perodic Scraping ensuring the updated data

## Amazon Product Page Content Scraping

In this project, it use BrightData WebUnlocker as puppeter and Cheerio to scrape the Amazon page

## Puppeteer
Puppeteer use automate browsing tasks, like navigating pages, and scraping dynamic content

    Use the WebUnlocker services to unlock the website security in case it has.

## Cheerio
Cheerio use to parse Html, allowing to manipulate and extract data using jQuery-like Syntax

## MongoDb
Using MongoDb to create a database to store the scraped data from website

## Nodemailer
Using Nodemailer for sending the notifications functionality into the website

Implementing the CRON job to update the page 

Finally Deploying the page to the Vercell

 ## Quick Guide:
  Following the mentioned steps to setup project locally

    Prerequisites
        Make sure to install:
         git
         NodeJs
    Installation:
        for NextJs with typescript
         npx create-next-app@latest projectName --typescript
         cd projectName

        For tailwindcss
            npm i -D tailwindcss postcss autoprefixer
            npx tailwind init -p
    
    Setup Environment Variables 
        creating .env file in the root of the project


        for Scraper
            BRIGHT_DATA_USERNAME= 
            BRIGHT_DATA_Password= 

        For DB:
            MONGODB_URI=
        
        For Email:
            EMAIL_USER=
            EMAIL_PASSWORD=

After configuring all these you can start project by 

     npm run dev