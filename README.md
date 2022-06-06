## La Coco Crypto Exchange

### Tech Stack
A web application using React, Next.js and Typescript

### Getting Started
To start, please install the packages run the development server:

```bash
npm install
npm run dev
# or
yarn install
yarn dev
```

### Steps to Test
1. Open [http://localhost:3000](http://localhost:3000) in your browser
    - Verify that on header, title, date and time are displayed
1. Select "From" and "To" cryptocurrency
    - Verify that "BTC, ETH, USDT, DFI, DOGE" cryptocurrencies are available
    - Verify that you cannot select same currency for both "From" and "To" options
    - Verify that currency symbols in title "Convert `BTC` to `ETH`" changes accordingly
    - Verify that displayed conversion values at the bottom of the page are correct
1. Enter '0' on the "Amount" field
    - Verify that an error message "Amount should be a number and greater than 0." is displayed
1. Try to enter non-numeric character
    - Verify that only valid amount is allowed
1. Hover on the "swap" icon
    - Verify that "Swap Currencies" title is displayed on hover
1. Click the "swap" icon
    - Verify that currencies between selected "From" and "To" are switched
1. Resize the page
    - Verify that page is responsive