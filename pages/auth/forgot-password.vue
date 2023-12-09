<script setup>
useHead({
  title: 'Forgot Password',
})
definePageMeta({
  layout: 'auth',
})
const VERIFICATION_CODE = 198237

const toast = useToast()
const email = ref(null)
const code = ref(null)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const state = reactive({
  password: undefined,
  confirmPassword: undefined,
})

function validate(state) {
  const errors = []
  if (!state.password)
    errors.push({ path: 'password', message: 'Required' })
  if (!state.confirmPassword)
    errors.push({ path: 'confirmPassword', message: 'Required' })

  return errors
}

const step = ref(0)
const forgotPasswordStep = reactive([
  {
    key: 'request',
    label: 'Request Code',
  },
  {
    key: 'verify',
    label: 'Verify Account',
  },
  {
    key: 'change',
    label: 'Change Password',
  },
])

function requestVerificationCode() {
  toast.add({
    title: 'Verification Code is Sent!',
    description: `Your Verification Code is, ${VERIFICATION_CODE}`,
    timeout: 3000,
  })

  step.value++
}

function verifyCode() {
  if (Number(code.value) === VERIFICATION_CODE)
    step.value++
}

function changePassword() {
  step.value++
  setTimeout(() => {
    navigateTo({ path: '/auth/login' })
  }, 2000)
}
</script>

<template>
  <AuthCardContainer>
    <template #logo>
      <IconCSS name="i-simple-icons-nuxtdotjs" class="!h-20 !w-20 text-primary" />
    </template>

    <template #title>
      {{ step < 3 ? 'Forgot Password' : 'Change Password Success!' }}
    </template>

    <template #subtitle>
      {{ step < 3 ? 'Complete the Step Below to Change Your Password' : 'Now You Can Login Using Your New Password' }}
    </template>

    <template #default>
      <UTabs v-if="step < 3" v-model="step" :items="forgotPasswordStep" class="w-full" :ui="{ list: { tab: { base: 'pointer-events-none' } } }">
        <template #item="{ item }">
          <div class="py-4">
            <div v-if="item.key === 'request'">
              <UFormGroup label="Registered Email">
                <UInput v-model="email" icon="i-heroicons-envelope" placeholder="john.doe@mail.com" />
              </UFormGroup>
              <UButton label="Request Verification Code" block size="lg" class="mt-8 mb-2" @click="requestVerificationCode" />
            </div>

            <div v-else-if="item.key === 'verify'">
              <UFormGroup label="Verification Code">
                <UInput v-model="code" placeholder="xxxxxx" />
              </UFormGroup>
              <UButton label="Verify Account" block size="lg" class="mt-8 mb-2" @click="verifyCode" />
            </div>

            <div v-else-if="item.key === 'change'">
              <UForm :state="state" :validate="validate" @submit="changePassword">
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
                <UButton type="submit" label="Change Password" block size="lg" class="mt-8 mb-2" />
              </UForm>
            </div>
          </div>
        </template>
      </UTabs>

      <div v-else class="text-center">
        <UIcon name="i-heroicons-check-circle-solid" class="h-40 w-40 bg-primary" />
      </div>
    </template>
  </AuthCardContainer>
</template>
