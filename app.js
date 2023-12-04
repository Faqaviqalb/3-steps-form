    $(document).ready(function () {
        $("#asp-contract-hidden").val(1);
        $('span.contractDuration:contains("1 ماهه")').addClass("contActive");
        adjustFormBoxHeight();
        contractDuration();
        checkContractDuration();
        $('.error-message').hide();
        $('.error-icon').hide();


        $('.activated').prop('checked', true);
    });


        function nextButton(element) {
        let nextBtn = element;
        let prevBtn = element.parent().parent().parent().find(".pre");
        let form1 = element.parent().parent().parent().find(".form1");
        let form2 = element.parent().parent().parent().find(".form2");
        let form3 = element.parent().parent().parent().find(".form3");
        let progressBar = element.parent().parent().parent().find(".progressBar");

        //checkAddress();

        $("#saveWorkshop").find('input.not-empty').each(function () {
            if ($(this).val() === '') {
                $(this).addClass('errored');
            } else {
                $(this).removeClass('errored');
            }
        });

        if ($('input.errored').length === 0 && $('input.patternMisMatch').length === 0 && $("#divCity").find(".select2-container.errored").length == 0 && $("#divState").find(".select2-container.errored").length == 0) {
            if (form3.css('right') == '0px') {
                nextBtn.css({
                    'background-color': "#c7c0c0ba",
                    'color': '#000000b8',
                    'box-shadow': 'none'
                })
            }
            else if (form2.css('left') == '3000px') {
                prevBtn.css({
                    'background-color': "white",
                    'color': '#0f9500',
                    'box-shadow': '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)'
                })
                progressBar.css({
                    'width': '66.66%'
                })
                form1.css({
                    right: '3000px'
                })
                form2.css({
                    left: '0'
                })
            }
            else if (form2.css('left') == '0px') {
                nextBtn.css({
                    'background-color': "#c7c0c0ba",
                    'color': '#000000b8',
                    'box-shadow': 'none'
                })
                prevBtn.css({
                    'background-color': "white",
                    'color': '#0f9500',
                    'box-shadow': '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)'
                })
                progressBar.css({
                    'width': '100%',
                    'border-top-right-radius': '7px'
                })
                form2.css({
                    left: '3000px'
                })
                form3.css({
                    right: '0'
                })
            }
        } else {
            return;
        }
    }

    function prevButton(element) {
        let prevBtn = element;
        let nextBtn = element.parent().parent().parent().find(".next");
        let form1 = element.parent().parent().parent().find(".form1");
        let form2 = element.parent().parent().parent().find(".form2");
        let form3 = element.parent().parent().parent().find(".form3");
        let progressBar = element.parent().parent().parent().find(".progressBar");
        //  console.log(2);
        nextBtn.css({
            'background-color': "white",
            'color': '#1763b1'
        })
        if (form2.css('left') == '3000px' && form3.css('right') == '3000px') {
            prevBtn.css({
                'background-color': "#c7c0c0ba",
                'color': '#000000b8',
                'box-shadow': 'none'
            })

        } else if (form2.css('left') == '0px') {
            progressBar.css({
                'width': '33.33%',
                'border-top-right-radius': '0px'
            })
            prevBtn.css({
                'background-color': "#c7c0c0ba",
                'color': '#000000b8',
                'box-shadow': 'none'
            })
            form2.css({
                left: '3000px'
            })
            form1.css({
                right: 'initial'
            })

        } else if (form3.css('right') == '0px') {
            progressBar.css({
                'width': '66.66%',
                'border-top-right-radius': '0px'
            })
            prevBtn.css({
                'background-color': "white",
                'color': '#0f9500',
                'box-shadow': '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)'
            })
            form2.css({
                left: '0'
            })
            form3.css({
                right: '3000px'
            })
        }

    }

    $(window).on('resize', function () {
        adjustFormBoxHeight();
    });
    function adjustFormBoxHeight() {
        var formBoxHeight = Math.max($('.form1').height(), $('.form2').height(), $('.form3').height());
        $('.form-box').height(formBoxHeight + 50);
    }
    $('.form-control').on('keyup', function () {
        const errorMessage = $(this).parent().find('.error-message');
        const errorIcon = $(this).parent().find('.error-icon');
        if (this.validity.patternMismatch) {
            errorMessage.show();
            errorIcon.show();
            $(this).addClass('errored');
            $(this).addClass('patternMisMatch');

        } else {
            errorMessage.hide();
            errorIcon.hide();
            $(this).removeClass('errored');
            $(this).removeClass('patternMisMatch');
        }
    });

    $(".save").click(function () {
        //checkAddress();
        $("#saveWorkshop").find('input.not-empty').each(function () {
            if ($(this).val() === '') {
                $(this).addClass('errored');
            } else {
                $(this).removeClass('errored');
            }
        });

        if ($("#saveWorkshop").find('input.errored').length > 0 || $("#saveWorkshop").find('.select2-selection.errored').length > 0 || $("#saveWorkshop").find('input.patternMisMatch').length > 0 || $("#divCity").find(".select2-container.errored").length > 0 || $("#divState").find(".select2-container.errored").length > 0) {
            $.Notification.autoHideNotify('error', 'top right', 'پیام سیستم ', "لطفا موارد اجباری را تکمیل کنید.");
        }
        else {

            $("#saveForm").submit();
        }
    })




    //مدت قرارداد
    $(".contractDuration").on('click', function () {
        if ($(this).hasClass('contActive')) {
            $(this).removeClass('contActive');
        } else {
            $(".contractDuration").removeClass('contActive');
            $(this).addClass('contActive')
        }
        contractDuration();
    });
    function contractDuration() {
        if ($(".contActive").text() == '1 ماهه') {
            $("#asp-contract-hidden").val(1);
        } else if ($(".contActive").text() == '2 ماهه') {
            $("#asp-contract-hidden").val(2);
        } else if ($(".contActive").text() == '3 ماهه') {
            $("#asp-contract-hidden").val(3);
        } else if ($(".contActive").text() == '6 ماهه') {
            $("#asp-contract-hidden").val(6);
        } else if ($(".contActive").text() == '1 ساله') {
            $("#asp-contract-hidden").val(12);
        } else if ($(".contActive").text() == 'دائمی') {
            $("#asp-contract-hidden").val("ForEver");
        }
    }
    function checkContractDuration() {
        var aspValueContract = $("#asp-contract-hidden").val();
        console.log(aspValueContract);
        if (aspValueContract != '' || aspValueContract != undefined) {
            if (aspValueContract == '1') {
                $('span.contractDuration:contains("1 ماهه")').addClass("contActive");
            } else if (aspValueContract == '2') {
                $('span.contractDuration:contains("2 ماهه")').addClass("contActive");
            } else if (aspValueContract == '3') {
                $('span.contractDuration:contains("3 ماهه")').addClass("contActive");
            } else if (aspValueContract == '6') {
                $('span.contractDuration:contains("6 ماهه")').addClass("contActive");
            } else if (aspValueContract == '12') {
                $('span.contractDuration:contains("12 ماهه")').addClass("contActive");
            } else if (aspValueContract == 'ForEver') {
                $('span.contractDuration:contains("دائمی")').addClass("contActive");
            }
        }
    }