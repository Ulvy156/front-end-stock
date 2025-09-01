<template>
  <article>
    <h3 class="gray">{{ $t("total_revenue") }}</h3>
    <h1 class="text-2xl">$84,346</h1>
  </article>
  <article>
    <h3 class="gray">{{ $t("total_expense") }}</h3>
    <h1 class="text-2xl">$8,346</h1>
  </article>
  <article>
    <h3 class="gray">{{ $t("total_customer") }}</h3>
    <h1 class="text-2xl">50 </h1>
  </article>
  <article style="border: none;">
    <h3 class="gray">{{ $t("total_order") }}</h3>
    <h1 class="text-2xl">50 </h1>
  </article>
</template>

<script setup lang="ts">
</script>


<style scoped>
article {
  display: grid;
  align-items: center;
  gap: 5px;
  border-right: 1px solid var(--text-gray);
}

article>svg {
  width: 50px;
  height: 50px;
  background: #ccb8b8;
  border-radius: 50px;
  padding: 10px;
  background: var(--green);
  color: white;
}

</style>
