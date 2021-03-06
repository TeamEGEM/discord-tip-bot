const Web3 = require("web3");
const fs = require("fs");
const Discord = require("discord.js");
const BigNumber = require('bignumber.js');
var getJSON = require('get-json');

const miscSettings = require("../cfgs/settings.json");

var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(miscSettings.web3provider));

function getJson(){ return JSON.parse(fs.readFileSync('data/users.json'));}

exports.run = (client, message, args) => {
  let user = message.author.username;
  let author = message.author.id;
  let address = args[0];
  if(address == null){
    // show registered address balance
    let data = getJson();
    if(data[author]){
      web3.eth.getBalance(data[author], (error,result)=>{
        if(!error){
          var title = "null";
          var balance = (result/Math.pow(10,18)).toFixed(8);
          if(balance > 100000){
            var title = "EGEM Grand Dragon :dragon:";
            var next = "You are at MAX rank.";
          } else if(balance > 50000){
            var title = "EGEM Unicorn :unicorn:";
            var next = "100000 EGEM";
          } else if(balance > 25000){
            var title = "EGEM Humpback Whale :whale:";
            var next = "50000 EGEM";
          } else if(balance > 15000){
            var title = "EGEM Elephant :elephant:";
            var next = "25000 EGEM";
          } else if(balance > 7500){
            var title = "EGEM Killer Whale :whale2:";
            var next = "15000 EGEM";
          } else if(balance > 5000){
            var title = "EGEM Turtle :turtle:";
            var next = "7500 EGEM";
          } else if(balance > 2500){
            var title = "EGEM Shark :shark:";
            var next = "5000 EGEM";
          } else if(balance > 1500){
            var title = "EGEM Crocodile :crocodile:";
            var next = "2500 EGEM";
          } else if(balance > 750){
            var title = "EGEM Dolphin :dolphin:";
            var next = "1500 EGEM";
          } else if(balance > 500){
            var title = "EGEM Puffer Fish :blowfish:";
            var next = "750 EGEM";
          } else if(balance > 250){
            var title = "EGEM Octopus :octopus: ";
            var next = "500 EGEM";
          } else if(balance > 100){
            var title = "EGEM Snow Crab :crab:";
            var next = "250 EGEM";
          } else if(balance > 50){
            var title = "EGEM Shrimp :shrimp:";
            var next = "100 EGEM";
          } else if(balance > 5){
            var title = "EGEM Plankton :seedling:";
            var next = "50 EGEM";
          } else if(balance == 0){
            var title = "This balance is empty. :x:";
          } else {
            var title = ":space_invader: You require more EGEM.";
            var next = "5 EGEM";
          }

          getJSON('https://api.egem.io/api/v1/egem_prices', function(error, response){
            if(!error) {
              var priceAverage = response["AVERAGEUSD"];
              let balanceUSD = balance*priceAverage;

              const embed = new Discord.RichEmbed()
                .setTitle("EGEM Discord Bot.")
                .setAuthor("TheEGEMBot", miscSettings.egemspin)

                .setColor(miscSettings.okcolor)
                .setDescription("Account Information:")
                .setFooter(miscSettings.footerBranding, miscSettings.img32x32)
                .setThumbnail(miscSettings.coinbag)

                .setTimestamp()
                .setURL("https://github.com/TeamEGEM/EGEM-Bot")
                .addField("Username: ", "@" +user)
                .addField("This balance has: ", balance + " EGEM" + " | " + "$ " + Number(balanceUSD).toFixed(4) + " USD")
                .addField("Registered Address:", "["+data[author]+"](https://explorer.egem.io/addr/" +data[author]+ ")")
                .addField("Send TIPS to: ", author)
                .addField("This users rank is:", title, true)
                .addField("Next rank level:", next, true);

                message.channel.send({embed})


            } else {
              return console.log('**EGEM BOT** MARKET API ISSUE!');
            }
          })


        }
      })
      return
    }
  }
  if(web3.utils.isAddress(args[0])){
    web3.eth.getBalance(args[0], (error,result)=>{
      if(!error){
        var title = "null";
        var balance = (result/Math.pow(10,18)).toFixed(8);
        if(balance > 100000){
          var title = "EGEM Grand Dragon :dragon:";
          var next = "You are at MAX rank.";
        } else if(balance > 50000){
          var title = "EGEM Unicorn :unicorn:";
          var next = "100000 EGEM";
        } else if(balance > 25000){
          var title = "EGEM Humpback Whale :whale:";
          var next = "50000 EGEM";
        } else if(balance > 15000){
          var title = "EGEM Elephant :elephant:";
          var next = "25000 EGEM";
        } else if(balance > 7500){
          var title = "EGEM Killer Whale :whale2:";
          var next = "15000 EGEM";
        } else if(balance > 5000){
          var title = "EGEM Turtle :turtle:";
          var next = "7500 EGEM";
        } else if(balance > 2500){
          var title = "EGEM Shark :shark:";
          var next = "5000 EGEM";
        } else if(balance > 1500){
          var title = "EGEM Crocodile :crocodile:";
          var next = "2500 EGEM";
        } else if(balance > 750){
          var title = "EGEM Dolphin :dolphin:";
          var next = "1500 EGEM";
        } else if(balance > 500){
          var title = "EGEM Puffer Fish :blowfish:";
          var next = "750 EGEM";
        } else if(balance > 250){
          var title = "EGEM Octopus :octopus: ";
          var next = "500 EGEM";
        } else if(balance > 100){
          var title = "EGEM Snow Crab :crab:";
          var next = "250 EGEM";
        } else if(balance > 50){
          var title = "EGEM Shrimp :shrimp:";
          var next = "100 EGEM";
        } else if(balance > 5){
          var title = "EGEM Plankton :seedling:";
          var next = "50 EGEM";
        } else if(balance == 0){
          var title = "This balance is empty. :x:";
        } else {
          var title = ":space_invader: You require more EGEM.";
          var next = "5 EGEM";
        }


          getJSON('https://api.egem.io/api/v1/egem_prices', function(error, response){
            if(!error) {
              var priceAverage = response["AVERAGEUSD"];
              let balanceUSD = balance*priceAverage;

              const embed = new Discord.RichEmbed()
                .setTitle("EGEM Discord Bot.")
                .setAuthor("TheEGEMBot", miscSettings.egemspin)

                .setColor(miscSettings.okcolor)
                .setDescription("Account Information:")
                .setFooter(miscSettings.footerBranding, miscSettings.img32x32)
                .setThumbnail(miscSettings.coinbag)

                .setTimestamp()
                .setURL("https://github.com/TeamEGEM/EGEM-Bot")
                .addField("This balance has: ", balance + " EGEM" + " | " + "$ " + Number(balanceUSD).toFixed(4) + " USD")
                .addField("Send TIPS to:", author)
                .addField("This users rank is:", title, true)
                .addField("Next rank level:", next, true);

                message.channel.send({embed})


            } else {
              return console.log('**EGEM BOT** MARKET API ISSUE!');
            }
          })

      } else {
        const embed = new Discord.RichEmbed()
          .setTitle("EGEM Discord Bot.")
          .setAuthor("TheEGEMBot", miscSettings.egemspin)

          .setColor(miscSettings.warningcolor)
          .setDescription("Account Balance:")
          .setFooter(miscSettings.footerBranding, miscSettings.img32x32)
          .setThumbnail(miscSettings.coinbag)

          .setTimestamp()
          .setURL("https://github.com/TeamEGEM/EGEM-Bot")
          .addField("Oops, some problem occured with your address.", "Please try again.")

          message.channel.send({embed})
      }
    })
  } else {
    const embed = new Discord.RichEmbed()
      .setTitle("EGEM Discord Bot.")
      .setAuthor("TheEGEMBot", miscSettings.egemspin)

      .setColor(miscSettings.warningcolor)
      .setDescription("Account Balance:")
      .setFooter(miscSettings.footerBranding, miscSettings.img32x32)
      .setThumbnail(miscSettings.coinbag)

      .setTimestamp()
      .setURL("https://github.com/TeamEGEM/EGEM-Bot")
      .addField("Wrong address, or not registered.", "The command is /register <address> or to check a specific balance its /balance <address>.")

      message.channel.send({embed})
  }
}
