<script setup lang="ts">
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})

const { disabled, isLoading } = toRefs(props)
</script>

<template>
  <button
    :disabled="disabled"
    type="button"
    class="border border-transparent rounded-md flex font-mediumshadow-sm mt-4 text-sm text-white w-full opacity-95 py-2 px-4 justify-center hover:opacity-100 disabled:(cursor-not-allowed opacity-50) "
  >
    <svg
      v-if="isLoading"
      class="h-5 mr-3 text-white -ml-1 animate-spin w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <slot></slot>
  </button>
</template>
