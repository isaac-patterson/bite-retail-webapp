import { RouteProps } from "react-router";
import { HISTORY_PAGE, NOT_FOUND, ORDERS_PAGE, LANDING_PAGE, BITE_DRAWER, EDIT_MENU_PAGE, EDIT_RESTAURANT_PAGE, EDIT_COUPONS_PAGE } from "../constants/RouteConstants";

interface RoutePropsMap {
    [key: string]: RouteProps;
}

const routes: RoutePropsMap = {
    landingPage: {
        path: LANDING_PAGE.path,
        exact: LANDING_PAGE.exact,
        component: LANDING_PAGE.component,
    },
    ordersPage: {
        path: ORDERS_PAGE.path,
        exact: ORDERS_PAGE.exact,
        component: ORDERS_PAGE.component,

    },
    historyPage: {
        path: HISTORY_PAGE.path,
        exact: HISTORY_PAGE.exact,
        component: HISTORY_PAGE.component,

    },
    biteDrawer: {
        path: BITE_DRAWER.path,
        exact: BITE_DRAWER.exact,
        component: BITE_DRAWER.component,

    },
    editMenuPage: {
        path: EDIT_MENU_PAGE.path,
        exact: EDIT_MENU_PAGE.exact,
        component: EDIT_MENU_PAGE.component,
    },
    editRestaurantPage: {
        path: EDIT_RESTAURANT_PAGE.path,
        exact: EDIT_RESTAURANT_PAGE.exact,
        component: EDIT_RESTAURANT_PAGE.component,
    },
    editCouponsPage: {
        path: EDIT_COUPONS_PAGE.path,
        exact: EDIT_COUPONS_PAGE.exact,
        component: EDIT_COUPONS_PAGE.component,
    },
    notFound: {
        component: NOT_FOUND.component,
    }
};

export default routes;