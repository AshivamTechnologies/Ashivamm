import test from 'node:test';
import assert from 'node:assert/strict';
import { generateLocalResponse } from '../server.ts';

test('AI Knowledge Engine responds correctly to English menu inquiries', () => {
  const reply = generateLocalResponse('What dishes do you recommend on your menu?');
  assert.ok(reply.includes('Saffron Special Biryani'));
  assert.ok(reply.includes('Stone-Grilled Chicken'));
  assert.ok(reply.includes('Creamy Butter Paneer'));
});

test('AI Knowledge Engine provides detailed vegetarian and Jain response', () => {
  const reply = generateLocalResponse('Do you have vegetarian or Jain options without onion and garlic?');
  assert.ok(reply.includes('vegetarian'));
  assert.ok(reply.includes('Jain'));
});

test('AI Knowledge Engine provides accurate Mumbai address and hours', () => {
  const locationReply = generateLocalResponse('Where are you located?');
  assert.ok(locationReply.includes('Colaba Waterfront'));
  assert.ok(locationReply.includes('Mumbai'));

  const timingReply = generateLocalResponse('What are your hours and opening timings?');
  assert.ok(timingReply.includes('11:00 AM'));
  assert.ok(timingReply.includes('10:30 PM'));
});

test('AI Knowledge Engine provides Ashivam Technologies partner details', () => {
  const reply = generateLocalResponse('Who is Ashivam Technologies?');
  assert.ok(reply.includes('Ashivam Technologies'));
  assert.ok(reply.includes('partner'));
});

test('AI Knowledge Engine handles Telugu culinary queries with authentic Telugu script', () => {
  const reply = generateLocalResponse('మీ రెస్టారెంట్ లో మెనూ మరియు స్పెషల్ ఫుడ్ ఏమిటి?');
  assert.ok(/[\u0C00-\u0C7F]/.test(reply), 'Response to Telugu query must contain Telugu characters');
  assert.ok(reply.includes('Saffron Special Biryani') || reply.includes('బిర్యానీ'));
});
