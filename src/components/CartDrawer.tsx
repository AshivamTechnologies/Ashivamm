import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, CheckCircle2, MapPin, Phone, User, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useAppTheme } from '../context/ThemeContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discountCode,
    discountAmount,
    applyCoupon,
    removeCoupon,
    gstAmount,
    deliveryFee,
    grandTotal,
    totalItems
  } = useCart();

  const { showToast } = useToast();
  const { theme } = useAppTheme();
  const isMidnight = theme === 'midnight';

  const [inputCoupon, setInputCoupon] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<any | null>(null);

  // Checkout form fields
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custAddress, setCustAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery (Pay at Door)');
  const [orderErrors, setOrderErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isCartOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
        setIsCheckingOut(false);
        setOrderConfirmed(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const ok = applyCoupon(inputCoupon);
    if (ok) {
      setInputCoupon('');
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!custName.trim()) errs.custName = 'Please enter your name.';
    if (!custPhone.trim()) {
      errs.custPhone = 'Please enter phone number.';
    } else if (!/^[0-9+\s-]{8,15}$/.test(custPhone.trim())) {
      errs.custPhone = 'Please enter a valid phone number.';
    }
    if (!custAddress.trim()) errs.custAddress = 'Please enter delivery address.';

    setOrderErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    const confirmedOrder = {
      orderId,
      name: custName,
      phone: custPhone,
      address: custAddress,
      paymentMethod,
      items: [...cart],
      grandTotal,
      time: '35 - 45 mins'
    };

    setOrderConfirmed(confirmedOrder);
    clearCart();
    setIsCheckingOut(false);
    showToast('Order Placed Successfully!', `Order #${orderId} is being prepared at the stone hearth.`, 'success', 6000);
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => {
          setIsCartOpen(false);
          setIsCheckingOut(false);
          setOrderConfirmed(null);
        }}
      />

      {/* Drawer Container */}
      <div className={`relative w-full max-w-md border-l h-full flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-right duration-300 ${
        isMidnight ? 'bg-[#141210] border-stone-800 text-stone-100' : 'bg-[#faf7f2] border-stone-200 text-stone-900'
      }`}>
        
        {/* Header */}
        <div className={`p-6 border-b flex items-center justify-between ${
          isMidnight ? 'bg-stone-900/90 border-stone-800' : 'bg-white border-stone-200'
        }`}>
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-amber-500" />
            <h3 id="cart-drawer-title" className={`font-serif text-xl font-bold ${isMidnight ? 'text-cream-50' : 'text-stone-900'}`}>
              Your Dining Bag ({totalItems})
            </h3>
          </div>
          <button
            onClick={() => {
              setIsCartOpen(false);
              setIsCheckingOut(false);
              setOrderConfirmed(null);
            }}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Close Dining Bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-left">
          
          {/* State 1: Order Confirmation Receipt */}
          {orderConfirmed ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className={`font-serif text-2xl font-bold ${isMidnight ? 'text-white' : 'text-stone-900'}`}>
                Order Confirmed!
              </h4>
              <p className="text-xs text-amber-500 font-mono font-bold tracking-wider">
                #{orderConfirmed.orderId}
              </p>
              <p className={`text-xs leading-relaxed max-w-xs mx-auto ${isMidnight ? 'text-stone-300' : 'text-stone-600'}`}>
                Thank you, {orderConfirmed.name}. Your royal meal has been sent to our master chefs and will be delivered to:
              </p>
              <div className={`p-4 rounded-xl border text-left text-xs space-y-1.5 shadow-sm ${
                isMidnight ? 'bg-stone-900/90 border-stone-800' : 'bg-white border-stone-200'
              }`}>
                <div className={`flex items-center gap-2 ${isMidnight ? 'text-stone-300' : 'text-stone-700'}`}>
                  <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="truncate">{orderConfirmed.address}</span>
                </div>
                <div className={`flex items-center gap-2 ${isMidnight ? 'text-stone-300' : 'text-stone-700'}`}>
                  <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{orderConfirmed.phone}</span>
                </div>
                <div className={`flex items-center gap-2 ${isMidnight ? 'text-stone-300' : 'text-stone-700'}`}>
                  <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Estimated Time: {orderConfirmed.time}</span>
                </div>
                <div className={`pt-2 border-t font-bold flex justify-between ${
                  isMidnight ? 'border-stone-800 text-white' : 'border-stone-200 text-stone-900'
                }`}>
                  <span>Total Amount Paid / COD:</span>
                  <span className="tabular-nums text-amber-500">₹{orderConfirmed.grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setOrderConfirmed(null);
                  setIsCartOpen(false);
                }}
                className="w-full mt-4 py-3 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-all cursor-pointer"
              >
                Back to Restaurant
              </button>
            </div>
          ) : isCheckingOut ? (
            /* State 2: Checkout Form */
            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div className={`flex items-center justify-between pb-2 border-b ${
                isMidnight ? 'border-stone-800' : 'border-stone-200'
              }`}>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
                  Delivery Details
                </span>
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className={`text-xs underline cursor-pointer ${
                    isMidnight ? 'text-stone-400 hover:text-white' : 'text-stone-600 hover:text-stone-950'
                  }`}
                >
                  Back to Bag
                </button>
              </div>

              <div>
                <label htmlFor="checkout-name" className={`block text-xs font-semibold uppercase tracking-wider mb-1 ${
                  isMidnight ? 'text-stone-300' : 'text-stone-700'
                }`}>
                  Recipient Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="checkout-name"
                    type="text"
                    required
                    aria-required="true"
                    value={custName}
                    onChange={(e) => setCustName(e.target.value)}
                    placeholder="Your Full Name"
                    className={`w-full pl-9 pr-3 py-2 border rounded-lg text-xs placeholder-stone-400 focus:outline-none transition-colors ${
                      isMidnight 
                        ? 'bg-stone-800 border-stone-700 text-white focus:border-amber-400' 
                        : 'bg-white border-stone-300 text-stone-900 focus:border-amber-600'
                    }`}
                  />
                </div>
                {orderErrors.custName && (
                  <p className="text-[10px] text-rose-500 mt-1">{orderErrors.custName}</p>
                )}
              </div>

              <div>
                <label htmlFor="checkout-phone" className={`block text-xs font-semibold uppercase tracking-wider mb-1 ${
                  isMidnight ? 'text-stone-300' : 'text-stone-700'
                }`}>
                  Contact Phone *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="checkout-phone"
                    type="tel"
                    required
                    aria-required="true"
                    value={custPhone}
                    onChange={(e) => setCustPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className={`w-full pl-9 pr-3 py-2 border rounded-lg text-xs placeholder-stone-400 focus:outline-none transition-colors ${
                      isMidnight 
                        ? 'bg-stone-800 border-stone-700 text-white focus:border-amber-400' 
                        : 'bg-white border-stone-300 text-stone-900 focus:border-amber-600'
                    }`}
                  />
                </div>
                {orderErrors.custPhone && (
                  <p className="text-[10px] text-rose-500 mt-1">{orderErrors.custPhone}</p>
                )}
              </div>

              <div>
                <label htmlFor="checkout-address" className={`block text-xs font-semibold uppercase tracking-wider mb-1 ${
                  isMidnight ? 'text-stone-300' : 'text-stone-700'
                }`}>
                  Delivery Address *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                  <textarea
                    id="checkout-address"
                    rows={2}
                    required
                    aria-required="true"
                    value={custAddress}
                    onChange={(e) => setCustAddress(e.target.value)}
                    placeholder="Building, Flat, Street, Colaba / South Mumbai"
                    className={`w-full pl-9 pr-3 py-2 border rounded-lg text-xs placeholder-stone-400 focus:outline-none transition-colors ${
                      isMidnight 
                        ? 'bg-stone-800 border-stone-700 text-white focus:border-amber-400' 
                        : 'bg-white border-stone-300 text-stone-900 focus:border-amber-600'
                    }`}
                  />
                </div>
                {orderErrors.custAddress && (
                  <p className="text-[10px] text-rose-500 mt-1">{orderErrors.custAddress}</p>
                )}
              </div>

              <div>
                <label htmlFor="checkout-payment" className={`block text-xs font-semibold uppercase tracking-wider mb-1 ${
                  isMidnight ? 'text-stone-300' : 'text-stone-700'
                }`}>
                  Payment Method
                </label>
                <select
                  id="checkout-payment"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none transition-colors ${
                    isMidnight 
                      ? 'bg-stone-800 border-stone-700 text-white focus:border-amber-400' 
                      : 'bg-white border-stone-300 text-stone-900 focus:border-amber-600'
                  }`}
                >
                  <option value="Cash on Delivery (Pay at Door)" className={isMidnight ? 'bg-stone-900 text-white' : ''}>Cash on Delivery (Pay at Door)</option>
                  <option value="UPI / QR (Pay at Door or Instant)" className={isMidnight ? 'bg-stone-900 text-white' : ''}>UPI (Google Pay / PhonePe / Paytm)</option>
                  <option value="Credit / Debit Card (Card on Delivery)" className={isMidnight ? 'bg-stone-900 text-white' : ''}>Card on Delivery</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-md transition-all font-bold cursor-pointer"
                >
                  Confirm & Place Order (₹{grandTotal.toLocaleString('en-IN')})
                </button>
              </div>
            </form>
          ) : cart.length === 0 ? (
            /* State 3: Empty Cart */
            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
              <div className={`w-16 h-16 rounded-full border flex items-center justify-center ${
                isMidnight ? 'bg-stone-900 border-stone-800 text-stone-500' : 'bg-stone-100 border-stone-200 text-stone-400'
              }`}>
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className={`font-serif text-lg font-bold ${isMidnight ? 'text-white' : 'text-stone-900'}`}>
                Your Dining Bag is Empty
              </h4>
              <p className={`text-xs max-w-xs ${isMidnight ? 'text-stone-400' : 'text-stone-500'}`}>
                Explore our signature biryanis, stone-grilled appetizers, and decadent desserts to curate your meal.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  const menuEl = document.getElementById('menu');
                  if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-2 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors font-bold cursor-pointer"
              >
                Explore Menu
              </button>
            </div>
          ) : (
            /* State 4: Cart Item List */
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.dish.id}
                  className={`flex gap-3 p-3 rounded-xl border items-center justify-between shadow-xs ${
                    isMidnight ? 'bg-stone-900/90 border-stone-800' : 'bg-white border-stone-200'
                  }`}
                >
                  <img
                    src={item.dish.image}
                    alt={item.dish.name}
                    className="w-14 h-14 rounded-lg object-cover border border-stone-700/40 shrink-0"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/dish_saffron_biryani_1793203589529.jpg';
                    }}
                  />

                  <div className="flex-1 min-w-0 pr-2">
                    <h5 className={`font-serif text-xs font-semibold truncate ${
                      isMidnight ? 'text-white' : 'text-stone-900'
                    }`}>
                      {item.dish.name}
                    </h5>
                    <div className="text-[11px] text-amber-500 font-bold tabular-nums mt-0.5">
                      ₹{item.dish.price.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className={`flex items-center border rounded-lg p-0.5 ${
                      isMidnight ? 'bg-stone-800 border-stone-700' : 'bg-stone-100 border-stone-300'
                    }`}>
                      <button
                        onClick={() => updateQuantity(item.dish.id, item.quantity - 1)}
                        className={`w-6 h-6 flex items-center justify-center cursor-pointer ${
                          isMidnight ? 'text-stone-300 hover:text-white' : 'text-stone-600 hover:text-stone-950'
                        }`}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className={`w-6 text-center text-xs font-semibold tabular-nums ${
                        isMidnight ? 'text-white' : 'text-stone-900'
                      }`}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.dish.id, item.quantity + 1)}
                        className={`w-6 h-6 flex items-center justify-center cursor-pointer ${
                          isMidnight ? 'text-stone-300 hover:text-white' : 'text-stone-600 hover:text-stone-950'
                        }`}
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.dish.id)}
                      className="text-stone-400 hover:text-rose-500 p-1 transition-colors cursor-pointer"
                      aria-label={`Remove ${item.dish.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Promo code input */}
              <div className="pt-2">
                {discountCode ? (
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Code <strong>{discountCode}</strong> applied (-₹{discountAmount})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-[10px] text-stone-400 hover:text-rose-400 uppercase font-semibold underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder="Promo code (e.g. SAFFRON10)"
                      className={`flex-1 px-3 py-2 border rounded-lg text-xs placeholder-stone-400 focus:outline-none uppercase ${
                        isMidnight 
                          ? 'bg-stone-800 border-stone-700 text-white focus:border-amber-400' 
                          : 'bg-white border-stone-300 text-stone-900 focus:border-amber-600'
                      }`}
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-xs rounded-lg transition-colors shrink-0 cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Footer Calculation & Checkout Button */}
        {cart.length > 0 && !orderConfirmed && !isCheckingOut && (
          <div className={`p-6 border-t space-y-3 shadow-lg ${
            isMidnight ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
          }`}>
            <div className={`space-y-1.5 text-xs ${isMidnight ? 'text-stone-300' : 'text-stone-600'}`}>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className={`tabular-nums font-semibold ${isMidnight ? 'text-white' : 'text-stone-900'}`}>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Discount ({discountCode})</span>
                  <span className="tabular-nums">-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>GST (5% Restaurant Tax)</span>
                <span className="tabular-nums">₹{gstAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Packaging & Delivery</span>
                <span className="tabular-nums">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-400 font-semibold">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
              <div className={`pt-2 border-t flex justify-between text-base font-bold ${
                isMidnight ? 'border-stone-800 text-white' : 'border-stone-200 text-stone-900'
              }`}>
                <span className="font-serif">Grand Total</span>
                <span className="tabular-nums text-amber-500">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckingOut(true)}
              className="w-full flex items-center justify-center gap-2 py-3.5 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-md transition-all font-bold cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
