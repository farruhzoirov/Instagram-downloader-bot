import { Context } from "grammy";

const startController = async (ctx: Context) => {
    console.log(ctx.message?.from.first_name)
    await ctx.reply(`<strong>${ctx.message?.from.first_name}</strong> Welcome to our downloader bot!`, {
        parse_mode: "HTML"
    });
};


export {startController};