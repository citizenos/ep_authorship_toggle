/**
 * padInitToolbar hook
 *
 * Add a button to the toolbar
 *
 * @see {@link http://etherpad.org/doc/v1.6.8/#index_padinittoolbar}
 */
exports.padInitToolbar = function (hook_name, args, cb) {
    const toolbar = args.toolbar;

    const button = toolbar.button({
        command: 'epAuthorshipToggle',
        localizationId: "epAuthorshipToggle.toolbar.toggle.title",
        class: "buttonicon buttonicon-clearauthorship epAuthorshipToggle"
    });

    toolbar.registerButton('epAuthorshipToggle', button);

    return cb();
};

/**
 * eejsBlock_afterEditbar hook
 *
 * Add author list template to the DOM
 *
 * @see {@link http://etherpad.org/doc/v1.5.7/#index_eejsblock_name}
 */
const eejs = require('ep_etherpad-lite/node/eejs/');
exports.eejsBlock_afterEditbar = function (hook_name, args, cb) {
    args.content = args.content + eejs.require("ep_authorship_toggle/templates/authors.ejs");

    return cb();
};

/**
 * eejsBlock_styles hook
 *
 * Add plugin stylesheet to the DOM
 *
 * @see {@link http://etherpad.org/doc/v1.5.7/#index_eejsblock_name}
 */
exports.eejsBlock_styles = function (hook_name, args, cb) {
    args.content = args.content + eejs.require("ep_authorship_toggle/templates/stylesheets.ejs");

    return cb();
};

