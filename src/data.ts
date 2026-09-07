export interface ChartDataPoint {
  time: string;
  price: number;
  volume: number;
}

export const generateChartData = (): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  let currentPrice = 64200.5;
  const now = new Date();
  
  for (let i = 100; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000);
    currentPrice = currentPrice + (Math.random() - 0.48) * 150;
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      price: Number(currentPrice.toFixed(2)),
      volume: Math.floor(Math.random() * 50) + 10,
    });
  }
  
  return data;
};

export interface ImbalanceEvent {
  value: number;
  price: number;
  time: string;
}

export type OIInterpretation = 'Long Buildup' | 'Short Buildup' | 'Long Unwinding' | 'Short Covering';

export interface NiftyDataRow {
  time: string;
  bestBidPrice: number;
  bestAskPrice: number;
  bestBidQ: number;
  bestAskQ: number;
  imbalance: number;
  ofi: number;
  oiChange: number;
  oiInterpretation: OIInterpretation;
  topImbalances: ImbalanceEvent[];
}

export const generateNiftyData = (): NiftyDataRow[] => {
  const data: NiftyDataRow[] = [];

  let startHour = 9;
  let startMinute = 15;
  let currentBase = 22450;
  let prevPrice = currentBase;

  for (let i = 0; i < 26; i++) { // 9:15 to 15:30
    const timeString = `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`;

    currentBase += (Math.random() - 0.48) * 15;
    const priceChange = currentBase - prevPrice;
    prevPrice = currentBase;

    const bestBidPrice = currentBase - (Math.random() * 1.5 + 0.25);
    const bestAskPrice = currentBase + (Math.random() * 1.5 + 0.25);

    const bestBidQ = Math.floor(Math.random() * 250000) + 15000;
    const bestAskQ = Math.floor(Math.random() * 250000) + 15000;

    const bidQ = Math.floor(Math.random() * 500000) + bestBidQ;
    const askQ = Math.floor(Math.random() * 500000) + bestAskQ;

    const imbalance = bidQ - askQ;
    const ofi = Math.floor(imbalance * (Math.random() * 0.4 + 0.6));

    const oiChange = Math.floor((Math.random() - 0.45) * 100000);
    
    let oiInterpretation: OIInterpretation = 'Long Buildup';
    if (priceChange > 0 && oiChange > 0) oiInterpretation = 'Long Buildup';
    else if (priceChange < 0 && oiChange > 0) oiInterpretation = 'Short Buildup';
    else if (priceChange > 0 && oiChange < 0) oiInterpretation = 'Short Covering';
    else if (priceChange < 0 && oiChange < 0) oiInterpretation = 'Long Unwinding';

    // 5 top imbalances sorted by absolute magnitude descending
    const topImbalances: ImbalanceEvent[] = Array.from({ length: 5 }, () => {
      const sign = Math.random() > 0.5 ? 1 : -1;
      const value = sign * (Math.floor(Math.random() * 15000) + 2000);
      
      const minOffset = Math.floor(Math.random() * 15);
      const secOffset = Math.floor(Math.random() * 60);
      const eventMin = (startMinute + minOffset) % 60;
      const eventHr = startHour + Math.floor((startMinute + minOffset) / 60);
      const timeStr = `${eventHr.toString().padStart(2, '0')}:${eventMin.toString().padStart(2, '0')}:${secOffset.toString().padStart(2, '0')}`;
      
      const price = currentBase + (Math.random() - 0.5) * 10;
      
      return { value, price, time: timeStr };
    }).sort((a, b) => Math.abs(b.value) - Math.abs(a.value));

    data.push({
      time: timeString,
      bestBidPrice,
      bestAskPrice,
      bestBidQ,
      bestAskQ,
      imbalance,
      ofi,
      oiChange,
      oiInterpretation,
      topImbalances,
    });

    startMinute += 15;
    if (startMinute >= 60) {
      startHour += 1;
      startMinute = 0;
    }
  }

  return data;
};

export interface Order {
  price: number;
  amount: number;
  total: number;
}

export const generateOrderBook = (type: 'buy' | 'sell', startPrice: number): Order[] => {
  const orders: Order[] = [];
  let currentPrice = startPrice;
  let accumulatedTotal = 0;
  
  for (let i = 0; i < 15; i++) {
    const amount = Number((Math.random() * 2 + 0.1).toFixed(4));
    accumulatedTotal += amount;
    orders.push({
      price: Number(currentPrice.toFixed(2)),
      amount,
      total: Number(accumulatedTotal.toFixed(4)),
    });
    
    if (type === 'buy') {
      currentPrice -= (Math.random() * 15 + 1);
    } else {
      currentPrice += (Math.random() * 15 + 1);
    }
  }
  
  return orders;
};
