// Simple frontend shop with localStorage cart
const PAYPAL_LINK = 'REPLACE_WITH_PAYPAL_LINK'; // replace with your PayPal.Me or payment link

function qs(sel, ctx=document){return ctx.querySelector(sel)}
function qsa(sel, ctx=document){return Array.from(ctx.querySelectorAll(sel))}

let cart = JSON.parse(localStorage.getItem('ff_cart')||'{}');

function saveCart(){localStorage.setItem('ff_cart', JSON.stringify(cart)); updateCartUI();}

function updateCartUI(){
  const count = Object.values(cart).reduce((s,i)=>s+i.qty,0);
  qs('#cart-count').textContent = count;
  const contents = qs('#cart-contents');
  contents.innerHTML = '';
  let total = 0;
  if(count===0){contents.innerHTML = '<p>Dein Warenkorb ist leer.</p>'}
  else{
    const table = document.createElement('div');
    for(const id in cart){
      const item = cart[id];
      total += item.qty * item.price;
      const node = document.createElement('div');
      node.className = 'cart-item';
      node.innerHTML = `<strong>${item.title}</strong> — ${item.price}💰 × ${item.qty} <button data-id="${id}" class="remove btn">Entfernen</button>`;
      table.appendChild(node);
    }
    contents.appendChild(table);
  }
  qs('#cart-total').textContent = total;
}

function addListeners(){
  qsa('.card').forEach(card=>{
    const id = card.dataset.id;
    const price = Number(card.dataset.price||0);
    const title = card.querySelector('h4')?.textContent || id;
    card.querySelector('.add')?.addEventListener('click', ()=>{
      if(!cart[id]) cart[id] = {id, title, price, qty:0};
      const stock = Number(card.dataset.stock||9999);
      if(cart[id].qty+1 > stock){ alert('Nicht genügend Bestand (Frontend-Sperre).'); return }
      cart[id].qty++;
      saveCart();
    });
  });

  qs('#checkout').addEventListener('click', ()=>{
    const total = Number(qs('#cart-total').textContent||0);
    if(total<=0){alert('Dein Warenkorb ist leer.');return}
    // Open PayPal link in new tab; instruct user to set PAYPAL_LINK
    if(PAYPAL_LINK === 'REPLACE_WITH_PAYPAL_LINK'){
      const summary = Object.values(cart).map(i=>`${i.title} x${i.qty} = ${i.price*i.qty}💰`).join('\n');
      alert('Zahlungs-Link fehlt. Bitte ersetze PAYPAL_LINK in script.js mit deinem PayPal-Link.\n\nBestellung summary:\n'+summary+'\n\nGesamt: '+total+'💰');
      return;
    }
    // If using PayPal.Me, you can append /AMOUNT (example). Open link in new tab.
    const url = PAYPAL_LINK.includes('paypal.me') ? `${PAYPAL_LINK}/${total}` : PAYPAL_LINK;
    window.open(url, '_blank');
  });

  document.addEventListener('click', (e)=>{
    if(e.target.matches('.remove')){
      const id = e.target.dataset.id;
      delete cart[id]; saveCart();
    }
  });
}

// init
addListeners(); updateCartUI();
