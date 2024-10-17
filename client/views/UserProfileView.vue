<script setup lang="ts">
import ProfileComponent from "@/components/Profile/ProfileComponent.vue";
import CreateProfileForm from "@/components/Profile/CreateProfileForm.vue";
import EditProfileForm from "@/components/Profile/EditProfileForm.vue";

import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { hasProfile, updatingProfile } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <h1>User Profile</h1>
    <section v-if="hasProfile">
      <ProfileComponent />
    </section>
    <section v-else-if="updatingProfile">
      <EditProfileForm />
    </section>
    <section v-else>
      <CreateProfileForm />
    </section>
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
