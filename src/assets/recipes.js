const RECIPES = [
    {
        id: 1,
        name: "Metal prelucrat",
        description: "Acesta este metal prelucrat",
        pattern : [
            ["Metal", "Metal",null],
            [null,null,null],
            [null,null,null]
        ],
        img: "src/images/metal_prelucrat.png"
    },
    {
        id: 2,
        name: "Lut",
        description: "Acesta este lut",
        pattern : [
            ["Pamant","Pamant","Pamant"],
            [null,null,null],
            [null,null,null]
        ],
        img: "src/images/lut.png"
    },
    {
        id: 3,
        name: "Moneda",
        description: "Aceasta este o moneda",
        pattern : [
            ["Metal prelucrat", "Metal prelucrat",null],
            [null,null,null],
            [null,null,null]
        ],
        img: "src/images/moneda.png"
    },
    {
        id: 4,
        name: "Sapa",
        description: "Aceasta este o sapa",
        pattern : [
            [null, "Lemn",null],
            [null, "Lemn",null],
            [null,"Metal prelucrat","Metal prelucrat"]
        ],
        img: "src/images/sapa.png"
    },
    {
        id: 5,
        name: "Struguri",
        description: "Acestia sunt struguri",
        pattern : [
            ["Pamant","Sapa",null],
            [null,null,null],
            [null,null,null]
        ],
        img: "src/images/poama.png"
    },
    {
        id: 6,
        name: "Butoi",
        description: "Acesta este un butoi",
        pattern : [
            ["Lemn","Lemn","Lemn"],
            ["Metal prelucrat","Metal prelucrat","Metal prelucrat"],
            ["Lemn","Lemn","Lemn"],
        ],
        img: "src/images/butoi.png"
    },
    {
        id: 7,
        name: "Vin",
        description: "Acesta este vin in sticla 'Gura Cainarului'",
        pattern : [
            ["Struguri","Struguri","Struguri"],
            ["Struguri","Butoi","Struguri"],
            ["Struguri","Struguri","Struguri"],
        ],
        img: "src/images/vin.png"
    },
    {
        id: 8,
        name: "Magazin",
        description: "Acesta este un magazin",
        pattern : [
            ["Lemn","Lemn","Lemn"],
            ["Lemn","Metal","Lemn"],
            ["Metal",null,"Metal"],
        ],
        img: "src/images/magazin.png"
    },
    {
        id: 9,
        name: "Porumb",
        description: "Acesta este un porumb",
        pattern : [
            ["Magazin","Moneda",null],
            [null,null,null],
            [null,null,null]
        ],
        img: "src/images/porumb.png"
    },
    {
        id: 10,
        name: "Faina porumb",
        description: "Aceasta este faina de porumb",
        pattern : [
            ["Porumb","Porumb",null],
            [null,null,null],
            [null,null,null]
        ],
        img: "src/images/faina_porumb.png"
    },
    {
        id: 11,
        name: "Oala",
        description: "Aceasta este oala",
        pattern : [
            ["Lut","Lut","Lut"],
            [null,null,null],
            [null,null,null]
        ],
        img: "src/images/oala.png"
    },
    {
        id: 12,
        name: "Mamaliga",
        description: "Aceasta este mamaliga",
        pattern : [
            ["Faina porumb","Faina porumb","Faina porumb"],
            [null,"Oala",null],
            [null,null,null],
        ],
        img: "src/images/mamaliga.jpg"
    },
    {
        id: 13,
        name: "Borcan cu muraturi",
        description: "Muraturi",
        pattern : [
            ["Moneda","Moneda","Moneda"],
            ["Moneda","Magazin","Moneda"],
            ["Moneda","Moneda","Moneda"],
        ],
        img: "src/images/borcan_muraturi.png"
    },
    {
        id: 14,
        name: "Platou moldovenesc",
        description: "The best meal",
        pattern : [
            [null,null,null],
            ["Vin","Mamaliga","Borcan cu muraturi"],
            [null,null,null],
        ],
        img: "src/images/platou_moldovenesc.png"
    },
    {
        id: 15,
        name: "Metal",
        description: "Acesta este metal",
        pattern : [
            [null,null,null],
            [null,"Secret",null],
            [null,null,null]
        ],
        img: "src/images/metal.png"
    },
    {
        id: 16,
        name: "Lemn",
        description: "Acesta este lemn",
        pattern : [
            [null,null,null],
            [null,"Secret",null],
            [null,null,null]
        ],
        img: "src/images/wood.png"
    },
    {
        id: 17,
        name: "Pamant",
        description: "Acesta este pamant",
        pattern : [
            [null,null,null],
            [null,"Secret",null],
            [null,null,null]
        ],
        img: "src/images/pamant.png"
    },
]

export default RECIPES;