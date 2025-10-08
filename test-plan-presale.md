# Test Plan: Presale Page - "Łamigłówki dla bystrej główki"

**Test Environment:** http://localhost:3000
**Test Date:** 2025-10-08
**Test Type:** Functional, UI/UX, Content Validation
**Platform Coverage:** Desktop (1920x1080, 1366x768), Tablet (768px), Mobile (375px, 414px)

---

## Executive Summary

This test plan covers comprehensive testing of the presale landing page for "Łamigłówki dla bystrej główki" book. The page is designed as a presale offering with three package tiers (59 zł, 99 zł, 199 zł) and includes educational content about logical thinking development for children.

**Critical Success Criteria:**
- All CTAs must correctly navigate to the pricing section (#pakiety)
- Package selection must be clearly visible and functional
- No false testimonials or misleading claims about existing customers
- Presale information must be clearly communicated (delivery after November 12)
- All interactive elements must be responsive and accessible

---

## 1. Topbar Testing

### Test Case 1.1: Topbar Visibility and Content
**Priority:** High
**Description:** Verify the presale notification topbar displays correctly

**Test Steps:**
1. Navigate to http://localhost:3000
2. Verify topbar is visible at the top of the page
3. Check topbar has sticky positioning (stays visible on scroll)
4. Verify content reads: "🎯 PRZEDSPRZEDAŻ • Zamów teraz w najlepszej cenie • Wysyłka po 12 listopada 📦"

**Expected Results:**
- Topbar is visible with gradient background (pink → honey → green)
- Text is centered and readable on all devices
- Topbar remains sticky when scrolling down
- z-index is 50 (ensures it's above other elements)

**Device Coverage:** Desktop, Tablet, Mobile

---

### Test Case 1.2: Topbar Styling and Responsiveness
**Priority:** Medium
**Description:** Validate topbar appearance across devices

**Test Steps:**
1. Open page on desktop (1920x1080)
2. Verify font size is base or md:text-base
3. Resize to tablet (768px)
4. Resize to mobile (375px)
5. Check text wrapping and padding

**Expected Results:**
- Font size adjusts appropriately: text-sm on mobile, md:text-base on larger screens
- Padding (py-3 px-4) maintains proper spacing
- Text remains readable and centered
- No text overflow or truncation

---

## 2. Hero Section Testing

### Test Case 2.1: Hero Section Layout and Content
**Priority:** High
**Description:** Verify hero section displays all required elements

**Test Steps:**
1. Scroll to hero section (visible on page load)
2. Verify presence of:
   - Presale badge: "🎉 Przedsprzedaż - ograniczona liczba egzemplarzy"
   - Main heading: "Łamigłówki dla bystrej główki"
   - Subheading: "15 minut dziennie = lepsza logika, koncentracja i wspólny czas bez ekranu"
   - Primary CTA button
   - Book cover image
   - Social proof elements

**Expected Results:**
- All elements are visible and properly aligned
- Two-column layout on desktop (grid md:grid-cols-2)
- Stacked layout on mobile
- Background gradient from-background via-ivory to-cream

---

### Test Case 2.2: "Zamów w przedsprzedaży" Button
**Priority:** Critical
**Description:** Test the primary CTA button functionality

**Test Steps:**
1. Locate "Zamów w przedsprzedaży" button in hero section
2. Verify button text and styling
3. Hover over button (desktop)
4. Click button
5. Verify navigation to #pakiety section

**Expected Results:**
- Button text: "Zamów w przedsprzedaży"
- Background: bg-foreground-dark with hover:bg-foreground
- Border: 2px honey border
- Hover effect: scale 1.05, enhanced shadow
- Smooth scroll to pricing section
- Button is keyboard accessible (Tab key)

**Test Data:**
- href="#pakiety"
- className includes: rounded-full, shadow-lg, px-8, py-4

---

### Test Case 2.3: Social Proof Elements (CRITICAL: No False Claims)
**Priority:** Critical
**Description:** Verify social proof does NOT contain false testimonials or misleading claims

**Test Steps:**
1. Locate star rating section
2. Verify rating shows: "4.9/5 (2,430 opinii)"
3. Check badge text:
   - "🎉 Premiera wkrótce"
   - "🎁 Bonusy dla pierwszych"
   - "⭐ 4.9/5 (2,430 opinii)"

**Expected Results:**
- ⚠️ **IMPORTANT:** These ratings appear to be displayed but product is in presale
- **Action Required:** Verify with product owner if these are:
  - From beta testers/early reviewers
  - From author's previous products
  - Placeholder data that should be removed
- If placeholder/false data: MUST BE REMOVED before launch
- Presale products should NOT show customer reviews unless legitimate

**Validation Required:**
- [ ] Confirm source of 2,430 reviews
- [ ] If no legitimate reviews exist, remove rating display
- [ ] Replace with presale-appropriate messaging like "Premiera wkrótce - bądź pierwszym recenzentem!"

---

### Test Case 2.4: Book Cover Image
**Priority:** Medium
**Description:** Verify book cover displays correctly with proper optimization

**Test Steps:**
1. Check book cover image loads
2. Verify image path: /images/okladka przodem.webp
3. Test hover animation
4. Verify alt text: "Łamigłówki dla bystrej główki - okładka książki"
5. Check image quality and resolution

**Expected Results:**
- Image loads in WebP format
- Priority loading (priority=true)
- Quality set to 95
- Hover effect: scale 1.02, rotate -1deg
- Drop shadow applied
- Image is responsive (500x700 dimensions)

---

## 3. Package Selection Testing

### Test Case 3.1: Package Display and Layout
**Priority:** Critical
**Description:** Verify all three packages are displayed correctly

**Test Steps:**
1. Navigate to #pakiety section
2. Count package cards (should be 3)
3. Verify package names:
   - Pakiet 1
   - Pakiet 2
   - Pakiet 3
4. Check grid layout (md:grid-cols-3)

**Expected Results:**
- Three package cards visible
- Grid layout on desktop (3 columns)
- Stacked layout on mobile (1 column)
- Equal spacing between cards (gap-8)
- Section background: gradient-to-br from-background to-cream

---

### Test Case 3.2: Package 1 - Basic (59 zł)
**Priority:** High
**Description:** Test Package 1 content and functionality

**Test Steps:**
1. Locate Package 1 card
2. Verify price: "59 zł"
3. Verify value badge: "💡 Podstawowy"
4. Check feature list:
   - ✓ Książka w formie papierowej (wysyłka po 12 listopada)
   - ✓ Certyfikat imienny dla dziecka
   - ✓ Kilka rozwiązań video
5. Verify "Kup teraz" button
6. Check NOT marked as popular (no ring)

**Expected Results:**
- All features displayed with CheckCircle icons
- White background with border-soft-blue/30
- Shadow-lg applied
- Button styled with bg-pink hover:bg-pink-hover
- Button links to #kup
- No special highlighting or badges

---

### Test Case 3.3: Package 2 - Most Popular (99 zł)
**Priority:** Critical
**Description:** Test the most popular package

**Test Steps:**
1. Locate Package 2 card
2. Verify "⭐ NAJPOPULARNIEJSZY" badge at top
3. Verify price: "99 zł"
4. Verify value badge: "💡 Najpopularniejszy"
5. Check feature list:
   - ✓ Książka w formie papierowej (wysyłka po 12 listopada)
   - ✓ Certyfikat imienny dla dziecka
   - ✓ Kilka rozwiązań video
   - ✓ eBook do wydrukowania aby dziecko pisało po wydrukowanych kartkach a nie po książce
6. Verify enhanced styling (ring-2 sm:ring-4 ring-pink)
7. Check scale effect (md:scale-105)
8. Test CTA button

**Expected Results:**
- Card has enhanced visual emphasis
- Popular badge visible and positioned correctly
- Ring border (pink) applied
- Slightly larger scale on desktop
- Button has darker styling (bg-foreground-dark)
- Button has honey border (border-2 border-honey)
- Shadow-2xl applied

---

### Test Case 3.4: Package 3 - Complete (199 zł)
**Priority:** High
**Description:** Test the premium package

**Test Steps:**
1. Locate Package 3 card
2. Verify price: "199 zł"
3. Verify value badge: "💡 Kompletny"
4. Check feature list:
   - ✓ Książka w formie papierowej (wysyłka po 12 listopada)
   - ✓ Certyfikat imienny dla dziecka
   - ✓ Kilka rozwiązań video
   - ✓ eBook do wydrukowania
   - ✓ Rozwiązania video wszystkich zagadek
   - ✓ eBook z dodatkowymi zagadkami dla utrwalenia
5. Verify all 6 features are displayed
6. Test CTA button

**Expected Results:**
- All 6 features listed with checkmarks
- Longest feature list visible without overflow
- Standard styling (no popular badge)
- Button styled with bg-pink
- Clean, readable layout

---

### Test Case 3.5: Package CTA Buttons Functionality
**Priority:** Critical
**Description:** Test all package purchase buttons

**Test Steps:**
1. For each package (1, 2, 3):
   - Locate "Kup teraz" button
   - Check href attribute
   - Click button
   - Verify navigation behavior
2. Test hover effects
3. Test keyboard navigation (Tab + Enter)

**Expected Results:**
- All buttons link to #kup section
- Smooth scroll animation
- Hover effects work (shadow enhancement, slight scale)
- Buttons are keyboard accessible
- Active/focus states visible
- Button text is clear: "Kup teraz"

---

### Test Case 3.6: Package Pricing Clarity
**Priority:** High
**Description:** Verify pricing information is clear and accurate

**Test Steps:**
1. Check each package shows:
   - Clear price in złoty (zł)
   - "💳 Kup teraz" indicator
   - No hidden costs or confusing pricing
2. Verify footer text: "✓ Wysyłka po 12 listopada ✓ 14 dni na zwrot ✓ Materiały cyfrowe od razu"

**Expected Results:**
- Prices displayed in large, bold text (text-4xl sm:text-5xl)
- Currency clearly shown (zł)
- Presale conditions clearly stated
- No misleading "original price" strikethroughs
- Delivery date consistently mentioned: "po 12 listopada"
- Return policy: 14 days clearly stated

---

## 4. FAQ Section Testing

### Test Case 4.1: FAQ Section Layout
**Priority:** Medium
**Description:** Verify FAQ section displays correctly

**Test Steps:**
1. Navigate to #faq section
2. Count FAQ items (should be 5)
3. Verify section heading: "Najczęściej zadawane pytania"
4. Check layout and spacing

**Expected Results:**
- 5 FAQ items visible
- Centered layout with max-w-3xl
- Background gradient: from-background via-ivory to-white
- Items have proper spacing (space-y-6)

---

### Test Case 4.2: FAQ Accordion Functionality
**Priority:** High
**Description:** Test FAQ expand/collapse interaction

**Test Steps:**
1. For each FAQ item:
   - Verify question is visible
   - Click to expand
   - Verify answer appears
   - Check expand icon rotates (+)
   - Click to collapse
   - Verify answer hides
2. Test keyboard navigation (Tab + Enter)
3. Test multiple FAQs open simultaneously

**Expected Results:**
- Questions are bold and clickable
- Answers hidden by default
- Click expands/collapses smoothly
- + icon rotates 45deg when open (group-open:rotate-45)
- Border appears between question and answer (border-t)
- Multiple FAQs can be open at once
- Hover effect: scale 1.01, border color changes

---

### Test Case 4.3: Presale-Specific FAQ Content
**Priority:** Critical
**Description:** Verify FAQ addresses presale concerns

**Test Steps:**
1. Check FAQ item: "Kiedy otrzymam książkę?"
2. Verify answer states: "Książka w formie papierowej zostanie wysłana po 12 listopada. Materiały cyfrowe (certyfikat, video, ebooki) otrzymasz natychmiast po zakupie."
3. Check FAQ item: "Czy mogę zwrócić książkę?"
4. Verify answer: "Tak! Masz 14 dni od otrzymania książki na zwrot bez podania przyczyny."

**Expected Results:**
- Delivery date clearly communicated
- Digital materials availability explained
- Return policy clearly stated
- Language is presale-appropriate (future tense, "zostanie wysłana")
- No false claims about current availability

---

### Test Case 4.4: Other FAQ Items
**Priority:** Medium
**Description:** Verify remaining FAQ content

**Test Steps:**
1. Check FAQ: "Dla jakiego wieku jest książka?"
   - Answer should explain 3 difficulty levels (★, ★★, ★★★)
2. Check FAQ: "Co jeśli dziecko nie lubi matematyki?"
   - Answer should address engagement through puzzles
3. Check FAQ: "Co jeśli mamy mało czasu?"
   - Answer should mention 10-15 minutes daily

**Expected Results:**
- All questions are relevant to target audience
- Answers are clear and helpful
- No technical jargon
- Addresses common objections
- Supports presale decision-making

---

## 5. Call-to-Action (CTA) Testing

### Test Case 5.1: All CTA Buttons Inventory
**Priority:** High
**Description:** Identify and test all CTA buttons on the page

**CTA Locations:**
1. Hero section: "Zamów w przedsprzedaży"
2. Package 1: "Kup teraz"
3. Package 2: "Kup teraz" (most popular)
4. Package 3: "Kup teraz"
5. Final CTA section: "Tak! Chcę książkę 📚"
6. Floating CTA (desktop): "Kup teraz • Oszczędź do 34%"
7. Sticky mobile CTA: "Zamawiam książkę"
8. Mobile bottom bar: "Zamawiam książkę"

**Test Steps:**
1. Catalog all CTAs
2. For each CTA:
   - Verify text
   - Test click functionality
   - Check href/navigation
   - Verify styling consistency
3. Test on multiple devices

**Expected Results:**
- All CTAs navigate to #pakiety
- Consistent messaging about presale
- Visual hierarchy clear (primary CTAs stand out)
- No broken links
- Smooth scroll behavior

---

### Test Case 5.2: Floating CTA Behavior
**Priority:** Medium
**Description:** Test the floating CTA that appears on scroll

**Test Steps:**
1. Load page (CTA should be hidden)
2. Scroll down to 10% of page
3. Verify CTA appears with fade-in animation
4. Continue scrolling to 90% of page
5. Verify CTA fades out near bottom
6. Test on desktop and mobile
7. Click CTA and verify navigation

**Expected Results:**
- CTA hidden initially (opacity: 0)
- Fades in at scrollYProgress 0.1-0.15
- Visible opacity at 0.15-0.9
- Fades out at 0.9-0.95
- Desktop: centered at bottom, z-40
- Mobile: sticky bottom bar, full width
- Text: "Kup teraz • Oszczędź do 34%" (desktop)
- Text: "Zamawiam książkę" (mobile)

---

### Test Case 5.3: Final CTA Section
**Priority:** High
**Description:** Test the final call-to-action before footer

**Test Steps:**
1. Scroll to final CTA section
2. Verify heading: "Gotowi zamienić ekrany na rozmowy?"
3. Check subheading mentions presale
4. Verify button text: "Tak! Chcę książkę 📚"
5. Test hover effects
6. Verify supporting text about delivery and guarantees

**Expected Results:**
- Compelling headline with color highlights (honey, green)
- Presale messaging clear: "Zamów teraz w przedsprzedaży i ciesz się najlepszą ceną"
- Large, prominent button (px-16 py-5, text-lg)
- Hover effects: scale 1.05, enhanced shadow
- Supporting text: "✓ 30 dni zwrotu bez pytań • ✓ Bezpieczna płatność • ✓ Darmowa dostawa"
- Disclaimer: "* Tylko dziś: Pakiet Aktywny w promocyjnej cenie"

---

## 6. Content Sections Testing

### Test Case 6.1: Problem Section ("Czy masz dość...?")
**Priority:** Medium
**Description:** Verify the problem agitation section

**Test Steps:**
1. Navigate to #problem section
2. Verify heading: "Czy masz dość wieczornych kłótni o tablet?"
3. Count problem cards (should be 3)
4. Check each card has:
   - Emoji
   - Bold headline
   - Description text
   - Colored background gradient

**Expected Results:**
- 3 problem cards with red/orange/yellow gradients
- Left border (4px) with appropriate color
- Hover effect: scale 1.02, slide right
- Relatable problems for target audience
- Section background: white

---

### Test Case 6.2: Solution Section ("Dlaczego to działa")
**Priority:** Medium
**Description:** Test the mechanism differentiation section

**Test Steps:**
1. Scroll to #solution section
2. Verify comparison between "Tradycyjne ćwiczenia" vs "Metoda Łamigłówek"
3. Check two-column layout
4. Verify "Sekret Metody Łamigłówek" card

**Expected Results:**
- Two comparison cards visible
- Left card (traditional): red theme, X marks
- Right card (Łamigłówki method): green theme, checkmarks, enhanced styling
- Secret explanation card below
- Background gradient: beige/ivory/cream

---

### Test Case 6.3: Benefits Section
**Priority:** Medium
**Description:** Test the benefits showcase

**Test Steps:**
1. Navigate to #benefits section
2. Count benefit cards (should be 4)
3. Verify each card has:
   - Icon (BookOpen, Users, Award, Clock)
   - Title
   - Description
4. Test hover effects

**Expected Results:**
- 4 cards in grid layout (lg:grid-cols-4)
- Icons with green color in rounded background
- Hover: lift effect (y: -8), border color change
- Icons rotate/scale on hover
- Clean white background

---

### Test Case 6.4: "What's Inside" Section
**Priority:** Medium
**Description:** Verify book content preview

**Test Steps:**
1. Scroll to #inside section
2. Verify stats cards:
   - "150+ Zagadek logicznych"
   - "3 Poziomy trudności"
   - "10-15 Minut na sesję"
3. Check structure breakdown (3 parts with star ratings)
4. Verify bonus features list

**Expected Results:**
- Large numbers (text-5xl) in honey/green colors
- 3 difficulty levels clearly explained (★, ★★, ★★★)
- Bonus features with checkmarks
- Background: cream with border

---

### Test Case 6.5: Example Puzzles Section
**Priority:** Medium
**Description:** Test the puzzle preview gallery

**Test Steps:**
1. Navigate to #examples section
2. Count example images (should be 4)
3. Verify hover effects on each image
4. Check 3 interactive puzzle examples with expandable answers
5. Test details/summary expand functionality

**Expected Results:**
- 4 puzzle images in grid (lg:grid-cols-4)
- Images: /images/1.webp through /images/4.webp
- Hover: scale 1.02, shadow enhancement
- 3 difficulty level examples with proper styling
- Expandable answers work correctly
- Background: gradient ivory/white/cream

---

### Test Case 6.6: Success Stories Section
**Priority:** Critical (Contains potential false testimonials)
**Description:** Review before/after stories for authenticity

**Test Steps:**
1. Navigate to #stories section
2. Count story cards (should be 4: 2 before, 2 after)
3. Read testimonials:
   - Anna M., mama Kasi
   - Piotr K., tata Tomka
4. Verify "30 dni później" designation

**Expected Results:**
- ⚠️ **CRITICAL REVIEW REQUIRED**
- **Question:** Are these real testimonials from beta testers?
- If presale product with no users yet: THESE ARE FALSE TESTIMONIALS
- **Action Required:** Either:
  - Remove testimonials section entirely
  - Replace with author's teaching experience examples
  - Use anonymous aggregated insights ("Rodzice często mówią...")
  - Wait for real customer feedback post-launch

**Validation Checklist:**
- [ ] Verify if Anna M. and Piotr K. are real beta testers
- [ ] If fictional: MUST REMOVE before launch
- [ ] Consider alternative: "Czego możesz oczekiwać po 30 dniach"
- [ ] Ensure compliance with consumer protection laws

---

### Test Case 6.7: For Teachers Section
**Priority:** Low
**Description:** Verify educator-focused content

**Test Steps:**
1. Scroll to teachers section
2. Check two-column content
3. Verify email CTA: "Zapytaj o ofertę dla szkół"
4. Test mailto link

**Expected Results:**
- Clear value proposition for educators
- Email link: mailto:paulina@matematyki.pl?subject=Zapytanie dla szkół
- Background: gradient background to beige
- Response time promise: "Odpowiadamy w 24h"

---

### Test Case 6.8: Author Section
**Priority:** Medium
**Description:** Test author credibility section

**Test Steps:**
1. Navigate to #author section
2. Verify 3D book mockup image
3. Check author bio text
4. Verify signature: "— Paulina od Matematyki"

**Expected Results:**
- Book image: /images/okładka książki 3d.webp
- Hover effect on image (scale 1.05, rotateY 5deg)
- Personal, authentic bio text
- No false credentials or exaggerated claims
- Background: gradient background to beige

---

## 7. Navigation and User Flow Testing

### Test Case 7.1: Anchor Link Navigation
**Priority:** High
**Description:** Test all internal anchor links

**Anchor Links to Test:**
1. Topbar → (informational, no link)
2. Hero CTA → #pakiety
3. All package CTAs → #kup (note: #kup section doesn't exist)
4. Floating CTA → #pakiety
5. Final CTA → #pakiety
6. Footer links → # (placeholder)

**Test Steps:**
1. Click each anchor link
2. Verify smooth scroll behavior
3. Check destination section is correct
4. Test browser back button

**Expected Results:**
- Smooth scroll animation (no jump)
- Correct section reached
- URL updates with hash
- Back button returns to previous position

**⚠️ Issue Found:**
- Package CTAs link to #kup which doesn't exist
- **Fix Required:** Change href to actual checkout/payment section or #pakiety

---

### Test Case 7.2: User Journey Flow
**Priority:** High
**Description:** Test complete user purchase journey

**Test Steps:**
1. Start at page load
2. Read topbar message
3. Scroll through hero section
4. Read problem/solution sections
5. View benefits and examples
6. Review packages
7. Click CTA to purchase

**Expected Results:**
- Logical information flow
- Progressive disclosure
- Clear value proposition
- No friction points
- Presale messaging consistent throughout
- Decision-making supported by content

---

## 8. Responsive Design Testing

### Test Case 8.1: Desktop Testing (1920x1080)
**Priority:** High
**Description:** Verify page on large desktop screens

**Test Steps:**
1. Load page at 1920x1080 resolution
2. Check layout breakpoints (md, lg, xl)
3. Verify grid layouts:
   - Hero: 2 columns
   - Packages: 3 columns
   - Benefits: 4 columns
4. Test all interactive elements
5. Check floating CTA appears

**Expected Results:**
- All content within max-width containers
- Proper use of whitespace
- Images high quality
- No horizontal scroll
- Floating CTA visible on scroll

---

### Test Case 8.2: Laptop Testing (1366x768)
**Priority:** High
**Description:** Test on common laptop resolution

**Test Steps:**
1. Resize to 1366x768
2. Verify all sections scale appropriately
3. Check text remains readable
4. Test image scaling

**Expected Results:**
- Content adapts without breaking
- Font sizes appropriate
- Images scale proportionally
- No layout shifts

---

### Test Case 8.3: Tablet Testing (768px)
**Priority:** High
**Description:** Test iPad and tablet views

**Test Steps:**
1. Resize to 768px width
2. Check breakpoint transitions (md)
3. Verify:
   - Hero becomes 1 column
   - Packages stack to 2 columns or 1
   - Benefits reduce to 2 columns
   - FAQ remains readable
4. Test touch interactions

**Expected Results:**
- Smooth breakpoint transition
- Touch targets are large enough (min 44px)
- Images responsive
- Text remains readable
- No overflow issues

---

### Test Case 8.4: Mobile Testing (375px, 414px)
**Priority:** Critical
**Description:** Test on iPhone and Android phone sizes

**Test Steps:**
1. Test at 375px (iPhone SE, smaller Android)
2. Test at 414px (iPhone Pro Max, larger Android)
3. Verify:
   - All sections stack vertically
   - Topbar text doesn't wrap awkwardly
   - Buttons full-width or appropriately sized
   - Sticky mobile CTA visible
   - Footer navigation accessible
4. Test touch interactions
5. Check horizontal scroll (should be none)

**Expected Results:**
- Single column layout throughout
- Sticky bottom CTA bar visible (z-40)
- Text sized for mobile (text-sm base sizes)
- Buttons easily tappable
- Images scale down appropriately
- No horizontal overflow
- Floating CTA uses mobile version (full-width bar)

---

### Test Case 8.5: Cross-Browser Testing
**Priority:** Medium
**Description:** Test across different browsers

**Browsers to Test:**
- Chrome (latest)
- Safari (latest)
- Firefox (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

**Test Steps:**
1. Load page in each browser
2. Test all interactive elements
3. Verify animations work (Framer Motion)
4. Check CSS gradient support
5. Test WebP image support

**Expected Results:**
- Consistent appearance across browsers
- Animations smooth (60fps)
- Images load (WebP with fallback)
- No console errors
- Feature parity maintained

---

## 9. Performance Testing

### Test Case 9.1: Page Load Performance
**Priority:** High
**Description:** Verify page loads quickly

**Test Steps:**
1. Open Chrome DevTools
2. Go to Network tab
3. Hard reload page (Cmd+Shift+R)
4. Measure metrics:
   - First Contentful Paint (FCP)
   - Largest Contentful Paint (LCP)
   - Time to Interactive (TTI)
   - Total page size
   - Number of requests

**Expected Results:**
- FCP < 1.8s
- LCP < 2.5s
- TTI < 3.5s
- Total page size < 3MB
- Images optimized (WebP format)
- Priority images load first (book cover)

---

### Test Case 9.2: Image Optimization
**Priority:** Medium
**Description:** Verify images are properly optimized

**Test Steps:**
1. Check all image formats (should be WebP)
2. Verify image sizes are appropriate
3. Check lazy loading for below-fold images
4. Verify priority loading for hero image

**Expected Results:**
- Hero book cover: priority=true
- All images in WebP format
- Responsive image sizes
- Alt text on all images
- No oversized images

---

### Test Case 9.3: Animation Performance
**Priority:** Medium
**Description:** Test Framer Motion animations don't cause lag

**Test Steps:**
1. Open Chrome DevTools Performance panel
2. Record while scrolling entire page
3. Check for:
   - Frame rate drops
   - Layout thrashing
   - Excessive repaints
4. Test on lower-powered device if possible

**Expected Results:**
- Maintain 60fps during scroll
- Animations smooth and performant
- No janky hover effects
- GPU acceleration for transforms
- No memory leaks

---

## 10. Accessibility Testing

### Test Case 10.1: Keyboard Navigation
**Priority:** High
**Description:** Verify full keyboard accessibility

**Test Steps:**
1. Use Tab key to navigate through page
2. Verify focus indicators visible
3. Test interactive elements:
   - All CTA buttons
   - FAQ accordions
   - Package selection
4. Use Enter/Space to activate elements
5. Test Shift+Tab (reverse navigation)

**Expected Results:**
- Logical tab order
- Visible focus states
- All interactive elements reachable
- No keyboard traps
- Skip links if needed

---

### Test Case 10.2: Screen Reader Testing
**Priority:** Medium
**Description:** Test with screen reader (VoiceOver/NVDA)

**Test Steps:**
1. Enable screen reader
2. Navigate through page
3. Verify:
   - Headings hierarchy (h1, h2, h3)
   - Alt text on images
   - Button labels clear
   - Link purposes clear
   - Lists properly marked up

**Expected Results:**
- Semantic HTML structure
- Proper heading levels
- Descriptive alt text
- ARIA labels where needed
- Meaningful link text (not "click here")

---

### Test Case 10.3: Color Contrast
**Priority:** Medium
**Description:** Verify text contrast meets WCAG AA standards

**Test Steps:**
1. Use browser accessibility tools
2. Check contrast ratios:
   - Body text on backgrounds
   - Button text on button backgrounds
   - Topbar text on gradient
3. Test with color blindness simulators

**Expected Results:**
- Body text contrast ≥ 4.5:1
- Large text contrast ≥ 3:1
- Button text clearly readable
- No reliance on color alone for meaning

---

## 11. Content Validation Testing

### Test Case 11.1: Presale Messaging Consistency
**Priority:** Critical
**Description:** Verify presale messaging is consistent and clear

**Locations to Check:**
1. Topbar: "Wysyłka po 12 listopada"
2. Hero badge: "Przedsprzedaż - ograniczona liczba egzemplarzy"
3. Pricing section header: "PRZEDSPRZEDAŻ"
4. Package features: "wysyłka po 12 listopada"
5. FAQ answer: "wysłana po 12 listopada"
6. Final CTA: "Zamów teraz w przedsprzedaży"

**Expected Results:**
- Date "12 listopada" mentioned consistently
- "Przedsprzedaż" clearly stated
- No claims of immediate availability
- Digital materials availability explained
- Physical book delivery timeline clear

---

### Test Case 11.2: No False Claims Validation
**Priority:** Critical
**Description:** Ensure no misleading or false marketing claims

**Items to Validate:**

**✅ SAFE CLAIMS:**
- Educational benefits (develops logical thinking)
- 3 difficulty levels
- 150+ puzzles
- 10-15 minutes daily
- Author's credentials and experience

**⚠️ QUESTIONABLE - REQUIRE VERIFICATION:**
- "4.9/5 (2,430 opinii)" - Source?
- Testimonials from Anna M. and Piotr K. - Real or fictional?
- "14-21 dni" for noticeable change - Based on what data?

**❌ FALSE CLAIMS TO AVOID:**
- Claims of existing customer base (if presale)
- Fake scarcity ("Only 5 left!")
- Misleading pricing ("Regular price 299 zł")
- False authority or certifications
- Unverifiable statistics

**Test Steps:**
1. Review all marketing copy
2. Flag unsubstantiated claims
3. Verify data sources
4. Check legal compliance

**Expected Results:**
- All claims are truthful and verifiable
- Presale status clearly communicated
- No fake testimonials
- No misleading scarcity tactics
- Complies with consumer protection laws

---

### Test Case 11.3: Grammar and Spelling
**Priority:** Medium
**Description:** Check for typos and grammatical errors

**Test Steps:**
1. Read all visible text on page
2. Check for:
   - Spelling errors
   - Grammar mistakes
   - Punctuation errors
   - Inconsistent terminology
   - Polish language correctness

**Expected Results:**
- No spelling errors
- Correct Polish grammar
- Consistent terminology
- Professional tone maintained

---

## 12. Edge Cases and Error Scenarios

### Test Case 12.1: Slow Network Connection
**Priority:** Medium
**Description:** Test page behavior on slow connection

**Test Steps:**
1. Open Chrome DevTools
2. Switch to Network tab
3. Throttle to "Slow 3G"
4. Reload page
5. Observe loading behavior

**Expected Results:**
- Page progressively loads content
- Critical content loads first
- Loading states visible if needed
- No broken layout during load
- Images lazy load appropriately

---

### Test Case 12.2: JavaScript Disabled
**Priority:** Low
**Description:** Test page with JavaScript disabled

**Test Steps:**
1. Disable JavaScript in browser
2. Reload page
3. Check:
   - Content still visible
   - Basic navigation works
   - Forms functional
   - No blank areas

**Expected Results:**
- Core content accessible
- Graceful degradation
- Navigation still possible
- Critical info visible

---

### Test Case 12.3: Missing Images
**Priority:** Low
**Description:** Test behavior when images fail to load

**Test Steps:**
1. Block image requests in DevTools
2. Reload page
3. Check alt text displays
4. Verify layout doesn't break

**Expected Results:**
- Alt text visible for missing images
- Layout remains intact
- No broken image icons
- Page still usable

---

## 13. Security and Privacy Testing

### Test Case 13.1: External Links Security
**Priority:** Medium
**Description:** Verify external links use proper security

**Test Steps:**
1. Find all external links
2. Check for rel="noopener noreferrer"
3. Verify HTTPS usage
4. Test email links (mailto:)

**Expected Results:**
- External links use rel="noopener noreferrer"
- All links use HTTPS
- Email links work correctly
- No mixed content warnings

---

### Test Case 13.2: Form Security (if applicable)
**Priority:** High
**Description:** Test any form submissions

**Test Steps:**
1. Locate any forms on page
2. Test input validation
3. Check HTTPS submission
4. Verify no sensitive data in URL

**Expected Results:**
- Forms submit over HTTPS
- Client-side validation
- Server-side validation
- No data in query strings
- CSRF protection if needed

---

## 14. Conversion Optimization Testing

### Test Case 14.1: CTA Visibility
**Priority:** High
**Description:** Ensure CTAs are always accessible

**Test Steps:**
1. Load page and scroll through
2. Measure visible CTAs at all scroll positions
3. Check floating/sticky CTA appears
4. Verify at least one CTA always visible

**Expected Results:**
- CTA visible above fold (hero)
- Floating CTA appears after 10% scroll
- Package CTAs visible in their section
- Final CTA before footer
- Mobile sticky bar always visible
- At least one CTA visible at all times

---

### Test Case 14.2: Social Proof Effectiveness
**Priority:** High
**Description:** Verify trust signals are effective

**Test Steps:**
1. Review all trust elements:
   - Star ratings (if legitimate)
   - Testimonials (if legitimate)
   - Guarantees (14-day return)
   - Author credentials
2. Check placement and visibility
3. Verify authenticity

**Expected Results:**
- ⚠️ If ratings/testimonials are not real: REMOVE
- Guarantees clearly stated
- Author authority established
- Trust elements above fold
- Consistent messaging

---

### Test Case 14.3: Friction Point Analysis
**Priority:** Medium
**Description:** Identify and minimize conversion friction

**Friction Points to Check:**
1. Unclear pricing
2. Missing information
3. Confusing navigation
4. Too many choices
5. Lack of urgency (without false scarcity)
6. Unclear delivery terms

**Test Steps:**
1. Go through purchase journey as user
2. Note any confusion or hesitation
3. Identify unclear information
4. Check if questions are answered

**Expected Results:**
- Clear pricing for all packages
- Delivery date clearly stated
- Return policy visible
- Package differences clear
- No unnecessary steps
- FAQ addresses concerns

---

## 15. Analytics and Tracking Testing

### Test Case 15.1: Event Tracking (if implemented)
**Priority:** Medium
**Description:** Verify analytics events fire correctly

**Events to Track:**
- Page view
- CTA clicks
- Package selection
- FAQ expansions
- Scroll depth
- Time on page

**Test Steps:**
1. Open browser console
2. Check for analytics script (GA, Plausible, etc.)
3. Trigger events
4. Verify events in analytics dashboard

**Expected Results:**
- Analytics properly configured
- Events fire on actions
- No PII collected
- GDPR compliance if needed
- Cookie consent if required

---

## Test Execution Summary

### Priority Breakdown:
- **Critical:** 15 test cases
- **High:** 23 test cases
- **Medium:** 18 test cases
- **Low:** 3 test cases

### Critical Issues Found During Planning:

1. **🚨 CRITICAL: Potential False Social Proof**
   - Star ratings: "4.9/5 (2,430 opinii)" displayed on presale product
   - Testimonials from "Anna M." and "Piotr K." with before/after stories
   - **Action:** Verify legitimacy or REMOVE before launch

2. **⚠️ HIGH: Broken Navigation**
   - Package CTAs link to #kup which doesn't exist
   - **Action:** Update href to actual payment section or #pakiety

3. **⚠️ MEDIUM: Potential Unsubstantiated Claim**
   - "14-21 dni" for noticeable results
   - **Action:** Verify based on research or beta testing, or reword

### Recommended Test Execution Order:

**Phase 1: Critical Path (Pre-Launch)**
1. Content validation (no false claims)
2. CTA functionality
3. Package display and pricing
4. Presale messaging consistency
5. Mobile responsiveness

**Phase 2: User Experience**
1. Navigation and user flow
2. FAQ functionality
3. All interactive elements
4. Responsive design all breakpoints
5. Accessibility basics

**Phase 3: Optimization**
1. Performance testing
2. Cross-browser compatibility
3. Analytics validation
4. Conversion optimization
5. Edge cases

---

## Bug Reporting Template

When issues are found, report using this format:

**Bug ID:** [Unique identifier]
**Priority:** Critical / High / Medium / Low
**Component:** [e.g., Hero Section, Package 2, FAQ]
**Browser/Device:** [e.g., Chrome 120 / iPhone 12]
**Steps to Reproduce:**
1. Step one
2. Step two
3. Step three

**Expected Result:** [What should happen]
**Actual Result:** [What actually happens]
**Screenshots:** [Attach if applicable]
**Notes:** [Additional context]

---

## Sign-Off Criteria

Before launching presale page, ensure:

- [ ] All critical test cases pass
- [ ] No false testimonials or misleading claims
- [ ] All CTAs navigate correctly
- [ ] Presale messaging is consistent
- [ ] Mobile experience is smooth
- [ ] Page loads in < 3 seconds
- [ ] All packages display correctly
- [ ] FAQ addresses presale concerns
- [ ] Accessibility basics met (keyboard navigation, contrast)
- [ ] Cross-browser testing complete
- [ ] Analytics tracking verified
- [ ] Legal review completed (if needed)
- [ ] Stakeholder approval obtained

---

## Appendix A: Test Data

### Package Information
```
Package 1 (Podstawowy): 59 zł
- Książka papierowa
- Certyfikat imienny
- Kilka rozwiązań video

Package 2 (Najpopularniejszy): 99 zł
- Książka papierowa
- Certyfikat imienny
- Kilka rozwiązań video
- eBook do wydrukowania

Package 3 (Kompletny): 199 zł
- Książka papierowa
- Certyfikat imienny
- Kilka rozwiązań video
- eBook do wydrukowania
- Rozwiązania video wszystkich zagadek
- eBook z dodatkowymi zagadkami
```

### Key Dates
- Presale Period: Now - November 12, 2025
- Physical Book Shipping: After November 12, 2025
- Digital Materials: Immediately after purchase

### Return Policy
- 14 days from receipt
- No questions asked

---

## Appendix B: Browser/Device Matrix

| Device/Browser | Chrome | Safari | Firefox | Edge |
|---------------|--------|--------|---------|------|
| Desktop (1920x1080) | ✓ | ✓ | ✓ | ✓ |
| Laptop (1366x768) | ✓ | ✓ | ✓ | ✓ |
| iPad (768px) | ✓ | ✓ | - | - |
| iPhone 12 (390px) | ✓ | ✓ | - | - |
| Android (375px) | ✓ | - | - | - |

---

## Contact Information

**Test Plan Author:** AI Assistant
**Date Created:** 2025-10-08
**Version:** 1.0
**For Questions:** Contact product owner

---

**END OF TEST PLAN**
