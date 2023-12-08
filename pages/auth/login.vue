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
  email: undefined,
  password: undefined,
  remember: false,
})

function validate(state) {
  const errors = []
  if (!state.email)
    errors.push({ path: 'email', message: 'Required' })
  if (!state.password)
    errors.push({ path: 'password', message: 'Required' })

  return errors
}

function onSubmit(evt) {
  toast.add({
    title: 'You\'re Logged In!',
    description: `Welcome, ${evt.data.email}`,
    timeout: 2000,
    callback: () => navigateTo({ path: '/dashboard' }),
  })
}
</script>

<template>
  <AuthCardContainer>
    <template #logo>
      <IconCSS name="i-simple-icons-nuxtdotjs" class="!h-20 !w-20 text-primary" />
    </template>

    <template #title>
      Login
    </template>

    <template #subtitle>
      Please Login to Access All Features
    </template>

    <template #default>
      <UForm :state="state" :validate="validate" @submit="onSubmit">
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
        <UButton type="submit" label="Login" block size="lg" class="mt-8 mb-2" />
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
      <UButton label="Login with Google" block size="lg" color="white" class="mb-4">
        <template #leading>
          <IconCSS name="i-simple-icons-google" class="!h-4 !w-4" />
        </template>
      </UButton>
      <UButton label="Login with Github" block size="lg" color="white" class="mt-4">
        <template #leading>
          <IconCSS name="i-simple-icons-github" class="!h-4 !w-4" />
        </template>
      </UButton>
    </template>
  </AuthCardContainer>
</template>
