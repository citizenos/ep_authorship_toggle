'use strict';

/**
 * postToolbarInit hook
 *
 * Registers the apAuthorshipToggle command to the toolbar.
 *
 * @param {string} hook "postToolbarInit"
 * @param {object} args {ace: .., toolbar: ..}
 *
 * @see {@link http://etherpad.org/doc/v1.5.7/#index_posttoolbarinit}
 * @see {@link http://etherpad.org/doc/v1.5.7/#index_editbar}
 */
exports.postToolbarInit = (hook, args, cb) => {
  const editbar = args.toolbar; // toolbar is actually editbar - http://etherpad.org/doc/v1.5.7/#index_editbar

  const $window = $(window);
  const $inner = $('iframe[name=ace_outer]').contents().find('iframe[name=ace_inner]').contents();
  const $docBody = $inner.find('#innerdocbody');
  const $editorcontainer = $('#editorcontainer');
  const $editbar = $('#editbar');

  const $ToggleAuthorList = $('#epAuthorshipToggleAuthorList');
  const $epAuthorList = $ToggleAuthorList.find('#authorsList');

  const resizeHandler = () => {
    $ToggleAuthorList.css('top', `${$editbar.outerHeight()}px`);
    $editorcontainer.css('top', $ToggleAuthorList.offset().top + $ToggleAuthorList.outerHeight());
  };

  editbar.registerCommand('epAuthorshipToggle', () => {
    const isVisibleAuthor = $ToggleAuthorList.is(':visible');

    $docBody.toggleClass('authorColors');

    if (isVisibleAuthor) { // Is visible so it's gonna be hidden
      $window.off('resize', resizeHandler);

      $ToggleAuthorList.toggle();
    } else {
      $window.on('resize', resizeHandler);

      // Clear previous authors and build a new author list
      $epAuthorList.empty();

      // TODO: Contains only authors that had edited the Pad before the Pad was opened.
      // Will not update on the fly if new authors are added.
      const authors = clientVars.collab_client_vars.historicalAuthorData;
      for (const authorId in authors) {
        if (authors.hasOwnProperty(authorId)) {
          const author = authors[authorId];
          const elem = $('<span class="author"/>')
              .css('background-color', clientVars.colorPalette[author.colorId])
              .text(author.name);
          $epAuthorList.append(elem);
          $epAuthorList.append('<span>, </span>');
        }
      }
      // Remove last comma
      $epAuthorList.find('span').last().remove();

      if (Object.keys(authors).length) {
        $ToggleAuthorList.toggle(); // Show before to get height
        resizeHandler();
      }
    }
  });

  return cb();
};
