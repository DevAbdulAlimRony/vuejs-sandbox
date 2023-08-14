const app2 = Vue.createApp({
    data(){
        return{
            boxASelected: false,
            boxBSelected: false,
            boxCSelected: false,
            boxDSelected: false,
        };
    },

    methods: {
        boxSelected(box){
            if(box === 'A'){
                this.boxASelected = true;
            }
            else if(box === 'B'){
                this.boxBSelected = !this.boxBSelected;
                 //toggling select and deselect
            }
            else if(box === 'C'){
                this.boxCSelected = !this.boxCSelected;
            }
            else if(box === 'D'){
                this.boxDSelected = !this.boxDSelected;
            }
        },
    },

    computed: {
        boxCClasses(){
            return {active: this.boxCSelected};
        },
    },
});

app2.mount('#styling');
