<script setup lang="ts">
import {ref} from 'vue';
import {useFileStore} from '@/store/file'

const fileStore = useFileStore();
const fileInput = ref<HTMLInputElement | null>(null);
const uploadError = ref(false);


// Transform file to base64
const fileToBase64 = async (file: File): Promise<string> => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Error reading the file."));
  });
};

// Upload file
const upload = async (files: FileList) => {
  try {
    for (const file of files) {
      const data = await fileToBase64(file);
      fileStore.addFile({
        id: Math.floor(Math.random() * Date.now()),
        data,
        name: file.name,
        type: file.type,
        size: file.size,
        dateTime: Date.now()
      });
    }
  } catch (error) {
    uploadError.value = true;
    setTimeout(() => {
      uploadError.value = false;
    }, 3000);
  }
};


// Handle file drop
const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  const files = event.dataTransfer?.files;
  if (!files?.length) return;
  upload(files);
};

// Handle file selection
const handleFile = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (!files?.length) return;
  upload(files);
};

// Trigger file input click
const triggerFileInput = () => {
  fileInput.value?.click();
};

</script>

<template>
  <div class="cursor-pointer content-center rounded-lg border border-dashed border-stone-300 bg-stone-50 text-center
  text-stone-500 transition-colors w-full6 h-30 duration-250 hover:border-stone-400 hover:bg-white hover:text-stone-700"
       @dragover.prevent @drop="handleDrop" @click="triggerFileInput">
    <p class="font-medium">Drag'n'drop or click to upload</p>
    <input ref="fileInput" multiple type="file" class="hidden" @change="handleFile"/>
  </div>

  <Transition>
    <p class="py-5 text-center font-medium text-red-600" v-if="uploadError">
      Error processing the file, check your file and try again.
    </p>
  </Transition>

</template>

<style scoped>

</style>