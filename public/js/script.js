// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }else {
          // Form is valid and will proceed with submission.
          // Find the submit button and disable it to prevent multiple clicks.
          const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('button');
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...`;
          }
        }

        form.classList.add('was-validated')
      }, false)
    })
})()