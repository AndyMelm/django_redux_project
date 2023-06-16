import React, { useEffect, useRef } from 'react';

const Tradingview = () => {
  const onLoadScriptRef = useRef<() => void>();

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!(window as any).TradingView) {
      const script = document.createElement('script');
      script.id = 'tradingview-widget-loading-script';
      script.src = 'https://s3.tradingview.com/tv.js';
      script.type = 'text/javascript';
      script.onload = onLoadScriptRef.current!;

      document.head.appendChild(script);
    } else {
      onLoadScriptRef.current!();
    }

    return () => {
      onLoadScriptRef.current = undefined;
      const script = document.getElementById('tradingview-widget-loading-script');
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, []);

  function createWidget() {
    if (document.getElementById('tradingview_d82f7') && (window as any).TradingView) {
      new (window as any).TradingView.widget({
        autosize: true, // Set autosize to true to fill the container
        symbol: 'NASDAQ:AAPL',
        interval: 'D',
        timezone: 'Asia/Jerusalem',
        theme: 'dark',
        style: '1',
        locale: 'en',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        withdateranges: true,
        hide_side_toolbar: false,
        allow_symbol_change: true,
        container_id: 'tradingview_d82f7'
      });
    }
  }

  return (
    <div className="tradingview-widget-container" style={{ width: '90%', height: '80vh', margin: '0 auto' }}>
      <div id="tradingview_d82f7" style={{ width: '100%', height: '100%' }} />
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a> <br />

        <a href="https://www.youtube.com/watch?v=TzWN7f8Khb4&ab_channel=MoneyZG" rel="noopener nofollow" target="_blank">
          <span className="blue-text">A Nice Tutorial to Learn How to Use TradingView.</span>
        </a>

      
      </div>
    </div>
  );
};

export default Tradingview;