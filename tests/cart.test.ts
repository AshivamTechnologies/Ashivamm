import test from 'node:test';
import assert from 'node:assert/strict';

function calculateCartTotals(
  items: Array<{ price: number; quantity: number }>,
  couponCode = ''
) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let discountAmount = 0;
  const upper = couponCode.toUpperCase().trim();
  if (upper === 'SAFFRON10') {
    discountAmount = Math.round(subtotal * 0.1);
  } else if (upper === 'ROYAL15') {
    discountAmount = Math.round(subtotal * 0.15);
  } else if (upper === 'ASHIVAM20') {
    discountAmount = Math.round(subtotal * 0.2);
  }

  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const gstAmount = Math.round(taxableAmount * 0.05); // 5% GST
  const deliveryFee = subtotal >= 999 || subtotal === 0 ? 0 : 50;
  const grandTotal = taxableAmount + gstAmount + deliveryFee;

  return { subtotal, discountAmount, gstAmount, deliveryFee, grandTotal };
}

test('Cart calculations with zero items', () => {
  const result = calculateCartTotals([]);
  assert.equal(result.subtotal, 0);
  assert.equal(result.discountAmount, 0);
  assert.equal(result.gstAmount, 0);
  assert.equal(result.deliveryFee, 0);
  assert.equal(result.grandTotal, 0);
});

test('Cart calculations below free delivery threshold', () => {
  const items = [{ price: 595, quantity: 1 }]; // Creamy Butter Paneer
  const result = calculateCartTotals(items);
  assert.equal(result.subtotal, 595);
  assert.equal(result.discountAmount, 0);
  assert.equal(result.deliveryFee, 50, 'Orders under ₹999 should incur standard delivery fee');
  assert.equal(result.gstAmount, Math.round(595 * 0.05));
  assert.equal(result.grandTotal, 595 + Math.round(595 * 0.05) + 50);
});

test('Cart calculations with SAFFRON10 coupon (10% off) and free delivery', () => {
  const items = [
    { price: 795, quantity: 1 }, // Saffron Biryani
    { price: 685, quantity: 1 }, // Stone-Grilled Chicken
  ]; // Total 1480
  const result = calculateCartTotals(items, 'SAFFRON10');
  assert.equal(result.subtotal, 1480);
  assert.equal(result.discountAmount, 148);
  const taxable = 1480 - 148; // 1332
  assert.equal(result.gstAmount, Math.round(1332 * 0.05)); // 67
  assert.equal(result.deliveryFee, 0, 'Subtotal >= 999 should enjoy Free Delivery');
  assert.equal(result.grandTotal, 1332 + Math.round(1332 * 0.05));
});

test('Cart calculations with ASHIVAM20 partnership coupon (20% off)', () => {
  const items = [{ price: 1000, quantity: 1 }];
  const result = calculateCartTotals(items, 'ASHIVAM20');
  assert.equal(result.subtotal, 1000);
  assert.equal(result.discountAmount, 200);
  assert.equal(result.gstAmount, 40);
  assert.equal(result.deliveryFee, 0);
  assert.equal(result.grandTotal, 840);
});
