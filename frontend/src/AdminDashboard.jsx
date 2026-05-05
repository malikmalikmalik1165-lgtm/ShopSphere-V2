import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [activeCat, setActiveCat] = useState("All");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const owner = { name: "Malik Danial", store: "SHOPSPHERE II" };

  const heroBgs = [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600",
    "https://images.unsplash.com/photo-1491336477066-31156b5e4f35?w=1600",
    "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600"
  ];

  useEffect(() => {
    const bgTimer = setInterval(() => setBgIndex(prev => (prev + 1) % heroBgs.length), 5000);
    return () => clearInterval(bgTimer);
  }, []);

  const categories = ["Apparel", "Luxury", "Tech", "Footwear"];
  const products = Array.from({ length: 105 }, (_, i) => ({
    id: i + 1,
    name: `${categories[i % 4]} Premium #${i + 1}`,
    price: Math.floor(Math.random() * 40000) + 2000,
    cat: categories[i % 4],
    img: `https://picsum.photos/seed/${i + 50}/500/600`,
    discount: Math.floor(Math.random() * 30) + 10
  }));

  const filtered = activeCat === "All" ? products : products.filter(p => p.cat === activeCat);
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  // Cart Handlers
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const addToCart = (p) => setCart([...cart, p]);
  
  const handleCheckout = () => {
    setShowConfetti(true);
    setCart([]);
    setTimeout(() => {
        setShowConfetti(false);
        setIsCartOpen(false);
    }, 3000);
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      
      {/* --- CONFETTI EFFECT --- */}
      {showConfetti && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(79, 70, 229, 0.8)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', fontWeight: 'bold' }}>
          🎊 VIP ORDER PLACED! 🎊
        </div>
      )}

      {/* --- HERO / NAV --- */}
      <header style={{ 
        height: '400px', backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${heroBgs[bgIndex]})`,
        backgroundSize: 'cover', backgroundPosition: 'center', transition: '1.5s', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
      }}>
        <h1 style={{ fontSize: '50px', fontWeight: '900', margin: 0 }}>{owner.store}</h1>
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          {["All", "Apparel", "Luxury", "Tech"].map(c => (
            <button key={c} onClick={() => setActiveCat(c)} style={{
              background: activeCat === c ? '#fff' : 'rgba(255,255,255,0.1)', color: activeCat === c ? '#000' : '#fff',
              border: 'none', padding: '10px 20px', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold'
            }}>{c}</button>
          ))}
        </div>
      </header>

      {/* --- PRODUCTS --- */}
      <div style={{ maxWidth: '1400px', margin: '50px auto', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '25px' }}>
        {filtered.map(p => (
          <div key={p.id} style={{ backgroundColor: '#0a0a0a', borderRadius: '20px', padding: '15px', border: '1px solid #111' }}>
            <img src={p.img} style={{ width: '100%', height: '250px', borderRadius: '15px', objectFit: 'cover' }} alt="p" />
            <h3 style={{ fontSize: '16px', margin: '15px 0 5px 0' }}>{p.name}</h3>
            <p style={{ color: '#4f46e5', fontWeight: '900', fontSize: '18px' }}>Rs. {p.price.toLocaleString()}</p>
            <button onClick={() => addToCart(p)} style={{ width: '100%', marginTop: '10px', padding: '10px', borderRadius: '10px', border: 'none', backgroundColor: '#fff', color: '#000', fontWeight: 'bold', cursor: 'pointer' }}>
              ADD TO CART
            </button>
          </div>
        ))}
      </div>

      {/* --- FLOATING CART ICON --- */}
      <div onClick={toggleCart} style={{ position: 'fixed', bottom: '30px', right: '30px', backgroundColor: '#4f46e5', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 100, boxShadow: '0 10px 30px rgba(79,70,229,0.5)' }}>
        <span style={{ fontSize: '24px' }}>🛒</span>
        <div style={{ position: 'absolute', top: '-5px', right: '-5px', backgroundColor: '#fff', color: '#000', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>{cart.length}</div>
      </div>

      {/* --- SIDEBAR CART --- */}
      {isCartOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, width: '350px', height: '100vh', backgroundColor: '#050505', zIndex: 200, padding: '30px', borderLeft: '1px solid #222', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
            <h2 style={{ margin: 0 }}>CART</h2>
            <button onClick={toggleCart} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}>✕</button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {cart.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '10px', marginBottom: '15px', borderBottom: '1px solid #111', paddingBottom: '10px' }}>
                <img src={item.img} style={{ width: '40px', height: '40px', borderRadius: '5px' }} />
                <div><p style={{ margin: 0, fontSize: '12px' }}>{item.name}</p><p style={{ margin: 0, fontWeight: 'bold' }}>Rs. {item.price}</p></div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid #222', paddingTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '20px', fontWeight: 'bold' }}>
              <span>Total:</span><span>Rs. {total.toLocaleString()}</span>
            </div>
            <button onClick={handleCheckout} style={{ width: '100%', padding: '15px', borderRadius: '10px', border: 'none', backgroundColor: '#fff', color: '#000', fontWeight: '900', cursor: 'pointer' }}>CHECKOUT</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;