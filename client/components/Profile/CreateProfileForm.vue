<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const name = ref(undefined);
const contact = ref(undefined);
const bio = ref(undefined);

const { getProfile } = useUserStore();
const createProfile = async (name: string, contact: string, bio: string) => {
  try {
    await fetchy("api/profile", "POST", {
      body: { name, contact, bio },
    });
  } catch (_) {
    return;
  }
};

async function create() {
  await createProfile(name.value, contact.value, bio.value);
  await getProfile();
}
</script>

<template>
  <h2>Please Create Your Profile</h2>
  <form @submit.prevent="create">
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

    <button type="submit" class="pure-button-primary pure-button">Create Profile</button>
  </form>
</template>

<style scoped>
h2,
form {
  text-align: center;
}
</style>
