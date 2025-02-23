<script setup lang="ts">
import {useFileStore} from '@/store/file';
import {ref, computed} from "vue";
import {formatFileSize} from "@/utils/formatter"
import FileListSortIcon from "@/components/FileListSortIcon.vue";

const NAME_AZ = 'nameAZ';
const NAME_ZA = 'nameZA';
const DATETIME_ASC = 'datetimeASC';
const DATETIME_DESC = 'datetimeDESC';
const SIZE_ASC = 'sizeASC';
const SIZE_DESC = 'sizeDESC';

const fileStore = useFileStore();
const query = ref('')

const orderBy = ref<typeof NAME_AZ | typeof NAME_ZA | typeof SIZE_ASC | typeof SIZE_DESC | typeof DATETIME_ASC | typeof DATETIME_DESC>(DATETIME_DESC)
const sortedFiles = computed(() => {
  return [...fileStore.allFiles]
      .filter(file => file.name.toLowerCase().includes(query.value.toLowerCase()))
      .sort((a, b) => {
    if (orderBy.value === NAME_AZ) return a.name.localeCompare(b.name);
    if (orderBy.value === NAME_ZA) return b.name.localeCompare(a.name);
    if (orderBy.value === SIZE_ASC) return a.size - b.size;
    if (orderBy.value === SIZE_DESC) return b.size - a.size;
    if (orderBy.value === DATETIME_ASC) return a.dateTime - b.dateTime;
    return b.dateTime - a.dateTime; // Default datetime desc
  });
})

const handleDelete = (fileId: number) => {
  if (confirm('Are you sure you want to delete?')) {
    fileStore.removeFile(fileId)
  }
}

</script>

<template>

  <div class="overflow-hidden mt-12 rounded-lg border border-stone-400/10 bg-stone-50 shadow-lg"
       v-if="fileStore.allFiles.length">

    <div class="flex justify-between px-6 pt-8 pb-3">
      <div class="">
        <input v-model="query" type="text" placeholder="Search …">
      </div>
      <div class="">
        <select v-model="orderBy">
          <option :value="DATETIME_DESC">Newst</option>
          <option :value="DATETIME_ASC">Oldest</option>
          <option :value="NAME_AZ">Name (A–Z)</option>
          <option :value="NAME_ZA">Name (Z–A)</option>
          <option :value="SIZE_ASC">Smallest</option>
          <option :value="SIZE_DESC">Greatest</option>
        </select>
      </div>
    </div>

    <div class="grid">
      <div class="grid grid-cols-7 gap-8 px-6 py-5 text-sm font-semibold thead">
        <div></div>
        <div class="col-span-2">
          <span @click="() => orderBy = orderBy === NAME_AZ ? NAME_ZA : NAME_AZ">
            Name <FileListSortIcon v-if="orderBy === NAME_AZ || orderBy === NAME_ZA" class="h-auto w-[15px]"/>
          </span>
        </div>
        <div>
          <span @click="() => orderBy = orderBy === SIZE_DESC ? SIZE_ASC : SIZE_DESC">
            Size <FileListSortIcon v-if="orderBy === SIZE_ASC || orderBy === SIZE_DESC" class="h-auto w-[15px]"/>
          </span>
        </div>
        <div>
          <span @click="() => orderBy = orderBy === DATETIME_DESC ? DATETIME_ASC : DATETIME_DESC">
            Uploaded <FileListSortIcon v-if="orderBy === DATETIME_ASC || orderBy === DATETIME_DESC" class="h-auto w-[15px]"/>
          </span>
        </div>
        <div class="col-span-2 text-end">

        </div>
      </div>
      <div v-auto-animate class="">
        <div v-if="sortedFiles.length" class="grid grid-cols-7 items-center gap-8 px-6 py-5 transition-colors hover:bg-stone-100"
             v-for="(file) in sortedFiles" :key="file.id">
          <div class="">
            <template v-if="file.type.includes('image')">
              <img class="h-auto w-full" :src="file.data" :alt="file.name">
            </template>
            <template v-else-if="file.type.includes('pdf')">
              <img class="h-10 w-auto" src="@/assets/icons/pdf.svg" alt="PDF">
            </template>
            <template v-else-if="file.type.includes('mp4')">
              <img class="h-10 w-auto" src="@/assets/icons/mp4.svg" alt="MP4">
            </template>
            <template v-else>
              <img class="h-10 w-auto" src="@/assets/icons/default.svg" alt="File">
            </template>
          </div>
          <div class="col-span-2 truncate">
            {{ file.name }}
          </div>
          <div>
            {{ formatFileSize(file.size) }}
          </div>
          <div>
            {{new Date(file.dateTime).toLocaleDateString('de-DE', {day: '2-digit', month: '2-digit', year: 'numeric'}) }}
          </div>
          <div class="col-span-2 flex justify-end gap-3">
            <a class="btn btn-primary btn-xs" :download="file.name" :href="file.data">Download</a>
            <button class="btn btn-xs" @click="handleDelete(file.id)">Delete</button>
          </div>
        </div>
        <div v-else class="px-6 py-5 text-center font-semibold text-sm">Oops! Sorry but no results</div>
      </div>
    </div>
  </div>

</template>

<style scoped>
@reference "tailwindcss";

.thead span {
  @apply cursor-pointer flex gap-1 hover:text-stone-600
}
</style>