
var Pin = require('./models/pins');


var data = [ 
    {
      image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/submerged.jpg",
      description: "This is the first picture to test",
    
     }
    //  {
    //     image: "http://i.axs.com/2015/11/promoted-media-optimized_5658eff54962e.jpg",
    //     description: "PlayerUnat werns and equipmg getting killed themselves. ",

    // },
    // {
    //     image: "http://steam.cryotank.net/wp-content/gallery/playerunknownsbattlegrounds/PlayerUnknowns-Battlegrounds-01-HD.png",
    //     description: "PlayerUnat werns and equipmg getting killed themselves. ",

    // },
    //     {
    //     image: "http://cdn.akamai.steamstatic.com/steam/apps/311210/header.jpg?t=1501610978",
    //     description: "Throw yourself into the all-or-driven single player campaign,",
   
    // },
    //     {
    //     image: "http://zelda.com/breath-of-the-wild/assets/icons/BOTW-Share_icon.jpg",
    //     description: "Throw yourses an intense and character-driven single player campaign,",
      
    // },
    //     {
    //     image: "https://data1.origin.com/content/dam/originx/web/app/games/battlefield/battlefield-3/battlefield-3-standard-edition_pdp_3840x2160_en_WW.jpg",
    //     description: "Throw yourselftures an intense and character-driven single player campaign,",
  
    // },
    //     {
    //     image: "https://data1.origin.com/content/dam/originx/web/app/games/battlefield/battlefield-3/battlefield-3-standard-edition_pdp_3840x2160_en_WW.jpg",
    //     description: "Throw youracter-driven single player campaign,",
 
    // },
    //     {
    //     image: "https://images1.laweekly.com/imager/u/745xauto/7925095/steel-panther-mathew-tucciarone.jpg",
    //     description: "Throw yourself intoes an intense and character-driven single player campaign,",
    // },
    //         {
    //     image: "https://68.media.tumblr.com/b98c6561c23f5b6dfe49ee10c532e40f/tumblr_inline_onynwb9RdD1uv5m2m_500.gif",
    //     description: "Throw yourself intoes an intense and character-driven single player campaign,",
    // },
    //         {
    //     image: "https://lh3.googleusercontent.com/A2L0dSJJAeOEiZJScrZ3NmV2FYlURmicYL925R_0v9Racq1ZhKs-YZhkKyoRzyH4nQ=h900",
    //     description: "Throw yourself intoes an intense and character-driven single player campaign,",
    // },
    //         {
    //     image: "http://server1.intermedia.ge/pictures/medium/217/217195.jpg?/legendaruli-rok-jgufi.jpg",
    //     description: "Throw yourself intoes an intense and character-driven single player campaign,",
    // },
];

function seedDB()  {
    Pin.remove({}, function(err) {
        if(err) {
            console.log("error removing....");
        } else {
            data.forEach(function(data) {
                Pin.create(data, function (err, product) {
                   if(err) {
                       console.log("error");
                   } else {
                       console.log("created");
                   }
                });
                
            });
        }
    });
}

module.exports = seedDB;