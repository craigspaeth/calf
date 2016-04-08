import { type } from 'style'
export default `
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
  font-size: ${type('mediumSansSerif').fontSize};
  line-height: ${type('mediumSansSerif').lineHeight};
  font-family: ${type('mediumSansSerif').fontFamily};
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  color: black;
}
* {
  box-sizing: border-box;
}
body {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 14px;
}
svg {
  width: 100%;
  height: 100%;
}
.react-tagsinput {
  background-color: #fff;
  border: 1px solid #ccc;
  overflow: hidden;
  padding-left: 5px;
  padding-top: 5px;
}
.react-tagsinput-tag {
  background-color: #cde69c;
  border-radius: 2px;
  border: 1px solid #a5d24a;
  color: #638421;
  display: inline-block;
  font-family: sans-serif;
  font-size: 13px;
  font-weight: 400;
  margin-bottom: 5px;
  margin-right: 5px;
  padding: 5px;
}
.react-tagsinput-remove {
  cursor: pointer;
  font-weight: bold;
}
.react-tagsinput-tag a::before {
  content: " ×";
}
.react-tagsinput-input {
  background: transparent;
  border: 0;
  color: #777;
  font-family: sans-serif;
  font-size: 13px;
  font-weight: 400;
  margin-bottom: 6px;
  margin-top: 1px;
  outline: none;
  padding: 5px;
  width: 80px;
}
`
