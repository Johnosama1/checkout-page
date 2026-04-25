// =====================
// CHECKOUT PAGE LOGIC
// =====================

const SUBTOTAL = 2050;
const SHIPPING = 50;
const DISCOUNT_RATE = 0.1; // 10%

let discountApplied = false;

// ---- Tab Switching ----
function switchTab(tab) {
  const cardFields  = document.getElementById('card-fields');
  const walletFields = document.getElementById('wallet-fields');
  const tabCard    = document.getElementById('tab-card');
  const tabWallet  = document.getElementById('tab-wallet');

  if (tab === 'card') {
    cardFields.classList.remove('hidden');
    walletFields.classList.add('hidden');
    tabCard.classList.add('active');
    tabWallet.classList.remove('active');
  } else {
    walletFields.classList.remove('hidden');
    cardFields.classList.add('hidden');
    tabWallet.classList.add('active');
    tabCard.classList.remove('active');
  }
}

// ---- Card Number Formatter ----
function formatCardNumber(input) {
  let value = input.value.replace(/\D/g, '');
  value = value.substring(0, 16);
  const parts = [];
  for (let i = 0; i < value.length; i += 4) {
    parts.push(value.substring(i, i + 4));
  }
  input.value = parts.join(' ');
}

// ---- Expiry Formatter ----
function formatExpiry(input) {
  let value = input.value.replace(/\D/g, '');
  if (value.length > 2) {
    value = value.substring(0, 2) + '/' + value.substring(2, 4);
  }
  input.value = value;
}

// ---- Apply Discount ----
function applyDiscount() {
  if (discountApplied) return;

  const code = document.getElementById('discount-input').value.trim();
  if (!code) return;

  discountApplied = true;
  const discountAmount = SUBTOTAL * DISCOUNT_RATE;
  const newTotal = SUBTOTAL + SHIPPING - discountAmount;

  // Show applied state
  document.getElementById('discount-input-wrap').classList.add('hidden');
  document.getElementById('discount-applied').classList.remove('hidden');
  document.getElementById('discount-saved').textContent = `- ${formatPrice(discountAmount)} ر.س`;

  // Show discount row in totals
  document.getElementById('discount-row').classList.remove('hidden');
  document.getElementById('discount-amount-display').textContent = `- ${formatPrice(discountAmount)} ر.س`;

  // Update totals
  document.getElementById('old-total').classList.remove('hidden');
  document.getElementById('grand-total').textContent = formatPrice(newTotal) + ' ر.س';
  document.getElementById('cta-total').textContent = formatPrice(newTotal) + ' ر.س';
}

// ---- Place Order ----
function placeOrder() {
  const btn = document.querySelector('[data-testid="button-place-order"]');
  btn.textContent = '⏳ جاري المعالجة...';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  setTimeout(() => {
    btn.textContent = '✓ تم تأكيد طلبك بنجاح';
    btn.style.background = '#111';
    btn.style.opacity = '1';
  }, 1800);
}

// ---- Helpers ----
function formatPrice(amount) {
  return amount.toLocaleString('ar-SA');
}
