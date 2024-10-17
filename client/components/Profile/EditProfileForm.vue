<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentProfile, updatingProfile } = storeToRefs(useUserStore());

const name = currentProfile.name;
const contact = currentProfile.contact;
const bio = currentProfile.bio;

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

async function update() {
  await updateProfile(name.value, contact.value, bio.value);
  await getProfile();
}

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
    <button type="button" @click="update" class="pure-button-primary pure-button">Update Profile</button>
  </form>
</template>

<style scoped>
h2,
form {
  text-align: center;
}
</style>
