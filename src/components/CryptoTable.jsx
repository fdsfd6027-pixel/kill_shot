import React, { useState, useEffect, useCallback } from 'react';
import '../components/cryptoTable.css';


const initialCryptoData = [
  { pair: 'BTCUSDT', price: 59222.00, change24h: -3.72 },
  { pair: 'ETHUSDT', price: 1648.00, change24h: -4.28 },
  { pair: 'YFIUSDT', price: 1561.00, change24h: -4.82 },
  { pair: 'XRPUSDT', price: 0.9398, change24h: -3.34 },
  { pair: 'XAUUSD', price: 3646.00, change24h: 0.06 },
  { pair: 'ZECUSDT', price: 718.47, change24h: -5.20 },
  { pair: 'FILUSDT', price: 0.5182, change24h: -3.00 },
  { pair: 'DASHUSDT', price: 35.25, change24h: -4.83 },
];


function CryptoTable() {
  const [cryptoData, setCryptoData] = useState(initialCryptoData);

  // Используем useCallback, чтобы избежать создания новой функции на каждом рендере
  const fetchCryptoData = useCallback(() => {
    const updatedData = cryptoData.map(item => ({
      ...item,
      price: item.price + (Math.random() - 0.5) * 1000,  // случайные изменения
      change24h: (Math.random() - 0.5) * 10,
    }));

    setCryptoData(updatedData);
  }, [cryptoData]);

  useEffect(() => {
    const intervalId = setInterval(fetchCryptoData, 5000);  // обновление данных каждые 5 секунд

    return () => clearInterval(intervalId);  // очищаем интервал
  }, [fetchCryptoData]);  // добавляем fetchCryptoData как зависимость

  return (
    <div className="crypto-table">
      <div className="crypto-table-header">
        <div className="crypto-pair">Pair</div>
        <div className="crypto-price">Price</div>
        <div className="crypto-change">24h change</div>
      </div>

      {cryptoData?.map((item, index) => (
        <div className="crypto-table-row" key={index}>
          <div className="crypto-pair">{item?.pair}</div>
          <div className="crypto-price">{item?.price.toFixed(2)}</div>
          <div
            className="crypto-change"
            style={{ backgroundColor: item?.change24h >= 0 ? '#37b66a' : '#e53858' }}
          >
            {item?.change24h > 0 ? '+' : ''}{item?.change24h.toFixed(2)}%
          </div>
        </div>
      ))}
    </div>
  );
}

export default CryptoTable;
