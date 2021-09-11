import { Controller } from 'egg';
import { All, Body, Get, Params, Prefix, Query, Use } from 'egg-router-util';

export default class HomeController extends Controller {

  @Get('/*')
  public async index() {
    const { ctx } = this;
    if (ctx.query.mode === 'csr') {
      await ctx.renderClient('index.js', { url: ctx.url.replace(/\/index/, '') }, { viewEngine: null });
    } else {
      await ctx.render('index.js', { url: ctx.url.replace(/\/index/, '') });
    }
  }
}