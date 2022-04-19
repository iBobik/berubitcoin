<template>
  <div class="min-h-screen py-1">
    <div>
      <h1 class="my-4 text-4xl text-center">Kontaktuj nás</h1>
      <p class="font-medium text-center">Máš zájem nebo se chceš jen nezávazně zeptat?</p>
      <ContactForm />
    </div>
  </div>
</template>

<script>
export default {
  head () {
    return {
      meta: [
        { name: 'robots', content: 'noindex' }
      ]
    }
  }
}
</script>

<style>
body {
  @apply bg-white text-black;
}

.form-input, .form-checkbox, .form-textarea, .form-radio {
  @apply bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 border-0 rounded;
}

label, .label {
  @apply text-gray-600 font-medium;
}

small {
  @apply normal-case;
}

input[type=submit] {
  @apply bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 rounded;
}
</style>
