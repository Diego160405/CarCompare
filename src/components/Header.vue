<template>
  <header class="header">
    <RouterLink to="/home" class="logo">CarCompare</RouterLink>

    <nav class="nav">
      <RouterLink to="/browse" class="nav-link">Browse</RouterLink>
      <RouterLink to="/compare" class="nav-link">Compare</RouterLink>
    </nav>

    <RouterLink to="/login" class="auth-btn">Sign up / Login</RouterLink>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px 0 8px;
  height: 64px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
}

.logo {
  font-size: 1.25rem;
  font-weight: 700;
  color: navy;
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 32px;
}

.nav-link {
  color: navy;
  text-decoration: none;
  font-size: 1rem;
}

.nav-link.router-link-active {
  text-decoration: underline;
  text-decoration-thickness: 2px;
  font-weight: 700;
}

.auth-btn {
  background: navy;
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  font-size: 0.95rem;
  border-radius: 4px;
}
</style>
