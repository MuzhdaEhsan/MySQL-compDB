const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// We don't use default Bootstrap compiled CSS, instead we use a free template
// https://github.com/startbootstrap/startbootstrap-sb-admin
// We copy SB Admin CSS code into /public/app.css directly
mix.js("resources/js/app.js", "public/js")
    // .sass('resources/sass/app.scss', 'public/css')
    .sourceMaps();
