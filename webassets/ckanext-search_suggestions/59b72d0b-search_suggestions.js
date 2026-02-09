ckan.module("search_suggestions-module", function ($, _) {
  "use strict";
  return {
    initialize: function () {
      let timeout = null;
      let self = this;
      
      function handleKeyUp(event) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          let value = event.target.value;
          if (value !== '') {
            self.getData(value);
          } else {
            $("#search-suggestion-box").hide();
          }
        }, 500);
      }
      
      $("#field-giant-search").on("keyup", handleKeyUp);
      $("#field-main-search").on("keyup", handleKeyUp);

      $(document).on("click", function (e) {
        if (!$(e.target).closest("#dataset-search-form").length) {
          $("#search-suggestion-box").hide();
        }
      });
    },

    // lấy dữ liệu
    getData: function (value) {
      let self = this;
      $.ajax({
        url: "/api/3/action/search_suggestions?q=" + value,
        type: "GET",
        dataType: "json",
        headers: {
          "Content-Type": "application/json",
        },
        success: function (result) {
          if (result.success) {
            let datasets = result.result.data;
            self.genTemplate(datasets);
          }
        },
        error: function (result) {
        },
      });
    },

    genTemplate: function (datasets) {
      if (datasets.length > 0) {
        $(".ul-suggestions").empty();
        datasets.forEach(dataset => {
          let el = `<a href="dataset/${dataset.name}"><li class="suggestions-item">${dataset.title}</li></a>`;
          let resources = dataset.resources;
          resources.forEach(resource => {
            el += `<ul class="ul-resources"><a class="" href="dataset/${dataset.name}/resource/${resource.id}"><li class="li-resource suggestions-item">${resource.title}</li></a></ul>`;
          })

          $(".ul-suggestions").append(el);
        });
        $("#search-suggestion-box").show()
      } else {
        $(".ul-suggestions").empty();
        $("#search-suggestion-box").hide()
      }
    },
  };
});
