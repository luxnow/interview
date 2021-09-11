'use strict';
const path = require('path');
const resolve = filepath => path.resolve(__dirname, filepath);
module.exports = {
  entry: {
    'index': 'app/web/page/app.ts',
  },
  resolve: {
    alias:{
      '@asset': resolve('app/web/asset'),
      '@framework': resolve('app/web/framework'),
      '@component': resolve('app/web/component'),
      '@router': resolve('app/web/page/router'),        
      '@view': resolve('app/web/page/view')
    }
  },
  module:{
    rules:[
      { babel: false },
      { 
        ts: {
          exclude: []
        } 
      }
    ]
  },
  plugins: [
    { imagemini: false },
    {
      copy: [{
        from: 'app/web/asset',
        to: 'asset'
      }]
    }
  ]
};