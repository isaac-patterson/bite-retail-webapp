import LandingPage from "../pages/LandingPage/LandingPage";
import OrdersPage from "../pages/OrdersPage/OrdersPage";
import ErrorNotFound from "../pages/ErrorNotFound/ErrorNotFound";
import HistoryPage from "../pages/HistoryPage/HistoryPage";
import BiteDrawer from "../pages/Drawer/Drawer"
import EditMenuPage from "../pages/EditMenuPage/EditMenuPage"
import EditRestaurantPage from "../pages/EditRestaurantPage/EditRestaurantPage"
import EditCouponsPage from "../pages/EditCouponsPage/EditCouponsPage"

export const LANDING_PAGE = {
    name: "landingPage",
    label: "Landing Page",
    path: "/",
    exact: true,
    component: LandingPage,
}

export const BITE_DRAWER = {
    name: "biteDrawer",
    label: "Bite Drawer",
    path: "/menu",
    exact: true,
    component: BiteDrawer,
}

export const ORDERS_PAGE = {
    name: "ordersPage",
    label: "Orders",
    path: "orders",
    exact: true,
    component: OrdersPage,
}

export const HISTORY_PAGE = {
    name: "historyPage",
    label: "History",
    path: "history",
    exact: true,
    component: HistoryPage,
}

export const EDIT_MENU_PAGE = {
    name: "editMenuPage",
    label: "Edit Menu",
    path: "editMenu",
    exact: true,
    component: EditMenuPage,
}

export const EDIT_RESTAURANT_PAGE = {
    name: "editRestaurantPage",
    label: "Edit Restaurant",
    path: "editRestaurant",
    exact: true,
    component: EditRestaurantPage,
}

export const EDIT_COUPONS_PAGE = {
    name: "editCouponsPage",
    label: "Edit Coupons",
    path: "editCoupons",
    exact: true,
    component: EditCouponsPage,
}

export const NOT_FOUND = {
    component: ErrorNotFound,

}

const exports = {
    BITE_DRAWER, LANDING_PAGE, ORDERS_PAGE, HISTORY_PAGE, NOT_FOUND, EDIT_MENU_PAGE, EDIT_RESTAURANT_PAGE
}

export default exports