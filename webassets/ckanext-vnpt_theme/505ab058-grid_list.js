/* Media Grid
 * Super simple plugin that waits for all the images to be loaded in the media
 * grid and then applies the jQuery.masonry to then
 */

ckan.module('media-grid-organization-custom', function ($) {
  return {
    initialize: function () {
      var wrapper = this.el;
      console.log(wrapper);
      wrapper.imagesLoaded(function() {
        wrapper.masonry({
          itemSelector: '.media-item-organization-custom'
        });
      });
    }
  };
});

ckan.module('media-grid-group-custom', function ($) {
  return {
    initialize: function () {
      var wrapper = this.el;
      console.log(wrapper);
      wrapper.imagesLoaded(function() {
        wrapper.masonry({
          itemSelector: '.media-item-group-custom'
        });
      });
    }
  };
});

ckan.module('media-grid-pages-custom', function ($) {
  return {
    initialize: function () {
      var wrapper = this.el;
      console.log(wrapper);
      wrapper.imagesLoaded(function() {
        wrapper.masonry({
          itemSelector: '.media-item-pages-custom'
        });
      });
    }
  };
});