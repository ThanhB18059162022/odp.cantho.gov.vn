"use strict";
(function (ckan, $) {
    function showMoreCommentsPage(page) {
        let page_next = parseInt(page) + 1;
        let class_page_before_btn = `btn-page-${page}`;
        let class_page_item = `item-page-${page_next}`;
        $(`.${class_page_before_btn}`).hide();
        $(`.${class_page_item}`).show();
    }

    function showCommentForm(id){
        $(".form-edit-comment").addClass("cm-hidden");
        $(".form-edit-comment").trigger("reset");
        $(".form-new-comment").trigger("reset");
        $("#rowNewComment").addClass("cm-hidden");
        $("#" + id).removeClass('cm-hidden');
    }
    
    function showComment(cmid, show) {
        if(show){
            $(`#cm-${cmid}-cut`).hide();
            $(`#cm-${cmid}-full`).show();
        }else{
            $(`#cm-${cmid}-cut`).show();
            $(`#cm-${cmid}-full`).hide();
        }
    }

    function submitNewComment() {
        let subject = $('.form-new-comment').find('input[name="subject"]').val();
        if(subject.length > 200){
            ckan.notify('', ckan.i18n._('Title exceeds 200 characters allowed'), 'error');
            window.scrollTo(0, 0);
            return;
        }
        $('.form-new-comment').submit();
    }

    function submitEditComment(formId) {
        let subject = $(`#${formId}`).find('input[name="subject"]').val();
        if(subject.length > 200){
            ckan.notify('', ckan.i18n._('Title exceeds 200 characters allowed'), 'error');
            window.scrollTo(0, 0);
            return;
        }
        $(`#${formId}`).submit();
    }

    function cancelEditComment(formId) {
        $(".form-edit-comment").addClass("cm-hidden");
        $(".form-edit-comment").trigger("reset");
        $(".form-new-comment").trigger("reset");
        $("#rowNewComment").removeClass("cm-hidden");
        $(`#${formId}`).addClass('cm-hidden');
    }

    ckan.showMoreCommentsPage = showMoreCommentsPage;
    ckan.showCommentForm = showCommentForm;
    ckan.showComment = showComment;
    ckan.submitNewComment = submitNewComment;
    ckan.submitEditComment = submitEditComment;
    ckan.cancelEditComment = cancelEditComment;
})(ckan, jQuery);
function hideFormErrors()
{
    jQuery('.form_errors').addClass('hidden');
    jQuery('.form_errors li').addClass('hidden');
}

jQuery(document).ready(function() {

    jQuery('.module-content input[type="submit"]').on('click', function(e) {
        if (jQuery(this).hasClass('btn-primary')) {
            var form = jQuery(this).closest('form');
            var comment = form.find('textarea[name="comment"]').val();
            var display_errors = false;

            hideFormErrors();

            if (!comment || !comment.replace(/\s/g, '').length) {
                form.find('.error-comment').removeClass('hidden');
                display_errors = true;
            }
            if (display_errors) {
                form.find('.form-errors').removeClass('hidden');
                return false;
            }
        }
    });

    jQuery('.form-edit-comment input[type="reset"]').on('click', function(e) {
        var form = jQuery(this).closest('form');
        form.addClass('hidden');
        $("#rowNewComment").removeClass("hidden");
    });

});
