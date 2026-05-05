import React, { useState, useEffect } from 'react';
import './App.css';

// Professional Tech Products Data
const initialProducts = [
  { id: 1, name: "AirPods Pro 2", price: 5500, cat: "EarPods", desc: "Original sound quality with spatial audio.", img: "https://images.unsplash.com/photo-1588423770574-91093b707970?w=500" },
  { id: 2, name: "Sony WH-1000XM5", price: 45000, cat: "Headset", desc: "Industry-leading noise cancellation.", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
  { id: 3, name: "Razer BlackWidow V4", price: 18500, cat: "Computer", desc: "Mechanical gaming keyboard with RGB.", img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500" },
  { id: 4, name: "Logitech G502 Hero", price: 9500, cat: "Accessories", desc: "High performance wired gaming mouse.", img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500" },
  { id: 5, name: "Samsung 25W Charger", price: 2200, cat: "Mobile Acc", desc: "Super fast charging original adapter.", img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500" },
];

// Loop to generate 55 products with unique tech images
const allProducts = [...initialProducts];
for (let i = 6; i <= 55; i++) {
  allProducts.push({
    id: i,
    name: i % 3 === 0 ? `Gaming Mouse Z${i}` : i % 2 === 0 ? `Smart Watch Pro ${i}` : `Wireless Buds X${i}`,
    price: 1200 + (i * 75),
    cat: i % 4 === 0 ? "Computer" : "Mobile Acc",
    desc: "Premium quality electronic gadget with warranty.",
    img: `https://picsum.photos/seed/tech${i}/500/500` // Original-looking tech placeholders
  });
}

function App() {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const sendOrder = (p) => {
    const adminNum = "923180283104";
    const msg = `*ORDER FROM SHOPSPHERE-II*\n\n*Product:* ${p.name}\n*Price:* Rs. ${p.price}\n*Details:* ${p.desc}\n\n*Admin:* Malik Danial`;
    window.open(`https://wa.me/${adminNum}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (loading) return (
    <div className="loader-container">
      <div className="pulse-loader"></div>
      <h2 className="loader-text">SHOPSPHERE II</h2>
    </div>
  );

  return (
    <div className="app-shell">
      <div className="glow-top"></div>
      
      <header className="main-nav">
        <div className="nav-brand">ShopSphere <span>II</span></div>
        <div className="admin-status">Admin: Malik Danial | 03180283104</div>
      </header>

      <div className="promo-ticker">
        <div className="ticker-wrap">
          <span>NEW ARRIVALS: 50+ ORIGINAL TECH PRODUCTS ADDED!</span>
          <span>WHATSAPP ORDERING SYSTEM LIVE 24/7</span>
          <span>PREMIUM ACCESSORIES FOR MOBILE & PC</span>
        </div>
      </div>

      <main className="product-grid">
        {allProducts.map(p => (
          <div key={p.id} className="tech-card" onClick={() => setSelected(p)}>
            <div className="img-holder">
              <img src={p.img} alt={p.name} loading="lazy" />
              <div className="cat-tag">{p.cat}</div>
            </div>
            <div className="card-body">
              <h3>{p.name}</h3>
              <p className="card-price">Rs. {p.price}</p>
              <button className="buy-now" onClick={(e) => { e.stopPropagation(); sendOrder(p); }}>
                Order Now
              </button>
            </div>
          </div>
        ))}
      </main>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-window" onClick={e => e.stopPropagation()}>
            <button className="close-x" onClick={() => setSelected(null)}>&times;</button>
            <div className="modal-img">
              <img src={selected.img} alt={selected.name} />
            </div>
            <div className="modal-details">
              <h2>{selected.name}</h2>
              <span className="badge">{selected.cat}</span>
              <p>{selected.desc}</p>
              <div className="order-summary">
                <span className="final-price">Rs. {selected.price}</span>
                <button className="wa-final" onClick={() => sendOrder(selected)}>
                  Confirm via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;