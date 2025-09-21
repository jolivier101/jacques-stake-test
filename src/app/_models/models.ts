export interface Holding {
  symbol: string;
  shares: number;
  price: number;
  changePercent: number;
}

export interface Stock {
  type: 'stock' | 'etf';
  logoUrl: string;
  symbol: string;
  name: string;
  price: number;
  marketCap?: string;
  volume?: string;
  range?: string;
}

export interface StockSearchResult {
  symbol: string;
  name: string;
  price: number;
}

export interface OrderRequest {
  symbol: string;
  priceType: 'market' | 'limit';
  amount: number;
  shares: number;
  stockPrice: number; // purely for mocking purposes
}

export interface OrderResponse {
  orderId: string;
  status: 'pending' | 'filled' | 'rejected';
  filledShares: number;
}
