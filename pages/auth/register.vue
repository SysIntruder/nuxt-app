<script setup>
import { reactive } from 'vue'

useHead({
  title: 'Register',
})
definePageMeta({
  layout: 'auth',
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const state = reactive({
  email: undefined,
  password: undefined,
  confirmPassword: undefined,
})
</script>

<template>
  <CommonAuthCard>
    <template #logo>
      <IconCSS name="i-simple-icons-nuxtdotjs" class="!h-20 !w-20 text-primary" />
    </template>

    <template #title>
      Register
    </template>

    <template #subtitle>
      Please Complete Registration Forms Below
    </template>

    <template #default>
      <UForm :state="state">
        <UFormGroup label="Email" name="email" required class="mb-2">
          <UInput v-model="state.email" icon="i-heroicons-envelope" placeholder="john.doe@mail.com" />
        </UFormGroup>
        <UFormGroup label="Password" name="password" required class="my-2">
          <UInput
            v-model="state.password"
            :type="showPassword ? 'text' : 'password'"
            icon="i-heroicons-lock-closed"
            placeholder="********"
            :ui="{ icon: { trailing: { pointer: '' } } }"
          >
            <template #trailing>
              <UButton
                color="gray"
                variant="link"
                :icon="showPassword ? `i-heroicons-eye-slash` : `i-heroicons-eye`"
                :padded="false"
                @click="showPassword = !showPassword"
              />
            </template>
          </UInput>
        </UFormGroup>
        <UFormGroup label="Confirm Password" name="confirmPassword" required class="my-2">
          <UInput
            v-model="state.confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            icon="i-heroicons-lock-closed"
            placeholder="********"
            :ui="{ icon: { trailing: { pointer: '' } } }"
          >
            <template #trailing>
              <UButton
                color="gray"
                variant="link"
                :icon="showConfirmPassword ? `i-heroicons-eye-slash` : `i-heroicons-eye`"
                :padded="false"
                @click="showConfirmPassword = !showConfirmPassword"
              />
            </template>
          </UInput>
        </UFormGroup>
        <UButton type="submit" label="Register" block size="lg" class="mt-8 mb-2" />
      </UForm>
      <div class="flex items-center mt-2 text-center text-sm">
        <span class="opacity-75">
          Already have an account?
        </span>
        <ULink
          to="/auth/login"
          active-class="text-primary"
          inactive-class="text-primary-500 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-200"
          class="font-medium"
        >
          &nbsp;Login
        </ULink>
      </div>
    </template>
  </CommonAuthCard>
</template>
