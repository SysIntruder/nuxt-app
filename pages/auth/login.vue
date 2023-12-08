<script setup>
import { reactive } from 'vue'

useHead({
  title: 'Login',
})
definePageMeta({
  layout: 'auth',
})

const toast = useToast()
const showPassword = ref(false)
const state = reactive({
  username: undefined,
  password: undefined,
  remember: false,
})

function validate(state) {
  const errors = []
  if (!state.username)
    errors.push({ path: 'username', message: 'Required' })
  if (!state.password)
    errors.push({ path: 'password', message: 'Required' })

  return errors
}

function onSubmit(evt) {
  toast.add({
    title: 'You\'re Logged In!',
    description: `Welcome, ${evt.data.username}`,
    timeout: 2000,
    callback: () => navigateTo({ path: '/dashboard' }),
  })
}
</script>

<template>
  <UCard class="px-4">
    <div class="mb-4">
      <div class="mb-2 text-center">
        <IconCSS name="i-simple-icons-nuxtdotjs" class="!h-20 !w-20 text-primary" />
      </div>
      <div class="mb-2 text-center text-2xl font-medium">
        Login
      </div>
      <div class="mt-2 text-center text-sm opacity-75">
        Please Login to Access All Features
      </div>
    </div>

    <div class="mt-4">
      <UForm :state="state" :validate="validate" @submit="onSubmit">
        <UFormGroup label="Username" name="username" required class="mb-2">
          <UInput v-model="state.username" icon="i-heroicons-user" placeholder="john.doe" />
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
        <div class="flex justify-between my-4">
          <UCheckbox v-model="state.remember" name="remember" label="Remember me" />
          <ULink
            to="/auth/register"
            active-class="text-primary"
            inactive-class="text-primary-500 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-200"
            class="text-xs font-medium"
          >
            Forgot Password
          </ULink>
        </div>
        <UButton type="submit" label="Login" block size="lg" class="mt-4 mb-2" />
      </UForm>
      <div class="flex items-center mt-2 text-center text-sm">
        <span class="opacity-75">
          Didn't have an account?
        </span>
        <ULink
          to="/auth/register"
          active-class="text-primary"
          inactive-class="text-primary-500 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-200"
          class="font-medium"
        >
          &nbsp;Register now
        </ULink>
      </div>
      <UDivider class="my-4">
        OR
      </UDivider>
      <UButton label="Login with Google" block size="lg" color="white" class="my-4">
        <template #leading>
          <IconCSS name="i-simple-icons-google" class="!h-4 !w-4" />
        </template>
      </UButton>
      <UButton label="Login with Github" block size="lg" color="white" class="my-4">
        <template #leading>
          <IconCSS name="i-simple-icons-github" class="!h-4 !w-4" />
        </template>
      </UButton>
    </div>
  </UCard>
</template>
