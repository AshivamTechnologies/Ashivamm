import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { SIGNATURE_DISHES, FULL_MENU, RESTAURANT_INFO, GALLERY_ITEMS, RESTAURANT_EVENTS } from '../src/data/restaurantData.ts';

test('Restaurant Info has valid core metadata', () => {
  assert.equal(RESTAURANT_INFO.shortName, 'Saffron & Stone');
  assert.equal(RESTAURANT_INFO.company.name, 'Ashivam Technologies');
  assert.ok(RESTAURANT_INFO.phone.length > 5);
  assert.ok(RESTAURANT_INFO.email.includes('@'));
  assert.ok(RESTAURANT_INFO.address.includes('Colaba'));
});

test('Signature Dishes have complete and valid properties', () => {
  assert.equal(SIGNATURE_DISHES.length, 6, 'Should have exactly 6 curated signature dishes');

  for (const dish of SIGNATURE_DISHES) {
    assert.ok(dish.id, 'Dish must have an id');
    assert.ok(dish.name, 'Dish must have a name');
    assert.ok(dish.description && dish.description.length > 10, 'Dish must have a descriptive summary');
    assert.ok(dish.price > 0, `Dish ${dish.name} price must be greater than 0`);
    assert.ok(dish.image.startsWith('/images/'), `Image for ${dish.name} must start with /images/`);
    
    // Verify the image file exists on disk in public/
    const diskPath = path.resolve(process.cwd(), 'public', dish.image.replace(/^\//, ''));
    assert.ok(fs.existsSync(diskPath), `Asset file must exist on disk: ${diskPath}`);
  }
});

test('Full Menu covers all culinary categories with valid prices', () => {
  assert.ok(FULL_MENU.length >= 15, 'Menu must contain a rich variety of dishes');

  const categories = new Set(FULL_MENU.map((d) => d.category));
  assert.ok(categories.has('Biryanis'), 'Menu must include Biryanis');
  assert.ok(categories.has('Veg Curries'), 'Menu must include Veg Curries');
  assert.ok(categories.has('Starters'), 'Menu must include Starters');
  assert.ok(categories.has('Drinks'), 'Menu must include Drinks');

  for (const dish of FULL_MENU) {
    assert.ok(dish.price >= 50 && dish.price <= 5000, `Dish ${dish.name} price ₹${dish.price} must be realistic`);
    const diskPath = path.resolve(process.cwd(), 'public', dish.image.replace(/^\//, ''));
    assert.ok(fs.existsSync(diskPath), `Menu image file must exist: ${dish.image}`);
  }
});

test('Gallery and Events reference existing high-resolution assets', () => {
  assert.ok(GALLERY_ITEMS.length >= 6, 'Gallery must have items');
  for (const item of GALLERY_ITEMS) {
    const diskPath = path.resolve(process.cwd(), 'public', item.image.replace(/^\//, ''));
    assert.ok(fs.existsSync(diskPath), `Gallery image must exist on disk: ${item.image}`);
  }

  assert.ok(RESTAURANT_EVENTS.length >= 3, 'Events must have items');
  for (const event of RESTAURANT_EVENTS) {
    const diskPath = path.resolve(process.cwd(), 'public', event.image.replace(/^\//, ''));
    assert.ok(fs.existsSync(diskPath), `Event image must exist on disk: ${event.image}`);
  }
});
