# John's Lookbook assessment for UMG

Hi! Here's the repo for the UMG assessment as per the supplied requirements. This has been written for performance - so feel free use Chrome's Incognito Mode to run some tests in Lighthouse :)

# Conditional Upsell

In Theme Settings, An upsell product is selectable, as well as override text. A second product input lets you specify the qualifier. If this is not set, no upsell shows. If  it's set, then the upsell will only show when the qualifier is added to the Cart. Liquid controls the upsell logic, as per OS2.0 style; we only use JavaScript when absolutely necessary. 

# Simple cart

The Cart (and all other script) was written in Vanilla Javascript, utilising the Webcomponent format. All CSS and JS are passed as partials, to keep to 2.0 best practices. Event listeners look for Cart changes, sending all requests to the API as necessary and rendering with the Section Rendering API. Reducing the product quantity to zero in the Quantity field removes that Line Item from the Cart.

## Add to Cart

Once the product is added, the section rendering API calls the mini-cart for re-render. This also kicks in the logic for the upsell, showing the upsell product (but only if the qualifier product is in the cart).


## Bonus loading animations

Adding a product to the Cart triggers a button disable / busy cursor on the clicked button, until the promise is resolved, at which point it returns to the available state.

Additionally, any changes to the mini-cart triggers a loading animation spinner. This is an SVG, spinning with CSS. Due to the speed of the site, blink and you'll miss it! However, it is there and working...the loading spinner temporarily replaces the mini-cart contents until re-render.

## 2.0-style Sections

All editable sections were built for Shopify 2.0. The Featured Product section and Intro sections can be added within the Customiser. On the Featured Product section, a custom anchor can be added, so more than one of these can be put on a single page and linked. The navigation utilises these anchors.

## International

As per best practices for international use, no button/interface values were hardcoded. Instead, they are all supplied as language translations, stored in `locales/en.default.json`.

## Performance

The site has been written with performance and best practices in mind from the outset. Tested in Lighthouse, just a few minimal tweaks were required on finalisation - and as such the site scores very well on both Mobile and Desktop. Images are optimised and served using responsive and lazy loading methods.

Vanilla JS and custom Webcomponents were implemented to keep performance high. No external libraries are used and no React, which paid dividends on site speed, portability and editability. Simply put, Shopify handles the state.

## Responsive

This has also been tested with BrowserStack, with the focus on iOS. As there is an off-canvas drawer, which is a known pain point on iOS, this was necessary. No modifications were required.

## Design

The basic homepage design was first worked up in Figma. Everything - right down to the icons - was built from scratch for this assessment.

## Installation
Simply zip the repo and upload to Shopify to install (or clone/connect repo). No need to `npm install` or `gulp` or `webpack` anything - just deploy - then set your products, images and menus.


# Preview

The live Shopify preview can be viewed at https://joeartist.myshopify.com/
The password is `lewtew`


