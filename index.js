var Discord = require("discord.js")
var mysql = require('mysql')
var bot = new Discord.Client()
var config = require("./config.json")
var connection = mysql.createConnection({
    host: config.host,
    user: config.User,
    password: config.Databasepass,
    database: config.database
})
var handleKFDisconnect = function() {
    kfdb.on('error', function(err) {
        if (!err.fatal) {
            return;
        }
        if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
            console.log("PROTOCOL_CONNECTION_LOST");
            throw err;
        }
        log.error("The database is error:" + err.stack);

        kfdb = mysql.createConnection(kf_config);

        console.log("kfid");

        console.log(kfdb);
        handleKFDisconnect();
    });
   };
   handleKFDisconnect();

connection.connect()

bot.on("ready", async () =>   {
        console.log("I'm here, Onii-san!")
        bot.user.setActivity("for my prefix " + config.PREFIX, {type: "WATCHING"})
    })

bot.on("guildMemberAdd", member => {
    var channel = member.guild.channels.find("name","general")
    if (!channel){
        return
    }
    channel.send(`Welcome to ${member.guild.name}, ${member}. This is ${member.guild.owner}'s special place.`)
})




//Guildloggers
bot.on("guildCreate", function(guild)    {
    console.log("Trying to insert server " + guild.name + " into database")
    var info = {
        "servername": "'" + guild.name+ "'",
        "serverid": guild.id,
        "ownerid": guild.ownerID,
        "prefix": config.PREFIX
    }
    connection.query("INSERT INTO servers SET ?", info, function(error) {
        if (error)  {
            console.log(error)
            return
        }
    })
    console.log('Insert succesfull.')
    })
bot.on("guildDelete", function(guild)   {
    console.log("Attempting to remove " + guild.name + " from the database.")
    connection.query("DELETE FROM servers WHERE serverid = '"+ guild.id + "'", function(error)   {
        if (error)  {
            console.log(error);
            return
        }
        console.log("Server removed")
    })
    })





//
//commands
bot.on("message", async message => {
    
    //Limiters
        if (message.author.bot) return;
        if (message.channel.type === "dm") return;
    
    //Constants
        let prefix = config.PREFIX;
        let messageArray = message.content.split(" ");
        let cmd = messageArray[0].toLowerCase()
        let args = messageArray.slice(1)
        let color = "#ff4c4c"

    // ,help
    if (cmd === `${prefix}help`)    {
        message.delete()
        let spec = args[0]
        if (!spec)  {
            connection.query("SELECT Name, Description FROM commands",function(error,result,fields) {
                if (error) throw error
                console.log(result)
                let names = []
                let description = []
                result.forEach(function(element)    {
                    names.push(element.Name)
                    console.log(element.Name)
                    description.push(element.Description)
                })
                console.log(names)
                let embed = new Discord.RichEmbed()
                    .setTitle("Command list")
                    .setThumbnail(bot.user.displayAvatarURL)
                    .setColor(color)
                    .addField("Prefix",prefix)
                    .addField("Commands",names,true)
                    .addField("Description",description,true)
                
                message.channel.send(embed)

            })
        }

        if (spec === "xcom")    {
            let embed = new Discord.RichEmbed()
                .setTitle("Help for xcom")
                .setThumbnail(bot.user.displayAvatarURL)
                .setColor(color)
                .addField("Main command","```"+prefix+"xcom <subclass>```")
                .addField("Subclasses","Leaderboard\nShow",true)
                .addField("It does what now?!","Shows the current leaderboard\nShows the service record \nof a leaderboard soldier",true)
                .addField("Usage","```"+prefix+"xcom leaderboard```\n"+"```"+prefix+"xcom show [soldier name]```")
            message.channel.send(embed)
        }

        if (spec === "nighty")  {
            let embed = new Discord.RichEmbed()
                .setTitle("Help for nighty")
                .setThumbnail(bot.user.displayAvatarURL)
                .setColor(color)
                .addField("Main command","```"+prefix+"nighty <subclass>```")
                .addField("Subclasses","mention\n",true)
                .addField("It does what now?!","Wishes someone a good nighty\nNotifies the real world \nof your trip to the dream realm",true)
                .addField("Usage","```"+prefix+"nighty <mention>```\n"+"```"+prefix+"nighty```",true)
            message.channel.send(embed)
        }

        if (spec === "say") {
            let embed = new Discord.RichEmbed()
                .setTitle("Help for say")
                .setThumbnail(bot.user.displayAvatarURL)
                .setColor(color)
                .addField("Main command","```"+prefix+"say [message]```")
                .addField("It does what now?!","Makes me speak like you",true)
            message.channel.send(embed)
        }

        if (spec === "hello") {
            let embed = new Discord.RichEmbed()
                .setTitle("Help for hello")
                .setThumbnail(bot.user.displayAvatarURL)
                .setColor(color)
                .addField("Main command","```"+prefix+"hello```")
                .addField("It does what now?!","It makes me greet you",true)
            message.channel.send(embed)
        }

        if (spec === "botinfo") {
            let embed = new Discord.RichEmbed()
                .setTitle("Help for botinfo")
                .setThumbnail(bot.user.displayAvatarURL)
                .setColor(color)
                .addField("Main command","```"+prefix+"botinfo```")
                .addField("It does what now?!","It tells you all about",true)
            message.channel.send(embed)
        }
        }


    
    // ,xcom
    if (cmd === `${prefix}xcom`)    {
        message.delete()
        let sub = args[0]
        //addnew
        if (sub === "addnew")   {
            let name = args[1]
            let mugshot = args[2]
            let rank = "Rookie"
            let clas = "Rookie"
            let kills = 0
            let globkills = 0

            if (!mugshot)   {
                return message.reply("Please use the command like this ```"+ prefix + "xcom addnew <name> <image link>```")
                }
            let New = {"name":name,
                        "Rank":rank,
                        "Class":clas,
                        "Kills":kills,
                        "Mugshot":mugshot,
                        "Globalkills":globkills}
            connection.query("INSERT INTO xcom SET ?",New,function(error){
                if (error){
                    console.log(error)
                }
            console.log("insert succesful")
            })}
        //show
        if (sub === "show") {
            connection.query("SELECT * FROM xcom", function(error, result,fields)   {
                if (error) throw error
                let name = args[1]
                let soldier = result.find(function(element) {
                    return element.Name == name
                    
                })
                if (!soldier)   {
                    return message.reply("This soldier is not known.")
                }
                console.log(soldier)
                let embed = new Discord.RichEmbed()
                    .setThumbnail(soldier.Mugshot)
                    .setColor(color)
                    .addField("Name",soldier.Name)
                    .addField("Rank",soldier.Rank)
                    .addField("Class",soldier.Class)
                    .addField("Kills",soldier.Kills)
                    .addField("Total kills",soldier.Globalkills)
                message.channel.send(embed)
            })}
        
        //promote
        if (sub === "promote")  {
            connection.query("SELECT * FROM xcom", function(error, result,fields)   {
                if (error) throw error
                let name = args[1]
                let soldier = result.find(function(element) {
                    return element.Name == name
                    
                })
                if (!soldier)   {
                    return message.reply("This soldier is not known.")
                }
                let rank = soldier.Rank
                if (rank === "Colonel") {
                    return message.reply("This soldier is max rank")
                }
                let ranks = ["Rookie","Squaddie","Corporal","Seargant","Lieutennant","Captain","Major","Colonel"]
                let n = ranks.indexOf(rank)
                let newrank = ranks[n + 1]
                connection.query("UPDATE xcom SET Rank ='" + newrank + "' WHERE ID = " + soldier.ID)
                console.log("Promoted")
            })}        
        
        //newclass
        if (sub === "newclass")  {
            connection.query("SELECT * FROM xcom", function(error, result,fields)   {
                if (error) throw error
                let name = args[1]
                let soldier = result.find(function(element) {
                    return element.Name == name
                    
                })
                if (!soldier)   {
                    return message.reply("This soldier is not known.")
                }
                let newClass = args[2]
                connection.query("UPDATE xcom SET Class ='" + newClass + "' WHERE ID = " + soldier.ID)
                console.log("Class updated")
            })}   
        //addkills
        if (sub === "addkills")  {
            connection.query("SELECT * FROM xcom", function(error, result,fields)   {
                if (error) throw error
                let name = args[1]
                let soldier = result.find(function(element) {
                    return element.Name == name
                    
                })
                if (!soldier)   {
                    return message.reply("This soldier is not known.")
                }
                let newkills = soldier.Kills + parseInt(args[2])
                connection.query("UPDATE xcom SET Kills =" + newkills + ",Globalkills =" + newkills +" WHERE ID = " + soldier.ID)
                console.log("Kills updated")
            })} 
        //newcampaign
        if (sub === "newcampaign")  {
            connection.query("SELECT * FROM xcom", function(error, result,fields)   {
                if (error) throw error
                if (!(args[1] === "reset")) {
                    return message.reply("No changes have been made")
                    
                }
                connection.query("UPDATE xcom SET Rank ='Rookie',Class ='Rookie', Kills =" + 0)
                console.log("Campaign reset") 
            })} 
        //leaderboard
        if (sub === "leaderboard")  {
            connection.query("SELECT * FROM xcom", function(error,result,fields)    {
                if (error) throw error
                var board = result.sort(function(a,b){return b.Kills - a.Kills})
                console.log(board)
                var name_board = []
                var kills_board = []
                var glob_board = []
                var rank_board = []
                var class_board = []

                board.forEach(function(element) {
                    name_board.push(element.Name)
                    kills_board.push(element.Kills)
                    glob_board.push(element.Globalkills)
                    rank_board.push(element.Rank)
                    class_board.push(element.Class)
                })
                console.log(name_board)
                let embed = new Discord.RichEmbed()
                    .setDescription("XCOM leaderboard")
                    .setColor(color)
                    .addField("Name",name_board,true)
                    .addField("Kills",kills_board,true)
                    .addField("Rank",rank_board,true)


                message.channel.send(embed)
            })  


        }
        }


    
    // ,say
    if (cmd ===`${prefix}say`)  {
        var optionalParameter;
            
            const sentence = args.join(" ");
            message.delete().catch(O_o=>{})
            message.channel.send(sentence)
            
            message.delete()
            
        }
    // ,nighty
    if (cmd === `${prefix}nighty`)  {
        message.delete()
        connection.connect(function(error)   {
            connection.query("SELECT Giflink FROM nightygifs", function(error, result, fields)  {
                if (error) throw error
                let n = result.length
                let N  = Math.floor(Math.random() * n)


                
                
                if (!args[0])  {
                    var embed = new Discord.RichEmbed()
                        .setColor(color)
                        .setDescription("**" + message.author.username + "** is going to bed. Good nighty")
                        .setImage(result[N].Giflink)
                    message.channel.send(embed)
                }
                
                
                else if (args[0] === "add") {
                    var link = {"Giflink": args[1]}
                    console.log("Adding new nighty gif")
                    connection.query("INSERT INTO Nightygifs SET ?", link, function(error)  {
                        if (error)  {
                            console.log(error)
                            return
                        }
                    })
                    console.log("Succes")
                }
                
                else {
                    var embed = new Discord.RichEmbed()
                        .setColor(color)
                        .setDescription("**" + message.author.username + "** wishes you a good nighty **"+ message.mentions.members.first().user.username + "**")
                        .setImage(result[N].Giflink)
                    message.channel.send(embed)
                }
            })
            
        })}
    // ,kick @user reason
    if (cmd === `${prefix}kick`)    {
        let kickee = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
        let user = message.member
        let reason = args.slice(1).join(' ')
        let kchannel = message.guild.channels.find(`name`, "kick-ban")
        message.delete()
        
        if (message.guild.name !== "Test2") {
            return message.reply("This is not meant to be used here.")
        }
        
        
        if (user.roles.find("name","EF Admin") || user.roles.find("name","EF Mod"))  {
            if (kickee.roles.find("name","EF Admin") || kickee.roles.find("name","EF Mod")) {
                message.reply("You can't kick this person")
                return
            }
            else {
                
                
                if (!reason)    {
                    reason = "No reason was given"
                }
                let embed = new Discord.RichEmbed()
                    .setColor(color)
                    .addField("Kicked",kickee)
                    .addField("Reason",reason)
                kchannel.send(embed)
                kickee.kick(reason)
                return
            }
            
        }}
        

    // ,ban @user reason
    if (cmd === `${prefix}ban`)    {
        let kickee = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
        let user = message.member
        let reason = args.slice(1).join(' ')
        let kchannel = message.guild.channels.find(`name`, "kick-ban")
        message.delete()
        
        if (message.guild.name !== "Test2") {
            return message.reply("This is not meant to be used here.")
        }
        
        
        if (user.roles.find("name","EF Admin"))  {
            if (kickee.roles.find("name","EF Admin") || kickee.roles.find("name","EF Mod")) {
                message.reply("You can't ban this person")
            }
            else {
                kickee.ban(reason)
                if (!reason)    {
                    reason = "No reason was given"
                }
                let embed = new Discord.RichEmbed()
                    .setColor(color)
                    .addField("Banned",kickee)
                    .addField("Reason",reason)
                    .addField("UserID",kickee.id)
                kchannel.send(embed)
                return
            }
            
        }}
        
        
        
        

    // ,unban @user reason
    if (cmd === `${prefix}unban`)    {
        let kickee = args[0]
        let user = message.member
        let kchannel = message.guild.channels.find(`name`, "kick-ban")
        message.delete()
        
        if (message.guild.name !== "Test2") {
            return message.reply("This is not meant to be used here.")
        }
        
        
        if (user.roles.find("name","EF Admin"))  {
                message.guild.unban(kickee)
                kchannel.send(`${kickee} has been unbanned.`)
            }
            
        }
        
        

    // ,report @user reason
    if (cmd === `${prefix}report`)  {
        
        let ARK = message.guild.name
        if (ARK !== "Test2")  {
            return message.reply("I am not able to do this here")   
            }

        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
        
        
        if(!rUser) return message.channel.send("No user could be found")
        
        let reason = args.join(' ').slice(22)
        let reportchannel = message.guild.channels.find(`name`, "reports")
        
        
        if(!reportchannel) return message.channel.send("Report channel not found")
        
        
        let reportembed = new Discord.RichEmbed()
            .setDescription("Report")
            .setColor(color)
            .addField("Reported user",`${rUser} with ID: ${rUser.id}`)
            .addField("Reported by", `${message.author} with ID: ${message.author.id}`)
            .addField("Reason",reason)
        
        message.delete().catch(O_0 => {})
        
        
        reportchannel.send(reportembed)
        message.delete()
        message.reply("Your report has been received.")
        }


    // ,hello
    if (cmd === `${prefix}hello`)    {
        message.delete()
        if (message.author.username === "Alizarin Crimson") {
            return message.channel.send("Greetings Onii-chan. I have missed you")
        }
        else{
            return message.channel.send("Greetings " + message.author.username)
        }}
    // ,botinfo
    if (cmd === `${prefix}botinfo`)  {
        message.delete()
        let botuptime = bot.uptime
            sec = Math.floor(botuptime/1000)

            min = 0
            while (sec >= 59)  {
               sec = sec - 60
               min = min + 1 
            }
            hour = 0
            while (min >= 59)    {
                min = min - 60
                hour = hour + 1
            }
        
        let Time = hour.toString() + ":" + min.toString() + ":" + sec.toString()

        let botav = bot.user.displayAvatarURL
        let botembed = new Discord.RichEmbed()
            .setDescription("Bot Information")
            .setColor(color)
            .setThumbnail(botav)
            .addField("My name", bot.user.username)
            .addField("Version","2.0")
            .addField("Prefix",prefix)
            .addField("Uptime",Time)
        return message.channel.send(botembed)
        }})



bot.login(config.TOKEN)