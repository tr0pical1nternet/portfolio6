# Portfolio 5

From scratch rebuild of my [current portfolio site](https://charlesrobertson.co). Built to be accessible, performant, attractive, and easy to maintain.

## Accessibility
The core of this project is accessibility which translates to three major design considerations:
1. Accesible to any device that can read the web: Text only browsers, flip phones, headless browsers, spiders... the whole lot of devices that will not be interpreting this document the way I expect.
2. Accesible by screen reader, marked up symantically, following WAI guidelines, including appropriate ARIA attributes, with attention paid to alt information for non-text media.
3. Accesible using keyboard only input. Using javascript to augment keyboard browsing functions such as expanding and contracting accordions.

## Performance
Building the site as lightweight as possible to keep it accessible to users with low bandwidth.
1. It's a static site, no server side rendering, and could be easily served by CDN for reduced latency 
2. The bulk of site performance is coming from image optimization: Calibrating JPEG compression, including WebP formats for supporting browsers, generating incremental sizes for srcsets.
3. Building the site lean, all vanilla JS. This also helps me to practice my JS fundamentals because I learned jQuery first.
4. Following best practices to keep animation at 60 fps.




