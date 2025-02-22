import {defineStore} from 'pinia';

interface FileData {
    id: number;
    data: string;
    name: string;
    type: string;
    size: number;
    dateTime: number;
}

export const useFileStore = defineStore('file', {
    state: () => ({
        files: [] as FileData[]
    }),
    getters: {
        allFiles: (state): FileData[] => state.files,
    },
    actions: {
        addFile(file: FileData) {
            this.files.push(file);
        },
        removeFile(fileId: number) {
            const fileIndex = this.files.findIndex((file) => file.id === fileId);
            this.files.splice(fileIndex, 1);
        }
    }
})