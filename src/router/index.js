import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactView from '../views/ContactView.vue'
import AboutView from '../views/AboutView.vue'
import BlogView from '../views/BlogView.vue'
import ProductsView from '../views/ProductsView.vue'
import AdminLayout from '../layouts/AdminLayout.vue'
import DashboardView from '../views/admin/DashboardView.vue'
import PostsView from '../views/admin/PostsView.vue'
import CategoriesView from '../views/admin/CategoriesView.vue'
import CommentsView from '../views/admin/CommentsView.vue'
import LoginView from '../views/LoginView.vue'
import SettingsView from '../views/admin/Settings.vue'
import ProductsAdminView from '../views/admin/Products.vue'
import OrdersView from '../views/admin/Orders.vue'
import CustomersView from '../views/admin/Customers.vue'
import CouponsView from '../views/admin/Coupons.vue'
import CampaignsView from '../views/admin/Campaigns.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/blog',
    name: 'blog',
    component: BlogView
  },
  {
    path: '/blog/:slug',
    name: 'blog-detail',
    component: () => import('../views/BlogDetailView.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: '',
        redirect: '/admin/dashboard'
      },
      {
        path: 'dashboard',
        component: DashboardView
      },
      {
        path: 'posts',
        component: PostsView
      },
      {
        path: 'categories',
        component: CategoriesView
      },
      {
        path: 'comments',
        component: CommentsView
      },
      {
        path: 'settings',
        component: SettingsView
      },
      {
        path: 'products',
        component: ProductsAdminView
      },
      {
        path: 'orders',
        component: OrdersView
      },
      {
        path: 'customers',
        component: CustomersView
      },
      {
        path: 'coupons',
        component: CouponsView
      },
      {
        path: 'campaigns',
        component: CampaignsView
      }
    ],
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Auth kontrolü
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Auth kontrolü yapılacak
    const isAuthenticated = false // Store'dan kontrol edilecek
    if (!isAuthenticated) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router