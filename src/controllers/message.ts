import { Context } from "grammy";
import axios from 'axios'
const checkValidUrl = (url: string): boolean => {
    // Regex to check  it is an Instagram link or not
    const pattern = /^https?:\/\/(www\.)?instagram\.com\/(p|reel|tv|[A-Za-z0-9._]+)\/([A-Za-z0-9._\-]+)\/?(\?.*)?(#.*)?$/;
    return pattern.test(url);  // This returns boolean type
}

const downloadInstagramReel = async (url: string, ctx: Context) => {
    const options = {
        method: 'GET',
        url: 'https://instagram-downloader-download-instagram-videos-stories.p.rapidapi.com/index',
        params: {
            url: url
        },
        headers: {
            'X-RapidAPI-Key': 'e2967b2817mshb7b84e68b64d41fp1f845ejsn6c7877b9b397',
            'X-RapidAPI-Host': 'instagram-downloader-download-instagram-videos-stories.p.rapidapi.com'
        }
    };
    try {
        const response = await axios.request(options);
        await ctx.replyWithVideo(response.data.media, {
            caption:`${response.data.title}\n\nDownloaded via Farruh Zoirov's bot`,
        });
    } catch (error) {
        console.log('Download instagram reel', error);
        await ctx.reply('Sorry, Could not download instagram reel');
    }
}



const messageController = async (ctx: Context) => {
    const message = ctx.message?.text as string;
    const isValid = checkValidUrl(message);

    if(isValid) {
        await ctx.reply('We are processing your request, please wait...');
        await ctx.replyWithChatAction("upload_video");
        await downloadInstagramReel(message, ctx);

    } else {
        await ctx.reply('Send valid instagram url')
    }
}



export { messageController };
