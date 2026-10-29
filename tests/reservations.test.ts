import test from 'node:test';
import assert from 'node:assert/strict';

function validateReservation(data: {
  fullName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number | string;
}) {
  const errors: Record<string, string> = {};
  const todayStr = '2026-10-28'; // baseline test date

  if (!data.fullName || !data.fullName.trim()) {
    errors.fullName = 'Please enter your full name.';
  }

  if (!data.phone || !data.phone.trim()) {
    errors.phone = 'Please enter a contact phone number.';
  } else if (!/^[0-9+\s-]{8,15}$/.test(data.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.';
  }

  if (!data.email || !data.email.trim()) {
    errors.email = 'Please enter an email address.';
  } else if (!/\S+@\S+\.\S+/.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.date) {
    errors.date = 'Please select a reservation date.';
  } else if (data.date < todayStr) {
    errors.date = 'Reservation date cannot be in the past.';
  }

  if (!data.time) {
    errors.time = 'Please select a dining time slot.';
  }

  if (!data.guests || Number(data.guests) < 1) {
    errors.guests = 'Please select guest count.';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

test('Valid reservation passes validation', () => {
  const result = validateReservation({
    fullName: 'Ananya Sharma',
    phone: '+91 98765 43210',
    email: 'ananya@example.com',
    date: '2026-11-05',
    time: '07:30 PM',
    guests: 4
  });

  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});

test('Missing name and invalid phone trigger descriptive errors', () => {
  const result = validateReservation({
    fullName: '',
    phone: 'abc',
    email: 'valid@example.com',
    date: '2026-11-05',
    time: '07:30 PM',
    guests: 2
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.phone);
});

test('Past date is rejected', () => {
  const result = validateReservation({
    fullName: 'Kavya Sree',
    phone: '+91 91234 56789',
    email: 'kavya@example.com',
    date: '2020-01-01',
    time: '08:00 PM',
    guests: 2
  });

  assert.equal(result.isValid, false);
  assert.equal(result.errors.date, 'Reservation date cannot be in the past.');
});
