-Afegir els avatars al "ja han votat"
-Afegir llistets de partits als ja votats
-Disable votacions per hora (assegurar que des de navegador tal)
-Show vots per hora, i botó de calcular guanyador
-Chart tooltips
-Ordenar partits x vots
-Protegir API...
-Colors targetes vot

<template>
  <!-- <div class="bg-amber-500 shadow-amber-600 border-amber-300 shadow-amber-200 bg-purple-500 shadow-purple-600 border-purple-300 shadow-purple-200 bg-red-500 shadow-red-600 border-red-300 shadow-red-200 bg-teal-500 shadow-teal-600 border-teal-300 shadow-teal-200 bg-orange-500 shadow-orange-600 border-orange-300 shadow-orange-200 bg-sky-500 shadow-sky-600 border-sky-300 shadow-sky-200 bg-blue-500 shadow-blue-600 border-blue-300 shadow-blue-200 bg-yellow-500 shadow-yellow-600 border-yellow-300 shadow-yellow-200 bg-lime-500 shadow-lime-600 border-lime-300 shadow-lime-200"></div> -->
  <div class="container mx-auto my-5 p-5 text-lg text-slate-700">
    <h1 class="text-6xl inline-block font-extrabold bg-gradient-to-r w-100 from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-transparent bg-clip-text">Municipals 2023</h1>
    <p class="mt-5">
      Suuuuh, ja han arribat! Tornem a tenir comicis (menys en David xd) i per tant tornem a tenir... porra!
      <br>
      Aquest cop amb el format tonto de les eleccions, les menys estimades*: les municipals.
      <br>
      <span class="text-xs">*Europees a part que lol</span>
    </p>

    <!-- How it works -->
    <h3 class="title-2 gradient mt-9">Funcionament</h3>
    <ul class="mt-3 text-lg divide-y">
      <li class="py-2">
        <Icon class="mr-3" name="⏱️"/> Es pot votar fins les 9.00 h del diumenge 28 de maig.
      </li>
      <li class="py-2">
        <Icon class="mr-3" name="💸"/> Bizum de 3€ a l'Oriol. Concepte: Munis23 - [nom/pseudonim]. Fins que no el rebi el vot no compta.
      </li>
      <li class="py-2">
        <Icon class="mr-3" name="🔁"/> De fet, si algú vol jugar 2 cops pagant dos cops per mi també endavant.
      </li>
      <li class="py-2">
        <Icon class="mr-3" name="💻"/> El hackers... Bé, us he deixat la info a la consola. Tot i que suposo que hareu remenat abans d'arribar aquí xd.
      </li>
      <li class="py-2">
        <Icon class="mr-3" name="#️⃣"/> La fórmula de càlcul és la següent:
      </li>
      <li class="py-2">
        <Icon class="mr-3" name="🏆"/> Qui tingui menys punts es queda tot el pot. En cas d'emptat es divideixen els diners entre aquestes persones.
      </li>
    </ul>

    <!-- Votes -->
    <div class="mt-9 title-2 gradient">Vota!</div>
    <!-- Form: Name -->
    <div class="mt-4">
      <label for="price" class="block text-sm font-medium leading-6 text-gray-900">Nom</label>
      <div class="relative mt-2 rounded-md">
        <input type="text" name="price" id="price" class="block w-full md:w-64 rounded-md py-1.5 pl-3 pr-20 border-2 border-slate-300 outline-0 focus:border-sky-500 focus:ring-0 focus:ring-offset-0 sm:text-sm sm:leading-6" placeholder="Escriu el teu nom...">
      </div>
      <p class="text-xs text-slate-500 mt-2">
        *Per si no s'ha entès, aquí la idea és que escriguis el teu nom. Pots posar també un pseudònim o el que sigui, però vamos, jo crec que perd una mica la gràcia.
        <br>
        En tot cas, que sigui el mateix que posis al concepte del Bizum.
        <br>
        (Si vols votar dos cops, número o etc.).
      </p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-5">
      <!-- Parties -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div v-for="party in parties" :key="party.id" class="rounded-md p-3 shadow shadow-slate-300" :style="{backgroundColor: party.color}">
          <div @click="party.seats = party.seats + leftSeats" class="text-base bg-white bg-opacity-60 rounded-md p-2 cursor-default shadow-md hover:shadow-sm hover:scale-105 transition-all duration-300">
            <div class="font-extrabold text-slate-700 truncate">{{party.name}} {{party.emoji}}</div>
            <div class="text-slate-700 truncate">{{party.candidate}}</div>
          </div>
          <div class="flex rounded-md mt-3 shadow">
            <NumericInput :value="party.seats" @input="handleCustomInput(party, $event)" @incr="party.seats = $event" :max="parliamentSeats" :blockIncrement="leftSeats === 0" class="mx-auto my-auto"/>
          </div>
        </div>
      </div>

      <!-- Chart -->
      <div class="flex rounded-md p-5 border">  
        <div class="my-auto flex-grow">
          <div>
            <parliamentChart :totalSeats="parliamentSeats" :parties="parties"/>
          </div>
          <div class="flex">
            <div class="flex mx-auto">
              <div class="p-2 font-bold text-slate-500">{{parliamentSeats-leftSeats}} <span class="text-slate-300">/ {{parliamentSeats}}</span></div>
              <div v-if="leftSeats === 0" class="p-2 font-bold text-slate-300">AJUNTAMENT PLE 🌈</div>
              <div v-else class="p-2 font-bold text-slate-300">Et falten regidors...</div>
            </div>
          </div>
        </div>       
      </div>
    </div>

    <!-- Send button -->
    <div class="flex mt-8">
      <button :disabled="leftSeats !== 0" class="mx-auto py-2 px-4 w-48 text-white bg-sky-500 font-semibold rounded-md disabled:hover:bg-slate-400 disabled:hover:scale-100 hover:scale-110 hover:bg-emerald-600 hover:shadow duration-300  transition-all">
        Enviar
      </button>
    </div>

    <!-- Gallery -->
    <div class="mt-9 title-2 gradient">Gent que ja ha votat</div>
    <p class="mt-2">Tot i que potser no han pagat i en aquest cas no compten...</p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mt-3">
      <div v-for="vote in votes" :key="vote.id" class="h-40px px-3 py-5 bg-slate-300 rounded-md">
        {{vote.name}}
      </div>
    </div>
  </div>
</template>

<script>

  // import { ref, computed } from 'vue'
  import NumericInput from '/components/NumericInput.vue';
  import parliamentChart from '/components/parliamentChart.vue';
  export default {
    // emits: ['input'],
    components: {
      NumericInput,
    },
    data() {
      return {
        parliamentSeats: 41,
        parties: [],
        votes: [],
        computedClasses:[]
      }
    },
    computed: {
      leftSeats() {
        return this.parliamentSeats - this.parties.reduce((sum, party) => sum + party.seats, 0);
      }
    },

    methods: {

      inputChange(e) {
        console.log("parent",e);
      },

      handleCustomInput(party, e) {
        console.log("Ieaah", party, e);
        console.log(this.leftSeats);
        // party.seats = 10;
        // parsedValue <= this.max && this.min <= parsedValue
        party.seats = -1;
        if(e > this.leftSeats) {
          party.seats  = 0;
        }
        party.seats = e;
      },

      async fetchData() {
        const supabase = useSupabaseClient();
        let {data: partiesInit, error} = await supabase.from('parties').select('*');
        partiesInit?.forEach((party)=>{
          party.seats = 0;
        });
        partiesInit.sort((a,b) => a.id - b.id);
        this.parties = partiesInit;

        //Votes
        let { data: votes, error2 } = await supabase.from('votes').select('name');
        this.votes = votes;
      },

      sendForm() {
        if(this.leftSeats === 0) {

        }
      }

    },
    async created() {
      console.log("Hola hackers! xd He fet la web amb Nuxt3 (sense TS), maquetat amb Tailwind i dades a supabase. Allotjat a Vercel. Ja podeu començar a objectar, però a cada conovocatòria diferent aniré canviant de stack per practica hehe");
      await this.fetchData();
    }
  }
</script>

<style>
@tailwind components;

@layer components {
  .title-2 {
    @apply text-3xl font-bold inline-block text-transparent bg-clip-text;
  }
  .gradient {
    @apply bg-gradient-to-r from-10% from-indigo-500 to-80% to-sky-500;
  }
}

</style>
