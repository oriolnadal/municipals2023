-Send form + proteccions (Comprovar que el nom és únic)
-Fer fastAPI amb els mètodes.
-Confetti

(maybe)
-Acabar dark mode?

Endpoints:
-getEmptyVotes
-getVotes
-getParties


<template>
  <div class="">
    <div class="container px-4 md:px-0 mx-auto pb-[100px] pt-10 text-lg text-slate-700">
      <h1 class="text-6xl inline-block font-extrabold bg-gradient-to-r w-100 from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-transparent bg-clip-text">Porra Municipals 2023 🗳️ 🎉</h1>
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
        <li class="py-2 flex">
          <Icon class="w-24 my-auto mr-4" size="1.75rem" name="⏱️"/>
          <div>
            Es pot votar fins les 9.00 h del diumenge 28 de maig.
          </div>
        </li>
        <li class="py-2 flex">
          <Icon class="w-24 my-auto mr-4" size="1.75rem" name="💸"/>
          <div>
            Bizum de 3€ a l'Oriol. Concepte:<i class="text-base font-medium"> Munis23 - [nom/pseudònim]</i>. Fins que no rebi el Bizum el vot no compta.
          </div>
        </li>
        <li class="py-2 flex">
          <Icon class="w-24 my-auto mr-4" size="1.75rem" name="🔁"/>
          <div>
            De fet, si algú vol jugar N cops pagant N cops per mi també endavant.
          </div>
        </li>
        <li class="py-2 flex">
          <Icon class="w-24 mb-auto mr-4" size="1.75rem" name="#️⃣"/>
          <div>
            La fórmula per calcuar qui guanyarà torna a ser l'error quadràtic mig, aka MSE/MSD en anglès, o EQM en el nostre perseguit idioma. La fórmula és:
            <img class="w-56 my-3" src="https://wikimedia.org/api/rest_v1/media/math/render/svg/7c16be29718bd02e3b2104b8e813943c6a6521fc"/>
            On Y és el resultat de les eleccions i la Y amb barretet (sorry xd) la nostra aposta.
          </div>
        </li>
        <li class="py-2 flex">
          <Icon class="w-24 my-auto mr-4" size="1.75rem" name="🏆"/>
          <div>
            És a dir, qui tingui un EQM <b>menor</b> es queda tot el pot. En cas d'emptat es divideixen els diners entre aquestes persones.
          </div>
        </li>
        <li class="py-2 flex">
          <Icon class="w-24 my-auto mr-4" size="1.75rem" name="💻"/>
          <div>
            El hackers... Bé, us he deixat la info a la consola. Tot i que suposo que haureu remenat abans d'arribar aquí xd.
          </div>
        </li>
      </ul>

      <!-- Votes -->
      <div class="title-2 mt-10 gradient">Vota!</div>
      <!-- Form: Name -->
      <div class="mt-5">
        <label for="price" class="block font-medium leading-6 text-gray-900">Nom</label>
        <!-- <span class="text-sm font-light">(públic)</span> -->
        <p class="text-xs text-slate-500 mt-2">
          Escriu el teu nom. Sortirà públic a la llista de vots. Si poses un pseudònim per gràcia. Ha de ser mateix que posis al concepte del Bizum. Si vols votar dos cops, número o etc.
          <!-- *Per si no s'ha entès, aquí la idea és que escriguis el teu nom. Pots posar també un pseudònim o el que sigui, però vamos, jo crec que perd una mica la gràcia. -->
        </p>
        <div class="relative mt-2 rounded-lg">
          <input type="text" name="price" id="price" class="block w-full md:w-64 rounded-lg py-1.5 pl-3 pr-20 border-2 border-slate-300 outline-0 focus:border-sky-500 focus:ring-0 focus:ring-offset-0 sm:text-sm sm:leading-6" placeholder="Nom...">
        </div>
      </div>
      <!-- Form: Comments -->
      <div class="mt-5">
        <label for="price" class="block font-medium leading-6 text-gray-900">Comentaris</label>
        <p class="text-xs text-slate-500 mt-2">
          Pots matisar, sumar, restar o el que sigui. Sortirà públic a la llista de vots.
        </p>
        <div class="flex mt-2 rounded-lg">
          <div class="relative">
            <textarea v-model="comment" placeholder="Comentaris..." maxlength="250" cols="70" rows="4" class="resize-none rounded-lg py-1.5 pl-3 pr-3 border-2 border-slate-300 outline-0 focus:border-sky-500 focus:ring-0 focus:ring-offset-0 sm:text-sm sm:leading-6">
            </textarea>
            <div class="absolute text-slate-500 text-sm bg-white p-1 rounded bottom-3 right-1">{{ comment.length }} / 250</div>
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-9">
        <!-- Parties -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <div v-for="party in parties" :key="party.id" class="rounded-lg p-3 shadow shadow-slate-300" :style="{backgroundColor: party.color}">
            <div @click="party.seats = party.seats + leftSeats" class="bg-white rounded-md p-2 cursor-default shadow-md hover:shadow-sm hover:scale-105 transition-all duration-300">
              <div class="font-extrabold text-slate-700 truncate">{{party.name}} {{party.emoji}}</div>
              <div class="text-sm font-light text-slate-500 truncate">{{party.candidate}}</div>
            </div>
            <div class="flex rounded-lg mt-3 shadow">
              <NumericInput :value="party.seats" @input="party.seats = $event" @incr="party.seats = $event" :max="parliamentSeats" :leftSeats="leftSeats" class="mx-auto my-auto"/>
            </div>
          </div>
        </div>

        <!-- Chart -->
        <div class="group relative flex rounded-lg shadow p-1 border">
          <div class="flex visible md:invisible  opacity-0 absolute top-1 p-1 group-hover:visible group-hover:opacity-100 transition-all duration-200">
            <button @click="setCurrentSeats" class="text-base bg-slate-200 rounded-md px-3 py-1 mr-3 hover:bg-slate-300 hover:scale-105 transition-all"><Icon name="bi:rainbow" class="mr-2"/>Resultats 2019</button>
            <button @click="shuffleSeats" class="text-base bg-slate-200 rounded-md px-3 py-1 mr-3 hover:bg-slate-300 hover:scale-105 transition-all"><Icon name="bi:shuffle" class="mr-2"/>Aleatori</button>
            <button @click="clearAllSeats" class="text-base bg-slate-200 rounded-md px-3 py-1 hover:bg-slate-300 hover:scale-105 transition-all"><Icon name="bi:trash" class="mr-2"/>Neteja</button>
          </div>
          <div class="my-auto p-4 flex-grow">
            <div>
              <parliamentChart :totalSeats="parliamentSeats" :parties="sortedParties"/>
            </div>
            <div class="flex">
              <div class="flex mx-auto">
                <div class="p-2 font-bold text-slate-500">{{parliamentSeats-leftSeats}} <span class="text-slate-300">/ {{parliamentSeats}}</span></div>
                <div v-if="leftSeats === 0" class="p-2 font-bold text-slate-300">Ajuntament ple (hehe)</div>
                <div v-else class="p-2 font-bold text-slate-300">Et falten regidors...</div>
              </div>
            </div>
          </div>       
        </div>
      </div>

      <!-- Send button -->
      <div class="flex mt-8">
        <div v-if="resultsMode" class="mx-auto text-center">
          <div>
            Ja no es pot votar sorry. Però aquí tens un botó per si vols...
          </div>
          <button @click="computeWinner" :disabled="leftSeats !== 0" class="mx-auto mt-4 py-2 px-4 text-white bg-sky-500 font-semibold rounded-lg disabled:bg-slate-300 disabled:hover:scale-100 hover:scale-110 hover:bg-emerald-600 hover:shadow duration-300 transition-all">
            RESOLDRE LA PORRA 🎉
          </button>
        </div>
        <button v-else :disabled="leftSeats !== 0" class="mx-auto py-2 px-4 w-48 text-white bg-sky-500 font-semibold rounded-lg disabled:bg-slate-300 disabled:hover:scale-100 hover:scale-110 hover:bg-emerald-600 hover:shadow duration-300 transition-all">
          Votar
        </button>
      </div>

      <!-- Registered votes (gallery) -->
      <div class="mt-9 title-2 gradient">Gent que ja ha votat</div>
      <p class="mt-2">Tot i que potser no han pagat i en aquest cas no compten...</p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-7">
        <transition-group name="fade">
          <div v-for="(vote, index) in votes" :key="vote.id" :class="vote.winner && winnerComputed? ['bg-amber-300','scale-105','winner-shake']: ['bg-slate-100']" class="group p-3 shadow-md rounded-lg hover:scale-105 hover:-rotate-3 hover:shadow-lg transition-all duration-300 ease-in-out">
            <div class="flex">
              <img class="flex shadow-sm rounded-full w-16 h-16 group-hover:rotate-6 group-hover:scale-110 group-hover:shadow-md transition-all duration-300 ease-in-out" :src="'https://api.dicebear.com/6.x/notionists-neutral/svg?seed='+vote.name" alt="Rounded avatar"/>
              <div class="flex flex-col ml-3 overflow-hidden">
                <div class="mt-1 text-lg font-bold flex align-middle">
                  <div class="truncate">{{vote.name}}</div>
                    <div v-if="resultsMode && vote.points !== undefined && winnerComputed" class="flex-shrink-0 ml-2 text-white py-1 px-3 bg-sky-500 text-sm shadow rounded-full transition-all duration-200 ease-in-out">{{vote.points}} punts</div>
                    <div v-if="vote.winner && winnerComputed" class="absolute -top-4 -right-3 text-7xl rotate-6 transition-all duration-200 ease-in-out winner-shake">🏆</div>
                </div>
                <div class="mt-2 wrap text-sm">{{vote.comments}}</div>
              </div>
            </div>
            <div v-if="resultsMode" class="flex mt-3">
              <div class="mt-3 mb-5 grid grid-cols-3 gap-2 text-base">
                <div v-for="party in parties" :key="party.id" :style="{backgroundColor: party.color}" class="flex bg-slate-50 shadow-sm rounded-lg p-2">
                  <div class="flex grow overflow-hidden">
                    <div class="py-1 px-2 border-2 border-white bg-opacity-75 shrink-0 mr-1 text-center font-bold shadow bg-white rounded-md">
                      {{vote[party.short_name]}}
                    </div>
                    <div class="py-1 px-2 grow truncate border-2 border-white bg-opacity-75 bg-white rounded-md">
                      {{party.name}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>

  import NumericInput from '/components/NumericInput.vue';
  import parliamentChart from '/components/parliamentChart.vue';
  import ConfettiExplosion from "vue-confetti-explosion";
  export default {

    components: {
      NumericInput,
      ConfettiExplosion
    },
    data() {
      return {
        parliamentSeats: 41,
        parties: [],
        votes: [],
        computedClasses:[],
        comment: '',
        winnerComputed: false,
      }
    },
    computed: {
      leftSeats() {
        return this.parliamentSeats - this.parties.reduce((sum, party) => sum + party.seats, 0);
      },
      sortedParties() {
        return [...this.parties].sort((a,b) => b.seats - a.seats);
      },
      resultsMode() {
        // return true;
        return new Date() > new Date(2023, 4, 28, 9);
      } 
    },

    methods: {

      async fetchData() {
        const supabase = useSupabaseClient();
        let {data: partiesInit, error} = await supabase.from('parties').select('*');
        partiesInit?.forEach((party)=>{
          party.seats = 0;
        });
        partiesInit.sort((a,b) => a.id - b.id);
        this.parties = partiesInit;

        //Votes
        let { data: votes, error2 } = await supabase.from('votes').select('*');
        this.votes = votes;
      },

      sendForm() {
        if(this.leftSeats === 0) {

        }
      },

      computeWinner() {

        //Compute MSE for each party
        let partyNames = ['erc','bcomu','psc','junts','ciutadans','pp','valents','cup','vox'];
        let resultsVotesVector = this.parties.map(party=>party.seats);
        this.votes.forEach((participant,index) => {
          let personVotesVector = partyNames.map(item => participant[item]);
          let points = Math.round(this.meanSquaredError(resultsVotesVector,personVotesVector) * 100) / 100;
          participant['points'] = points;
        })

        //Ordrer parties and pick winners
        this.votes.sort((a,b) => a.points - b.points);
        const winningPoints = this.votes[0].points;
        for (const vote of this.votes) {
          vote.winner = vote.points === winningPoints;
        }

        //TO DO ADD DELAY
        setTimeout(() => {
          this.winnerComputed = true;
        }, 2000);

      },

      //Actions
      clearAllSeats() {
        this.parties.forEach((party)=>{party.seats = 0});
      },

      shuffleSeats() {
        let randomSeats = this.randomList(this.parties.length, this.parliamentSeats);
        this.parties.forEach((party,index)=>{party.seats = randomSeats[index]});
      },

      setCurrentSeats() {
        let currentSeats = [{"id":1,"short_name":"erc","seats":10},{"id":2,"short_name":"bcomu","seats":10},{"id":3,"short_name":"psc","seats":8},{"id":4,"short_name":"junts","seats":5},{"id":5,"short_name":"ciutadans","seats":3},{"id":6,"short_name":"pp","seats":2},{"id":7,"short_name":"valents","seats":3},{"id":8,"short_name":"cup","seats":0},{"id":9,"short_name":"vox","seats":0}];
        this.parties.forEach((party)=>{
          let seats = currentSeats.find(currentParty => currentParty.short_name === party.short_name).seats;
          party.seats = seats;
        });
      },

      //Helpers
      randomList(m,n) {
        let arr = new Array(m);
        for(let i=0;i<arr.length;i++) {
          arr[i]=0;
        }
        for (let i = 0; i < n; i++) {
          arr[(Math.floor((Math.random() * n) )%m)]++;
        }
        return arr;
      },

      meanSquaredError(vector1, vector2) {
        if (vector1.length !== vector2.length) {
          return null;
        }
        const squaredError = vector1.reduce((acc, val, index) => {
          const error = val - vector2[index];
          return acc + error * error;
        }, 0);
        return squaredError / vector1.length;
      }

    },
    async created() {
      console.log("Hola hackers! xd He fet la web amb Nuxt3 (sense TS), maquetat amb Tailwind i dades a supabase. Allotjat a Vercel. Ja podeu començar a objectar, però a cada conovocatòria diferent aniré canviant de stack per practica hehe");
      await this.fetchData();
    },
    mounted() {
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

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 2s ease-in-out 0.2s;
}

/* .fade-enter-from, */
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* .fade-leave-active {
  position: absolute;
} */

/* Animation */
.winner-bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(-5%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

.winner-zoom {
  animation: zoom 1s infinite;
}

@keyframes zoom {
  0%, 100% {
    transform: scale(105%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: scale(100%);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

.winner-shake {
  animation: shake 1s infinite;
}

@keyframes shake {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(2deg); }
  50% { transform: rotate(0eg); }
  75% { transform: rotate(-2deg); }
  100% { transform: rotate(0deg); }
}

</style>
