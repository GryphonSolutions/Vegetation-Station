const user = 'Thomas';
const offers = [
  { buyer: user, seller: 'Matt', buyerPlant: 'Artichoke', sellerPlant: 'Turnip', isOpen: 'true', reason: '' },
  { buyer: user, seller: 'Matt', buyerPlant: 'Cabbage', sellerPlant: 'Tumeric', isOpen: 'true', reason: '' },
  { buyer: user, seller: 'Matt', buyerPlant: 'Beetroot', sellerPlant: 'Watercress', isOpen: 'true', reason: '' },
  { buyer: user, seller: 'Matt', buyerPlant: 'Rhubarb', sellerPlant: 'Garlic', isOpen: 'true', reason: '' },
  { buyer: user, seller: 'Matt', buyerPlant: 'Beetroot', sellerPlant: 'Watercress', isOpen: 'true', reason: '' },
  { buyer: user, seller: 'Matt', buyerPlant: 'Rhubarb', sellerPlant: 'Garlic', isOpen: 'true', reason: '' },
  { buyer: user, seller: 'Matt', buyerPlant: 'Beetroot', sellerPlant: 'Watercress', isOpen: 'true', reason: '' },
];
const requests = [
  { buyer: 'Matt', seller: user, buyerPlant: 'Mushroom', sellerPlant: 'Eggplant', isOpen: 'true', reason: '' },
  { buyer: 'Matt', seller: user, buyerPlant: 'Onion', sellerPlant: 'Cauliflower', isOpen: 'true', reason: '' },
  { buyer: 'Matt', seller: user, buyerPlant: 'Potatoe', sellerPlant: 'Brussels sprouts', isOpen: 'true', reason: '' },
  { buyer: 'Matt', seller: user, buyerPlant: 'Okra', sellerPlant: 'Broccoli', isOpen: 'true', reason: '' },
  { buyer: 'Matt', seller: user, buyerPlant: 'Mushroom', sellerPlant: 'Eggplant', isOpen: 'true', reason: '' },
  { buyer: 'Matt', seller: user, buyerPlant: 'Onion', sellerPlant: 'Cauliflower', isOpen: 'true', reason: '' },
  { buyer: 'Matt', seller: user, buyerPlant: 'Potatoe', sellerPlant: 'Brussels sprouts', isOpen: 'true', reason: '' },
  { buyer: 'Matt', seller: user, buyerPlant: 'Okra', sellerPlant: 'Broccoli', isOpen: 'true', reason: '' },
];

export default { user, offers, requests };
