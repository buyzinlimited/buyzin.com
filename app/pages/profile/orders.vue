<script setup>
import ProfileLayout from "./ProfileLayout.vue";
</script>

<template>
  <ProfileLayout>
    <SeoMeta
      title="My Account | Buyzin - Manage Your Orders & Profile in Bangladesh"
      description="Access your Buyzin account to view orders, track shipments, manage your profile, and update your preferences. Enjoy seamless online shopping in Bangladesh."
      keywords="Buyzin My Account, account management Bangladesh, order tracking, profile settings, online shopping dashboard, ecommerce account Bangladesh"
    />
    <div class="card">
      <div class="card__header">
        <h3 class="card__title">Orders</h3>
      </div>
      <div class="card__body">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Date</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>#1923</th>
              <td>Lenovo IdeaPad 3 15.6" Laptop - Sand</td>
              <td>Aug 15, 2020</td>
              <td>Paid</td>
              <td><span>Delivered</span></td>
              <td>$56.00</td>
              <td><span>...</span></td>
            </tr>
            <tr>
              <th>#1923</th>
              <td>Lenovo IdeaPad 3 15.6" Laptop - Sand</td>
              <td>Aug 15, 2020</td>
              <td>Paid</td>
              <td><span>Cancel</span></td>
              <td>$56.00</td>
              <td><span>...</span></td>
            </tr>
            <tr>
              <th>#1923</th>
              <td>Lenovo IdeaPad 3 15.6" Laptop - Sand</td>
              <td>Aug 15, 2020</td>
              <td>Paid</td>
              <td><span>In Progress</span></td>
              <td>$56.00</td>
              <td><span>...</span></td>
            </tr>
            <tr>
              <th>#1923</th>
              <td>Lenovo IdeaPad 3 15.6" Laptop - Sand</td>
              <td>Aug 15, 2020</td>
              <td>Paid</td>
              <td><span>Delivered</span></td>
              <td>$56.00</td>
              <td><span>...</span></td>
            </tr>
            <tr>
              <th>#1923</th>
              <td>Lenovo IdeaPad 3 15.6" Laptop - Sand</td>
              <td>Aug 15, 2020</td>
              <td>Paid</td>
              <td><span>Cancel</span></td>
              <td>$56.00</td>
              <td><span>...</span></td>
            </tr>
            <tr>
              <th>#1923</th>
              <td>Lenovo IdeaPad 3 15.6" Laptop - Sand</td>
              <td>Aug 15, 2020</td>
              <td>Paid</td>
              <td><span>In Progress</span></td>
              <td>$56.00</td>
              <td><span>...</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </ProfileLayout>
</template>

<style scoped></style>
