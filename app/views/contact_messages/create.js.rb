// Display a message after the message was sent
$("#result").html('<div class="notice"><%=escape_javascript(flash.delete(:notice))')

// Clear each of the form fields
$("#contact_message_email").val('')
$("#contact_message_subject").val('')
$("#contact_message_body").val('')