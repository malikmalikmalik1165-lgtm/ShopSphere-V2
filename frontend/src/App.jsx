import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, Menu, Search, Star, MessageCircle, X, Trash2, 
  Home, Package, Phone, Info, Zap, ShieldCheck, Crown, Mail 
} from 'lucide-react';

const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animatingItem, setAnimatingItem] = useState(null);

  const myNumber = "03180283104"; 
  const myEmail = "danialmalik968@gmail.com";

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  const products = [
    { id: 1, name: "E5 Earbuds ENC", price: 2795, img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400", tag: "Best Seller" },
    { id: 2, name: "M10 Ultra Pro", price: 1850, img: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400", tag: "Sale" },
    { id: 3, name: "Series 9 Watch", price: 3999, img: "https://images.unsplash.com/photo-1544117518-2b041580c79d?w=400", tag: "New" },
    { id: 4, name: "SP30 Speaker", price: 3500, img: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=400", tag: "Premium" },
    { id: 5, name: "G502 Mouse", price: 4200, img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400", tag: "Pro" },
    { id: 6, name: "Ultra Powerbank", price: 2200, img: "https://images.unsplash.com/photo-1622445272461-c6580cab8638?w=400", tag: "Flash Sale" },
  ];

  const addToCart = (p) => {
    setAnimatingItem(p.id);
    setCart([...cart, p]);
    setTimeout(() => setAnimatingItem(null), 800);
  };

  const removeFromCart = (idx) => setCart(cart.filter((_, i) => i !== idx));

  const subtotal = cart.reduce((acc, curr) => acc + curr.price, 0);

  // WhatsApp Order Logic
  const handleOrder = () => {
    const itemList = cart.map(item => `- ${item.name} (Rs. ${item.price})`).join('%0A');
    const message = `Assalam-o-Alaikum Danial!%0A%0A*Naya Order Aaya Hai*%0A------------------%0A${itemList}%0A------------------%0A*Total Bill: Rs. ${subtotal}*%0A%0AKindly order confirm kar dein.`;
    window.open(`https://wa.me/${myNumber}?text=${message}`, '_blank');
  };

  if (loading) return (
    <div className="h-screen bg-[#020617] flex flex-col items-center justify-center">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl font-[1000] italic text-white">SHOP<span className="text-blue-500">SPHERE</span></motion.h1>
      <div className="w-32 h-1 bg-white/10 mt-6 rounded-full overflow-hidden">
        <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-1/2 h-full bg-blue-500 shadow-[0_0_15px_#3b82f6]" />
      </div>
    </div>
  );

  return (
    <div className="max-w-[450px] mx-auto min-h-screen bg-[#020617] relative text-white font-sans selection:bg-blue-500/30">
      
      {/* 1. TOP TICKER */}
      <div className="bg-blue-600 text-white py-2 overflow-hidden fixed top-0 w-full max-w-[450px] z-[70] text-[9px] font-black uppercase tracking-tighter">
        <div className="animate-marquee flex gap-10">
          <span>⚡ FREE DELIVERY ON ORDERS OVER RS. 5000 | CALL: {myNumber} ⚡</span>
          <span>⚡ 100% ORIGINAL PRODUCTS | DESIGNED BY MALIK DANIAL ⚡</span>
        </div>
      </div>

      {/* 2. HEADER */}
      <nav className="fixed top-8 w-full max-w-[450px] z-50 glass px-6 py-5 flex justify-between items-center bg-black/40 backdrop-blur-xl">
        <Menu size={22} className="text-blue-500" onClick={() => setIsMenuOpen(true)} />
        <h1 className="text-2xl font-[1000] italic tracking-tighter">SHOP<span className="text-blue-500">SPHERE</span></h1>
        <motion.div 
          animate={cart.length > 0 ? { scale: [1, 1.2, 1] } : {}}
          className="relative cursor-pointer" 
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingCart size={24} className="text-blue-400" />
          {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-blue-500 text-black text-[10px] h-5 w-5 rounded-full flex items-center justify-center font-black">{cart.length}</span>}
        </motion.div>
      </nav>

      {/* 3. HERO */}
      <header className="pt-44 pb-8 px-6 text-center">
        <h2 className="text-5xl font-[1000] uppercase italic leading-[0.8] tracking-tighter mb-4">
          CRAFTED <br /> <span className="text-blue-500">LUXURY</span>
        </h2>
      </header>

      {/* 4. PRODUCTS */}
      <main className="p-4 grid grid-cols-2 gap-4 pb-24">
        {products.map((p) => (
          <motion.div key={p.id} className="glass rounded-[2rem] p-3 relative group border border-white/5">
            <div className="aspect-square rounded-[1.5rem] overflow-hidden mb-3 relative bg-black/40">
              <img src={p.img} className="w-full h-full object-cover opacity-80" alt={p.name} />
              
              {/* Add to Cart Pop Animation */}
              <AnimatePresence>
                {animatingItem === p.id && (
                  <motion.div 
                    initial={{ y: 0, opacity: 1, scale: 1 }}
                    animate={{ y: -100, opacity: 0, scale: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center z-20"
                  >
                    <ShoppingCart size={40} className="text-blue-500 fill-blue-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <h3 className="text-[10px] font-black uppercase text-gray-300 truncate">{p.name}</h3>
            <p className="text-blue-400 font-[1000] text-lg italic tracking-tighter">Rs. {p.price}</p>
            
            <button 
              onClick={() => addToCart(p)}
              className="w-full mt-3 bg-blue-600 text-white h-10 rounded-xl font-[1000] text-[9px] uppercase hover:bg-blue-400 active:scale-90 transition-all shadow-lg shadow-blue-900/20"
            >
              Add To Cart
            </button>
          </motion.div>
        ))}
      </main>

      {/* 5. CART DRAWER (With Calculation & WhatsApp) */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] max-w-[450px] mx-auto" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed top-0 right-0 h-full w-full max-w-[340px] bg-[#020617] z-[110] p-6 flex flex-col border-l border-white/10 shadow-2xl">
              <div className="flex justify-between items-center mb-8 pt-4">
                <h2 className="text-blue-500 font-[1000] italic text-xl tracking-tighter">YOUR CART</h2>
                <X onClick={() => setIsCartOpen(false)} size={24} className="text-gray-500" />
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scroll">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center opacity-20">
                    <ShoppingCart size={60} />
                    <p className="mt-4 font-bold uppercase text-[10px]">Empty</p>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <motion.div layout key={idx} className="flex gap-4 items-center bg-white/5 p-3 rounded-2xl border border-white/5 relative">
                      <img src={item.img} className="w-12 h-12 rounded-xl object-cover" />
                      <div className="flex-1">
                        <h4 className="text-[10px] font-black text-gray-200 uppercase truncate w-32">{item.name}</h4>
                        <p className="text-blue-400 font-black text-xs italic">Rs. {item.price}</p>
                      </div>
                      <button onClick={() => removeFromCart(idx)} className="text-rose-500 p-2"><Trash2 size={16}/></button>
                    </motion.div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="pt-6 border-t border-white/10 mt-4">
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                      <span>Subtotal</span>
                      <span>Rs. {subtotal}</span>
                    </div>
                    <div className="flex justify-between text-lg font-[1000] text-blue-500 italic tracking-tighter">
                      <span>Total Bill</span>
                      <span>Rs. {subtotal}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleOrder}
                    className="w-full bg-[#25d366] text-black font-[1000] py-4 rounded-2xl text-[11px] uppercase flex items-center justify-center gap-3 shadow-lg shadow-green-900/20"
                  >
                    <MessageCircle size={18} /> Order on WhatsApp
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 6. SIDE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/90 z-[100] max-w-[450px] mx-auto" />
             <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed top-0 left-0 h-full w-72 bg-[#020617] z-[110] p-10">
                <div className="flex justify-between mb-16"><h2 className="text-blue-500 font-black italic text-xl">MENU</h2><X onClick={() => setIsMenuOpen(false)}/></div>
                <div className="flex flex-col gap-8 font-black uppercase text-xs tracking-widest">
                  <a href="#" className="text-blue-400">Home</a>
                  <a href="#">Products</a>
                  <div className="mt-10 pt-10 border-t border-white/5 space-y-4 opacity-50">
                    <p className="text-[9px] lowercase tracking-normal">{myEmail}</p>
                    <p className="text-[10px]">{myNumber}</p>
                  </div>
                </div>
             </motion.div>
          </>
        )}
      </AnimatePresence>

      <footer className="py-20 text-center opacity-30 text-[8px] font-black uppercase tracking-[0.6em]">
        Designed By Malik Danial
      </footer>

    </div>
  );
};

export default App;