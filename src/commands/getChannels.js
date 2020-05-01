const fs = require('fs').promises

module.exports = {
	name: 'get',
	description: 'get channels and categorys',
	// aliases: ['flush'],
	// cooldown: 60,
	// args: true,
	// guildOnly: true,
	// usage: '',
	role: 'manager',
	execute: async (message, args, cooldowns, timestamps, client) => {
		const channels = require('../docs/assets/channels.json')
		const guildId = message.guild.id
		const guildName = message.guild.name
		const channelsCache = client.guilds.cache.get(guildId).channels.cache
		let cache
		
		let categoryOriginalName = ''
		let categoryName = ''
		let channelOriginalName = ''
		let channelName = ''
		let voiceOriginalName = ''
		let voiceName = ''
		let testSpace = false
		let testUpper = false
		let newChar = ''

		let guildCount = 0
		let categoryCount = 0
		let channelCount = 0
		let voiceCount = 0

		if(!channels[guildId]) {
			channels[guildId] = {}
			channels[guildId].name = guildName
			guildCount++
		}

		for(const caches of channelsCache) {
			cache = caches[1]
			if(cache.type == 'category') {
				categoryOriginalName = cache.name.match(/[A-Za-z0-9çáàãâéêíóõôú-]/g)
				for(const char of categoryOriginalName) {
					if(testSpace) {
						testUpper = true
						testSpace = false
					}
			
					if(char == '-') {
						newChar = ''
						testSpace = true
					} else if(char == 'á' || char == 'à' || char == 'â' || char == 'ã') {
						newChar = 'a'
					} else if(char == 'ê' || char == 'é') {
						newChar = 'e'
					} else if(char == 'í') {
						newChar = 'i'
					} else if(char == 'ó' || char == 'õ' || char == 'ô') {
						newChar = 'o'
					} else if(char == 'ú') {
						newChar = 'u'
					} else if(char == 'ç') {
						newChar = 'c'
					} else {
						newChar = char
					}
			
					if(testUpper) {
						categoryName += newChar.toUpperCase()
						testSpace = false
						testUpper = false
					} else {
						categoryName += newChar.toLocaleLowerCase()
					}
				}
				if(!channels[guildId][cache.id]) {
					channels[guildId][cache.id] = {}
					channels[guildId][cache.id].name = categoryName
					categoryCount++
				}
			}
			categoryName = ''
		}

		testUpper = false
		testSpace = false

		for(const caches of channelsCache) {
			cache = caches[1]
			if(cache.type == 'text') {
				channelOriginalName = cache.name.match(/[A-Za-z0-9]/g)
				for(const char of channelOriginalName) {
					if(testSpace) {
						testUpper = true
						testSpace = false
					}
			
					if(char == '-') {
						newChar = ''
						testSpace = true
					} else if(char == 'á' || char == 'à' || char == 'â' || char == 'ã') {
						newChar = 'a'
					} else if(char == 'ê' || char == 'é') {
						newChar = 'e'
					} else if(char == 'í') {
						newChar = 'i'
					} else if(char == 'ó' || char == 'õ' || char == 'ô') {
						newChar = 'o'
					} else if(char == 'ú') {
						newChar = 'u'
					} else if(char == 'ç') {
						newChar = 'c'
					} else {
						newChar = char
					}
			
					if(testUpper) {
						channelName += newChar.toUpperCase()
						testSpace = false
						testUpper = false
					} else {
						channelName += newChar.toLocaleLowerCase()
					}
				}
				if(!channels[guildId][cache.parentID][channelName]) {
					
					channels[guildId][cache.parentID][channelName] = cache.id
					channelCount++

				} else if(channels[guildId][cache.parentID][channelName] != cache.id) {
					const channelName2 = channelName + '2'
					
					if(!channels[guildId][cache.parentID][channelName2]) {
						channelCount++
						channels[guildId][cache.parentID][channelName2] = cache.id
					
					} else if (channels[guildId][cache.parentID][channelName2] != cache.id) {
					
						const channelName3 = channelName + '3'
						
						if(!channels[guildId][cache.parentID][channelName3]) {
					
							channelCount++
							channels[guildId][cache.parentID][channelName3] = cache.id
					
						} else if (channels[guildId][cache.parentID][channelName3] != cache.id) {
					
							const channelName4 = channelName + '4'

							if(!channels[guildId][cache.parentID][channelName4]) {
					
								channelCount++
								channels[guildId][cache.parentID][channelName4] = cache.id
					
							}
						}
					}
				}
			}
			channelName = ''
		}

		for(const caches of channelsCache) {
			cache = caches[1]
			if(cache.type == 'voice') {
				voiceOriginalName = cache.name.match(/[A-Za-z0-9çáàãâéêíóõôú-]/g)
				for(const char of voiceOriginalName) {
					if(testSpace) {
						testUpper = true
						testSpace = false
					}
			
					if(char == '-') {
						newChar = ''
						testSpace = true
					} else if(char == 'á' || char == 'à' || char == 'â' || char == 'ã') {
						newChar = 'a'
					} else if(char == 'ê' || char == 'é') {
						newChar = 'e'
					} else if(char == 'í') {
						newChar = 'i'
					} else if(char == 'ó' || char == 'õ' || char == 'ô') {
						newChar = 'o'
					} else if(char == 'ú') {
						newChar = 'u'
					} else if(char == 'ç') {
						newChar = 'c'
					} else {
						newChar = char
					}
			
					if(testUpper) {
						voiceName += newChar.toUpperCase()
						testSpace = false
						testUpper = false
					} else {
						voiceName += newChar.toLocaleLowerCase()
					}
				}

				if(!channels[guildId][cache.parentID][voiceName]) {
					channels[guildId][cache.parentID][voiceName] = cache.id
					voiceCount++
				}
			}
			voiceName = ''
		}

		channels.totalGuilds += guildCount
		channels.totalCategorys += categoryCount
		channels.totalChannels += channelCount
		channels.voiceChannels += voiceCount

		const data = JSON.stringify(channels)
		await fs.writeFile('src/docs/assets/channels.json', data)
			.then(console.log(`addiding ${channelCount} channel(s) and ${voiceCount} voice channel(s) and ${categoryCount} category(s) and ${guildCount} guild(s)`))
			.then(message.channel.send(`addiding ${channelCount} channel(s) and ${voiceCount} voice channel(s) and ${categoryCount} category(s) and ${guildCount} guild(s)`))
			.catch(err => console.log(err))

	},
};