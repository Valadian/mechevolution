module bergecraft.rogue{
    export class Stats {
        static all = ["hp", "maxhp", "speed", "sight", "attack", "defense"];
        static avail = ["maxhp", "speed", "sight", "attack", "defense"];
        
        static maxhp = {
            def: 2, /* shall be no more than ~55 in order to fit a 100-width */
            short: "HP",
            label: "Vitality",
            random: [1, [2, 3], [3, 4], [4, 5]]
        }

        static hp = {
            def: Stats.maxhp.def,
            label: "HP"
        }

        static speed = {
            def: 10,
            label: "Speed",
            short: "SPD",
            random: [1, [2, 3], [3, 4], [4, 5]]
        }

        static sight = {
            def: 7,
            label: "Sight",
            short: "SEE",
            random: [1, 2, 3, 4]
        }

        static attack = {
            def: 10,
            label: "Attack",
            short: "ATK",
            random: [1, [2, 3], [3, 4], [4, 5]]
        }

        static defense = {
            def: 10,
            label: "Defense",
            short: "DEF",
            random: Stats.attack.random
        }
    }
}