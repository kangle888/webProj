<script setup lang="ts">
import { useId } from 'vue'

const gradientId = `reui-logo-${useId()}`
</script>

<template>
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient
        :id="gradientId"
        x1="3"
        y1="1"
        x2="29"
        y2="31"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          offset="0%"
          stop-color="var(--primary)"
        />
        <stop
          offset="100%"
          stop-color="var(--glow)"
        />
      </linearGradient>
    </defs>

    <rect
      width="32"
      height="32"
      rx="9"
      :fill="`url(#${gradientId})`"
    />
    <rect
      x="0.6"
      y="0.6"
      width="30.8"
      height="30.8"
      rx="8.6"
      stroke="white"
      stroke-opacity="0.18"
    />
    <path
      d="M11.5 23.5V8.5h5.2a4.9 4.9 0 0 1 0 9.8h-5.2"
      stroke="var(--primary-foreground)"
      stroke-width="2.4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15.6 18.3 21 23.5"
      stroke="var(--primary-foreground)"
      stroke-width="2.4"
      stroke-linecap="round"
    />
    <circle
      cx="23.6"
      cy="9"
      r="1.3"
      fill="white"
      fill-opacity="0.9"
    />
  </svg>
</template>
