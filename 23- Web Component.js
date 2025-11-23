// A Web Component is a reusable custom HTML element that works in every browser, every framework.
// <price-widget currency="usd"></price-widget>: Its a custom html tag, not native html tag, made by Custom Elements API, Shadow DOM, HTML Templates
// They behave like native elements (<input>, <select>, etc.), but you define their functionality.

// Vue can build components that work without Vue app
// Use Case Exmp:
// You want to embed a widget inside WordPress
// You want to embed a widget inside Laravel Blade
// You want to embed a widget inside another company’s website etc.

// Just normally make a vue component and build it in vite as a web component with some configurations.
// Then, Use anywhere — even without Vue, just as like a html tag
// This works in: Laravel Blade, WordPress, Django templates, HTML files, React, Angular, No framework at all


// Use Case:
// Use Vue component in non-Vue projects.
// Share real components across different frameworks
// Shadow DOM isolation: Styles cannot leak inside or outside.

// If your entire project is already Vue, then Web Components are unnecessary because:
// Vue components already give everything Web Components give- props, emits, lifecycle, scoped css, slots. No need to convert into web componets
// Web Components are slower than Vue components
// Debugging is harder
// Larger bundle size
// No Vue features (unless you hydrate manually)


// If your project is Laravel + Vue SPA, and you mount Vue on one Blade page: ❌ You don’t need Web Components.
// If you want to embed Vue components into Blade pages without a Vue app, Web Components are perfect.