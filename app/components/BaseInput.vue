<!-- BaseInput.vue -->
<script setup>
const props = defineProps({
  label: { type: String, default: '' },
  modelValue: [String, Number, Date],
  type: { type: String, default: 'text' }, // text, date, select
  required: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
  error: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (e) => {
  emit('update:modelValue', e.target.value)
}
</script>

<template>
  <div class="form__group">
    <label v-if="label" class="form__label">
      {{ label }} <span v-if="required" class="text-danger">*</span>
    </label>

    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      @input="updateValue"
      class="form__control"
    />

    <small v-if="error" class="text-danger">{{ error[0] }}</small>
  </div>
</template>
