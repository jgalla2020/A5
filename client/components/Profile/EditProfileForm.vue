<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { updatingProfile } = storeToRefs(useUserStore());

const { getProfile } = useUserStore();

const updateProfile = async (name: string, contact: string, bio: string) => {
  try {
    await fetchy("api/profile", "PATCH", {
      body: { name, contact, bio },
    });
  } catch (_) {
    return;
  }
};

async function back() {
  updatingProfile.value = false;
}
</script>

<template>
  <h2>Update Your Profile</h2>
  <form @submit.prevent="update">
    <div>
      <label for="Name">Name:</label>
      <input id="Name" type="text" v-model="name" required />
    </div>

    <div>
      <label for="Contact">Contact:</label>
      <input id="Contact" type="text" v-model="contact" />
    </div>

    <div>
      <label for="Bio">Bio:</label>
      <textarea id="Bio" v-model="bio"> </textarea>
    </div>

    <button type="button" @click="back" class="pure-button-primary pure-button" style="margin-right: 10px">Cancel</button>
  </form>
</template>

<style scoped>
h2,
form {
  text-align: center;
}
</style>
