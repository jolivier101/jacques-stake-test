# JacquesTest

Thank you for the opportunity to write this test.

I stuck within the 4hour limit, even though i didnt finish - which pains me greatly

I didnt manage to get around to finishing the discover page, nor was I able to finishe the animation and slide button styling around the buy flow.
I did however focus on a solid structure that focuses on extendability, and i added some unit testing.

Also, I wasn't able to download and host the Universal Sans font as there are no complete free versions.

Suggested Endpoints

Holdings API
GET /api/holdings
{
  "totalEquity": 8036.00,
  "positions": [
    {
      "symbol": "AAPL",
      "shares": 3.0282,
      "price": 105.44,
      "changePercent": 22.9
    },
    {
      "symbol": "TSLA",
      "shares": 3.0282,
      "price": 105.44,
      "changePercent": 22.9
    }
  ]
}


Trending Stocks API
GET /api/stocks/trending
{
  "stocks": [
    {
      "symbol": "FIG",
      "name": "Figma Inc",
      "price": 131.04,
      "marketCap": "1.2b",
      "volume": "36.9m",
      "range": "30-32"
    }
  ]
}


Search API
GET /api/stocks/search?q=TIK
{
  "results": [
    { "symbol": "TIK", "name": "TikTok Corp", "price": 78.38 },
    { "symbol": "TIK.A", "name": "TikTok Alt", "price": 131.04 }
  ]
}


Order API
POST /api/orders
{
  "symbol": "GOOG",
  "priceType": "market",   // or "limit"
  "amount": 5.1,
  "shares": 500
}

Response:
{
  "orderId": "ORD123",
  "status": "pending",
  "filledShares": 0
}