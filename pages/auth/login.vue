<script setup>
import { reactive } from 'vue';

definePageMeta({
    layout: 'auth'
})

const showPassword = ref(false)
const state = reactive({
    username: undefined,
    password: undefined,
})
</script>

<template>
    <UCard class="p-4">
        <div class="mb-10">
            <div class="mb-2 text-center text-2xl font-medium">
                Login
            </div>
            <div class="mt-2 text-center opacity-75">
                Please Login to Access All Features
            </div>
        </div>

        <div class="mt-10">
            <UForm :state="state">
                <UFormGroup label="Username" name="username" required class="mb-2">
                    <UInput v-model="state.username" icon="i-heroicons-user" placeholder="john.doe" />
                </UFormGroup>
                <UFormGroup label="Password" name="password" required class="my-2">
                    <UInput v-model="state.password" :type="showPassword ? 'text' : 'password'"
                        icon="i-heroicons-lock-closed" placeholder="********" :ui="{ icon: { trailing: { pointer: '' } } }">
                        <template #trailing>
                            <UButton color="gray" variant="link"
                                :icon="showPassword ? `i-heroicons-eye-slash` : `i-heroicons-eye`" :padded="false"
                                @click="showPassword = !showPassword" />
                        </template>
                    </UInput>
                </UFormGroup>
                <UButton type="submit" label="Login" block size="lg" class="mt-10 mb-2" />
            </UForm>
            <div class="mt-22 text-center text-sm">
                <span class="opacity-75">
                    Didn't have an account?
                </span>
                <ULink to="/auth/register" active-class="text-primary"
                    inactive-class="text-primary-500 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-200"
                    class="font-medium">
                    Register now
                </ULink>
            </div>
        </div>
    </UCard>
</template>