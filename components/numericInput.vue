<template>
    <div class="flex flex-row h-10 w-full relative bg-transparent">
      <!-- @touchstart="startClick('decr')" @touchend="stopClick()" -->
      <button @click="decrement" :disabled="value === min" data-action="decrement" class="bg-white text-slate-500 disabled:pointer-events-none disabled:text-slate-100 hover:text-slate-700 hover:bg-slate-200 h-full w-20 rounded-l-md cursor-pointer outline-none">
        <span class="m-auto text-2xl font-light">−</span>
      </button>
      <input :value="value" name="custom-input-number" @change="updateValue" type="number" :min="0" :max="max" :disabled="blockIncrement && value === 0" class="appearance-none outline-none focus:outline-none text-center w-full bg-white font-semibold text-md disabled:text-slate-400 hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-slate-700 outline-none">
      <!-- @mousedown="startClick('incr')" @mouseup="stopClick()" -->
      <button @click="increment" :disabled="value === max || blockIncrement" data-action="increment" class="bg-white text-slate-500 disabled:pointer-events-none disabled:text-slate-100 hover:text-slate-700 hover:bg-slate-200 h-full w-20 rounded-r-md cursor-pointer">
        <span class="m-auto text-2xl font-light">+</span>
      </button>
    </div>
</template>

<script>
  export default {
    emits: ['input','incr'],
    data() {
      return {
        clickInterval: null,
      }
    },
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
      leftSeats: {
        type: Number,
        default: 100,
      }

    },
    computed: {
      blockIncrement() {
        return this.leftSeats === 0;
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
        const currValue = this.value;
        const newValue = parseInt(e.target.value);
        // console.log("curr:",currValue," New:", newValue, " Left seats:",this.leftSeats);
        if (!isNaN(newValue)) {
          if(newValue <= currValue + this.leftSeats && newValue >= 0) { //Correct value
            // console.log("1");
            this.$emit('input', newValue);
          }else if(newValue < 0) { //Negative
            // console.log("2");
            this.$emit('input', 0);
          }else { //Fill all the remaining seats
            // console.log("3");
            this.$emit('input', currValue + this.leftSeats);
          }

        }else {

        }
      },
      startClick(mode) {
        let modeFunction = mode === 'incr' ? this.increment : this.decrement;
        this.clickInterval = setInterval(modeFunction, 100);
      },
      stopClick() {
        clearInterval(this.clickInterval);
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
