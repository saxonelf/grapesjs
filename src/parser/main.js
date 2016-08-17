define(function(require) {

  var Parser = function() {
    var c = {},
    defaults = require('./config/config'),
    parserCss = require('./model/ParserCss'),
    parserHtml = require('./model/ParserHtml');
    var pHtml, pCss;

    return {

      /**
       * Name of the module
       * @type {String}
       * @private
       */
      name: 'Parser',

      /**
       * Indicates if module is public
       * @type {Boolean}
       * @private
       */
      public: true,

      /**
       * Initialize module. Automatically called with a new instance of the editor
       * @param {Object} config Configurations
       * @param {Array<Object>} [config.blocks=[]] Default blocks
       * @return {this}
       * @example
       * ...
       * {
       *     blocks: [
       *      {id:'h1-block' label: 'Heading', content:'<h1>...</h1>'},
       *      ...
       *    ],
       * }
       * ...
       */
      init: function(config) {
        c = config || {};
        for (var name in defaults) {
          if (!(name in c))
            c[name] = defaults[name];
        }
        pHtml = new parserHtml(c);
        pCss = new parserCss(c);
        return this;
      },

      /**
       * Parse HTML string and return valid model
       * @param  {string} str HTML string
       * @return {Object}
       */
      parseHtml: function(str){
        return pHtml.parse(str, pCss);
      },

      parseCss: function(str){
        return pCss.parse(str);
      },

    };
  };

  return Parser;

});