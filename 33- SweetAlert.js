// npm install sweetalert2
// CDN: <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
// import Swal from 'sweetalert2'
// It's also possible to import JS and CSS separately,

Swal.fire("Boom...");

Swal.fire({
    title: "Boom",
    title: "<strong>Boom</strong>",
    text: "Bomb Blasted",
    icon: "question", // success, error, warning, info, question
    iconColor: "$000",
    theme: 'borderless', // dark, auto, bootstrap-5, bootstrap-5-light, bootstrap-4-dark, material-ui, bulma
    footer: '<a href="#">Why do I have this issue?</a>',
    animation: false,
    toast: false,
    target: 'body',
    topLayer: true, // put the popup on top of all other elements
    grow: 'row', // Paired with window position, sets the direction the popup should grow in. false, row, column, fullscreen.
    customClass: 'swal_alert',
    heightAuto: true,
    allowEscapeKey: true,
    stopKeydownPropagation: true, // will allow keydown events propagation to the document.
    keydownListenerCapture: false, // when a user hits Esc, both SweetAlert2 and Bootstrap modals will be closed
    buttonsStyling: false, // No more default style, now can set custom styles
    focusConfirm: false,

    // reerseButtons, focusDeny, focusCancel, closeButtonHtml, loaderHtml, scrollbarPadding, preDeny
    // returnInputValueOnDeny, inputLabel, inputPlaceholder, inputValue, inputOptions, inputAutoFocus, inputAutoTrim, inputValidator, validationMessage
    // progressSteps, currentProgressStep, progressStepsDistance
    // Popup Lifecycle Hook: didRender, willOpen, didOpen, willClose, didClose, didDestroy


    imageUrl: "https://placeholder.pics/svg/300x1500",
    imageHeight: 100,
    imageWidth: 400,
    imageAlt: "little cuty bomb",

    draggable: true,
    html: '<b>Korboda Ki</b>',

    showCloseButton: true,
    showCancelButton: true,
    confirmButtonText: `<i class="fa fa-thumbs-up"></i> Great!`,
    confirmButtonAriaLabel: "Thumbs up, great!",
    cancelButtonText: `<i class="fa fa-thumbs-down"></i>`,
    cancelButtonAriaLabel: "Thumbs down",
    showDenyButton: true,
    denyButtonText: `Don't save`,

    position: "top-end",
    // iconHtml: "؟",

    // Animating using animate.css
    showClass: {
        popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `
    },
    hideClass: {
        popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `
    },

    width: 600,
    padding: "3em",
    color: "#716add",
    background: "#fff url(/images/trees.png)",
    backdrop: ` rgba(0,0,123,0.4) url("/images/nyan-cat.gif") left top no-repeat`,

    // Auto Close Timer with Progress
    timer: 1500,
    timerProgressBar: true,
    didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
    },
    willClose: () => {
        clearInterval(timerInterval);
    },

    // Input- Ajax Request
    // Multiple inputs aren't supported, you can achieve them by using html and preConfirm parameters.
    input: "text", // email, url, password, textarea, select, radio, checkbox, date, file, range.
    inputAttributes: {
        autocapitalize: "off"
    },
    preConfirm: async (login) => {
        try {
            const githubUrl = `
        https://api.github.com/users/${login}
      `;
            const response = await fetch(githubUrl);
            if (!response.ok) {
                return Swal.showValidationMessage(`
          ${JSON.stringify(await response.json())}
        `);
            }
            return response.json();
        } catch (error) {
            Swal.showValidationMessage(`
        Request failed: ${error}
      `);
        }
    },
    allowOutsideClick: () => !Swal.isLoading()

}).then((result) => {
    if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
    } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
    }

    if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
    }

    // Handling Buttons:
    // isConfirmed, isDenied, isDismissed, value, dismiss.
});


// Configuring own Swal
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});
Toast.fire({
    icon: "success",
    title: "Signed in successfully"
});

// If you want ssr , declarative way by template:
{/* <template id="my-template">
    <swal-title>
        Save changes to "Untitled 1" before closing?
    </swal-title>
    <swal-icon type="warning" color="red"></swal-icon>

Swal.fire({
        template: "#my-template"
}); */}

// Calling Using bindClickHandler:
// <button data-swal-template="#my-template" data-swal-toast-template="#my-template">
Swal.mixin({
    toast: true
}).bindClickHandler("data-swal-toast-template");

// Handling Dismissals
// Swal.DismissReason.backdrop, Swal.DismissReason.cancel, Swal.DismissReason.close, Swal.DismissReason.esc, Swal.DismissReason.timer


// Methods:
// Swal.isVisible(), Swal.mixin({ ...options }), Swal.update({...options}), Swal.close(), Swal.getContainer(), Swal.getPopup() Swal.getTitle()
// Swal.getProgressSteps(), Swal.getCloseButton(), Swal.getIcon(), Swal.getIconContent(), Swal.getHtmlContainer()
// Swal.getImage(), Swal.getActions(), Swal.getFooter(), Swal.getFocusableElements(), Swal.getConfirmButton()
// Swal.getDenyButton(), Swal.getCancelButton(), Swal.enableButtons(), Swal.disableButtons(), Swal.showLoading()
// Swal.hideLoading(), Swal.isLoading(), Swal.getTimerLeft(), Swal.stopTimer(), Swal.resumeTimer(), Swal.toggleTimer()
// Swal.isTimerRunning(), Swal.increaseTimer(ms), Swal.clickConfirm(), Swal.clickDeny(), Swal.clickCancel(), Swal.getInput()
// Swal.disableInput(), Swal.enableInput(), Swal.showValidationMessage(message), Swal.resetValidationMessage()
// Swal.getValidationMessage(), Swal.isValidParameter(param), Swal.isUpdatableParameter(param)