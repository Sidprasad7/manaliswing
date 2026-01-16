(function( $ ) {
	'use strict';

  $(function() {

    $(document).on("click", ".showlogin", function(e) {
      e.preventDefault();
      $('.registerpanel').hide();
      $('.loginpanel').slideToggle();    
    });
  
    $(document).on("click", ".showregister", function(e) {
      e.preventDefault();
      $('.loginpanel').hide();   
      $('.registerpanel').slideToggle();    
    })

    $(document).on("click", ".showpasswordreset", function(e) {
      e.preventDefault();
      $('.forgotpasswordpanel').slideToggle();
    })

    $('#login').validator().on('submit', function(e) {

      let alert = $(this).closest('form').find('.alert');

      if (e.isDefaultPrevented()) {
        alert.removeClass('alert-success hidden').addClass('alert-danger').html('Please check the form and correct any errors.');
      } else {
        e.preventDefault();
        let button = $('#submitlogin');

        let data = {
          email :  $('#loginemail').val(),
          password : $('#loginpassword').val(),
          action : 'customer_login',
        }

        button.html('<i class="fa fa-spinner fa-pulse fa-fw"></i> Please Wait...');

        $.ajax({
          url: handi_js_vars.ajaxUrl, 
          type: "POST",
          data: data,
          dataType: "json"
        }).done(function(response) {
          alert.html("Login Succesful.").removeClass('alert-danger hidden').addClass('alert-success');
          window.location.reload();
        }).fail(function(exception, b, c) {
          button.html('Error');
          alert.removeClass('alert-success hidden').addClass('alert-danger').html(parseError(exception.responseJSON.data));
        })
      }
    })

    $(document).on('click', '.logout', function(e) {
      e.preventDefault();
      $.ajax({
        url: handi_js_vars.ajaxUrl, 
        data: { action : 'customer_logout' },
        method: 'post',
      }).done(function(response) {
        window.location.replace('/my-account/');
      })
    })

    $('#forgot-password').validator().on('submit', function(e) {

      let alert = $(this).closest('form').find('.alert');

      if (e.isDefaultPrevented()) {
        alert.html('Please check the form and correct any errors.').removeClass('alert-success hidden').addClass('alert-danger');
      } else {
        e.preventDefault();
        let data = $(this).serialize() + "&action=forgot_password" 

        $.ajax({
          url: handi_js_vars.ajaxUrl, 
          type: "POST",
          data: data,
          dataType: 'json',
        }).done(function(response) {
          alert.html('Thank you. Please check your email for instructions on how to reset your password').removeClass('alert-danger hidden').addClass('alert-success');
        }).fail(function(exception) {
          alert.html(parseError(exception.responseJSON.data)).removeClass('alert-success hidden').addClass('alert-danger');
        });
      }
    })

    $('#reset-password').validator().on('submit', function(e) {
      let alert = $(this).closest('form').find('.alert');

      if (e.isDefaultPrevented()) {
        alert.html('Please check the form and correct any errors.').removeClass('alert-success hidden').addClass('alert-danger');
      } else {
        e.preventDefault();
        let data = $(this).serialize() + "&action=reset_password" 
        $.ajax({
          url: handi_js_vars.ajaxUrl, 
          type: "POST",
          data: data,
          dataType: 'json',
        }).done(function(response) {
          alert.html('<strong>Password reset successful!</strong> You can now <a href="/my-account/">login</a> to your Account').removeClass('alert-danger hidden').addClass('alert-success');
        }).fail(function(exception) {
          alert.html(parseError(exception.responseJSON.data)).removeClass('alert-success hidden').addClass('alert-danger');
        });
      }
    })

    $('#update_password').validator().on('submit', function (e) {
      let alert = $(this).closest('form').find('.alert');

      if (e.isDefaultPrevented()) {
        alert.removeClass('alert-success hidden').addClass('alert-danger').html('Please check the form and correct any errors.');
      } else {
        e.preventDefault();
        let data = $(this).serialize() + "&action=update_password"
        $.ajax({
          url: handi_js_vars.ajaxUrl, 
          type: "POST",
          data: data,
          dataType: 'json',
        }).done(function(response) {
          alert.html("Thank you. Password Updated.").removeClass('alert-danger hidden').addClass('alert-success');
        }).fail(function(exception) {
          alert.removeClass('alert-success hidden').addClass('alert-danger').html(parseError(exception.responseJSON.data));
        });
      }
    });

    $('#register').validator({
      custom : {
        validtel : function($el) {
          let iti = window.intlTelInputGlobals.getInstance($el[0]);
          if (!iti.isValidNumber()) {
            return "Please enter a valid phone number"
          }
        }
      }
    }).on('submit', function (e) {
      let alert = $(this).closest('form').find('.alert');

      if (e.isDefaultPrevented()) {
        alert.removeClass('alert-success hidden').addClass('alert-danger').html('Please check the form and correct any errors.');
      } else {
        e.preventDefault();
        let data = $(this).serialize() + "&action=register_user" 
        $.ajax({
          url: handi_js_vars.ajaxUrl, 
          type: "POST",
          data: data,
          dataType: 'json',
        }).done(function(response) {
          console.log(response)
          alert.html("Thank-you. Registration Complete.").removeClass('alert-danger hidden').addClass('alert-success');
          window.location.reload();
        }).fail(function(exception) {
          console.log(exception)
          //console.exception(exception)
          alert.removeClass('alert-success hidden').addClass('alert-danger').html(parseError(exception.responseJSON.data));
        });
      } 
    });

    $('.startnewbooking').click(function(e){
      e.preventDefault(); 
      Cookies.remove('handi_bookingid');
      window.location.reload();
    });
  
    $('.continuebooking').click(function(e){
      e.preventDefault(); 
      $('#gotostage2').submit();
    });

    $(document).on('click', '.startbooking', function(e) {
      e.preventDefault()
      let button = $(this);
      let data = {
        departure_id : $(this).data('departureid'),
        currency : $('#currency').val(),
        action : 'start_booking'
      }
      $.ajax({
        url: handi_js_vars.ajaxUrl, 
        type: "POST",
        data: data,
        dataType: 'json',
      }).done(function(response) {
        button.text("Booking Created. Please wait...").addClass('success');
        $('#gotostage2').submit();
      }).fail(function(exception) {
        button.text("Error").addClass('danger')
      })
    })

    $('#create_traveller').validator({
      custom : {
        validtel : function($el) {
          let iti = window.intlTelInputGlobals.getInstance($el[0]);
          if (!iti.isValidNumber()) {
            return "Please enter a valid phone number"
          }
        }
      }
    }).on('submit', function (e) {
      let alert = $(this).closest('form').find('.alert');

      if (e.isDefaultPrevented()) {
        alert.removeClass('alert-success hidden').addClass('alert-danger').html('Please check the form and correct any errors.');
      } else {
        e.preventDefault();
        let data = $(this).serialize() + "&action=create_traveller" 
        $.ajax({
          url: handi_js_vars.ajaxUrl, 
          type: "POST",
          data: data,
          dataType: 'json',
        }).done(function(response) {
          alert.html("Thank-you. Traveller Added.").removeClass('alert-danger hidden').addClass('alert-success');
          window.location.reload();
        }).fail(function(exception) {
          alert.removeClass('alert-success hidden').addClass('alert-danger').html(parseError(exception.responseJSON.data));
        });
      }
    })

    $('#add_traveller_no').on('click', function(e) {
      e.preventDefault()
      $('#gotostage3').trigger('submit');
    })

    $('#add_traveller_yes').on('click', function(e) {
      e.preventDefault()
      $('#create_traveller').slideDown();
    })

    $('.removetraveller').on('click', function (e) {
      e.preventDefault()
      let button = $(this)
      let travellerId = $(this).data('travellerid');

      button.html('<i class="fa fa-spinner fa-pulse fa-fw"></i> Please Wait...');

      let data = {
        action : 'remove_traveller',
        travellerId : travellerId 
      }

      $.ajax({
        url: handi_js_vars.ajaxUrl, 
        type: "POST",
        data: data,
        dataType: 'json',
      }).done(function(response){
        button.html('Traveller Removed')
        window.location.reload();
      }).fail(function(exception) {
        button.html('Error')
      });
    })

    $('.available-extras').on('click', '.available-extra .add-extra', function(e) {
      e.preventDefault();

      let extraData = {
        extraId : $(this).data('extra-id'),
        travellerId : $(this).data('traveller-id'),
        action : 'add_extra'
      };

      $.ajax({
        url: handi_js_vars.ajaxUrl, 
        type: "POST",
        data: extraData,
        dataType: 'json',
      }).done(function(response) {
        window.location.reload();
      }).fail(function(exception) {
        alert(parseError(exception.responseJSON.data));
      });
    });

    // Update Extra
    $('.assigned-extras').on('change', '.extra .options select', updateTravellerExtra);
    $('.assigned-extras').on('blur', '.extra .options input', updateTravellerExtra);
    function updateTravellerExtra(e) {
      e.preventDefault();

      let extraData = {
        extraId : $(this).closest('.extra').data('traveller-extra-id'),
        travellerId : $(this).closest('.extra').data('traveller-id'),
        options: [{
          id : $(this).data('extra-option-id'),
          selected_value : $(this).val(),
        }],
        action : 'update_extra'
      };

      $.ajax({
        url: handi_js_vars.ajaxUrl, 
        type: "POST",
        data: extraData,
        dataType: 'json',
      }).done(function(response) {
      }).fail(function(exception){
        alert(parseError(exception.responseJSON.data));
      });
    }

    // Remove Extras
    $('.assigned-extras').on('click', '.extra .title .traveller-extra-remove', removeTravellerExtra);
    function removeTravellerExtra(e) {
      e.preventDefault();
 
      let extraData = {
        extraId : $(this).closest('.extra').data('traveller-extra-id'),
        travellerId : $(this).closest('.extra').data('traveller-id'),
        action: 'remove_extra'
      }

      $.ajax({
        url: handi_js_vars.ajaxUrl, 
        type: "POST",
        data: extraData,
        dataType: 'json',
      }).done(function(response) {
        window.location.reload();
      }).fail(function(exception) {
        alert(parseError(exception.responseJSON.data));
      })
    }

    $('.agree-terms').on('click', function(e) {
      e.preventDefault();

      let button = $(this);
      let bookingId = $(this).data('bookingid')

      button.html(`<i class="fa fa-spinner fa-pulse fa-fw"></i> Updating...`)

      $.ajax({
        url: handi_js_vars.ajaxUrl, 
        type: "POST",
        data: {
          action : 'agree_terms',
          bookingId : bookingId,
        },
        dataType: 'json'
      }).done(function(response) {
        button.html('Thank you')
        window.location.reload();
      });
    })



    $('#gotostage5').validator().on('submit', function (e) {
      let alert = $(this).closest('form').find('.alert');

      if (e.isDefaultPrevented()) {
        alert.removeClass('alert-success hidden').addClass('alert-danger').html('Please make sure you\'ve read and agreed to our terms and conditions');
      } else {
        e.preventDefault();

        $.ajax({
          url: handi_js_vars.ajaxUrl, 
          type: "POST",
          data: {
            action : 'agree_terms'
          },
          dataType: 'json'
        }).done(function(response) {
          e.currentTarget.submit();
        }).fail(function(exception) {
          alert.removeClass('alert-success hidden').addClass('alert-danger').html(parseError(exception.responseJSON.data));
        })
      }
    });

    // Edit Bookings
    $('#booking').on('click', '.show-travel-info', function(e) {
      e.preventDefault();
      $(this).closest('div').nextAll('.travel-info').first().slideToggle();
    })

    document.querySelectorAll('.handi-phone-input').forEach(function(element) {
      window.intlTelInput(element, {
        nationalMode: true,
        preferredCountries: ["gb", "us"],
        initialCountry: "gb",
        countrySearch: false,
        utilsScript: handi_js_vars.pluginUrl + '/public/js/utils.js',
      });

      element.addEventListener("change", function(e) {
        let iti = window.intlTelInputGlobals.getInstance(e.target)
        let input = document.getElementById(e.target.dataset.validtel)
        input.value = iti.isValidNumber() ? iti.getNumber(intlTelInputUtils.numberFormat.INTERNATIONAL) : ""
      })
    })

    $('#rider_profile').validator({
      custom : {
        validtel : function($el) {
          let iti = window.intlTelInputGlobals.getInstance($el[0]);
          if (!iti.isValidNumber()) {
            return "Please enter a valid phone number"
          }
        }
      }
    }).on('submit', function(e) {
      let alert = $(this).closest('form').find('.alert');

      if (e.isDefaultPrevented()) {
        alert.removeClass('alert-success hidden').addClass('alert-danger').html('Please check the form and correct any errors.');
      } else {
        e.preventDefault();
        let data = $(this).serialize() + "&action=update_rider_profile"

        $.ajax({
          url: handi_js_vars.ajaxUrl, 
          type: "POST",
          data: data,
          dataType: 'json',
        }).done(function(response) {
          let id = $(this).closest('form').find('[name="id"]');
          id.val(response.data.id);
          alert.html("Thank-you. Rider Profile Updated.").removeClass('alert-danger hidden').addClass('alert-success');
        }).fail(function(exception) {
          alert.removeClass('alert-success hidden').addClass('alert-danger').html(parseError(exception.responseJSON.data));
        });
      }
    })

    $('#personal_details').validator({
      custom : {
        validtel : function($el) {
          let iti = window.intlTelInputGlobals.getInstance($el[0]);
          if (!iti.isValidNumber()) {
            return "Please enter a valid phone number"
          }
        }
      }
    }).on('submit', function(e) {
      let alert = $(this).closest('form').find('.alert');

      if (e.isDefaultPrevented()) {
        alert.removeClass('alert-success hidden').addClass('alert-danger').html('Please check the form and correct any errors.');
      } else {
        e.preventDefault();
        let data = $(this).serialize() + "&action=update_personal_details"

        $.ajax({
          url: handi_js_vars.ajaxUrl, 
          type: "POST",
          data: data,
          dataType: 'json',
        }).done(function(response) {
          let id = $(this).closest('form').find('[name="id"]');
          id.val(response.data.id);
          alert.html("Thank-you. Personal Details Updated.").removeClass('alert-danger hidden').addClass('alert-success');
        }).fail(function(exception) {
          alert.removeClass('alert-success hidden').addClass('alert-danger').html(parseError(exception.responseJSON.data));
        });
      }
    })

    $('.update-travel-info').validator({
      custom : {
        validtel : function($el) {
          let iti = window.intlTelInputGlobals.getInstance($el[0]);
          if (!iti.isValidNumber()) {
            return "Please enter a valid phone number"
          }
        }
      }
    }).on('submit', function(e) {
      let alert = $(this).closest('form').find('.alert');
 
      if (e.isDefaultPrevented()) {
        alert.removeClass('alert-success hidden').addClass('alert-danger').html('Please check the form and correct any errors.');
      } else {
        e.preventDefault();
        let data = $(this).serialize() + "&action=update_travel_info"

        $.ajax({
          url: handi_js_vars.ajaxUrl, 
          type: "POST",
          data: data,
          dataType: 'json',
        }).done(function(response) {
          let id = $(this).closest('form').find('[name="id"]');
          id.val(response.data.travel_info.id);
          alert.html("Thank-you. Travel Info Updated.").removeClass('alert-danger hidden').addClass('alert-success');
        }).fail(function(exception) {
          alert.removeClass('alert-success hidden').addClass('alert-danger').html(parseError(exception.responseJSON.data));
        });
      }
    });

    $('#booking').on('click', '.update-extra', function(e) {

      e.preventDefault();

      let button = $(this);
      let btnText = button.html();
      let option = $(this).closest('.option').find('.form-control')

      let extraData = {
        bookingId : $('#booking').data('booking-id'),
        extraId : $(this).closest('.extra').data('traveller-extra-id'),
        travellerId : $(this).closest('.extra').data('traveller-id'),
        options: [{
          id : option.data('extra-option-id'),
          selected_value : option.val(),
        }],
        action : 'update_traveller_extra'
      };

      button.html(`<i class="fa fa-spinner fa-pulse fa-fw"></i> Updating...`)

      $.ajax({
        url: handi_js_vars.ajaxUrl, 
        type: "POST",
        data: extraData,
        dataType: 'json',
      }).done(function(response) {
      }).fail(function(exception){
        alert(parseError(exception.responseJSON.data));
      }).always(function() {
        button.html(btnText)
      })
   })

    $('.update-travel-info').on('change', '#arrival_transport, #departure_transport', function(e) {
      let parent = $(this).parents('.travel-details');
      let train = parent.find('.traveller-train');
      let flight = parent.find('.traveller-flight');

      train.hide();
      flight.hide();

      if (this.value == 'flight') {
        flight.show(400);
      } else if (this.value == 'train') {
        train.show(400)
      }
    });

    // Booking tab scroll workaround
    $('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
      const headerOffset = 120;
      const targetId = e.target.dataset.bsTarget;
    
      if(targetId ) {
        const targetElement = $(`#${targetId}`);
        if(targetElement.length) {
          $([document.documentElement, document.body]).animate({
            scrollTop: targetElement.offset().top - headerOffset
          }, 800);
        }
      }
    });
      
    function parseError(errorDetails) {
      let html = '';
      if (errorDetails instanceof Object) {
        let items = Object.values(errorDetails).map((item) => {
          return `<li>${item}</li>`;
        }).join('');
        html = `<ul class="error">${items}</ul>`;
      } else {
        html = errorDetails;
      } 
      return html;
    }
  });
})( jQuery );
