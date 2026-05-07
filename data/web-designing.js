/* Web Designing — Subject Data (Part 1: Metadata + Units) */
registerSubject({
    name: "Web Designing",
    code: "WD",
    description: "HTML5, CSS3, and Web Development Fundamentals",
    icon: "🌐",
    colorTheme: { primary: "#6366f1", secondary: "#a855f7", accent: "#ec4899" },
    aiContext: "Web Designing course covering HTML5 structure and tags, CSS3 styling and box model, lists and linking, multimedia elements, tables and forms, CSS animations and positioning, Photoshop tools, Adobe XD, HTTP protocols, web hosting, and DNS.",
    glossary: [
        { term: "HTML", def: "HyperText Markup Language — standard language for creating web pages" },
        { term: "CSS", def: "Cascading Style Sheets — used to style and design HTML elements" },
        { term: "DOM", def: "Document Object Model — tree representation of HTML elements" },
        { term: "HTTP", def: "HyperText Transfer Protocol — stateless protocol for web data transfer" },
        { term: "DNS", def: "Domain Name System — translates domain names to IP addresses" },
        { term: "VPS", def: "Virtual Private Server — dedicated virtual resources on shared hardware" },
        { term: "Box Model", def: "CSS concept: Content → Padding → Border → Margin" },
        { term: "Selector", def: "CSS pattern used to select and style HTML elements" },
        { term: "Paired Tag", def: "HTML tag with both opening and closing tags, e.g. <p>...</p>" },
        { term: "Unpaired Tag", def: "Self-closing HTML tag, e.g. <br>, <img>, <hr>" },
        { term: "Inline Element", def: "Element that does not start on a new line, e.g. <span>, <a>" },
        { term: "Block Element", def: "Element that starts on a new line and takes full width, e.g. <div>, <p>" }
    ],
    units: [
        {
            id: 1, title: "Introduction to Web", overview: "HTML basics, page structure, heading tags, block elements, and formatting tags.",
            subtopics: ["HTML Basics", "Structure", "Headings", "Formatting", "Block Elements", "Tags", "Internet"],
            estimatedTime: "2 hours",
            revisionTips: ["Remember Tim Berners-Lee created HTML in 1993", "Know the difference between <b> (physical) and <strong> (logical)", "<div> is block, <span> is inline"],
            formulas: [],
            notes: [
                { id: "w1-1", title: "1.1 What is HTML?", content: "<p>The first version of HTML was written by <strong>Tim Berners-Lee in 1993</strong>. HTML stands for <strong>Hyper Text Markup Language</strong>. It is the standard markup language for creating web pages. HTML describes the structure of a web page using a series of elements.</p>" },
                { id: "w1-2", title: "1.2 Basic Web Terms", content: "<ul><li><strong>Web Page:</strong> A document displayed in a web browser, written in HTML.</li><li><strong>Website:</strong> A collection of web pages grouped together with links connecting them.</li><li><strong>Web Server:</strong> A computer that hosts a website on the Internet.</li><li><strong>Search Engine:</strong> A web service that helps you find other web pages (Google, Bing, Yahoo).</li></ul>" },
                { id: "w1-3", title: "1.3 Structure of an HTML Page", content: "<table class='note-table'><tr><th>Tag</th><th>Purpose</th><th>Type</th></tr><tr><td>&lt;!DOCTYPE html&gt;</td><td>Specifies HTML5 version</td><td>Unpaired</td></tr><tr><td>&lt;html&gt;</td><td>Root element, wraps all content</td><td>Paired</td></tr><tr><td>&lt;head&gt;</td><td>Contains title, CSS/JS links</td><td>Paired</td></tr><tr><td>&lt;title&gt;</td><td>Title shown in browser tab</td><td>Paired</td></tr><tr><td>&lt;body&gt;</td><td>All visible content goes here</td><td>Paired</td></tr></table>" },
                { id: "w1-4", title: "1.4 Heading Tags", content: "<p>HTML provides 6 levels of headings: &lt;h1&gt; to &lt;h6&gt;. <strong>&lt;h1&gt; is the largest/most important</strong>, &lt;h6&gt; is the smallest. All are paired tags.</p>" },
                { id: "w1-5", title: "1.5 Block-Level Tags", content: "<ul><li><strong>&lt;p&gt;:</strong> Paragraph tag — creates paragraphs with spacing.</li><li><strong>&lt;pre&gt;:</strong> Preformatted text — preserves spaces and line breaks.</li><li><strong>&lt;br&gt;:</strong> Line break — unpaired tag.</li><li><strong>&lt;hr&gt;:</strong> Horizontal rule — draws a line.</li><li><strong>&lt;div&gt;:</strong> Block-level container element.</li><li><strong>&lt;span&gt;:</strong> Inline container element.</li></ul>" },
                { id: "w1-6", title: "1.6 Formatting Tags", content: "<ul><li><strong>&lt;b&gt;:</strong> Physical bold (just visual)</li><li><strong>&lt;strong&gt;:</strong> Logical bold — implies high importance (SEO)</li><li><strong>&lt;i&gt;:</strong> Physical italic</li><li><strong>&lt;em&gt;:</strong> Logical italic — emphasis</li><li><strong>&lt;mark&gt;:</strong> Highlights text with yellow background</li><li><strong>&lt;img&gt;:</strong> Image tag — unpaired</li></ul>" }
            ]
        },
        {
            id: 2, title: "Lists & Linking", overview: "Ordered and unordered lists, description lists, anchor tags, navigation, marquee, and special characters.",
            subtopics: ["Lists", "Anchor", "Link States", "Marquee", "Special", "Navigation"],
            estimatedTime: "2 hours",
            revisionTips: ["4 bullet types for <ul>: disc, circle, square, none", "href = Hypertext Reference", "Default link: blue unvisited, purple visited, red active"],
            formulas: [],
            notes: [
                { id: "w2-1", title: "2.1 Types of Lists", content: "<table class='note-table'><tr><th>Type</th><th>Tag</th><th>Description</th></tr><tr><td>Ordered List</td><td>&lt;ol&gt;</td><td>Numbered list (1, I, i, A, a)</td></tr><tr><td>Unordered List</td><td>&lt;ul&gt;</td><td>Bulleted list (disc, circle, square, none)</td></tr><tr><td>Description List</td><td>&lt;dl&gt;</td><td>Term-definition format</td></tr><tr><td>List Item</td><td>&lt;li&gt;</td><td>Used inside &lt;ol&gt; and &lt;ul&gt;</td></tr></table>" },
                { id: "w2-2", title: "2.2 Anchor Tag", content: "<ul><li>The anchor tag <strong>&lt;a href='...'&gt;</strong> creates hyperlinks.</li><li><strong>href</strong> = Hypertext Reference.</li><li><strong>target='_blank'</strong> opens in new tab.</li><li><strong>target='_self'</strong> opens in same tab (default).</li></ul>" },
                { id: "w2-3", title: "2.3 Link States", content: "<ul><li><strong>Unvisited:</strong> Underlined and Blue</li><li><strong>Visited:</strong> Underlined and Purple</li><li><strong>Active:</strong> Underlined and Red</li></ul>" },
                { id: "w2-4", title: "2.4 Marquee", content: "<ul><li>Default speed = <strong>6px per second</strong></li><li><strong>scrollamount</strong> changes speed</li><li><strong>scrolldelay</strong> adds delay</li><li>Stop on hover: <code>onmouseover='stop()'</code></li></ul>" },
                { id: "w2-5", title: "2.5 Special Characters", content: "<ul><li><strong>&amp;nbsp;</strong> = Non-breaking space</li><li><strong>&amp;ensp;</strong> = En space</li><li><strong>&amp;emsp;</strong> = Em space (wider)</li><li><strong>&lt;nav&gt;</strong> groups navigation links</li></ul>" }
            ]
        },
        {
            id: 3, title: "Multimedia Elements", overview: "Image formats, color codes, CSS backgrounds, borders, and padding.",
            subtopics: ["Image Formats", "Colors", "Background", "CSS Borders", "Padding"],
            estimatedTime: "2.5 hours",
            revisionTips: ["PNG replaced GIF, supports transparency", "border-radius: 50% makes a circle", "Padding cannot be negative, margin can"],
            formulas: [],
            notes: [
                { id: "w3-1", title: "3.1 Image Formats", content: "<table class='note-table'><tr><th>Format</th><th>Full Name</th><th>Key Feature</th></tr><tr><td>JPEG</td><td>Joint Photographic Experts Group</td><td>Lossy, good for photos</td></tr><tr><td>GIF</td><td>Graphics Interchange Format</td><td>Animation, 256 colors</td></tr><tr><td>PNG</td><td>Portable Network Graphics</td><td>Lossless, transparency, replaced GIF</td></tr><tr><td>BMP</td><td>Bitmap</td><td>Lossless, large file size</td></tr></table>" },
                { id: "w3-2", title: "3.2 Color Codes", content: "<table class='note-table'><tr><th>Color</th><th>Hex</th><th>RGB</th></tr><tr><td>Black</td><td>#000000</td><td>rgb(0,0,0)</td></tr><tr><td>Red</td><td>#FF0000</td><td>rgb(255,0,0)</td></tr><tr><td>Yellow</td><td>#FFFF00</td><td>rgb(255,255,0)</td></tr><tr><td>White</td><td>#FFFFFF</td><td>rgb(255,255,255)</td></tr><tr><td>Maroon</td><td>#800000</td><td>rgb(128,0,0)</td></tr></table>" },
                { id: "w3-3", title: "3.3 CSS Background", content: "<ul><li><strong>background-color:</strong> Sets background color</li><li><strong>background-image:</strong> Sets image as background</li><li><strong>background-repeat:</strong> repeat-x (horizontal), repeat-y (vertical), no-repeat</li><li><strong>background-attachment: fixed</strong> — stays fixed while scrolling</li><li><strong>background-position:</strong> Sets position of background image</li></ul>" },
                { id: "w3-4", title: "3.4 CSS Borders", content: "<p>Values: <strong>dotted, dashed, solid, double, groove, ridge, inset, outset, none, hidden</strong></p><p><strong>groove</strong> = 3D grooved | <strong>ridge</strong> = 3D ridged | <strong>border-radius: 50%</strong> makes a circle.</p>" },
                { id: "w3-5", title: "3.5 CSS Padding", content: "<p>Padding creates space around content, <strong>inside</strong> any defined borders. Properties: padding-top, padding-right, padding-bottom, padding-left. Negative values are NOT allowed.</p>" }
            ]
        },
        {
            id: 4, title: "Tables & Forms", overview: "HTML tables, table attributes, forms, input types, and iframes.",
            subtopics: ["Tables", "Forms", "Frames"],
            estimatedTime: "2.5 hours",
            revisionTips: ["<th> is bold+centered by default", "colspan = horizontal merge, rowspan = vertical merge", "GET shows data in URL, POST sends in body"],
            formulas: [],
            notes: [
                { id: "w4-1", title: "4.1 Table Tags", content: "<table class='note-table'><tr><th>Tag</th><th>Purpose</th></tr><tr><td>&lt;table&gt;</td><td>Defines the table</td></tr><tr><td>&lt;tr&gt;</td><td>Table row</td></tr><tr><td>&lt;th&gt;</td><td>Header cell (bold, centered)</td></tr><tr><td>&lt;td&gt;</td><td>Data cell</td></tr><tr><td>&lt;caption&gt;</td><td>Table caption</td></tr><tr><td>&lt;thead&gt;/&lt;tbody&gt;/&lt;tfoot&gt;</td><td>Group rows</td></tr></table>" },
                { id: "w4-2", title: "4.2 Table Attributes", content: "<ul><li><strong>border:</strong> Border width</li><li><strong>cellspacing:</strong> Space between cells</li><li><strong>cellpadding:</strong> Space between wall and content</li><li><strong>rowspan:</strong> Merges cells vertically</li><li><strong>colspan:</strong> Merges cells horizontally</li><li><strong>bgcolor:</strong> Background color</li><li><strong>valign:</strong> Vertical alignment</li></ul>" },
                { id: "w4-3", title: "4.3 HTML Forms", content: "<ul><li><strong>GET:</strong> Appends data to URL (visible)</li><li><strong>POST:</strong> Sends data in request body (hidden)</li><li><strong>action:</strong> Where to send form data</li><li><strong>input types:</strong> text, password, reset, submit</li><li><strong>&lt;select&gt;</strong> uses &lt;option&gt; tags</li><li><strong>&lt;textarea&gt;:</strong> Multi-line input</li></ul>" },
                { id: "w4-4", title: "4.4 iFrame", content: "<p><strong>&lt;iframe&gt;</strong> embeds another HTML document inside the current page. The src attribute specifies the URL.</p>" }
            ]
        },
        {
            id: 5, title: "HTML Style (CSS)", overview: "CSS basics, box model, display properties, positioning, z-index, and animations.",
            subtopics: ["CSS Basics", "Box Model", "Display", "Position", "Margin", "Animation", "Background"],
            estimatedTime: "3 hours",
            revisionTips: ["Box Model outside→in: Margin → Border → Padding → Content", "display:none removes space, visibility:hidden keeps space", "position:fixed stays while scrolling"],
            formulas: [],
            notes: [
                { id: "w5-1", title: "5.1 CSS Basics", content: "<ul><li>CSS = <strong>Cascading Style Sheet</strong></li><li>Syntax: <strong>selector { property: value; }</strong> = Declaration Block</li><li>Three ways: <strong>External, Internal, Inline</strong></li></ul>" },
                { id: "w5-2", title: "5.2 Box Model", content: "<p>Content → Padding → Border → Margin</p><ul><li><strong>Content:</strong> Actual text/images</li><li><strong>Padding:</strong> Space between content and border (transparent)</li><li><strong>Border:</strong> Outline around padding</li><li><strong>Margin:</strong> Space outside the border</li></ul>" },
                { id: "w5-3", title: "5.3 Display & Position", content: "<ul><li><strong>display: block</strong> — default for &lt;div&gt;</li><li><strong>display: none</strong> — removes from layout</li><li><strong>visibility: hidden</strong> — hides but keeps space</li><li><strong>position: fixed</strong> — stays while page scrolls</li><li><strong>position: absolute</strong> — relative to positioned parent</li><li><strong>position: relative</strong> — relative to itself</li><li><strong>z-index</strong> — controls stacking order</li><li><strong>margin: auto</strong> — centers block element</li></ul>" },
                { id: "w5-4", title: "5.4 CSS Animations", content: "<ul><li>Defined using <strong>@keyframes</strong></li><li><strong>animation-name:</strong> Name of keyframes</li><li><strong>animation-duration:</strong> How long</li><li><strong>animation-delay:</strong> Delay before start</li><li><strong>animation-iteration-count:</strong> How many times</li></ul>" },
                { id: "w5-5", title: "5.5 Margin vs Padding", content: "<ul><li><strong>Margin:</strong> Outside border — can be negative — auto allowed</li><li><strong>Padding:</strong> Inside border — cannot be negative</li></ul>" }
            ]
        },
        {
            id: 6, title: "Design Tools", overview: "Photoshop tools, Adobe XD vs Procreate, HTTP protocol, status codes, web hosting, and DNS.",
            subtopics: ["Photoshop", "Adobe XD", "HTTP", "Error Codes", "Hosting", "DNS"],
            estimatedTime: "2 hours",
            revisionTips: ["HTTP is stateless", "404 = Not Found, 500 = Server Error", "13 IP addresses serve DNS root zone", "Lasso = freehand, Magic Wand = color-based"],
            formulas: [],
            notes: [
                { id: "w6-1", title: "6.1 Photoshop Tools", content: "<ul><li><strong>Lasso:</strong> Complex freehand selections</li><li><strong>Magic Wand:</strong> Color similarity selection</li><li><strong>Quick Select:</strong> Quick region selection</li><li><strong>Clone Stamp:</strong> Copies pixels</li><li><strong>Healing Brush:</strong> Fixes blemishes</li></ul>" },
                { id: "w6-2", title: "6.2 Adobe XD vs Procreate", content: "<table class='note-table'><tr><th>Feature</th><th>Adobe XD</th><th>Procreate</th></tr><tr><td>Purpose</td><td>UI/UX wireframing</td><td>Digital painting</td></tr><tr><td>Platform</td><td>Desktop + mobile</td><td>iPad/iPhone only</td></tr><tr><td>Target</td><td>UI/UX Designers</td><td>Artists, illustrators</td></tr></table>" },
                { id: "w6-3", title: "6.3 HTTP Protocol", content: "<ul><li>HTTP = <strong>HyperText Transfer Protocol</strong> — <strong>stateless</strong></li><li><strong>GET:</strong> Retrieve data</li><li><strong>POST:</strong> Submit/create data</li><li><strong>PUT:</strong> Replace resource</li><li><strong>DELETE:</strong> Delete resource</li><li><strong>PATCH:</strong> Partially update</li></ul>" },
                { id: "w6-4", title: "6.4 Status Codes", content: "<table class='note-table'><tr><th>Code</th><th>Meaning</th></tr><tr><td>400</td><td>Bad Request</td></tr><tr><td>401</td><td>Unauthorized</td></tr><tr><td>403</td><td>Forbidden</td></tr><tr><td>404</td><td>Not Found</td></tr><tr><td>500</td><td>Internal Server Error</td></tr><tr><td>503</td><td>Service Unavailable</td></tr></table>" },
                { id: "w6-5", title: "6.5 Web Hosting", content: "<ul><li><strong>Shared:</strong> Multiple sites share same server</li><li><strong>VPS:</strong> Dedicated virtual resources</li><li><strong>Dedicated:</strong> Entire server for one user</li></ul>" },
                { id: "w6-6", title: "6.6 DNS", content: "<ul><li>Translates domain names to IP addresses</li><li><strong>13 IP addresses</strong> serve the DNS root zone</li><li>Hundreds of redundant root servers worldwide</li></ul>" }
            ]
        }
    ],
    topicExplainers: {
        html: "<strong>HTML (HyperText Markup Language)</strong> was invented by Tim Berners-Lee in 1993. It uses paired tags like &lt;html&gt; and unpaired tags like &lt;br&gt;. Key structure: &lt;!DOCTYPE html&gt; → &lt;html&gt; → &lt;head&gt; + &lt;body&gt;. Headings go &lt;h1&gt; (largest) to &lt;h6&gt; (smallest). Formatting: &lt;b&gt; (physical bold) vs &lt;strong&gt; (logical bold).",
        lists: "<strong>Lists & Links:</strong> Three list types — &lt;ol&gt; (ordered), &lt;ul&gt; (unordered, 4 styles), &lt;dl&gt; (description). Anchor: &lt;a href='url'&gt;. Targets: _blank (new tab), _self (default). Link states: blue, purple, red. Marquee speed = 6px/sec.",
        multimedia: "<strong>Multimedia & CSS:</strong> JPEG (lossy), GIF (256 colors, animation), PNG (lossless, transparency), BMP (large). border-radius: 50% = circle. Padding inside border (no negative). Background-attachment: fixed stays.",
        tables: "<strong>Tables & Forms:</strong> &lt;table&gt;, &lt;tr&gt;, &lt;th&gt; (bold+centered), &lt;td&gt;. colspan (horizontal merge), rowspan (vertical). GET = URL, POST = body. &lt;select&gt; uses &lt;option&gt;. &lt;iframe&gt; embeds pages.",
        css: "<strong>CSS:</strong> 3 methods (External, Internal, Inline). Box Model: Content → Padding → Border → Margin. display:none removes space, visibility:hidden keeps it. position:fixed stays while scrolling. @keyframes for animations.",
        hosting: "<strong>Hosting & HTTP:</strong> HTTP is stateless. Methods: GET/POST/PUT/PATCH/DELETE. 404=Not Found, 500=Server Error. DNS translates domains to IPs (13 root IPs). Hosting: Shared/VPS/Dedicated."
    },
    questions: [] // loaded separately below
});
