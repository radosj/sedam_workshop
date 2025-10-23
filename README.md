## 🎯 Overview

This is a modern, clean recreation of the Sedam Workshop website. The original WordPress site has been converted to a lightweight, fast-loading website using only HTML, CSS, and JavaScript - no plugins or complex dependencies required.



#### Product Gallery Images
1. Replace `product-1.jpg` through `product-5.jpg` in `assets/images/`
2. To add more products:
   - Add new images (e.g., `product-6.jpg`)
   - Update the HTML in `index.html` (search for "gallery-slide")
   - Update the JavaScript counter in `main.js` (change `totalGallerySlides`)

#### Section Images
- `collections.jpg` - Collections section background
- `showroom.jpg` - Showroom section image

### Changing Text Content

#### Navigation Menu
Open `index.html` and find this section:
```html
<ul class="nav__menu">
    <li><a href="#home" class="nav__link">Home</a></li>
    <li><a href="#collections" class="nav__link">Collections</a></li>
    <!-- Change text here -->
</ul>
```

#### Hero Slideshow Text
Find the slide content sections:
```html
<h1 class="slide-title animate-text">
    <span class="word">Stanley</span>
    <span class="word">Sofa</span>
</h1>
```
Change the words inside `<span class="word">` tags.

#### About Section Quote
Find this section:
```html
<blockquote class="about-quote animate-words">
    <span class="word">Sedam</span>
    <span class="word">Workshop</span>
    <!-- Change words here -->
</blockquote>
```

#### Contact Information
Find the contact section:
```html
<div class="info-item">
    <h3>Contact</h3>
    <p>sedamworkshop@mail.com<br>
    +33 1 23 45 67 89</p>
</div>
```

### Changing Colors

Open `assets/css/style.css` and modify these key colors:

#### Background Colors
```css
/* Black sections */
background: #000;

/* White sections */  
background: white;

/* Light gray sections */
background: #f8f8f8;
```

#### Text Colors
```css
/* Main text */
color: #333;

/* Light text */
color: #666;

/* White text */
color: white;
```

#### Accent Colors
```css
/* Links and buttons */
color: #333;
border: 1px solid white;
```

### Changing Fonts

#### Current Font
The website uses "Inter" font. To change it:

1. **In HTML** (find in `<head>` section):
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

2. **In CSS** (find at the top of `style.css`):
```css
body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

#### Popular Font Alternatives
- **Modern**: 'Poppins', 'Montserrat', 'Roboto'
- **Classic**: 'Playfair Display', 'Lora', 'Crimson Text'
- **Minimal**: 'Work Sans', 'Source Sans Pro', 'Open Sans'

### Changing Animation Speed

Open `assets/js/main.js` and find:

#### Slideshow Auto-Play Speed
```javascript
setInterval(() => {
    // Change 5000 to desired milliseconds (5000 = 5 seconds)
}, 5000);
```

#### Animation Durations
```javascript
gsap.defaults({
    duration: 0.8,  // Change this value
    ease: "power2.out"
});
```

## 📱 Mobile Responsiveness

The website automatically adapts to different screen sizes:
- **Desktop**: Full layout with all animations
- **Tablet**: Adjusted spacing and font sizes
- **Mobile**: Hamburger menu, stacked layout, touch-friendly controls

## 🔧 Technical Details

### Dependencies
- **GSAP**: Animation library (loaded from CDN)
- **ScrollTrigger**: Scroll-based animations (loaded from CDN)
- **Inter Font**: Typography (loaded from Google Fonts)

### Browser Support
- Chrome/Edge: Full support
- Firefox: Full support  
- Safari: Full support
- Internet Explorer: Not supported (modern features used)

### Performance Features
- Lazy loading for images
- Optimized animations
- Compressed images
- Minimal dependencies

## 🛠️ Troubleshooting

### Website Not Loading Properly
1. Make sure you're using a web server (Option 2 or 3 above)
2. Check that all files are in the correct folders
3. Verify image file names match exactly (case-sensitive)

### Images Not Showing
1. Check image file paths in `index.html`
2. Ensure images are in `assets/images/` folder
3. Verify image file formats (JPG, PNG, WebP supported)

### Animations Not Working
1. Check browser console for JavaScript errors (F12)
2. Ensure GSAP libraries are loading (check internet connection)
3. Verify JavaScript is enabled in your browser

### Mobile Menu Not Working
1. Check if JavaScript is enabled
2. Try refreshing the page
3. Check browser console for errors

## 🎯 Adding New Sections

To add a new section (e.g., "Services"):

1. **Add HTML section** in `index.html`:
```html
<section class="services-section" id="services">
    <div class="container">
        <h2 class="section-title animate-fade">Our Services</h2>
        <!-- Your content here -->
    </div>
</section>
```

2. **Add navigation link**:
```html
<li><a href="#services" class="nav__link">Services</a></li>
```

3. **Add CSS styling** in `style.css`:
```css
.services-section {
    padding: 8rem 0;
    background: white;
}
```

## 📞 Support

If you need help customizing the website:

1. **Check this README first** - Most common questions are answered here
2. **Browser Developer Tools** - Press F12 to inspect elements and debug
3. **Online Resources**:
   - HTML/CSS: [MDN Web Docs](https://developer.mozilla.org/)
   - GSAP Animations: [GSAP Documentation](https://greensock.com/docs/)
   - CSS Grid/Flexbox: [CSS Tricks](https://css-tricks.com/)

## 🔄 Updates and Maintenance

### Regular Updates
- Replace images seasonally
- Update contact information as needed
- Refresh product gallery with new items
- Update copyright year in footer

### Performance Monitoring
- Test website speed regularly
- Optimize images if they're too large
- Check mobile responsiveness on real devices

### Backup
Always keep a backup copy of your customized website before making major changes.

---

**Enjoy your new Sedam Workshop website!** 🎉

The website is now ready to use and fully customizable without any technical expertise required. All animations and interactions work smoothly across all devices.
