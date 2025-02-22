import { defineStore } from 'pinia';

const LOCAL_STORAGE_KEY = 'lite-folder-user';

type User = {
    loggedIn: boolean;
    userName: string;
}

export const useUserStore = defineStore('user', {
    state: () => ({
        user: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}') || {
            loggedIn: false,
            userName: '',
        } as User,
    }),

    getters: {
        isLoggedIn: (state) => state.user.loggedIn,
        getUserName: (state) => state.user.userName,
    },

    actions: {
        login(username: string) {
            this.user = {
                loggedIn: true,
                userName: username,
            };

            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.user));
        },

        logout() {
            this.user = {
                loggedIn: false,
                userName: '',
            };

            localStorage.removeItem(LOCAL_STORAGE_KEY);
        },

    },
});
