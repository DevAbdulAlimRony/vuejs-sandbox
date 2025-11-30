// Web accessibility (also known as a11y) refers to the practice of creating websites that can be used by anyone
// Skip Link: You should add a link at the top of each page that goes directly to the main content area so users can skip content that is repeated on multiple Web pages. Ex- Back to Top Button, All Page and Content Links on Footer.
// We can take all skip links at top and hide it only for accessible for blind people so that they can go any content. Take styles from vue documentation.

// Content Structure:  Design should consider not only color contrast, font selection, text sizing, and language, but also how the content is structured in the application.
// Don’t skip headings within a section.
// Use actual heading tags instead of styling text to give the visual appearance of headings
/* <main role="main" aria-labelledby="main-title">
    <h1 id="main-title">Main title</h1>
    <section aria-labelledby="section-title-1">
        <h2 id="section-title-1"> Section Title </h2>
        <h3>Section Subtitle</h3> */

// Landmarks: Landmarks provide programmatic access to sections within an application.  ARIA roles to help you achieve this. like role="banner"
// Roles: header -> banner, nav -> navigation, main -> main, footer -> contentinfo(footnotes, copyrights,links to privacy statement), aside -> complementary, search -> search, form -> form, section -> region.

// Provide labels to describe the purpose of all form control; linking for and id. Labels are typically placed on top or to the left of the form fields
// Can include autocomplete='on' with different values.
// can also give the input an accessible name with aria-label
// Using aria-labelledby is similar to aria-label except it is used if the label text is visible on screen.
// aria-describedby is used the same way as aria-labelledby except provides a description with additional information that the user might need.
// In input, Avoid using placeholders as they can confuse many users.
// they don't meet the color contrast criteria by default; fixing the color contrast makes the placeholder look like pre-populated data in the input fields.
// It is best to provide all the information the user needs to fill out forms outside any inputs.

// if the functionality of the input can be understood with surrounding content, then we can hide the visual label.
// When using buttons inside a form, you must set the type to prevent submitting the form.  Like type submit for submit button, type button for cancel button.

// Functional Images: These images will act as a submit type button on forms
<form role="search">
    <label for="search" class="hidden-visually">Search: </label>
    <input type="text" name="search" id="search" v-model="search" />
    <input
        type="image"
        class="btnImg"
        src="https://img.icons8.com/search"
        alt="Search"
    />
</form>


// Documentations:
// User Agent Accessibility Guidelines (UAAG)
// Authoring Tool Accessibility Guidelines (ATAG)
// Web Content Accessibility Guidelines (WCAG)