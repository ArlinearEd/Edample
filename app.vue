<template>
<main>
  <!-- GOOGLE FONTS -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
      href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,300;0,500;0,700;0,800;1,300;1,500;1,700;1,800&family=Martel:wght@400;700&display=swap"
      rel="stylesheet"
  />

  <!-- KATEX - MATH TEXT -->
  <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/katex@0.16.3/dist/katex.css"
      integrity="sha384-yW1frltt4cd2K6QCmOMx4M+ylOmyrGb+NDouZ1f5VL2f4NN7uBu5PQsmUSgWib1W"
      crossorigin="anonymous"
  />

  <div class="bg-gray-50 min-h-screen">
      <NuxtLayout>
          <NuxtPage />
      </NuxtLayout>
  </div>
</main>
</template>
