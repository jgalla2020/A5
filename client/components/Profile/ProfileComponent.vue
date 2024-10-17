<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentProfile, updatingProfile } = storeToRefs(useUserStore());

const deleteProfile = async () => {
  await fetchy("api/profile", "DELETE");
  currentProfile.value = undefined;
};

const updateProfile = async () => {
  updatingProfile.value = true;
};
</script>

<template>
  <h2>Your Profile Details</h2>
  <div>
    <div>Name: {{ currentProfile.name }}</div>
    <div>Contact: {{ currentProfile.contact }}</div>
    <div>Bio: {{ currentProfile.bio }}</div>
  </div>
  <div style="margin-top: 10px">
    <button type="button" @click="updateProfile" class="pure-button-primary pure-button" style="margin-right: 10px">Update Profile</button>
    <button type="button" @click="deleteProfile" class="pure-button-primary pure-button">Delete Profile</button>
  </div>
</template>

<style scoped>
h2,
div {
  text-align: center;
}
</style>
