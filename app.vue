TO DO:
-Arreglar cors

MAYBE / Millores
-Separar per components
-Aillar bé el numericInput perquè funcioni genèric
-Acabar dark mode
-Taula amb tots els resultats filtrables i tal
-Copies dinàmiques
-"Resultats 2021" copy dinàmica
-Pestanya de eleccions passades?

TO DO 23J:
-Si deixem click apretat sobré un botó que vagin pujant els clicks.

<template>
  <div class="disable-dbl-tap-zoom">
    <div class="container px-4 md:px-0 mx-auto pb-[100px] pt-10 text-lg text-slate-700">
      <h1 class="text-4xl md:text-6xl inline-block font-extrabold bg-gradient-to-r w-100 from-blue-500 from-10% via-red-500 via-30% to-yellow-500 to-90% text-transparent bg-clip-text">
        Porra Eleccions al Parlament de Catalunya 12M 🗳️ 🎉
    </h1>
      <p class="mt-5">
        <span class="text-lg font-bold">
          Perquè la poletologea no se ace sola, anià k fer-la, visca!
        </span>
        <br>
      </p>

      <h3 class="title-2 gradient mt-9">Nit electoral</h3>
      <p class="mt-4">
        Compteu també que en fem.
        En ppi a ca nostra a l'Eixample, però confirmem detalls per Telegram.
        Susceptible de canviar o anul·lar-se si plou o si passen coses.
        Inici 19.30h i a les 23h dw.
      </p>

      <!-- How it works -->
      <h3 class="title-2 gradient mt-9">Funcionament</h3>
      <ul class="mt-3 text-lg divide-y">
        <li class="py-2 flex">
          <Icon class="w-24 my-auto mr-4" size="1.75rem" name="⏱️"/>
          <div>
            Es pot votar fins les 23.00 h del dissabte 11 de maig. No hi haurà excepcions.
          </div>
        </li>
        <li class="py-2 flex">
          <Icon class="w-24 my-auto mr-4" size="1.75rem" name="💸"/>
          <div>
            Bizum de 3€ a l'Oriol. Concepte:<i class="text-base font-medium"> porra12m - [nom]</i>. Si no arriba a temps el vot s'esborra. <a class="text-sky-400 underline" href="https://www.youtube.com/watch?v=NGKUWjeZylI" target="_blank">Aquest cop sí.</a>
          </div>
        </li>
        <li class="py-2 flex">
          <Icon class="w-24 my-auto mr-4" size="1.75rem" name="🔁"/>
          <div>
            De fet, si algú vol jugar N cops pagant N vegades per mi també endavant.
          </div>
        </li>
        <li class="py-2 flex">
          <Icon class="w-24 my-auto mr-4" size="1.75rem" name="🏆"/>
          <div>
            Guanya qui obtingui <b>MENYS</b> punts, amb el sistema que s'explica tot seguit. Qui en tingui menys es queda tot el pot. En cas d'emptat es divideixen els diners entre aquestes persones.
          </div>
        </li>
        <li class="py-2 flex">
          <Icon class="w-24 mb-auto mr-4" size="1.75rem" name="💡"/>
          <div>
            Tornarem a calcular-ho amb l'error quadràtic mig (MSE/MSD) entre els vectors de la nostra aposta i del resultat final.
            La fórmula és:
            <img class="w-56 my-3" src="https://wikimedia.org/api/rest_v1/media/math/render/svg/7c16be29718bd02e3b2104b8e813943c6a6521fc"/>
            On Y és el resultat de les eleccions i la Y amb barretet (sorry xd) la nostra aposta. Com menys punts, millor!
          </div>
        </li>
        <li class="py-2 flex">
          <Icon class="w-24 my-auto mr-4" size="1.75rem" name="💻"/>
          <div>
            Pels sector hacker us he deixat la info a la consola. Tot i que suposo que haureu remenat abans d'arribar aquí xd.
          </div>
        </li>
      </ul>

      <!-- Votes -->
      <h3 class="title-2 mt-10 gradient">Vota!</h3>
      <!-- Form: Name -->
      <div class="mt-5">
        <label for="price" class="block font-medium leading-6 text-gray-900">Nom</label>
        <p class="text-xs text-slate-500 mt-2">
          Escriu el teu nom. Sortirà públic a la llista de vots. Ha de ser el mateix nom que posis al concepte del Bizum. Si vols votar dos cops, posa un número o etc.
        </p>
        <div class="relative mt-2 rounded-lg">
          <input v-model="name" type="text" name="price" id="price" class="block w-full md:w-64 rounded-lg py-1.5 pl-3 pr-20 border-2 border-slate-300 outline-0 focus:border-sky-500 focus:ring-0 focus:ring-offset-0 sm:text-sm sm:leading-6" placeholder="Nom...">
        </div>
        <p v-if="!nameUnique" class="mt-2 text-sm text-red-600">El nom ja existeix :/</p>
      </div>
      <!-- Form: Comments -->
      <div class="mt-5">
        <label for="price" class="block font-medium leading-6 text-gray-900">Comentaris</label>
        <p class="text-xs text-slate-500 mt-2">
          Pots matisar, sumar, restar o el que sigui. Sortirà públic a la llista de vots.
        </p>
        <div class="flex mt-2 rounded-lg">
          <div class="flex w-full relative lg:max-w-2xl">
            <textarea v-model="comments" placeholder="Comentaris..." maxlength="250" rows="4" class="w-full resize-none rounded-lg py-1.5 pl-3 pr-3 border-2 border-slate-300 outline-0 focus:border-sky-500 focus:ring-0 focus:ring-offset-0 sm:text-sm sm:leading-6"></textarea>
            <div class="absolute text-slate-500 text-sm bg-white p-1 rounded bottom-3 right-1">{{ comments.length }} / 250</div>
          </div>
        </div>
      </div>

      <div class="h-[800px] md:h-[490px] flex flex-col-reverse md:flex-row md mt-9 gap-4">

        <!-- Parties -->
        <div class="flex-1 shrink flex-nowrap overflow-y-auto md:w-1/2 p-4 mt-5 md:mt-0 bg-slate-100 rounded-lg">
          <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div v-for="party in parties" :key="party.id" class="rounded-lg p-3 shadow shadow-slate-300" :style="{backgroundColor: party.color}">
              <div class="flex flex-col gap-2">
                <div @click="party.seats = party.seats + leftSeats" class="group bg-white shrink-1 basis-4/6 truncate rounded-md p-2 cursor-pointer shadow-md hover:bg-opacity-80 hover:shadow-sm hover:scale-105 transition-all duration-300">
                  <div class="flex font-extrabold text-slate-700 truncate">
                    <div class="truncate">{{party.name}}</div>
                    <div class="ml-2">{{party.emoji}}</div>
                  </div>
                  <div class="text-sm font-light text-slate-500 truncate">{{party.candidate}}</div>
                </div>
                <div class="flex shrink-1 items-stretch">
                  <numericInput :value="party.seats" @input="party.seats = $event" @incr="party.seats = $event" :max="parliamentSeats" :leftSeats="leftSeats" class="mx-auto my-auto"/>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Chart zone-->
        <div class="flex flex-col w-100 md:w-1/2">
          <!-- Toolbar -->
          <div class="flex flex-row md:flex-auto mb-3 md:h-1">
            <button @click="setCurrentSeats" class="md:grow text-base md:h-10 bg-slate-100 rounded-lg px-3 py-1 mr-3 hover:bg-slate-300 hover:scale-105 transition-all"><Icon name="bi:rainbow" class="mr-2"/>Resultats 2021</button>
            <button @click="shuffleSeats" class="md:grow text-base md:h-10 bg-slate-100 rounded-lg px-3 py-1 mr-3 hover:bg-slate-300 hover:scale-105 transition-all"><Icon name="bi:shuffle" class="mr-2"/>Aleatori</button>
            <button @click="clearAllSeats" class="md:grow text-base md:h-10 bg-slate-100 rounded-lg px-3 py-1 hover:bg-slate-300 hover:scale-105 transition-all"><Icon name="bi:trash" class="mr-2"/>Neteja</button>
          </div>
          <!-- Chart -->
          <div class="flex flex-grow h-100 rounded-lg p-1 bg-slate-100">
            <div class="my-auto px-3 py-0 md:p-4 flex-grow">
              <div>
                <parliamentChart :totalSeats="parliamentSeats" :parties="sortedParties"/>
              </div>
              <div class="flex">
                <div class="flex mx-auto">
                  <div class="p-2 font-bold text-slate-500">{{parliamentSeats-leftSeats}} <span class="text-slate-300">/ {{parliamentSeats}}</span></div>
                  <div v-if="leftSeats === 0" class="p-2 font-bold text-slate-300">Parlament ple</div>
                  <div v-else class="p-2 font-bold text-slate-300">Et falten cadires...</div>
                </div>
              </div>
            </div>       
          </div>
        </div>
      </div>

      <!-- Send button -->
      <div class="flex mt-8">
        <div v-if="resultsMode" class="mx-auto text-center">
          <div>
            A partir de les 22 es podrà...
          </div>
          <button @click="computeWinner" :disabled="leftSeats !== 0 || new Date() <= resultResolutionTime" class="mx-auto mt-4 py-2 px-4 text-white bg-sky-500 font-semibold rounded-lg disabled:bg-slate-300 disabled:hover:scale-100 hover:scale-110 hover:bg-lime-600 hover:shadow duration-300 transition-all">
            RESOLDRE LA PORRA 🎉
          </button>
        </div>
        <div v-else class="mx-auto text-center h-10">
          <transition
            mode="out-in"
            enter-active-class="duration-300 ease-out -translate-y-full"
            enter-to-class="translate-y-0"
            leave-active-class="duration-300 ease-in"
            leave-class="translate-y-0"
            leave-to-class="translate-y-full"
          >
            <button v-if="!sendingVote" :disabled="leftSeats !== 0 || !nameUnique || !correctNameLength" @click="sendForm" class="mx-auto py-2 px-4 w-48 text-white bg-sky-500 font-semibold rounded-lg disabled:bg-slate-300 disabled:hover:scale-100 hover:scale-110 hover:bg-lime-600 hover:shadow duration-300 transition-all">
              Votar
            </button>
            <div v-else class="flex align-middle font-semibold ">
              <transition
                mode="out-in"
                enter-active-class="duration-300 ease-out -translate-x-full"
                enter-to-class="translate-x-0"
                leave-active-class="duration-300 ease-in"
                leave-class="translate-x-0"
                leave-to-class="translate-x-full"
              >
                <div v-if="voteSucceed" class="text-white bg-lime-600 px-5 py-2 rounded-full">
                  Rebut, visca!
                </div>
                <div v-else class="flex text-sky-600">
                  <div class="flex text-5xl mr-3 "><Icon name="svg-spinners:pulse-3" class="my-auto"></Icon></div>
                  <div class="my-auto">Enviant</div>
                </div>
              </transition>
            </div>
          </transition>
        </div>
      </div>

      <!-- Registered votes (gallery) -->
      <div class="mt-9 flex items-center content-center">
        <h3 class="title-2 gradient">Recull d'apostes</h3>
        <button @click="updatePoints" v-if="resultsMode" :disabled="leftSeats !== 0" class="ml-5 text-slate-500 text-base bg-slate-100 rounded-lg px-3 py-1 mr-3 disabled:bg-slate-100 disabled:scale-100  hover:bg-slate-300 hover:scale-105 transition-all">
          <Icon name="bi:arrow-repeat"/> Rànquing
        </button>
      </div>
      <p class="mt-2" v-if="!resultsMode">No surt l'aposta de cadascú per motius crec que prou clars. Diumenge sí que els podrem veure.</p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-7">
        <transition-group name="fade">
          <div v-for="(vote, index) in votes" :key="vote.id" :class="vote.ranking === 1 && winnerComputed? ['bg-amber-300','scale-105','winner-shake']: ['bg-slate-100']" class="group flex- flex-col p-3 shadow-md rounded-lg hover:scale-105 hover:-rotate-3 hover:shadow-lg transition-all duration-300 ease-in-out">
            <div class="flex grow">
              <img class="flex shadow-sm rounded-full w-16 h-16 group-hover:rotate-6 group-hover:scale-110 group-hover:shadow-md transition-all duration-300 ease-in-out" :src="'https://api.dicebear.com/6.x/notionists-neutral/svg?seed='+vote.name" alt="Rounded avatar"/>
              <div class="flex flex-col grow ml-3 overflow-hidden">
                <div class="flex mt-1 text-lg font-bold align-baseline">
                  <div v-if="vote.ranking && vote.ranking > 0" class="mr-2 w-7 h-7 content-center justify-center rounded-full text-white bg-teal-500 shadow px-2">{{vote.ranking}}</div>
                  <div class="truncate">{{vote.name}}</div>
                  <div v-if="!winnerComputed" class="text-sm flex-nowrap shrink-0 font-normal rounded-full bg-slate-300 text-slate-700 px-2 py-0.5 my-auto ml-auto">
                    {{new Date(vote.created_at).toLocaleString("ca-ES", {day: "numeric", month: "long"})}}
                  </div>
                  <div v-if="resultsMode && vote.points !== undefined && winnerComputed" class="flex-shrink-0 ml-2 text-white py-1 px-3 bg-sky-500 text-sm shadow rounded-full transition-all duration-200 ease-in-out">{{vote.points}} punts</div>
                  <div v-if="vote.ranking === 1 && winnerComputed" class="absolute -top-4 -right-3 text-7xl rotate-6 transition-all duration-200 ease-in-out winner-shake">🏆</div>
                </div>
                <div class="mt-2 wrap text-sm">{{vote.comments}}</div>
              </div>
            </div>
            <div v-if="resultsMode" class="flex mt-3">
              <div class="mt-3 mb-5 grid grid-cols-3 gap-2 text-base">
                <div v-for="party in parties.filter(party => vote[party.short_name] > 0)" :key="party.id">
                  <div :key="party.id" :style="{backgroundColor: party.color}" class="flex bg-slate-50 shadow-sm rounded-lg p-2">
                    <div class="flex grow overflow-hidden">
                      <div class="py-1 px-2 border-2 border-white bg-opacity-75 shrink-0 mr-1 text-center font-bold shadow bg-white rounded-md">
                        {{vote[party.short_name]}}
                      </div>
                      <div class="py-1 px-2 grow align-items-center items-center text-sm truncate border-2 border-white bg-opacity-75 bg-white rounded-md">
                        {{party.name}}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
      <div v-if="votes.length === 0" class="bg-slate-100 text-slate-500 font-semibold flex grow p-4 rounded-lg">
        Encara no ha participat ningú 🫠
      </div>

      <!-- Votes Table -->
      <h3 v-if="resultsMode" class="title-2 mt-20 gradient">Taula resum</h3>
      <div v-if="resultsMode" class="text-sm mt-5 shadow">
        <DataTable :value="votes" tableStyle="min-width: 50rem" class="p-datatable-small" scrollable removableSort scrollHeight="800px">
          <Column field="photo" header="" frozen>
            <template #body="slotProps">
              <div class="flex align-middle w-12">
                <img class="flex border rounded-full w-12 h-12" :src="'https://api.dicebear.com/6.x/notionists-neutral/svg?seed='+slotProps.data.name" alt="Rounded avatar"/>
              </div>
            </template>
          </Column>
          <Column field="name" header="Nom" frozen sortable><template #body="slotProps">{{ slotProps.data.name }}</template></Column>
          <Column field="ranking" header="#" sortable></Column>
          <Column field="points" header="Punts" sortable></Column>
          <Column v-for="party in parties" :key="party.short_name" :field="party.short_name" :header="party.short_name" sortable></Column>
        </DataTable>
      </div>

    </div>

    <div class="text-sm flex flex-col py-1 md:flex-row content-center justify-center text-center text-slate-500 bg-slate-200">
      <div class="my-auto">
        Fet amb il·lusió per
      </div>
      <a class="flex self-center bg-slate-300 rounded-lg m-1 px-2" href="https://twitter.com/OriolNadal_" target="_blank">aquesta persona</a>
    </div>
  </div>
</template>

<script>
  import numericInput from '/components/numericInput.vue';
  import parliamentChart from '/components/parliamentChart.vue';
  import config from './config.json'

  export default {

    components: {
      numericInput,
      parliamentChart
    },
    data() {
      return {
        //Constants
        parliamentSeats: config.total_seats,
        closingVotingTime: null,
        resultResolutionTime: null,
        //Main data
        parties: [],
        currentParliament: [],
        votes: [],
        //Form
        name:'',
        comments: '',
        //UI
        sendingVote: false,
        voteSucceed: false,
        winnerComputed: false,

        options: {
          background: {
            color: "#fff", // this sets a background color for the canvas
          },
          fullScreen: {
            enable: true, // enabling this will make the canvas fill the entire screen, it's enabled by default
            zIndex: -1, // this is the z-index value used when the fullScreen is enabled, it's 0 by default
          },
          interactivity: {
            events: {
              onClick: {
                enable: true, // enables the click event, it's disabled by default
                mode: "push", // adds the particles on click
              },
              onHover: {
                enable: true, // enables the mouse hover event, it's disabled by default
                mode: "repulse", // repulse the particles on mouse hover
              },
            },
            modes: {
              push: {
                quantity: 10, // number of particles to add on click
              },
              repulse: {
                distance: 300, // distance of the particles from the cursor
              },
            },
          },
          particles: {
            links: {
              distance: 200, // maximum distance for linking the particles
              enable: true, // enabling this will make the particles linked together
            },
            move: {
              enable: true, // enabling this will make particles move in the canvas
              speed: { min: 1, max: 5 }, // using a range in speed value will make particles move in a random speed between min/max values, each particle has its own value, it won't change over time by default
            },
            opacity: {
              value: { min: 0.3, max: 0.7 }, // using a different opacity, to have some semitransparent effects
            },
            size: {
              value: { min: 1, max: 3 }, // let's randomize the particles size a bit
            },
          },
        }
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
        return new Date() > this.closingVotingTime;
      },
      nameUnique() {
        return !this.votes.map(v=>v.name).includes(this.name);
      },
      correctNameLength() {
        return this.name.length > 2 && this.name.length < 50;
      }
    },

    methods: {

      async fetchData() {

        const parties = await $fetch('/api/getParties');
        this.currentParliament = Object.freeze(JSON.parse(JSON.stringify(parties)));
        parties?.forEach((party)=>{
          party.seats = 0;
        });
        this.parties = [...parties];

        const votes = await $fetch('/api/getVotes');
        this.votes = votes;
      },

      sendForm() {
        if(this.leftSeats === 0 && this.nameUnique && this.correctNameLength) {
          this.sendingVote = true;
          const vote = {'name':this.name, 'comments': this.comments};
          this.parties.forEach((p) => {
           vote[p.short_name] = p.seats;
          });
          $fetch('/api/vote', { method: 'post', body: vote })
          .then(response => {
            if(response.code) {
              console.log(response);
            }else {
              setTimeout(() => {
                this.voteSucceed = true;
                setTimeout(()=> {
                  this.sendingVote = false;
                  this.voteSucceed = false;
                  this.name = '';
                  this.comments = '';
                  this.clearAllSeats();
                  this.votes.unshift(response[0]);
                }, 1500);
              }, 2000);

            }
          })
          .catch(error=>{
            console.log(error);
          })
        }

      },

      updatePoints() {
        //Compute MSE for each participant
        let partyNames = this.parties.map(party => party.short_name);
        let resultsVotesVector = this.parties.map(party=>party.seats);
        this.votes.forEach((participant,index) => {
          let personVotesVector = partyNames.map(item => participant[item]);
          let points = Math.round(this.meanSquaredError(resultsVotesVector,personVotesVector) * 100) / 100;
          participant['points'] = points;
        })

        //Ordrer participants and set rank positions
        this.votes.sort((a,b) => a.points - b.points);
        let rank = 1;
        let previousPoints = this.votes[0].points;
        this.votes[0].ranking = rank;

        for (let i = 1; i < this.votes.length; i++) {
          if (this.votes[i].points > previousPoints) {
            rank++;
          }
          this.votes[i].ranking = rank;
          previousPoints = this.votes[i].points;
        }
      },

      computeWinner() {
        this.updatePoints();
        setTimeout(() => {
          this.winnerComputed = true;
          this.$confetti.start();
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
        this.parties = JSON.parse(JSON.stringify(this.currentParliament));
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
      },


    },
    async created() {
      console.log("Hola hackers! xd He fet la web amb Nuxt3 (sense TS), maquetat amb Tailwind i amb Supabase per les dades. Allotjat a Vercel. Ja podeu començar a objectar, però a cada conovocatòria diferent aniré canviant d'stack per practicar hehe. Hi ha errors de seguretat detectats ja, us aviso. Com que no faig check de dades al servidor perquè em feia pal. Vull dir, que si voteu via APi es menja algunes coses que no toquen. Altres no... Però nse xd");
      this.closingVotingTime = new Date(config.closing_voting_time)
      this.resultResolutionTime = new Date(config.elections_day+'T22:00:00')
      await this.fetchData();
    },
    mounted() {
      document.addEventListener("keyup", (e) => {
        if (e.key === "s") {
          this.$confetti.stop();
        }
      });
    }
  }
</script>

<style>

.disable-dbl-tap-zoom {
  touch-action: manipulation;
}

@tailwind components;

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

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

.fade-leave-active {
  position: absolute;
}

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
.p-datatable .p-datatable-tbody > tr > td {
  padding: 0.5rem 0.5rem !important;
}

</style>import { exitCode } from 'process';

