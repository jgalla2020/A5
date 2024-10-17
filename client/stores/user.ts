import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { fetchy } from "@/utils/fetchy";

export const useUserStore = defineStore(
  "user",
  () => {
    const currentUsername = ref("");
    const profile = ref(null);

    const isLoggedIn = computed(() => currentUsername.value !== "");
    const hasProfile = computed(() => profile.value !== null);

    const resetStore = () => {
      currentUsername.value = "";
      profile.value = null;
    };

    const createUser = async (username: string, password: string) => {
      await fetchy("/api/users", "POST", {
        body: { username, password },
      });
    };

    const loginUser = async (username: string, password: string) => {
      await fetchy("/api/login", "POST", {
        body: { username, password },
      });
    };

    const updateSession = async () => {
      try {
        const { username } = await fetchy("/api/session", "GET", { alert: false });
        currentUsername.value = username;
      } catch {
        currentUsername.value = "";
      }
    };

    const logoutUser = async () => {
      await fetchy("/api/logout", "POST");
      resetStore();
    };

    const updateUserUsername = async (username: string) => {
      await fetchy("/api/users/username", "PATCH", { body: { username } });
    };

    const updateUserPassword = async (currentPassword: string, newPassword: string) => {
      await fetchy("/api/users/password", "PATCH", { body: { currentPassword, newPassword } });
    };

    const deleteUser = async () => {
      await fetchy("/api/users", "DELETE");
      resetStore();
    };

    const createProfile = async (name: string, contact: string, bio: string) => {
      await fetchy("api/profile", "POST", {
        body: { name, contact, bio },
      });

      await getProfile();
    };

    const getProfile = async () => {
      try {
        const profileData = await fetchy("api/profile", "GET");
        profile.value = profileData;
      } catch {
        profile.value = null;
      }
    };

    const updateProfile = async (name: string, contact: string, bio: string) => {
      await fetchy("api/profile", "PATCH", {
        body: { name, contact, bio },
      });

      await getProfile();
    };

    const deleteProfile = async () => {
      await fetchy("api/profile", "DELETE");

      profile.value = null;
    };

    return {
      currentUsername,
      isLoggedIn,
      hasProfile,
      createUser,
      loginUser,
      updateSession,
      logoutUser,
      updateUserUsername,
      updateUserPassword,
      deleteUser,
      createProfile,
      getProfile,
      updateProfile,
      deleteProfile,
    };
  },
  { persist: true },
);
