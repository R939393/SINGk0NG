import './HAN_SETTINGS.js';
import fs from 'fs';
import os from 'os';
import util from 'util';
import path from 'path';
import axios from 'axios';
import chalk from 'chalk';
import yts from 'yt-search';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import FormData from 'form-data';
import webp from 'node-webpmux';
import { createRequire } from 'module';
import speed from 'performance-now';
import moment from 'moment-timezone';
import { performance } from 'perf_hooks';
import { parsePhoneNumber } from 'awesome-phonenumber';
import { exec, spawn, execSync } from 'child_process';
import { generateWAMessageContent, jidNormalizedUser, getContentType } from 'baileys';
import { JadiBot, StopJadiBot, ListJadiBot } from './src/jadibot.js';
import 'moment/min/locales.js';
import { UguuSe } from './HANZ-DATA/uploader.js';
import { toAudio, toPTT } from './HANZ-DATA/converter.js';
import { GroupUpdate, LoadDataBase } from './src/message.js';
import { cmdAdd, cmdAddHit} from './src/database.js';

import { getRandom, getBuffer, fetchJson, runtime, clockString, sleep, isUrl, formatDate, formatp, generateProfilePicture, errorCache, normalize, runUpdate, updateSettings, parseMention, fixBytes, similarity, pickRandom, encodeToLetters, tarBackup } from './HANZ-DATA/function.js';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const locales = moment.locales();
const timez = moment.tz.names();
const menfesTimeouts = new Map();
const settingsPath = path.join(__dirname, 'HAN_SETTINGS.js');
let canvasModule = null;

try {
	console.log(chalk.yellowBright('[SYSTEM] Fast Active 🚀'));
} catch (error) {
	console.log(chalk.yellowBright('[SYSTEM] ERORR Imagemagick Active'));
}

const fileContent = fs.readFileSync(__filename, 'utf-8');
const casesArray = [...fileContent.matchAll(/case\s+['"]([^'"]+)['"]/g)].map(match => match[1]);

const RAEHAN2GD = async (RAEHAN2GD, m, msg, store) => {
	if (!global.db) global.db = {};
	global.db.cases = global.db.cases || casesArray;
	const cases = global.db.cases;

	await LoadDataBase(RAEHAN2GD, m);
	
	const botNumber = RAEHAN2GD.decodeJid(RAEHAN2GD.user.id);
	
	const set = db.set[botNumber];
	
	const ownerNumber = set.owner = [...new Set([...global.owner, botNumber.split('@')[0], ...set?.owner || []])];
	
	try {
		await GroupUpdate(RAEHAN2GD, m, store);
		
		const body = ((m.type === 'conversation') ? m.message.conversation :
		(m.type == 'imageMessage') ? m.message.imageMessage.caption :
		(m.type == 'videoMessage') ? m.message.videoMessage.caption :
		(m.type == 'extendedTextMessage') ? m.message.extendedTextMessage.text :
		(m.type == 'reactionMessage') ? m.message.reactionMessage.text :
		(m.type == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId :
		(m.type == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
		(m.type == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId :
		(m.type == 'interactiveResponseMessage'  && m.quoted) ? (m.message.interactiveResponseMessage?.nativeFlowResponseMessage ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id : '') :
		(m.type == 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || '') :
		(m.type == 'editedMessage') ? (m.message.editedMessage?.message?.protocolMessage?.editedMessage?.extendedTextMessage?.text || m.message.editedMessage?.message?.protocolMessage?.editedMessage?.conversation || '') :
		(m.type == 'protocolMessage') ? (m.message.protocolMessage?.editedMessage?.extendedTextMessage?.text || m.message.protocolMessage?.editedMessage?.conversation || m.message.protocolMessage?.editedMessage?.imageMessage?.caption || m.message.protocolMessage?.editedMessage?.videoMessage?.caption || '') : '') || '';
		
		const budy = (typeof m.text == 'string' ? m.text : '');
		const isCreator = global.isOwner = ownerNumber.some(owner => {
			const ownerJid = owner.includes('@') ? owner : owner + '@s.whatsapp.net';
			const findJid = RAEHAN2GD.findJidByLid(jidNormalizedUser(ownerJid), store, true);
			if (!findJid) return false;
			return findJid === m.sender;
		});
		const symbolMatch = body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@()#,'"*+÷/\%^&.©^]/gi);
		const emojiMatch = body.match(/^[\uD800-\uDBFF][\uDC00-\uDFFF]/gi); 
		const listMatch = global.listprefix.find(a => body?.startsWith(a));
		const detectedPrefix = symbolMatch ? symbolMatch[0] : (emojiMatch ? emojiMatch[0] : listMatch);
		const prefix = isCreator ? (detectedPrefix || set.authorPrefix) : set.multiprefix ? (detectedPrefix || '¿') : (listMatch || '¿');
		const isCmd = body.startsWith(prefix);
		const args = body.trim().split(/ +/).slice(1);
		const quoted = m.quoted ? m.quoted : m;
		const command = isCmd ? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : '';
		const text = global.q = args.join(' ');
		const mime = (quoted.msg || quoted).mimetype || '';
		const qmsg = (quoted.msg || quoted);
		const author = set.author = global.author || 'MATAMU PICEK';
		const packname = set.packname = global.packname || 'UMAT DANCOK';
		const botname = set.botname = global.botname || 'HAN';
		const locale_day = moment.tz(global.timezone).locale(global.locale).format('dddd');
		const date = moment.tz(global.timezone).locale(global.locale).format('DD/MM/YYYY');
		const date_time = moment.tz(global.timezone).locale(global.locale).format('HH:mm:ss');
		const time = Date.now();
		const time_now = new Date();
		const setv = pickRandom(global.listv);
        
		const fkontak = {
			key: {
				remoteJid: '0@s.whatsapp.net',
				participant: '0@s.whatsapp.net',
				fromMe: false,
				id: 'HANZ'
			},
			message: {
				contactMessage: {
					displayName: (m.pushName || author),
					vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${m.pushName || author},;;;\nFN:${m.pushName || author}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
					sendEphemeral: true
				}
			}
		};
		
		if (m.message && m.key.remoteJid !== 'status@broadcast') {
			if (set.log) console.log(chalk.black(chalk.whiteBright('[CHAT]:'), chalk.greenBright(`${locale_day} ${date} (${date_time})`), chalk.hex('#AF26EB')(m.key.id) + '\n' + chalk.hex('#00EAD3')(budy || m.type) + '\n' + chalk.cyanBright('[FROM]:'), chalk.yellowBright(m.pushName || (isCreator ? 'Bot' : 'Anonim')), chalk.hex('#FF449F')(m.sender.split('@')[0]), chalk.hex('#FF5700')(m.isGroup ? m.metadata?.subject || 'Group' : m.chat.endsWith('@newsletter') ? 'Newsletter' : 'Private Chat'), chalk.blueBright('(' + m.chat + ')')));
			else console.log(chalk.black(chalk.bgWhite('[CHAT]:'), chalk.bgGreen(`${locale_day} ${date} (${date_time})`), chalk.bgHex('#AF26EB')(m.key.id) + '\n' + chalk.bgHex('#00EAD3')(budy || m.type) + '\n' + chalk.bgCyanBright('[FROM]:'), chalk.bgYellow(m.pushName || (isCreator ? 'Bot' : 'Anonim')), chalk.bgHex('#FF449F')(m.sender), chalk.bgHex('#FF5700')(m.isGroup ? m.metadata?.subject || 'Group' : m.chat.endsWith('@newsletter') ? 'Newsletter' : 'Private Chat'), chalk.bgBlue('(' + m.chat + ')')));
		}
		
		
		
		
		
		
		
		
	
if (!global.recentChats) global.recentChats = [];
//▬▭▬▭▬▭▬▭▬▬▭▬▭▬▭▬▭▬▭▬▭▬▬▭▬▭

 { global.recentChats = global.recentChats.filter(jid => jid !== m.chat);
   global.recentChats.unshift(m.chat);
//▬▭▬▭▬▭▬▭▬▬▭▬▭▬▭▬▭▬▭▬▭▬▬▭▬▭
              ////// BATAS CHAT ///////
//▬▭▬▭▬▭▬▭▬▬▭▬▭▬▭▬▭▬▭▬▭▬▬▭▬▭
    if (global.recentChats.length > 50) {   global.recentChats.pop(); }
    for (let jid of global.recentChats) { await RAEHAN2GD.sendPresenceUpdate('recording', jid);}}    
    





		let fileSha256;
		if (m.isMedia && m.msg.fileSha256 && db.cmd && (m.msg.fileSha256.toString('base64') in db.cmd)) {
			let hash = db.cmd[m.msg.fileSha256.toString('base64')];
			fileSha256 = hash.text;
		}
		
		// OPTIMASI: Menggunakan loading statis untuk menghindari spam edit yang menyebabkan delay (Bad MAC)
		const sendLoading = async (chatId, m) => {
			let { key } = await RAEHAN2GD.sendMessage(chatId, { text: '「 ▒▒▒▒▒▒▒▒▒▒ 」 0%\n\nLOADING SCRIPT RAEHAN...' }, { quoted: m });
			await sleep(500); 
			await RAEHAN2GD.sendMessage(chatId, { text: '「 ███████████ 」 100%\n\nSELESAI!', edit: key });
		};






		switch(fileSha256 || command) {
		
		
			case 'toaud': case 'toaudio': {
				if (!/video|audio/.test(mime)) return m.reply(`Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${prefix + command}`);
				m.react('⏳');
				let media = await RAEHAN2GD.downloadAndSaveMediaMessage(qmsg);
				try {
					let audio = await toAudio(media, 'mp4');
					await m.reply({ audio: { url: audio }, mimetype: 'audio/mpeg'});
					if (fs.existsSync(audio)) fs.unlinkSync(audio);
				} finally {
					if (fs.existsSync(media)) fs.unlinkSync(media);
				}
			}
			break;
			
			
			
			case 'tomp3': {
				if (!/video|audio/.test(mime)) return m.reply(`Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${prefix + command}`);
				m.react('⏳');
				let media = await RAEHAN2GD.downloadAndSaveMediaMessage(qmsg);
				try {
					let audio = await toAudio(media, 'mp4');
					await m.reply({ document: { url: audio }, mimetype: 'audio/mpeg', fileName: `Convert By RAEHAN2GD Bot.mp3`});
					if (fs.existsSync(audio)) fs.unlinkSync(audio);
				} finally {
					if (fs.existsSync(media)) fs.unlinkSync(media);
				}
			}
			break;
			
			
			
			case 'tovn': case 'toptt': case 'tovoice': {
				if (!/video|audio/.test(mime)) return m.reply(`Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${prefix + command}`);
				m.react('⏳');
				let media = await RAEHAN2GD.downloadAndSaveMediaMessage(qmsg);
				try {
					let audioBuffer = await toPTT(media, 'mp4');
					await m.reply({ audio: audioBuffer, mimetype: 'audio/ogg; codecs=opus', ptt: true });
				} finally {
					if (fs.existsSync(media)) fs.unlinkSync(media);
				}
			}
			break;
			case 'togif': {
				if (!/webp|video/.test(mime)) return m.reply(`Reply Video/Stiker dengan caption *${prefix + command}*`);
				m.react('⏳');
				let media = await RAEHAN2GD.downloadAndSaveMediaMessage(qmsg);
				let ran = `./HANZ-DATA/${getRandom('.mp4')}`;
				exec(`ffmpeg -y -i "${media}" -an -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -pix_fmt yuv420p -c:v libx264 -preset veryfast "${ran}"`, async (err) => {
					try {
						if (err) return m.reply('gagal');
						await m.reply({ video: { url: ran }, gifPlayback: true, caption: ('okey'), gifAttribution: pickRandom(['TENOR','GIPHY']) });
					} finally {
						if (fs.existsSync(media)) fs.unlinkSync(media);
						if (fs.existsSync(ran)) fs.unlinkSync(ran);
					}
				});
			}
			break;
			case 'toimage': case 'toimg': {
				if (!/webp|video|image/.test(mime)) return m.reply(`Reply Video/Stiker dengan caption *${prefix + command}*`);
				m.react('⏳');
				let media = await RAEHAN2GD.downloadAndSaveMediaMessage(qmsg);
				let ran = `./HANZ-DATA/${getRandom('.png')}`;
				exec(`ffmpeg -y -i "${media}" -vframes 1 "${ran}"`, async (err) => {
					try {
						if (err) return m.reply(' gagal');
						await m.reply({ image: { url: ran }, caption: "oky"});
					} finally {
						if (fs.existsSync(media)) fs.unlinkSync(media);
						if (fs.existsSync(ran)) fs.unlinkSync(ran);
					}
				});
			}
			break;
			case 'toptv': {
				if (!/video/.test(mime)) return m.reply(`Kirim/Reply Video Yang Ingin Dijadikan PTV Message Dengan Caption ${prefix + command}`);
				if ((m.quoted ? m.quoted.type : m.type) === 'videoMessage') {
					m.react('⏳');
					let media = await RAEHAN2GD.downloadAndSaveMediaMessage(qmsg);
					try {
						const message = await generateWAMessageContent({ video: { url: media } }, { upload: RAEHAN2GD.waUploadToServer });
						await RAEHAN2GD.relayMessage(m.chat, { ptvMessage: message.videoMessage }, {});
					} finally {
						if (fs.existsSync(media)) fs.unlinkSync(media);
					}
				} else m.reply('Reply Video Yang Mau Di Ubah Ke PTV Message!');
			}
			break;
			case 'tourl': {
				if (/webp|video|sticker|audio|jpg|jpeg|png/.test(mime)) {
					m.react('⏳');
					let media = await RAEHAN2GD.downloadAndSaveMediaMessage(qmsg);
					try {
						let anu = await UguuSe(media);
						m.reply('Url : ' + anu.url);
					} finally {
						if (fs.existsSync(media)) fs.unlinkSync(media);
					}
				} else {
        m.reply('Format media tidak didukung!');
    }
			}
			break;
			case 'sticker': {
				if (!/image|video|sticker/.test(quoted.type)) return m.reply(`Kirim/reply gambar/video/gif dengan caption ${prefix + command}\nDurasi Image/Video/Gif 1-9 Detik`);
				let media = await RAEHAN2GD.downloadAndSaveMediaMessage(qmsg);
				let teks1 = text.split`|`[0] ? text.split`|`[0] : packname;
				let teks2 = text.split`|`[1] ? text.split`|`[1] : author;
				if (/image|webp/.test(mime)) {
					m.react('⏳');
					await RAEHAN2GD.sendAsSticker(m.chat, media, m, { packname: teks1, author: teks2 });
				} else if (/video/.test(mime)) {
					if ((qmsg).seconds > 11) return m.reply('Maksimal 10 detik!');
					m.react('⏳');
					await RAEHAN2GD.sendAsSticker(m.chat, media, m, { packname: teks1, author: teks2 });
				} else m.reply(`Kirim/reply gambar/video/gif dengan caption ${prefix + command}\nDurasi Video/Gif 1-9 Detik`);
			}
			break;
			case 'setpphanz': {
			    if (!isCreator) return; 
				if (!/image/.test(quoted.type)) return m.reply(`Reply Image With Caption ${prefix + command}`);
                await sendLoading(m.chat, m);
				// PERBAIKAN: Gunakan RAEHAN2GD.downloadAndSaveMediaMessage ketimbang quoted.download
				let media = await RAEHAN2GD.downloadAndSaveMediaMessage(qmsg);
				let { img } = await generateProfilePicture(media, text.length > 0 ? null : 512);
				await RAEHAN2GD.query({
					tag: 'iq',
					attrs: {
						to: '@s.whatsapp.net',
						type: 'set',
						xmlns: 'w:profile:picture'
					},
					content: [{ tag: 'picture', attrs: { type: 'image' }, content: img }]
				});
				m.reply('𝐬𝐮𝐤𝐬𝐞𝐬𝐬');
                if (fs.existsSync(media)) fs.unlinkSync(media);
			}
			break;
			case 'setppgchanz': {
			    if (!isCreator) return; 
				if (!m.isGroup) return;
				if (!m.quoted) return m.reply('Reply Gambar yang mau dipasang di Profile Bot');
				if (!/image/.test(quoted.type)) return m.reply(`Reply Image Dengan Caption ${prefix + command}`);
                await sendLoading(m.chat, m);
				// PERBAIKAN: Gunakan format media bawaan yang terbukti reliable
				let media = await RAEHAN2GD.downloadAndSaveMediaMessage(qmsg);
				let { img } = await generateProfilePicture(media, text.length > 0 ? null : 512);
				await RAEHAN2GD.query({
					tag: 'iq',
					attrs: {
						target: m.chat,
						to: '@s.whatsapp.net',
						type: 'set',
						xmlns: 'w:profile:picture'
					},
					content: [{ tag: 'picture', attrs: { type: 'image' }, content: img }]
				});
				m.reply('𝐬𝐮𝐤𝐬𝐞𝐬𝐬');
                if (fs.existsSync(media)) fs.unlinkSync(media);
			}
			break;
			case 'jadibot': {
				const nmrnya = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.sender;
				const onWa = await RAEHAN2GD.onWhatsApp(nmrnya);
				if (!onWa.length > 0) return m.reply('nomornya?');
				await JadiBot(RAEHAN2GD, nmrnya, m, store);
				m.reply(`Gunakan ${prefix}stopjadibot\nUntuk Berhenti`);
			}
			break;
			case 'stopjadibot': {
				const nmrnya = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.sender;
				const onWa = await RAEHAN2GD.onWhatsApp(nmrnya);
				if (!onWa.length > 0) return m.reply('nomornya?');
				await StopJadiBot(RAEHAN2GD, nmrnya, m);
			}
			break;
			case 'listjadibot': {
				ListJadiBot(RAEHAN2GD, m);
			}
			break;
			case 'buatgc': {
				if (!isCreator) return;
                await sendLoading(m.chat, m);
				if (!text) return m.reply(`Example:\n${prefix + command} *Nama Gc*`);
				let group = await RAEHAN2GD.groupCreate(text, [m.sender]);
				let res = await RAEHAN2GD.groupInviteCode(group.id);
				await m.reply(`*Link Group :* *https://chat.whatsapp.com/${res}*\n\n*Nama Group :* *${group.subject}*\nSegera Masuk dalam 30 detik\nAgar menjadi Admin`, { detectLink: true });
				await sleep(30000);
				await RAEHAN2GD.groupParticipantsUpdate(group.id, [m.sender], 'promote').catch(e => {});
				await RAEHAN2GD.sendMessage(group.id, { text: '𝐒𝐮𝐤𝐬𝐞𝐬𝐬' });
			}
			break;
			case 'kick': {
			    if (!m.isGroup) return; 
				if (!m.isAdmin) return; 
				if (!m.isBotAdmin) return; 
                await sendLoading(m.chat, m);
				if (text || m.quoted) {
					const numbersOnly = text ? text.replace(/\D/g, '') + '@s.whatsapp.net' : m.quoted?.sender;
					const findJid = RAEHAN2GD.findJidByLid(numbersOnly.replace(/[^0-9]/g, '') + '@lid', store);
					const klss = numbersOnly.replace(/[^0-9]/g, '') + (findJid ? '@lid' :  '@s.whatsapp.net');
					const nmrnya = RAEHAN2GD.findJidByLid(klss, store, true);
					await RAEHAN2GD.groupParticipantsUpdate(m.chat, [nmrnya], 'remove').catch((err) => m.reply('gagal'));
				} else m.reply(`Example: ${prefix + command} 62xxx`);
			}
			break;
			case 'ping': {
                await sendLoading(m.chat, m);
				const used = process.memoryUsage();
				const cpus = os.cpus().map(cpu => {
					cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0);
					return cpu;
				});
				const cpu = cpus.reduce((last, cpu, _, { length }) => {
					last.total += cpu.total;
					last.speed += cpu.speed / length;
					last.times.user += cpu.times.user;
					last.times.nice += cpu.times.nice;
					last.times.sys += cpu.times.sys;
					last.times.idle += cpu.times.idle;
					last.times.irq += cpu.times.irq;
					return last;
				}, {
					speed: 0,
					total: 0,
					times: { user: 0, nice: 0, sys: 0, idle: 0, irq: 0 }
				});
				let timestamp = speed();
				let latensi = speed() - timestamp;
				let neww = performance.now();
				let oldd = performance.now();
				let respon = `Kecepatan Respon ${latensi.toFixed(4)} _Second_ \n ${oldd - neww} _miliseconds_\n\nRuntime : ${runtime(process.uptime())}\n\n💻 Info Server\nRAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}\n\n_NodeJS Memory Usaage_\n${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${formatp(used[key])}`).join('\n')}\n\n${cpus[0] ? `_Total CPU Usage_\n${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}\n_CPU Core(s) Usage (${cpus.length} Core CPU)_\n${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}`.trim();
				m.reply(respon);
			}
			break;
			case 'speed': {
                await sendLoading(m.chat, m);
				let cp = require('child_process');
				let { promisify } = require('util');
				let exec = promisify(cp.exec).bind(cp);
				let o;
				try {
					o = await exec('python3 speed.py --share');
				} catch (e) {
					o = e;
				} finally {
					let { stdout, stderr } = o;
					if (stdout.trim()) m.reply(stdout);
					if (stderr.trim()) m.reply(stderr);
				}
			}
			break;
			case 'owh': {
			    if (!isCreator) return;
			    if (!m.quoted) return m.reply('salah.');
			    try {
			        let qmsg = m.quoted.msg || m.quoted;
			        const isViewOnce = qmsg.viewOnce;
			        if (!isViewOnce) return; 

			        const myNumber = ownerNumber[0].includes('@') ? ownerNumber[0] : ownerNumber[0] + '@s.whatsapp.net';
			        m.react('⏳');
			        const teksPesan = qmsg.caption || 'Tidak ada pesan teks';
			        const HAN = `
||||||||||||||||||||||||||||||||||||||||||||||||||||||
━━━━━━━━━━━━━
||||||||||||||||  ➀ 𝐅𝐨𝐭𝐨  |||||||||||||||||
━━━━━━━━━━━━━
╭━━━━━━━━━━━╾•
├→ *Dari:* @${m.sender.split('@')[0]}
├━━━━━━━━━━━╾
├→ *Isi Pesan:* ${teksPesan}
╰━━━━━━━━━━━╾•
━━━━━━━━━━━━━
FOLLOW MY INSTAGRAM 👇
https://www.instagram.com/hanz_932?igsh=Ymp6dTNjYzhtODFq
━━━━━━━━━━━━━`.trim();

			        let media = await RAEHAN2GD.downloadAndSaveMediaMessage(qmsg);
					// PERBAIKAN: Gunakan qmsg.mimetype dengan Fallback agar tidak crash undefined split
			        const type = (qmsg.mimetype || mime).split('/')[0] === 'video' ? 'video' : 'image';
			        
			        await RAEHAN2GD.sendMessage(myNumber, {
			            [type]: { url: media },
			            caption: HAN,
			            mentions: [m.sender]
			        }, { quoted: fkontak });

					if (fs.existsSync(media)) fs.unlinkSync(media);
			        m.react('🤔');
			    } catch (e) {
			        console.log(e);
			        m.reply('oke deh');
			    }
			}
			break;
			case 'wastalk': {
			if (!isCreator) return;
			    try {
			        // 1. Validasi input agar tidak menghasilkan JID kosong/error
			        let num = m.quoted?.sender || m.mentionedJid?.[0] || text.replace(/[^0-9]/g, '');
			        if (!num || num.trim() === '') return m.reply(`Silahkan tag, reply, atau masukkan nomor target!\nContoh: ${prefix + command} 628xxx`);
			        
			        num = num.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
			        
			        // 2. Cek apakah nomor terdaftar di WA
			        let onWhatsApp = await RAEHAN2GD.onWhatsApp(num);
			        if (!onWhatsApp || !onWhatsApp[0]?.exists) return m.reply('Nomor tidak terdaftar di WhatsApp!');
			        
			        let img = await RAEHAN2GD.profilePictureUrl(num, 'image').catch(_ => 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
			        let bio = await RAEHAN2GD.fetchStatus(num).catch(_ => ({}));
			        
			        // Fallback name jika method .getName() tidak tersedia di instance
			        let name = '-';
			        try {
			            name = await RAEHAN2GD.getName(num);
			        } catch (_) {
			            name = store?.contacts?.[num]?.name || store?.contacts?.[num]?.notify || '-';
			        }
			        
			        let business = await RAEHAN2GD.getBusinessProfile(num).catch(_ => null);
			        
			        // 3. Parsing nomor telepon & region secara aman
			        let format = parsePhoneNumber(`+${num.split('@')[0]}`);
			        let formattedNum = num.split('@')[0];
			        let country = 'Indonesia';
			        
			        if (format) {
			            try {
			                formattedNum = format.getNumber('international') || format.number?.international || formattedNum;
			                let regionCode = format.getRegionCode?.() || format.regionCode || 'ID';
			                let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
			                country = regionNames.of(regionCode.toUpperCase()) || 'Indonesia';
			            } catch (_) {
			                country = 'Indonesia'; // Fallback aman jika library/intl gagal melacak negara
			            }
			        }

			        let wea = "";
			        if (business) {
			            wea = `
▬▭▬▭▬▭▬▭▬▬▭▬▭
WHATSAPP BUSINESS 
▬▭▬▭▬▭▬▭▬▬▭▬▭
╭━━━━━━━━━━━╾•
├◎ NAMA: ${name ? name : '-'}
├◎ NOMOR: ${formattedNum}
├◎ ID: ${business.wid || num}
├◎ KATEGORI: ${business.category ? business.category : '-'}
╰━━━━━━━━━━━━╯
━━━━━━━━━━━━━
WEBSITE: ${business.website ? business.website : '-'}
━━━━━━━━━━━━━
EMAIL: ${business.email ? business.email : '-'}
━━━━━━━━━━━━━
ADDRESS: ${business.address ? business.address : '-'}
━━━━━━━━━━━━━
DESC: ${business.description ? business.description : '-'}
━━━━━━━━━━━━━`;
			        } else {
			            wea = `
▬▭▬▭▬▭▬▭▬▬▭▬▭				
WHATSAPP STANDAR
▬▭▬▭▬▭▬▭▬▬▭▬▭
╭━━━━━━━━━━━╾•
├◎ NEGARA: ${country.toUpperCase()}
├◎ NAMA: ${name ? name : '-'}
├◎ NOMOR: ${formattedNum}
├◎ LINK: wa.me/${num.split('@')[0]}
├◎ MENTIONS: @${num.split('@')[0]}
╰━━━━━━━━━━━━╯
━━━━━━━━━━━━━
STATUS: ${bio?.status || '-'}
BIO DITETAPKAN: ${bio?.setAt ? moment(bio.setAt).locale('id').format('LL') : '-'}
━━━━━━━━━━━━━`;
			        }

			        await RAEHAN2GD.sendMessage(m.chat, { 
			            image: { url: img }, 
			            caption: wea, 
			            mentions: [num] 
			        }, { quoted: m });

			    } catch (e) {
			        console.error(e);
			        m.reply('Terjadi kesalahan internal saat menjalankan fitur wastalk!');
			    }
			}
			break;
			
			case 'ghstalk': {
				if (!text) return m.reply(`Example: ${prefix + command} usernamenya`);
				try {
					const res = await fetchJson('https://api.github.com/users/' + text);
					m.reply({ image: { url: res.avatar_url }, caption: `
╭━━━━━━━━━━━╾•
├◎ *Username :* ${res.login}
├◎ *Nickname :* ${res.name || 'Tidak ada'}
├◎ *Bio :* ${res.bio || 'Tidak ada'}
├◎ *ID :* ${res.id}
├◎ *Node ID :* ${res.node_id}
├◎ *Type :* ${res.type}
├◎ *Admin :* ${res.admin ? 'Ya' : 'Tidak'}
├◎ *Company :* ${res.company || 'Tidak ada'}
├◎ *Blog :* ${res.blog || 'Tidak ada'}
├◎ *Location :* ${res.location || 'Tidak ada'}
├◎ *Email :* ${res.email || 'Tidak ada'}
├◎ *Public Repo :* ${res.public_repos}
├◎ *Public Gists :* ${res.public_gists}
├◎ *Followers :* ${res.followers}
├◎ *Following :* ${res.following}
├◎ *Created At :* ${res.created_at} 
├◎ *Updated At :* ${res.updated_at}
╰━━━━━━━━━━━━╯` });
				} catch (e) {
					m.reply('Username Tidak ditemukan!');
				}
			}
			break;
			case 'url': {
			    if (!m.quoted) return m.reply(`Balas/Reply media *${prefix + command}*`);
			    if (!/webp|video|sticker|audio|jpg|jpeg|png/.test(mime)) return m.reply(`Format tidak didukung!`);
			    
			    try {
					// PERBAIKAN: Fungsi asli .download() pada m.quoted sering hilang, gunakan method Baileys
			        let mediaBuffer = await RAEHAN2GD.downloadMediaMessage(qmsg); 
			        const { fileTypeFromBuffer } = await import('file-type'); 
			        let { ext, mime: mediaMime } = (await fileTypeFromBuffer(mediaBuffer)) || { ext: 'bin', mime: 'application/octet-stream' };
			        
			        let form = new FormData();
			        form.append('file', mediaBuffer, { 
			            filename: `RAEHAN2GD-${Date.now()}.${ext}`, 
			            contentType: mediaMime 
			        });
			        
			        let response = await axios.post('https://ar-hosting.pages.dev/upload', form, {
			            headers: {
			                ...form.getHeaders(),
			                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
			            }
			        });
			        
			        let resData = response.data;
			        let urlResult = '';
			        
			        if (typeof resData === 'object') {
			            urlResult = resData.url || resData.link || resData.result?.url || resData.data?.url;
			        } else if (typeof resData === 'string') {
			            try {
			                let parsed = JSON.parse(resData);
			                urlResult = parsed.url || parsed.link || parsed.result?.url;
			            } catch {
			                urlResult = resData.trim();
			            }
			        }
			        
			        if (!urlResult) {
			            return m.reply(`Gagal mendapatkan URL : ${JSON.stringify(resData)}`);
			        }
			        
			        const captionResult = `
╭━━━━━━━━━━━╾•
├◎ UKURAN: ${(mediaBuffer.length / 1024 / 1024).toFixed(2)} MB
├◎ MEDIA: ${mediaMime}
╰━━━━━━━━━━━━╯
▬▭▬▭▬▭▬▭▬▬▭▬▭
LINK
${urlResult}
▬▭▬▭▬▭▬▭▬▬▭▬▭`;
			                            
			        await RAEHAN2GD.sendMessage(m.chat, { image: { url: urlResult }, caption: captionResult }, { quoted: m });
			        
			    } catch (e) {
			        console.error(e);
			        m.reply(`❌ Terjadi kesalahan saat mengunggah file.`);
			    }
			}
			break;
			
			
			
			
			
			
			
			
			
			
			
			case 'sosialmedsos1': { await RAEHAN2GD.sendMessage(m.chat, { text: ' https://www.instagram.com/hanz_932?igsh=Ymp6dTNjYzhtODFq' })}
			break
			
			case 'soundcld' :{ await RAEHAN2GD.sendMessage(m.chat, { text: 'https://on.soundcloud.com/7yypedGga9tZyeQI6R'})}
			break
			
				
			case 'whtsappp' :{ await RAEHAN2GD.sendMessage(m.chat, { text: 'https://wa.me/+6285820054587'})}
			break
			
			
			
			
			
			case 'bagidonasi': {
			const QR = ` SCAN BARCODE NYA YA `
			await RAEHAN2GD.sendMessage(m.chat, { image: { url: 'https://ar-hosting.pages.dev/1782820273985.jpg'}, caption: QR })}
			break
			
			case 'kenalanajayoooks': {
			await RAEHAN2GD.sendMessage(m.chat, { text: 'https://ig-hanz-932.github.io/JAWAB_PERTANYAAN_INI_DONG'})}
			break
			
			
			
			
			case 'menu': {
				let menuImg = 'https://ar-hosting.pages.dev/1782839401279.jpg'; 

				let thumb;
				try {
					thumb = await getBuffer(menuImg);
				} catch (e) {
					thumb = null;
				}

				const sections = [
					{
						title: "📂 Kategori Fitur",
						rows: [
							{ title: "FITUR PUBLIC 👥", id: `${prefix}93939393939393`, description: "Daftar fitur konversi dan tools" },
							
							{ title: "PRIVATE FITUR 👤", id: `${prefix}99999999999999`, description: "Fitur khusus pengaturan bot" },
							
							{ title: "KENALAN DONG 😏", id: `${prefix}kenalanajayoooks`}, //description: "KLIK LINK NYA KENALAN DULU YAA" },
							{ title: "DONASI 📦", id: `${prefix}bagidonasi`}//, description: "KLIK LINK NYA KENALAN DULU YAA" }
					
						]
					}
				];

				const contentMsg = {
					text: `Halo ${m.pushName || 'User'},\nSILAHKAN KLIK\nDAFTAR MENU\nHARI : ${locale_day}\nTANGGAL : ${date}\nJAM : ${date_time}`,
					footer: "IG :  @hanz_932",
					image: { url: menuImg },
					buttons: [
						{
							name: "single_select",
							buttonParamsJson: {
								title: "Klik Daftar Menu",
								sections: sections
							}
						}
					]
				};

				if (thumb) contentMsg.image = thumb;
				await RAEHAN2GD.sendListMsg(m.chat, contentMsg, { quoted: m });
			}
			break;
			case '93939393939393': {
				let menuBot = `╭───❍「 *FITUR PUBLIC* 」❍
│${setv} ${prefix}toaudio (reply pesan)
│${setv} ${prefix}tomp3 (reply pesan)
│${setv} ${prefix}tovn (reply pesan)
│${setv} ${prefix}togif (reply pesan)
│${setv} ${prefix}toimage (reply pesan)
│${setv} ${prefix}toptv (reply pesan)
│${setv} ${prefix}tourl (reply pesan)
│${setv} ${prefix}url (reply media)
│${setv} ${prefix}sticker (send/reply img)
│${setv} ${prefix}jadibot
│${setv} ${prefix}stopjadibot
│${setv} ${prefix}listjadibot
│${setv} ${prefix}ping
│${setv} ${prefix}speed
│${setv} ${prefix}ghstalk username
╰──────❍`;
				
				await RAEHAN2GD.sendMessage(m.chat, { text: menuBot, mentions: [m.sender] }, { quoted: m });
			}
			break;
			case '99999999999999': {
				if (!isCreator) return m.reply('Maaf, menu ini hanya untuk Owner Bot!');
				
				let menuOwner = `╭───❍「 *FITUR PRIVATE* 」❍
│${setv} ${prefix}setpphanz (reply img)
│${setv} ${prefix}setppgchanz (reply img)
│${setv} ${prefix}buatgc namagc
│${setv} ${prefix}kick 62xxx / @tag
│${setv} ${prefix}owh (reply view)
│${setv} ${prefix}wastalk @tag/nomor
│${setv} $ (exec cmd)
│${setv} > (eval sync)
│${setv} < (eval async)
╰──────❍`;
				
				await RAEHAN2GD.sendMessage(m.chat, { text: menuOwner, mentions: [m.sender] }, { quoted: m });
			}
			break;
			default:
			if (budy.startsWith('>')) {
				if (!isCreator) return;
				try {
					let evaled = await eval(budy.slice(2));
					if (typeof evaled !== 'string') evaled = util.inspect(evaled);
					await m.reply(evaled);
				} catch (err) {
					await m.reply(String(err));
				}
			}
			if (budy.startsWith('<')) {
				if (!isCreator) return;
				try {
					let evaled = await eval(`(async () => { ${budy.slice(2)} })()`);
					if (typeof evaled !== 'string') evaled = util.inspect(evaled);
					await m.reply(evaled);
				} catch (err) {
					await m.reply(String(err));
				}
			}
			if (budy.startsWith('$')) {
				if (!isCreator) return;
				if (!text) return;
				exec(budy.slice(2), (err, stdout) => {
					if (err) return m.reply(`${err}`);
					if (stdout) return m.reply(stdout);
				});
			}
			if ((!isCmd || isCreator) && budy.toLowerCase() != undefined) {
				if (m.chat.endsWith('broadcast')) return;
				if (!(budy.toLowerCase() in db.database)) return;
				await RAEHAN2GD.relayMessage(m.chat, db.database[budy.toLowerCase()], {});
			}
		}
	} catch (e) {
		console.log(e);
		if (e?.message?.includes('No sessions') || e?.message?.includes('ffmpeg exited with code') || e?.code === 'ERR_FR_MAX_BODY_LENGTH_EXCEEDED' || e?.message?.includes('maxBodyLength limit') || e?.message?.includes('rate-overlimit')) return;
		const errorKey = e?.code || e?.name || e?.message?.slice(0, 100) || 'unknown_error';
		const now = Date.now();
		if (!errorCache[errorKey]) errorCache[errorKey] = [];
		errorCache[errorKey] = errorCache[errorKey].filter(ts => now - ts < 600000);
		if (errorCache[errorKey].length >= 3) return;
		errorCache[errorKey].push(now);
		const isAxiosError = e?.isAxiosError || !!e?.response; 
		const statusCode = e?.response?.status || e?.statusCode || e?.data;
		const errorUrl = e?.config?.url || e?.request?.host || '';
		if (statusCode === 500)
		m.reply('Error: ' + (e?.name || e?.code || e?.message || 'Terjadi kesalahan tidak diketahui') + '\nLog Error Telah dikirim ke Owner\n\n');
		return RAEHAN2GD.sendFromOwner(ownerNumber, `Halo sayang, sepertinya ada yang error nih, jangan lupa diperbaiki ya\n\nVersion : *${require('./package.json').version}*\nType : *${m.type || errorKey}*\n\n*Log error:*\n\n` + util.format(e), m, { contextInfo: { isForwarded: true }});
	}
};
//////////////////////////////////     HANZ    ////////////////////////////////////
export default RAEHAN2GD;
//////////////////////////////////     HANZ    ////////////////////////////////////
