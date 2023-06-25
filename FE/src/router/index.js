import { createRouter, createWebHistory } from "vue-router";

//admin
import AddCategory from "../views/Admin/Category/AddCategory.vue";
import CategoryAdmin from "../views/Admin/Category/Category.vue";
import EditCategory from "../views/Admin/Category/EditCategory.vue";
import ShowDetails from "../views/user/Product/ShowDetails.vue";
import EditProduct from "../views/Admin/Product/EditProduct.vue";

import SignupUpForm from "../views/user/SignupUpForm.vue";
import SigninUpForm from "../views/user/SigninUpForm.vue";

import HomeView from "../views/HomeView.vue";
import Category from "../views/user/Category/Category.vue";
import Product from "../views/user/Product/Product.vue";
import ListProducts from "../views/user/Product/ListProducts.vue";
import NewsView from "../views/user/News/NewsView.vue";
import CareerView from "../views/user/Career/CareerView.vue";

import WishList from "../views/user/Wishlist.vue";

import CartView from "../views/user/CartView/CartView.vue";
import CheckOut from "../views/user/CartView/CheckOut.vue";
import CheckOutMobile from "../views/user/CartView/CheckOutMobile.vue";
import MobileCheckouTrue from "../views/user/CartView/MobileCheckouTrue.vue";

import FailedPayment from "../views/Helper/Payment/FailedPayment.vue";
import SuccessPayment from "../views/Helper/Payment/SuccessPayment.vue";

import OrderDetail from "../views/user/Order/OrderDetail.vue";
import OrderView from "../views/user/Order/OrderView.vue";

import SearchView from "../views/user/SearchPage/SearchView.vue";

import AdminView from "../views/Admin/AdminView.vue";
import ProductAdmin from "../views/Admin/Product/Product.vue";
import AddProduct from "../views/Admin/Product/AddProduct.vue";
import OrderAdmin from "../views/Admin/OrderAdmin/OrderAdmin.vue";
import OrderAdminDetail from "../views/Admin/OrderAdmin/OrderAdminDetail.vue";
import UserManager from "../views/Admin/User/UserManager.vue";
import EditUserManager from "../views/Admin/User/EditUserManager.vue";

import ProfileView from "../views/user/Profile/ProfileView.vue";
import ChangePassword from "../views/user/Profile/ChangePassword.vue";
import EditProfile from "../views/user/Profile/EditProfile.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: {
      title: "HomePage",
    },
  },
  //Product routes
  {
    path: "/product",
    name: "Product",
    component: Product,
  },
  {
    path: "/news",
    name: "NewsView",
    component: NewsView,
  },
  {
    path: "/news",
    name: "NewsView",
    component: NewsView,
  },
  {
    path: "/career",
    name: "CareerView",
    component: CareerView,
  },
  {
    path: "/category",
    name: "Category",
    component: Category,
  },
  {
    path: "/category/show/:id",
    name: "ListProducts",
    component: ListProducts,
  },
  {
    path: "/wishlist",
    name: "WishList",
    component: WishList,
  },
  {
    path: "/about",
    name: "about",
    meta: {
      title: "About",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/signup",
    name: "SignupUpForm",
    component: SignupUpForm,
    meta: {
      title: "Signup",
    },
  },
  {
    path: "/signin",
    name: "SigninUpForm",
    component: SigninUpForm,
    meta: {
      title: "SigninUpForm",
    },
  },
  {
    path: "/admin/category/add",
    name: "AddCategory",
    component: AddCategory,
    meta: {
      title: "Introduce",
    },
  },
  {
    path: "/admin/category/:id",
    name: "EditCategory",
    component: EditCategory,
    meta: {
      title: "Introduce",
    },
  },
  {
    path: "/admin/category",
    name: "CategoryAdmin",
    component: CategoryAdmin,
    meta: {
      title: "Manager category",
    },
  },
  {
    path: "/product/show/:id",
    name: "ShowDetails",
    component: ShowDetails,
    meta: {
      title: "Product :id",
    },
  },
  {
    path: "/admin/product/:id",
    name: "EditProduct",
    component: EditProduct,
  },
  {
    path: "/cart",
    name: "CartView",
    component: CartView,
  },
  {
    path: "/checkout",
    name: "CheckOut",
    component: CheckOut,
  },
  {
    path: "/checkoutmobile/:token",
    name: "CheckOutMobile",
    component: CheckOutMobile,
  },
  {
    path: "/mobilecheckouttrue",
    name: "MobileCheckouTrue",
    component: MobileCheckouTrue,
  },
  {
    path: "/payment/success",
    name: "SuccessPayment",
    component: SuccessPayment,
  },
  {
    path: "/payment/failed",
    name: "FailedPayment",
    component: FailedPayment,
  },
  {
    path: "/order/",
    name: "OrderView",
    component: OrderView,
  },
  {
    path: "/order/:id",
    name: "OrderDetail",
    component: OrderDetail,
  },
  {
    path: "/search/:string",
    name: "SearchView",
    component: SearchView,
    meta: {
      title: "Search",
    },
  },
  {
    path: "/admin",
    name: "AdminView",
    component: AdminView,
    meta: {
      title: "AdminView",
    },
  },
  {
    path: "/admin/product",
    name: "ProductAdmin",
    component: ProductAdmin,
    meta: {
      title: "Product Admin",
    },
  },
  {
    path: "/admin/product/add",
    name: "AddProduct",
    component: AddProduct,
    meta: {
      title: "Add prodcut Admin",
    },
  },
  {
    path: "/admin/order",
    name: "OrderAdmin",
    component: OrderAdmin,
    meta: {
      title: "Order Admin",
    },
  },
  {
    path: "/admin/order/:id",
    name: "OrderAdminDetail",
    component: OrderAdminDetail,
    meta: {
      title: "Order Detail Admin",
    },
  },
  {
    path: "/admin/user",
    name: "UserManager",
    component: UserManager,
    meta: {
      title: "User Manager Admin",
    },
  },
  {
    path: "/admin/user/edit/:id",
    name: "EditUserManager",
    component: EditUserManager,
    meta: {
      title: "Edit User Manager Admin",
    },
  },
  {
    path: "/profile",
    name: "ProfileView",
    component: ProfileView,
    meta: {
      title: "Profile View",
    },
  },
  {
    path: "/changepassword",
    name: "ChangePassword",
    component: ChangePassword,
    meta: {
      title: "change password View",
    },
  },
  {
    path: "/editprofile",
    name: "EditProfile",
    component: EditProfile,
    meta: {
      title: "edit profile View",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
    ? to.meta.title + " - OnePieceWonderland"
    : "OnePieceWonderland";
  next();
});

export default router;
