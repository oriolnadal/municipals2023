<template>
    <div class="flex flex-row h-10 w-full relative bg-transparent">
      <button @click="decrement" :disabled="value === min" data-action="decrement" class="bg-white bg-opacity-60 text-slate-500 disabled:pointer-events-none disabled:text-slate-500 hover:text-slate-700 hover:bg-opacity-80 h-full w-20 rounded-l-md cursor-pointer outline-none">
        <span class="m-auto text-2xl font-light">−</span>
      </button>

      <input :value="value" name="custom-input-number" @change="updateValue" type="number" :min="min" :max="max" :disabled="blockIncrement && value === 0" class="appearance-none outline-none focus:outline-none text-center w-full bg-white bg-opacity-60 font-semibold text-md disabled:text-slate-400 hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-slate-700 outline-none">
      
      <button @click="increment" :disabled="value === max || blockIncrement" data-action="increment" class="bg-white bg-opacity-60 text-slate-500 disabled:pointer-events-none disabled:text-slate-500 hover:text-slate-700 hover:bg-opacity-80 h-full w-20 rounded-r-md cursor-pointer">
        <span class="m-auto text-2xl font-light">+</span>
      </button>
    </div>
</template>

<script>
  export default {
    emits: ['input','incr'],
    props: {
      value: {
        type: Number,
        default: 0,
      },
      min: {
        type: Number,
        default: 0,
      },
      max: {
        type: Number,
        default: 100,
      },
      blockIncrement: {
        type: Boolean,
        default: false,
      }

    },
    methods: {
      increment() {
        if(this.value < this.max) this.$emit('incr', this.value + 1)
      },
      decrement() {
        if(this.min < this.value) this.$emit('incr', this.value - 1)
      },
      updateValue(e) {
        const parsedValue = parseInt(e.target.value);
        // && parsedValue <= this.max && this.min <= parsedValue
        if (!isNaN(parsedValue)) {
          console.log("holaa", parsedValue);
          this.$emit('input', parsedValue);
        }
      }
    }
  }
</script>

<style>
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>

<style>
/* @tailwind components;

@layer components {
  .disabled{
    @apply pointer-events-none
  }
} */

</style>