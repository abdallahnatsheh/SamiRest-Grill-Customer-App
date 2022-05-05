const onboarding_screens = [
  {
    id: 1,
    backgroundImage: require("../assets/images/background_01.png"),
    bannerImage: require("../assets/images/favourite_food.png"),
    title: "Choose a Favourite Food",
    description:
      "When you oder Eat Steet, we’ll hook you up with exclusive coupon, specials and rewards",
  },
  {
    id: 2,
    backgroundImage: require("../assets/images/background_02.png"),
    bannerImage: require("../assets/images/hot_delivery.png"),
    title: "Hot Delivery to Home",
    description:
      "We make food ordering fasr, simple and free-no matter if you order online or cash",
  },
  {
    id: 3,
    backgroundImage: require("../assets/images/background_01.png"),
    bannerImage: require("../assets/images/great_food.png"),
    title: "Receive the Great Food",
    description:
      "You’ll receive the great food within a hour. And get free delivery credits for every order.",
  },
];

const screens = {
  main_layout: "MainLayout",
  home: "صفحة رئيسية",
  search: "البحث",
  cart: "السلة",
  favourite: "المفضل",
  notification: "الاشعارات",
  my_wallet: "المحفظة",
  mainMenu: "قائمة الوجبات",
  dailyDeals: "العروض اليومية",
  specialOrders: "الطلبات الخاصة",
  myorders: "طلباتي",
  settings: "الاعدادات",
  support: "الدعم الفني",
  myspecialorders: "طلباتي الخاصة",
};

const bottom_tabs = [
  {
    id: 0,
    label: screens.home,
  },
  {
    id: 1,
    label: screens.mainMenu,
  },
  {
    id: 2,
    label: screens.cart,
  },
  {
    id: 3,
    label: screens.dailyDeals,
  },
  {
    id: 4,
    label: screens.specialOrders,
  },
];
const delivery_time = [
  {
    id: 1,
    label: "10 Mins",
  },
  {
    id: 2,
    label: "20 Mins",
  },
  {
    id: 3,
    label: "30 Mins",
  },
];

const ratings = [
  {
    id: 1,
    label: 1,
  },
  {
    id: 2,
    label: 2,
  },
  {
    id: 3,
    label: 3,
  },
  {
    id: 4,
    label: 4,
  },
  {
    id: 5,
    label: 5,
  },
];

const tags = [
  {
    id: 1,
    label: "Burger",
  },
  {
    id: 2,
    label: "Fast Food",
  },
  {
    id: 3,
    label: "Pizza",
  },
  {
    id: 4,
    label: "Asian",
  },
  {
    id: 5,
    label: "Dessert",
  },
  {
    id: 6,
    label: "Breakfast",
  },
  {
    id: 7,
    label: "Vegetable",
  },
  {
    id: 8,
    label: "Taccos",
  },
];

const track_order_status = [
  {
    id: 1,
    title: "قائمة الإنتظار",
    sub_title: "طلبك في قائمة الانتظار حاليا",
  },
  {
    id: 2,
    title: "في المطبخ",
    sub_title: "يتم طبخ طلبك حاليا",
  },
  {
    id: 3,
    title: "في الطريق",
    sub_title: "طلبك في الطريق!",
  },
  {
    id: 4,
    title: "تم التوصيل",
    sub_title: "صحتين وعافية,تم توصيل طلبك",
  },
];
const track_special_order_status = [
  {
    id: 1,
    title: "قائمة الإنتظار",
    sub_title: "طلبك في قائمة الانتظار حاليا",
  },
  {
    id: 2,
    title: "في المطبخ",
    sub_title: "يتم طبخ طلبك حاليا",
  },
  {
    id: 3,
    title: "جاهز",
    sub_title: "طلبك جاهز تعال واستلمه !",
  },
];

const tips = [
  {
    id: 1,
    label: "No Tips",
    value: 0,
  },
  {
    id: 2,
    label: "$5",
    value: 5,
  },
  {
    id: 3,
    label: "$10",
    value: 10,
  },
  {
    id: 4,
    label: "$15",
    value: 15,
  },
  {
    id: 5,
    label: "$20",
    value: 20,
  },
];

const gender = [
  {
    id: 0,
    label: "ذكر",
    value: "ذكر",
  },
  {
    id: 1,
    label: "انثى",
    value: "انثى",
  },
];

const state = [
  {
    id: 0,
    label: "Sarawak",
    value: "Sarawak",
  },
  {
    id: 1,
    label: "Sabah",
    value: "Sabah",
  },
  {
    id: 2,
    label: "Johor",
    value: "Johor",
  },
  {
    id: 3,
    label: "Kedah",
    value: "Kedah",
  },
  {
    id: 4,
    label: "Kelantan",
    value: "Kelantan",
  },
  {
    id: 5,
    label: "Penang",
    value: "Penang",
  },
];

const GOOGLE_MAP_API_KEY = "";

export default {
  onboarding_screens,
  screens,
  bottom_tabs,
  delivery_time,
  ratings,
  tags,
  track_order_status,
  track_special_order_status,
  tips,
  gender,
  state,
  GOOGLE_MAP_API_KEY,
};
