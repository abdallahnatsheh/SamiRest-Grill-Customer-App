const myProfile = {
  name: "عبدالله النتشة",
  profile_image: require("../assets/images/profile.png"),
  address: "القدس , بيت حنينا , شارع الاصمعي 6",
};

const categories = [
  {
    id: 1,
    name: "وجبات سريعة",
    icon: require("../assets/icons/burger.png"),
  },
  {
    id: 2,
    name: "فواكه",
    icon: require("../assets/icons/cherry.png"),
  },
  {
    id: 3,
    name: "أرز",
    icon: require("../assets/icons/rice.png"),
  },
];

const hamburger = {
  id: 1,
  name: "برغر",
  info: "برغر بلحم الدجاج",
  categories: [1, 2],
  calories: 78,
  isFavourite: true,
  img: require("../assets/dummyData/hamburger.png"),
  price: {
    addons: [],
    defaultPrice: { enabled: true, value: 15.99 },
    types: [
      { name: "لاتا", value: 8 },
      { name: "ضصثضصث", value: 10 },
    ],
  },
  deals: {
    dailyDealEnable: false,
    enabled: false,
    fromDate: "",
    toDate: "",
    value: 10,
  },
};

const hotTacos = {
  id: 2,
  name: "تاكو حار",
  info: "تاكو المكسيكي",
  categories: [1, 3],
  calories: 78,
  isFavourite: false,
  img: require("../assets/dummyData/hot_tacos.png"),
  price: {
    addons: [
      { name: "سيبسيب", value: 2 },
      { name: "ابل", value: 5 },
      { name: "ضص", value: 1 },
      { name: "يبلبي", value: 6 },
    ],
    defaultPrice: { enabled: false, value: 10.99 },
    types: [
      { name: "لاتا", value: 7 },
      { name: "عغنت", value: 2 },
      { name: "يبلارىلبي", value: 5 },
      { name: "صثق", value: 8 },
      { name: "سئ", value: 8 },
      { name: "نلا", value: 8 },
    ],
  },
  deals: {
    dailyDealEnable: false,
    enabled: true,
    fromDate: "",
    toDate: "",
    value: 10,
  },
};

const vegBiryani = {
  id: 3,
  name: "برياني نباتي",
  info: "طبق الأرز المفضل من التوابل والخضروات المشهورة والذي يتم تحضيره عادةً عن طريق وضع مرق البرياني والأرز البسمتي في وعاء مسطح القاع.",
  categories: [1, 2, 3],
  calories: 78,
  isFavourite: true,
  img: require("../assets/dummyData/veg_biryani.png"),
  price: {
    addons: [
      { name: "سيبسيب", value: 2 },
      { name: "يبلبي", value: 5 },
    ],
    defaultPrice: { enabled: false, value: 10.99 },
    types: [],
  },
  deals: {
    dailyDealEnable: true,
    enabled: true,
    fromDate: "",
    toDate: "",
    value: 10,
  },
};

const wrapSandwich = {
  id: 4,
  name: "ساندوتش راب",
  info: "ساندوتش خضار مشوي",
  categories: [1, 2],
  calories: 78,
  isFavourite: true,
  img: require("../assets/dummyData/wrap_sandwich.png"),
  price: {
    addons: [],
    defaultPrice: { enabled: true, value: 10.99 },
    types: [],
  },
  deals: {
    dailyDealEnable: false,
    enabled: false,
    fromDate: "",
    toDate: "",
    value: 10,
  },
};

const menu = [hamburger, hotTacos, vegBiryani, wrapSandwich];

const sizes = [
  {
    id: 1,
    label: '12"',
  },
  {
    id: 2,
    label: '14"',
  },
  {
    id: 3,
    label: '16"',
  },
  {
    id: 4,
    label: '18"',
  },
];

const myCart = [
  {
    ...hamburger,
    qty: 1,
  },
  { ...wrapSandwich, qty: 1 },
  {
    ...hotTacos,
    qty: 1,
  },
  {
    ...vegBiryani,
    qty: 1,
  },
];

const myCards = [
  {
    id: 1,
    name: "Master Card",
    icon: require("../assets/icons/mastercard.png"),
    card_no: "1234",
  },
  {
    id: 2,
    name: "Google Pay",
    icon: require("../assets/icons/google.png"),
    card_no: "1234",
  },
];

const allCards = [
  {
    id: 1,
    name: "Apple Pay",
    icon: require("../assets/icons/apple.png"),
  },
  {
    id: 2,
    name: "Visa",
    icon: require("../assets/icons/visa.png"),
  },
  {
    id: 3,
    name: "PayPal",
    icon: require("../assets/icons/paypal.png"),
  },
  {
    id: 4,
    name: "Google Pay",
    icon: require("../assets/icons/google.png"),
  },
  {
    id: 5,
    name: "Master Card",
    icon: require("../assets/icons/mastercard.png"),
  },
];

const fromLocs = [
  {
    latitude: 31.759206980026935,
    longitude: 35.248937760536805,
  },
  {
    latitude: 31.759206980026935,
    longitude: 35.248937760536805,
  },
  {
    latitude: 31.759206980026935,
    longitude: 35.248937760536805,
  },
  {
    latitude: 1.5578068150528928,
    longitude: 110.35482523764315,
  },
  {
    latitude: 1.558050496260768,
    longitude: 110.34743759630511,
  },
  {
    latitude: 1.5573478487252896,
    longitude: 110.35568783282145,
  },
];

const kfc = require("../assets/dummyData/kfc.png");
const pizzaHut = require("../assets/dummyData/pizza_hut.png");
const mcDonald = require("../assets/dummyData/mcdonald.png");
const burgerKing = require("../assets/dummyData/burger_king.png");
const domino = require("../assets/dummyData/domino_pizza.png");
const starbucks = require("../assets/dummyData/starbucks.png");
const veg_biryani = require("../assets/dummyData/veg_biryani.png");
const wrap_sandwich = require("../assets/dummyData/wrap_sandwich.png");

const orderHistories = [
  {
    title: "19 Sep 2021",
    data: [
      {
        id: 18888,
        name: "Pizza Hut",
        image: pizzaHut,
        price: 35.3,
        status: "D",
        status_desc: "Order Delivered",
        itemCount: 3,
        deliveredTime: "19 Sep, 14:30",
      },
      {
        id: 28888,
        name: "KFC",
        image: kfc,
        price: 55.0,
        status: "D",
        status_desc: "Order Delivered",
        itemCount: 4,
        deliveredTime: "19 Sep, 12:30",
      },
      {
        id: 38888,
        name: "Domino's Pizza",
        image: domino,
        price: 15.5,
        status: "C",
        status_desc: "Order Cancel",
        itemCount: 1,
        deliveredTime: "19 Sep, 10:30",
      },
    ],
  },
  {
    title: "15 Sep 2021",
    data: [
      {
        id: 48888,
        name: "Starbucks",
        image: starbucks,
        price: 40.0,
        status: "D",
        status_desc: "Order Delivered",
        itemCount: 4,
        deliveredTime: "15 Sep, 10:00",
      },
    ],
  },
];

const upcomingOrders = [
  {
    title: "",
    data: [
      {
        id: 88888,
        name: "Starbucks",
        image: starbucks,
        price: 10.0,
        status: "O",
        status_desc: "Food on the way",
        itemCount: 4,
        deliveredTime: "27 Sep, 10:00",
      },
      {
        id: 98888,
        name: "McDonald",
        image: mcDonald,
        price: 20.0,
        status: "O",
        status_desc: "Food on the way",
        itemCount: 4,
        deliveredTime: "27 Sep, 10:00",
      },
    ],
  },
  {
    title: "Latest Orders",
    data: [
      {
        id: 68888,
        name: "Starbucks",
        image: starbucks,
        price: 10.0,
        status: "D",
        status_desc: "Order Delivered",
        itemCount: 4,
        deliveredTime: "27 Sep, 10:00",
      },
      {
        id: 78888,
        name: "Burger King",
        image: burgerKing,
        price: 12.0,
        status: "D",
        status_desc: "Order Delivered",
        itemCount: 4,
        deliveredTime: "27 Sep, 8:00",
      },
    ],
  },
];

const availableCoupons = [
  {
    id: 1,
    name: "Burger King",
    image: burgerKing,
    description: "Valid until 01 Jan 2022",
    discountPercent: 20,
  },
  {
    id: 2,
    name: "KFC",
    image: kfc,
    description: "Valid until 01 Jan 2022",
    discountPercent: 10,
  },
  {
    id: 3,
    name: "Pizza Hut",
    image: pizzaHut,
    description: "Valid until 01 Feb 2022",
    discountPercent: 35,
  },
  {
    id: 4,
    name: "Starbucks",
    image: starbucks,
    description: "Valid until 01 Feb 2022",
    discountPercent: 15,
  },
  {
    id: 5,
    name: "Domino's Pizza",
    image: domino,
    description: "Valid until 01 Feb 2022",
    discountPercent: 30,
  },
];

const usedCoupons = [
  {
    id: 1,
    name: "Burger King",
    image: burgerKing,
    description: "Used on 2 Sep 2021",
    discountPercent: 20,
  },
  {
    id: 2,
    name: "Starbucks",
    image: starbucks,
    description: "Used on 18 Sep 2021",
    discountPercent: 15,
  },
];

const notifications = [
  {
    title: "Today",
    data: [
      {
        id: 1,
        image: domino,
        title: "Domino's - Buy 1 get 1 free",
        desc: "Buy 1 get 1 free for small sizes until Nov 30, 2021",
        duration: "a few seconds ago",
      },
      {
        id: 2,
        image: veg_biryani,
        title: "Veg Biryani - 35% sale today",
        desc: "Buy 1 get 1 free for small sizes until Nov 30, 2021",
        duration: "5 mins ago",
      },
    ],
  },
  {
    title: "Yesterday",
    data: [
      {
        id: 3,
        image: domino,
        title: "Domino's - Buy 1 get 1 free",
        desc: "Buy 1 get 1 free for small sizes until Nov 30, 2021",
        duration: "1 day ago",
      },
      {
        id: 4,
        image: veg_biryani,
        title: "Veg Biryani - 35% sale today",
        desc: "Buy 1 get 1 free for small sizes until Nov 30, 2021",
        duration: "1 day ago",
      },
    ],
  },
];

const deliveryMan = {
  name: "Williams Adam",
  avatar: require("../assets/dummyData/delivery_man.png"),
};

export default {
  myProfile,
  categories,
  menu,
  sizes,
  myCart,
  myCards,
  allCards,
  fromLocs,
  orderHistories,
  upcomingOrders,
  availableCoupons,
  usedCoupons,
  notifications,
  deliveryMan,
  kfc,
  domino,
};
