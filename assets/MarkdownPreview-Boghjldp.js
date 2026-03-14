const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/html2pdf-X0ZnaSxw.js","assets/index-B0N688QD.js","assets/index-BOpeabk-.css"])))=>i.map(i=>d[i]);
import{d as Ce,I as Le,o as ce,a as Ie,b as v,e as w,w as A,k as Ee,f as Be,J as Me,h as G,z as pe,i as B,u as X,D as qe,j as W,y as he,E as M,q as De,_ as He}from"./index-B0N688QD.js";import Ze from"./purify.es-CovBOfck.js";function ee(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var E=ee();function be(n){E=n}var L={exec:()=>null};function u(n,e=""){let r=typeof n=="string"?n:n.source,s={replace:(t,a)=>{let l=typeof a=="string"?a:a.source;return l=l.replace(y.caret,"$1"),r=r.replace(t,l),s},getRegex:()=>new RegExp(r,e)};return s}var Fe=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),y={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:n=>new RegExp(`^( {0,3}${n})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}#`),htmlBeginRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}<(?:[a-z].*>|!--)`,"i"),blockquoteBeginRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}>`)},Ne=/^(?:[ \t]*(?:\n|$))+/,Oe=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,je=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Z=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Qe=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,te=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,xe=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,we=u(xe).replace(/bull/g,te).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Ue=u(xe).replace(/bull/g,te).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),re=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Ve=/^[^\n]+/,ne=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Ge=u(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ne).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Xe=u(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,te).getRegex(),Q="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",se=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,We=u("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",se).replace("tag",Q).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ye=u(re).replace("hr",Z).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Q).getRegex(),Je=u(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ye).getRegex(),le={blockquote:Je,code:Oe,def:Ge,fences:je,heading:Qe,hr:Z,html:We,lheading:we,list:Xe,newline:Ne,paragraph:ye,table:L,text:Ve},ue=u("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Z).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Q).getRegex(),Ye={...le,lheading:Ue,table:ue,paragraph:u(re).replace("hr",Z).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ue).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Q).getRegex()},Ke={...le,html:u(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",se).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:L,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:u(re).replace("hr",Z).replace("heading",` *#{1,6} *[^
]`).replace("lheading",we).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},et=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,tt=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ve=/^( {2,}|\\)\n(?!\s*$)/,rt=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,U=/[\p{P}\p{S}]/u,ae=/[\s\p{P}\p{S}]/u,Se=/[^\s\p{P}\p{S}]/u,nt=u(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ae).getRegex(),Re=/(?!~)[\p{P}\p{S}]/u,st=/(?!~)[\s\p{P}\p{S}]/u,lt=/(?:[^\s\p{P}\p{S}]|~)/u,$e=/(?![*_])[\p{P}\p{S}]/u,at=/(?![*_])[\s\p{P}\p{S}]/u,it=/(?:[^\s\p{P}\p{S}]|[*_])/u,ot=u(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Fe?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),_e=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,ct=u(_e,"u").replace(/punct/g,U).getRegex(),pt=u(_e,"u").replace(/punct/g,Re).getRegex(),Te="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",ht=u(Te,"gu").replace(/notPunctSpace/g,Se).replace(/punctSpace/g,ae).replace(/punct/g,U).getRegex(),ut=u(Te,"gu").replace(/notPunctSpace/g,lt).replace(/punctSpace/g,st).replace(/punct/g,Re).getRegex(),dt=u("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Se).replace(/punctSpace/g,ae).replace(/punct/g,U).getRegex(),gt=u(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,$e).getRegex(),kt="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",ft=u(kt,"gu").replace(/notPunctSpace/g,it).replace(/punctSpace/g,at).replace(/punct/g,$e).getRegex(),mt=u(/\\(punct)/,"gu").replace(/punct/g,U).getRegex(),bt=u(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),xt=u(se).replace("(?:-->|$)","-->").getRegex(),wt=u("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",xt).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),N=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,yt=u(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label",N).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ze=u(/^!?\[(label)\]\[(ref)\]/).replace("label",N).replace("ref",ne).getRegex(),Ae=u(/^!?\[(ref)\](?:\[\])?/).replace("ref",ne).getRegex(),vt=u("reflink|nolink(?!\\()","g").replace("reflink",ze).replace("nolink",Ae).getRegex(),de=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ie={_backpedal:L,anyPunctuation:mt,autolink:bt,blockSkip:ot,br:ve,code:tt,del:L,delLDelim:L,delRDelim:L,emStrongLDelim:ct,emStrongRDelimAst:ht,emStrongRDelimUnd:dt,escape:et,link:yt,nolink:Ae,punctuation:nt,reflink:ze,reflinkSearch:vt,tag:wt,text:rt,url:L},St={...ie,link:u(/^!?\[(label)\]\((.*?)\)/).replace("label",N).getRegex(),reflink:u(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",N).getRegex()},J={...ie,emStrongRDelimAst:ut,emStrongLDelim:pt,delLDelim:gt,delRDelim:ft,url:u(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",de).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:u(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",de).getRegex()},Rt={...J,br:u(ve).replace("{2,}","*").getRegex(),text:u(J.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},F={normal:le,gfm:Ye,pedantic:Ke},q={normal:ie,gfm:J,breaks:Rt,pedantic:St},$t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ge=n=>$t[n];function _(n,e){if(e){if(y.escapeTest.test(n))return n.replace(y.escapeReplace,ge)}else if(y.escapeTestNoEncode.test(n))return n.replace(y.escapeReplaceNoEncode,ge);return n}function ke(n){try{n=encodeURI(n).replace(y.percentDecode,"%")}catch{return null}return n}function fe(n,e){let r=n.replace(y.findPipe,(a,l,o)=>{let i=!1,p=l;for(;--p>=0&&o[p]==="\\";)i=!i;return i?"|":" |"}),s=r.split(y.splitPipe),t=0;if(s[0].trim()||s.shift(),s.length>0&&!s.at(-1)?.trim()&&s.pop(),e)if(s.length>e)s.splice(e);else for(;s.length<e;)s.push("");for(;t<s.length;t++)s[t]=s[t].trim().replace(y.slashPipe,"|");return s}function D(n,e,r){let s=n.length;if(s===0)return"";let t=0;for(;t<s&&n.charAt(s-t-1)===e;)t++;return n.slice(0,s-t)}function _t(n,e){if(n.indexOf(e[1])===-1)return-1;let r=0;for(let s=0;s<n.length;s++)if(n[s]==="\\")s++;else if(n[s]===e[0])r++;else if(n[s]===e[1]&&(r--,r<0))return s;return r>0?-2:-1}function Tt(n,e=0){let r=e,s="";for(let t of n)if(t==="	"){let a=4-r%4;s+=" ".repeat(a),r+=a}else s+=t,r++;return s}function me(n,e,r,s,t){let a=e.href,l=e.title||null,o=n[1].replace(t.other.outputLinkReplace,"$1");s.state.inLink=!0;let i={type:n[0].charAt(0)==="!"?"image":"link",raw:r,href:a,title:l,text:o,tokens:s.inlineTokens(o)};return s.state.inLink=!1,i}function zt(n,e,r){let s=n.match(r.other.indentCodeCompensation);if(s===null)return e;let t=s[1];return e.split(`
`).map(a=>{let l=a.match(r.other.beginningSpace);if(l===null)return a;let[o]=l;return o.length>=t.length?a.slice(t.length):a}).join(`
`)}var O=class{options;rules;lexer;constructor(n){this.options=n||E}space(n){let e=this.rules.block.newline.exec(n);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(n){let e=this.rules.block.code.exec(n);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:D(r,`
`)}}}fences(n){let e=this.rules.block.fences.exec(n);if(e){let r=e[0],s=zt(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:s}}}heading(n){let e=this.rules.block.heading.exec(n);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let s=D(r,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(r=s.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(n){let e=this.rules.block.hr.exec(n);if(e)return{type:"hr",raw:D(e[0],`
`)}}blockquote(n){let e=this.rules.block.blockquote.exec(n);if(e){let r=D(e[0],`
`).split(`
`),s="",t="",a=[];for(;r.length>0;){let l=!1,o=[],i;for(i=0;i<r.length;i++)if(this.rules.other.blockquoteStart.test(r[i]))o.push(r[i]),l=!0;else if(!l)o.push(r[i]);else break;r=r.slice(i);let p=o.join(`
`),c=p.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${p}`:p,t=t?`${t}
${c}`:c;let d=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(c,a,!0),this.lexer.state.top=d,r.length===0)break;let h=a.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let b=h,f=b.raw+`
`+r.join(`
`),S=this.blockquote(f);a[a.length-1]=S,s=s.substring(0,s.length-b.raw.length)+S.raw,t=t.substring(0,t.length-b.text.length)+S.text;break}else if(h?.type==="list"){let b=h,f=b.raw+`
`+r.join(`
`),S=this.list(f);a[a.length-1]=S,s=s.substring(0,s.length-h.raw.length)+S.raw,t=t.substring(0,t.length-b.raw.length)+S.raw,r=f.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:a,text:t}}}list(n){let e=this.rules.block.list.exec(n);if(e){let r=e[1].trim(),s=r.length>1,t={type:"list",raw:"",ordered:s,start:s?+r.slice(0,-1):"",loose:!1,items:[]};r=s?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=s?r:"[*+-]");let a=this.rules.other.listItemRegex(r),l=!1;for(;n;){let i=!1,p="",c="";if(!(e=a.exec(n))||this.rules.block.hr.test(n))break;p=e[0],n=n.substring(p.length);let d=Tt(e[2].split(`
`,1)[0],e[1].length),h=n.split(`
`,1)[0],b=!d.trim(),f=0;if(this.options.pedantic?(f=2,c=d.trimStart()):b?f=e[1].length+1:(f=d.search(this.rules.other.nonSpaceChar),f=f>4?1:f,c=d.slice(f),f+=e[1].length),b&&this.rules.other.blankLine.test(h)&&(p+=h+`
`,n=n.substring(h.length+1),i=!0),!i){let S=this.rules.other.nextBulletRegex(f),m=this.rules.other.hrRegex(f),g=this.rules.other.fencesBeginRegex(f),x=this.rules.other.headingBeginRegex(f),T=this.rules.other.htmlBeginRegex(f),P=this.rules.other.blockquoteBeginRegex(f);for(;n;){let z=n.split(`
`,1)[0],C;if(h=z,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),C=h):C=h.replace(this.rules.other.tabCharGlobal,"    "),g.test(h)||x.test(h)||T.test(h)||P.test(h)||S.test(h)||m.test(h))break;if(C.search(this.rules.other.nonSpaceChar)>=f||!h.trim())c+=`
`+C.slice(f);else{if(b||d.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||g.test(d)||x.test(d)||m.test(d))break;c+=`
`+h}b=!h.trim(),p+=z+`
`,n=n.substring(z.length+1),d=C.slice(f)}}t.loose||(l?t.loose=!0:this.rules.other.doubleBlankLine.test(p)&&(l=!0)),t.items.push({type:"list_item",raw:p,task:!!this.options.gfm&&this.rules.other.listIsTask.test(c),loose:!1,text:c,tokens:[]}),t.raw+=p}let o=t.items.at(-1);if(o)o.raw=o.raw.trimEnd(),o.text=o.text.trimEnd();else return;t.raw=t.raw.trimEnd();for(let i of t.items){if(this.lexer.state.top=!1,i.tokens=this.lexer.blockTokens(i.text,[]),i.task){if(i.text=i.text.replace(this.rules.other.listReplaceTask,""),i.tokens[0]?.type==="text"||i.tokens[0]?.type==="paragraph"){i.tokens[0].raw=i.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),i.tokens[0].text=i.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let c=this.lexer.inlineQueue.length-1;c>=0;c--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[c].src)){this.lexer.inlineQueue[c].src=this.lexer.inlineQueue[c].src.replace(this.rules.other.listReplaceTask,"");break}}let p=this.rules.other.listTaskCheckbox.exec(i.raw);if(p){let c={type:"checkbox",raw:p[0]+" ",checked:p[0]!=="[ ]"};i.checked=c.checked,t.loose?i.tokens[0]&&["paragraph","text"].includes(i.tokens[0].type)&&"tokens"in i.tokens[0]&&i.tokens[0].tokens?(i.tokens[0].raw=c.raw+i.tokens[0].raw,i.tokens[0].text=c.raw+i.tokens[0].text,i.tokens[0].tokens.unshift(c)):i.tokens.unshift({type:"paragraph",raw:c.raw,text:c.raw,tokens:[c]}):i.tokens.unshift(c)}}if(!t.loose){let p=i.tokens.filter(d=>d.type==="space"),c=p.length>0&&p.some(d=>this.rules.other.anyLine.test(d.raw));t.loose=c}}if(t.loose)for(let i of t.items){i.loose=!0;for(let p of i.tokens)p.type==="text"&&(p.type="paragraph")}return t}}html(n){let e=this.rules.block.html.exec(n);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(n){let e=this.rules.block.def.exec(n);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",t=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:s,title:t}}}table(n){let e=this.rules.block.table.exec(n);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=fe(e[1]),s=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),t=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===s.length){for(let l of s)this.rules.other.tableAlignRight.test(l)?a.align.push("right"):this.rules.other.tableAlignCenter.test(l)?a.align.push("center"):this.rules.other.tableAlignLeft.test(l)?a.align.push("left"):a.align.push(null);for(let l=0;l<r.length;l++)a.header.push({text:r[l],tokens:this.lexer.inline(r[l]),header:!0,align:a.align[l]});for(let l of t)a.rows.push(fe(l,a.header.length).map((o,i)=>({text:o,tokens:this.lexer.inline(o),header:!1,align:a.align[i]})));return a}}lheading(n){let e=this.rules.block.lheading.exec(n);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(n){let e=this.rules.block.paragraph.exec(n);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(n){let e=this.rules.block.text.exec(n);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(n){let e=this.rules.inline.escape.exec(n);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(n){let e=this.rules.inline.tag.exec(n);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(n){let e=this.rules.inline.link.exec(n);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let a=D(r.slice(0,-1),"\\");if((r.length-a.length)%2===0)return}else{let a=_t(e[2],"()");if(a===-2)return;if(a>-1){let l=(e[0].indexOf("!")===0?5:4)+e[1].length+a;e[2]=e[2].substring(0,a),e[0]=e[0].substring(0,l).trim(),e[3]=""}}let s=e[2],t="";if(this.options.pedantic){let a=this.rules.other.pedanticHrefTitle.exec(s);a&&(s=a[1],t=a[3])}else t=e[3]?e[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?s=s.slice(1):s=s.slice(1,-1)),me(e,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:t&&t.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(n,e){let r;if((r=this.rules.inline.reflink.exec(n))||(r=this.rules.inline.nolink.exec(n))){let s=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),t=e[s.toLowerCase()];if(!t){let a=r[0].charAt(0);return{type:"text",raw:a,text:a}}return me(r,t,r[0],this.lexer,this.rules)}}emStrong(n,e,r=""){let s=this.rules.inline.emStrongLDelim.exec(n);if(!(!s||s[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(s[1]||s[2])||!r||this.rules.inline.punctuation.exec(r))){let t=[...s[0]].length-1,a,l,o=t,i=0,p=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(p.lastIndex=0,e=e.slice(-1*n.length+t);(s=p.exec(e))!=null;){if(a=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!a)continue;if(l=[...a].length,s[3]||s[4]){o+=l;continue}else if((s[5]||s[6])&&t%3&&!((t+l)%3)){i+=l;continue}if(o-=l,o>0)continue;l=Math.min(l,l+o+i);let c=[...s[0]][0].length,d=n.slice(0,t+s.index+c+l);if(Math.min(t,l)%2){let b=d.slice(1,-1);return{type:"em",raw:d,text:b,tokens:this.lexer.inlineTokens(b)}}let h=d.slice(2,-2);return{type:"strong",raw:d,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(n){let e=this.rules.inline.code.exec(n);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),s=this.rules.other.nonSpaceChar.test(r),t=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return s&&t&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(n){let e=this.rules.inline.br.exec(n);if(e)return{type:"br",raw:e[0]}}del(n,e,r=""){let s=this.rules.inline.delLDelim.exec(n);if(s&&(!s[1]||!r||this.rules.inline.punctuation.exec(r))){let t=[...s[0]].length-1,a,l,o=t,i=this.rules.inline.delRDelim;for(i.lastIndex=0,e=e.slice(-1*n.length+t);(s=i.exec(e))!=null;){if(a=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!a||(l=[...a].length,l!==t))continue;if(s[3]||s[4]){o+=l;continue}if(o-=l,o>0)continue;l=Math.min(l,l+o);let p=[...s[0]][0].length,c=n.slice(0,t+s.index+p+l),d=c.slice(t,-t);return{type:"del",raw:c,text:d,tokens:this.lexer.inlineTokens(d)}}}}autolink(n){let e=this.rules.inline.autolink.exec(n);if(e){let r,s;return e[2]==="@"?(r=e[1],s="mailto:"+r):(r=e[1],s=r),{type:"link",raw:e[0],text:r,href:s,tokens:[{type:"text",raw:r,text:r}]}}}url(n){let e;if(e=this.rules.inline.url.exec(n)){let r,s;if(e[2]==="@")r=e[0],s="mailto:"+r;else{let t;do t=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(t!==e[0]);r=e[0],e[1]==="www."?s="http://"+e[0]:s=e[0]}return{type:"link",raw:e[0],text:r,href:s,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(n){let e=this.rules.inline.text.exec(n);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},R=class Y{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||E,this.options.tokenizer=this.options.tokenizer||new O,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:y,block:F.normal,inline:q.normal};this.options.pedantic?(r.block=F.pedantic,r.inline=q.pedantic):this.options.gfm&&(r.block=F.gfm,this.options.breaks?r.inline=q.breaks:r.inline=q.gfm),this.tokenizer.rules=r}static get rules(){return{block:F,inline:q}}static lex(e,r){return new Y(r).lex(e)}static lexInline(e,r){return new Y(r).inlineTokens(e)}lex(e){e=e.replace(y.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let s=this.inlineQueue[r];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],s=!1){for(this.options.pedantic&&(e=e.replace(y.tabCharGlobal,"    ").replace(y.spaceLine,""));e;){let t;if(this.options.extensions?.block?.some(l=>(t=l.call({lexer:this},e,r))?(e=e.substring(t.raw.length),r.push(t),!0):!1))continue;if(t=this.tokenizer.space(e)){e=e.substring(t.raw.length);let l=r.at(-1);t.raw.length===1&&l!==void 0?l.raw+=`
`:r.push(t);continue}if(t=this.tokenizer.code(e)){e=e.substring(t.raw.length);let l=r.at(-1);l?.type==="paragraph"||l?.type==="text"?(l.raw+=(l.raw.endsWith(`
`)?"":`
`)+t.raw,l.text+=`
`+t.text,this.inlineQueue.at(-1).src=l.text):r.push(t);continue}if(t=this.tokenizer.fences(e)){e=e.substring(t.raw.length),r.push(t);continue}if(t=this.tokenizer.heading(e)){e=e.substring(t.raw.length),r.push(t);continue}if(t=this.tokenizer.hr(e)){e=e.substring(t.raw.length),r.push(t);continue}if(t=this.tokenizer.blockquote(e)){e=e.substring(t.raw.length),r.push(t);continue}if(t=this.tokenizer.list(e)){e=e.substring(t.raw.length),r.push(t);continue}if(t=this.tokenizer.html(e)){e=e.substring(t.raw.length),r.push(t);continue}if(t=this.tokenizer.def(e)){e=e.substring(t.raw.length);let l=r.at(-1);l?.type==="paragraph"||l?.type==="text"?(l.raw+=(l.raw.endsWith(`
`)?"":`
`)+t.raw,l.text+=`
`+t.raw,this.inlineQueue.at(-1).src=l.text):this.tokens.links[t.tag]||(this.tokens.links[t.tag]={href:t.href,title:t.title},r.push(t));continue}if(t=this.tokenizer.table(e)){e=e.substring(t.raw.length),r.push(t);continue}if(t=this.tokenizer.lheading(e)){e=e.substring(t.raw.length),r.push(t);continue}let a=e;if(this.options.extensions?.startBlock){let l=1/0,o=e.slice(1),i;this.options.extensions.startBlock.forEach(p=>{i=p.call({lexer:this},o),typeof i=="number"&&i>=0&&(l=Math.min(l,i))}),l<1/0&&l>=0&&(a=e.substring(0,l+1))}if(this.state.top&&(t=this.tokenizer.paragraph(a))){let l=r.at(-1);s&&l?.type==="paragraph"?(l.raw+=(l.raw.endsWith(`
`)?"":`
`)+t.raw,l.text+=`
`+t.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=l.text):r.push(t),s=a.length!==e.length,e=e.substring(t.raw.length);continue}if(t=this.tokenizer.text(e)){e=e.substring(t.raw.length);let l=r.at(-1);l?.type==="text"?(l.raw+=(l.raw.endsWith(`
`)?"":`
`)+t.raw,l.text+=`
`+t.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=l.text):r.push(t);continue}if(e){let l="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(l);break}else throw new Error(l)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let s=e,t=null;if(this.tokens.links){let i=Object.keys(this.tokens.links);if(i.length>0)for(;(t=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)i.includes(t[0].slice(t[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,t.index)+"["+"a".repeat(t[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(t=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,t.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let a;for(;(t=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)a=t[2]?t[2].length:0,s=s.slice(0,t.index+a)+"["+"a".repeat(t[0].length-a-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);s=this.options.hooks?.emStrongMask?.call({lexer:this},s)??s;let l=!1,o="";for(;e;){l||(o=""),l=!1;let i;if(this.options.extensions?.inline?.some(c=>(i=c.call({lexer:this},e,r))?(e=e.substring(i.raw.length),r.push(i),!0):!1))continue;if(i=this.tokenizer.escape(e)){e=e.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.tag(e)){e=e.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.link(e)){e=e.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(i.raw.length);let c=r.at(-1);i.type==="text"&&c?.type==="text"?(c.raw+=i.raw,c.text+=i.text):r.push(i);continue}if(i=this.tokenizer.emStrong(e,s,o)){e=e.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.codespan(e)){e=e.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.br(e)){e=e.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.del(e,s,o)){e=e.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.autolink(e)){e=e.substring(i.raw.length),r.push(i);continue}if(!this.state.inLink&&(i=this.tokenizer.url(e))){e=e.substring(i.raw.length),r.push(i);continue}let p=e;if(this.options.extensions?.startInline){let c=1/0,d=e.slice(1),h;this.options.extensions.startInline.forEach(b=>{h=b.call({lexer:this},d),typeof h=="number"&&h>=0&&(c=Math.min(c,h))}),c<1/0&&c>=0&&(p=e.substring(0,c+1))}if(i=this.tokenizer.inlineText(p)){e=e.substring(i.raw.length),i.raw.slice(-1)!=="_"&&(o=i.raw.slice(-1)),l=!0;let c=r.at(-1);c?.type==="text"?(c.raw+=i.raw,c.text+=i.text):r.push(i);continue}if(e){let c="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return r}},j=class{options;parser;constructor(n){this.options=n||E}space(n){return""}code({text:n,lang:e,escaped:r}){let s=(e||"").match(y.notSpaceStart)?.[0],t=n.replace(y.endingNewline,"")+`
`;return s?'<pre><code class="language-'+_(s)+'">'+(r?t:_(t,!0))+`</code></pre>
`:"<pre><code>"+(r?t:_(t,!0))+`</code></pre>
`}blockquote({tokens:n}){return`<blockquote>
${this.parser.parse(n)}</blockquote>
`}html({text:n}){return n}def(n){return""}heading({tokens:n,depth:e}){return`<h${e}>${this.parser.parseInline(n)}</h${e}>
`}hr(n){return`<hr>
`}list(n){let e=n.ordered,r=n.start,s="";for(let l=0;l<n.items.length;l++){let o=n.items[l];s+=this.listitem(o)}let t=e?"ol":"ul",a=e&&r!==1?' start="'+r+'"':"";return"<"+t+a+`>
`+s+"</"+t+`>
`}listitem(n){return`<li>${this.parser.parse(n.tokens)}</li>
`}checkbox({checked:n}){return"<input "+(n?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:n}){return`<p>${this.parser.parseInline(n)}</p>
`}table(n){let e="",r="";for(let t=0;t<n.header.length;t++)r+=this.tablecell(n.header[t]);e+=this.tablerow({text:r});let s="";for(let t=0;t<n.rows.length;t++){let a=n.rows[t];r="";for(let l=0;l<a.length;l++)r+=this.tablecell(a[l]);s+=this.tablerow({text:r})}return s&&(s=`<tbody>${s}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+s+`</table>
`}tablerow({text:n}){return`<tr>
${n}</tr>
`}tablecell(n){let e=this.parser.parseInline(n.tokens),r=n.header?"th":"td";return(n.align?`<${r} align="${n.align}">`:`<${r}>`)+e+`</${r}>
`}strong({tokens:n}){return`<strong>${this.parser.parseInline(n)}</strong>`}em({tokens:n}){return`<em>${this.parser.parseInline(n)}</em>`}codespan({text:n}){return`<code>${_(n,!0)}</code>`}br(n){return"<br>"}del({tokens:n}){return`<del>${this.parser.parseInline(n)}</del>`}link({href:n,title:e,tokens:r}){let s=this.parser.parseInline(r),t=ke(n);if(t===null)return s;n=t;let a='<a href="'+n+'"';return e&&(a+=' title="'+_(e)+'"'),a+=">"+s+"</a>",a}image({href:n,title:e,text:r,tokens:s}){s&&(r=this.parser.parseInline(s,this.parser.textRenderer));let t=ke(n);if(t===null)return _(r);n=t;let a=`<img src="${n}" alt="${_(r)}"`;return e&&(a+=` title="${_(e)}"`),a+=">",a}text(n){return"tokens"in n&&n.tokens?this.parser.parseInline(n.tokens):"escaped"in n&&n.escaped?n.text:_(n.text)}},oe=class{strong({text:n}){return n}em({text:n}){return n}codespan({text:n}){return n}del({text:n}){return n}html({text:n}){return n}text({text:n}){return n}link({text:n}){return""+n}image({text:n}){return""+n}br(){return""}checkbox({raw:n}){return n}},$=class K{options;renderer;textRenderer;constructor(e){this.options=e||E,this.options.renderer=this.options.renderer||new j,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new oe}static parse(e,r){return new K(r).parse(e)}static parseInline(e,r){return new K(r).parseInline(e)}parse(e){let r="";for(let s=0;s<e.length;s++){let t=e[s];if(this.options.extensions?.renderers?.[t.type]){let l=t,o=this.options.extensions.renderers[l.type].call({parser:this},l);if(o!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(l.type)){r+=o||"";continue}}let a=t;switch(a.type){case"space":{r+=this.renderer.space(a);break}case"hr":{r+=this.renderer.hr(a);break}case"heading":{r+=this.renderer.heading(a);break}case"code":{r+=this.renderer.code(a);break}case"table":{r+=this.renderer.table(a);break}case"blockquote":{r+=this.renderer.blockquote(a);break}case"list":{r+=this.renderer.list(a);break}case"checkbox":{r+=this.renderer.checkbox(a);break}case"html":{r+=this.renderer.html(a);break}case"def":{r+=this.renderer.def(a);break}case"paragraph":{r+=this.renderer.paragraph(a);break}case"text":{r+=this.renderer.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}parseInline(e,r=this.renderer){let s="";for(let t=0;t<e.length;t++){let a=e[t];if(this.options.extensions?.renderers?.[a.type]){let o=this.options.extensions.renderers[a.type].call({parser:this},a);if(o!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(a.type)){s+=o||"";continue}}let l=a;switch(l.type){case"escape":{s+=r.text(l);break}case"html":{s+=r.html(l);break}case"link":{s+=r.link(l);break}case"image":{s+=r.image(l);break}case"checkbox":{s+=r.checkbox(l);break}case"strong":{s+=r.strong(l);break}case"em":{s+=r.em(l);break}case"codespan":{s+=r.codespan(l);break}case"br":{s+=r.br(l);break}case"del":{s+=r.del(l);break}case"text":{s+=r.text(l);break}default:{let o='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(o),"";throw new Error(o)}}}return s}},H=class{options;block;constructor(n){this.options=n||E}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(n){return n}postprocess(n){return n}processAllTokens(n){return n}emStrongMask(n){return n}provideLexer(){return this.block?R.lex:R.lexInline}provideParser(){return this.block?$.parse:$.parseInline}},At=class{defaults=ee();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=$;Renderer=j;TextRenderer=oe;Lexer=R;Tokenizer=O;Hooks=H;constructor(...n){this.use(...n)}walkTokens(n,e){let r=[];for(let s of n)switch(r=r.concat(e.call(this,s)),s.type){case"table":{let t=s;for(let a of t.header)r=r.concat(this.walkTokens(a.tokens,e));for(let a of t.rows)for(let l of a)r=r.concat(this.walkTokens(l.tokens,e));break}case"list":{let t=s;r=r.concat(this.walkTokens(t.items,e));break}default:{let t=s;this.defaults.extensions?.childTokens?.[t.type]?this.defaults.extensions.childTokens[t.type].forEach(a=>{let l=t[a].flat(1/0);r=r.concat(this.walkTokens(l,e))}):t.tokens&&(r=r.concat(this.walkTokens(t.tokens,e)))}}return r}use(...n){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return n.forEach(r=>{let s={...r};if(s.async=this.defaults.async||s.async||!1,r.extensions&&(r.extensions.forEach(t=>{if(!t.name)throw new Error("extension name required");if("renderer"in t){let a=e.renderers[t.name];a?e.renderers[t.name]=function(...l){let o=t.renderer.apply(this,l);return o===!1&&(o=a.apply(this,l)),o}:e.renderers[t.name]=t.renderer}if("tokenizer"in t){if(!t.level||t.level!=="block"&&t.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let a=e[t.level];a?a.unshift(t.tokenizer):e[t.level]=[t.tokenizer],t.start&&(t.level==="block"?e.startBlock?e.startBlock.push(t.start):e.startBlock=[t.start]:t.level==="inline"&&(e.startInline?e.startInline.push(t.start):e.startInline=[t.start]))}"childTokens"in t&&t.childTokens&&(e.childTokens[t.name]=t.childTokens)}),s.extensions=e),r.renderer){let t=this.defaults.renderer||new j(this.defaults);for(let a in r.renderer){if(!(a in t))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;let l=a,o=r.renderer[l],i=t[l];t[l]=(...p)=>{let c=o.apply(t,p);return c===!1&&(c=i.apply(t,p)),c||""}}s.renderer=t}if(r.tokenizer){let t=this.defaults.tokenizer||new O(this.defaults);for(let a in r.tokenizer){if(!(a in t))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;let l=a,o=r.tokenizer[l],i=t[l];t[l]=(...p)=>{let c=o.apply(t,p);return c===!1&&(c=i.apply(t,p)),c}}s.tokenizer=t}if(r.hooks){let t=this.defaults.hooks||new H;for(let a in r.hooks){if(!(a in t))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;let l=a,o=r.hooks[l],i=t[l];H.passThroughHooks.has(a)?t[l]=p=>{if(this.defaults.async&&H.passThroughHooksRespectAsync.has(a))return(async()=>{let d=await o.call(t,p);return i.call(t,d)})();let c=o.call(t,p);return i.call(t,c)}:t[l]=(...p)=>{if(this.defaults.async)return(async()=>{let d=await o.apply(t,p);return d===!1&&(d=await i.apply(t,p)),d})();let c=o.apply(t,p);return c===!1&&(c=i.apply(t,p)),c}}s.hooks=t}if(r.walkTokens){let t=this.defaults.walkTokens,a=r.walkTokens;s.walkTokens=function(l){let o=[];return o.push(a.call(this,l)),t&&(o=o.concat(t.call(this,l))),o}}this.defaults={...this.defaults,...s}}),this}setOptions(n){return this.defaults={...this.defaults,...n},this}lexer(n,e){return R.lex(n,e??this.defaults)}parser(n,e){return $.parse(n,e??this.defaults)}parseMarkdown(n){return(e,r)=>{let s={...r},t={...this.defaults,...s},a=this.onError(!!t.silent,!!t.async);if(this.defaults.async===!0&&s.async===!1)return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return a(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return a(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(t.hooks&&(t.hooks.options=t,t.hooks.block=n),t.async)return(async()=>{let l=t.hooks?await t.hooks.preprocess(e):e,o=await(t.hooks?await t.hooks.provideLexer():n?R.lex:R.lexInline)(l,t),i=t.hooks?await t.hooks.processAllTokens(o):o;t.walkTokens&&await Promise.all(this.walkTokens(i,t.walkTokens));let p=await(t.hooks?await t.hooks.provideParser():n?$.parse:$.parseInline)(i,t);return t.hooks?await t.hooks.postprocess(p):p})().catch(a);try{t.hooks&&(e=t.hooks.preprocess(e));let l=(t.hooks?t.hooks.provideLexer():n?R.lex:R.lexInline)(e,t);t.hooks&&(l=t.hooks.processAllTokens(l)),t.walkTokens&&this.walkTokens(l,t.walkTokens);let o=(t.hooks?t.hooks.provideParser():n?$.parse:$.parseInline)(l,t);return t.hooks&&(o=t.hooks.postprocess(o)),o}catch(l){return a(l)}}}onError(n,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,n){let s="<p>An error occurred:</p><pre>"+_(r.message+"",!0)+"</pre>";return e?Promise.resolve(s):s}if(e)return Promise.reject(r);throw r}}},I=new At;function k(n,e){return I.parse(n,e)}k.options=k.setOptions=function(n){return I.setOptions(n),k.defaults=I.defaults,be(k.defaults),k};k.getDefaults=ee;k.defaults=E;k.use=function(...n){return I.use(...n),k.defaults=I.defaults,be(k.defaults),k};k.walkTokens=function(n,e){return I.walkTokens(n,e)};k.parseInline=I.parseInline;k.Parser=$;k.parser=$.parse;k.Renderer=j;k.TextRenderer=oe;k.Lexer=R;k.lexer=R.lex;k.Tokenizer=O;k.Hooks=H;k.parse=k;k.options;k.setOptions;k.use;k.walkTokens;k.parseInline;$.parse;R.lex;const Pt={class:"page-container markdown-container"},Ct={class:"toolbar"},Lt={class:"toolbar-left"},It={class:"toolbar-right"},Et={class:"editor-wrapper"},Bt={class:"editor-panel"},Mt={class:"preview-panel"},qt=["innerHTML"],Dt=Ce({__name:"MarkdownPreview",setup(n){const e=G(""),r=G("github"),s=G("");k.setOptions({breaks:!0,gfm:!0});const t=pe(()=>`markdown-style-${r.value}`),a=pe(()=>{try{const m=k(e.value);return Ze.sanitize(m)}catch(m){return console.error("Markdown 渲染错误:",m),""}}),l={github:`
    .markdown-style-github {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
      font-size: 16px;
      line-height: 1.6;
      color: #24292f;
      background-color: #ffffff;
    }
    .markdown-style-github h1, .markdown-style-github h2, .markdown-style-github h3,
    .markdown-style-github h4, .markdown-style-github h5, .markdown-style-github h6 {
      margin-top: 24px;
      margin-bottom: 16px;
      font-weight: 600;
      line-height: 1.25;
    }
    .markdown-style-github h1 { font-size: 2em; border-bottom: 1px solid #d0d7de; padding-bottom: .3em; }
    .markdown-style-github h2 { font-size: 1.5em; border-bottom: 1px solid #d0d7de; padding-bottom: .3em; }
    .markdown-style-github h3 { font-size: 1.25em; }
    .markdown-style-github h4 { font-size: 1em; }
    .markdown-style-github p { margin-bottom: 16px; }
    .markdown-style-github code {
      padding: 0.2em 0.4em;
      margin: 0;
      font-size: 85%;
      background-color: rgba(175,184,193,0.2);
      border-radius: 6px;
    }
    .markdown-style-github pre {
      padding: 16px;
      overflow: auto;
      font-size: 85%;
      line-height: 1.45;
      background-color: #f6f8fa;
      border-radius: 6px;
      margin-bottom: 16px;
    }
    .markdown-style-github pre code {
      background-color: transparent;
      padding: 0;
    }
    .markdown-style-github blockquote {
      padding: 0 1em;
      color: #57606a;
      border-left: 0.25em solid #d0d7de;
      margin: 0 0 16px 0;
    }
    .markdown-style-github ul, .markdown-style-github ol {
      padding-left: 2em;
      margin-bottom: 16px;
    }
    .markdown-style-github table {
      border-collapse: collapse;
      margin-bottom: 16px;
      width: 100%;
    }
    .markdown-style-github table th, .markdown-style-github table td {
      padding: 6px 13px;
      border: 1px solid #d0d7de;
    }
    .markdown-style-github table tr:nth-child(2n) {
      background-color: #f6f8fa;
    }
    .markdown-style-github img {
      max-width: 100%;
      box-sizing: content-box;
      background-color: #ffffff;
    }
    .markdown-style-github a {
      color: #0969da;
      text-decoration: none;
    }
    .markdown-style-github a:hover {
      text-decoration: underline;
    }
  `,"github-dark":`
    .markdown-style-github-dark {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
      font-size: 16px;
      line-height: 1.6;
      color: #c9d1d9;
      background-color: #0d1117;
    }
    .markdown-style-github-dark h1, .markdown-style-github-dark h2, .markdown-style-github-dark h3,
    .markdown-style-github-dark h4, .markdown-style-github-dark h5, .markdown-style-github-dark h6 {
      margin-top: 24px;
      margin-bottom: 16px;
      font-weight: 600;
      line-height: 1.25;
      color: #c9d1d9;
    }
    .markdown-style-github-dark h1 { font-size: 2em; border-bottom: 1px solid #30363d; padding-bottom: .3em; }
    .markdown-style-github-dark h2 { font-size: 1.5em; border-bottom: 1px solid #30363d; padding-bottom: .3em; }
    .markdown-style-github-dark h3 { font-size: 1.25em; }
    .markdown-style-github-dark h4 { font-size: 1em; }
    .markdown-style-github-dark p { margin-bottom: 16px; }
    .markdown-style-github-dark code {
      padding: 0.2em 0.4em;
      margin: 0;
      font-size: 85%;
      background-color: rgba(110,118,129,0.4);
      border-radius: 6px;
    }
    .markdown-style-github-dark pre {
      padding: 16px;
      overflow: auto;
      font-size: 85%;
      line-height: 1.45;
      background-color: #161b22;
      border-radius: 6px;
      margin-bottom: 16px;
    }
    .markdown-style-github-dark pre code {
      background-color: transparent;
      padding: 0;
    }
    .markdown-style-github-dark blockquote {
      padding: 0 1em;
      color: #8b949e;
      border-left: 0.25em solid #30363d;
      margin: 0 0 16px 0;
    }
    .markdown-style-github-dark ul, .markdown-style-github-dark ol {
      padding-left: 2em;
      margin-bottom: 16px;
    }
    .markdown-style-github-dark table {
      border-collapse: collapse;
      margin-bottom: 16px;
      width: 100%;
    }
    .markdown-style-github-dark table th, .markdown-style-github-dark table td {
      padding: 6px 13px;
      border: 1px solid #30363d;
    }
    .markdown-style-github-dark table tr:nth-child(2n) {
      background-color: #161b22;
    }
    .markdown-style-github-dark img {
      max-width: 100%;
      box-sizing: content-box;
      background-color: #0d1117;
    }
    .markdown-style-github-dark a {
      color: #58a6ff;
      text-decoration: none;
    }
    .markdown-style-github-dark a:hover {
      text-decoration: underline;
    }
  `,vuepress:`
    .markdown-style-vuepress {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      font-size: 16px;
      line-height: 1.7;
      color: #2c3e50;
      background-color: #ffffff;
    }
    .markdown-style-vuepress h1, .markdown-style-vuepress h2, .markdown-style-vuepress h3,
    .markdown-style-vuepress h4, .markdown-style-vuepress h5, .markdown-style-vuepress h6 {
      margin-top: 24px;
      margin-bottom: 16px;
      font-weight: 600;
      line-height: 1.25;
      color: #1a1a1a;
    }
    .markdown-style-vuepress h1 { font-size: 2em; border-bottom: 1px solid #eaecef; padding-bottom: .3em; }
    .markdown-style-vuepress h2 { font-size: 1.5em; border-bottom: 1px solid #eaecef; padding-bottom: .3em; }
    .markdown-style-vuepress h3 { font-size: 1.25em; }
    .markdown-style-vuepress h4 { font-size: 1em; }
    .markdown-style-vuepress p { margin-bottom: 16px; }
    .markdown-style-vuepress code {
      padding: 0.2em 0.4em;
      margin: 0;
      font-size: 85%;
      background-color: rgba(27,31,35,0.05);
      border-radius: 3px;
      font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    }
    .markdown-style-vuepress pre {
      padding: 16px;
      overflow: auto;
      font-size: 85%;
      line-height: 1.45;
      background-color: #282c34;
      border-radius: 6px;
      margin-bottom: 16px;
    }
    .markdown-style-vuepress pre code {
      background-color: transparent;
      padding: 0;
      color: #abb2bf;
    }
    .markdown-style-vuepress blockquote {
      padding: 0.5rem 1rem;
      color: #6a737d;
      border-left: 0.25rem solid #dfe2e5;
      margin: 0 0 16px 0;
      background-color: #f6f8fa;
    }
    .markdown-style-vuepress ul, .markdown-style-vuepress ol {
      padding-left: 2em;
      margin-bottom: 16px;
    }
    .markdown-style-vuepress table {
      border-collapse: collapse;
      margin-bottom: 16px;
      width: 100%;
      display: block;
      overflow-x: auto;
    }
    .markdown-style-vuepress table th, .markdown-style-vuepress table td {
      padding: 10px 13px;
      border: 1px solid #dfe2e5;
    }
    .markdown-style-vuepress table tr:nth-child(2n) {
      background-color: #f6f8fa;
    }
    .markdown-style-vuepress img {
      max-width: 100%;
    }
    .markdown-style-vuepress a {
      color: #3eaf7c;
      text-decoration: none;
    }
    .markdown-style-vuepress a:hover {
      text-decoration: underline;
    }
  `},o=()=>{r.value!=="custom"?i(r.value):s.value&&p()},i=m=>{c();const g=document.createElement("style");g.id="markdown-preview-style",g.textContent=l[m]||"",document.head.appendChild(g)},p=()=>{c();const m=document.createElement("style");m.id="markdown-preview-style",m.textContent=s.value,document.head.appendChild(m)},c=()=>{const m=document.getElementById("markdown-preview-style");m&&m.remove()},d=m=>{const g=new FileReader;return g.onload=x=>{s.value=x.target?.result,p(),M.success("样式文件上传成功")},g.readAsText(m),!1};let h=null;const b=()=>{h&&clearTimeout(h),h=setTimeout(()=>{},300)},f=()=>{const m=`
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Markdown Export</title>
  <style>
    ${l[r.value]||s.value}
    body {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
  </style>
</head>
<body>
  <div class="${t.value}">
    ${a.value}
  </div>
</body>
</html>
  `,g=new Blob([m],{type:"text/html;charset=utf-8"}),x=URL.createObjectURL(g),T=document.createElement("a");T.href=x,T.download="markdown-export.html",T.click(),URL.revokeObjectURL(x),M.success("HTML 导出成功")},S=async()=>{try{M.info("正在生成 PDF，请稍候...");const m=(await De(async()=>{const{default:P}=await import("./html2pdf-X0ZnaSxw.js").then(z=>z.h);return{default:P}},__vite__mapDeps([0,1,2]))).default,g=document.createElement("div");g.innerHTML=a.value,g.className=t.value;const x=document.createElement("style");x.textContent=l[r.value]||s.value,g.appendChild(x);const T={margin:1,filename:"markdown-export.pdf",image:{type:"jpeg",quality:.98},html2canvas:{scale:2},jsPDF:{unit:"in",format:"letter",orientation:"portrait"}};await m().set(T).from(g).save(),M.success("PDF 导出成功")}catch(m){console.error("PDF 导出错误:",m),M.error("PDF 导出失败")}};return Le(()=>{i("github"),e.value=`# Markdown 预览示例

## 功能特性

- ✅ 实时预览
- ✅ 代码高亮
- ✅ 多种预设样式
- ✅ 自定义样式上传
- ✅ 导出 HTML
- ✅ 导出 PDF

## 代码示例

\`\`\`javascript
function hello() {
  console.log('Hello, Markdown!')
}
\`\`\`

## 表格示例

| 功能 | 描述 |
|------|------|
| 预览 | 实时渲染 Markdown |
| 样式 | 支持多种预设样式 |
| 导出 | 导出为 HTML 或 PDF |

## 引用示例

> 这是一段引用文字
> 可以有多行

## 列表示例

1. 第一项
2. 第二项
3. 第三项

- 无序列表项 1
- 无序列表项 2
- 无序列表项 3

**粗体文字** 和 *斜体文字* 以及 \`行内代码\`

[链接示例](https://example.com)
`}),(m,g)=>{const x=B("el-option"),T=B("el-select"),P=B("el-icon"),z=B("el-button"),C=B("el-upload"),Pe=B("el-input");return ce(),Ie("div",Pt,[g[7]||(g[7]=v("div",{class:"page-title"},[v("h2",null,"Markdown 预览"),v("p",{class:"description"},"实时预览 Markdown 文档，支持导出 PDF 和 HTML，自定义样式")],-1)),v("div",Ct,[v("div",Lt,[w(T,{modelValue:r.value,"onUpdate:modelValue":g[0]||(g[0]=V=>r.value=V),placeholder:"选择样式",onChange:o,style:{width:"180px"}},{default:A(()=>[w(x,{label:"GitHub",value:"github"}),w(x,{label:"GitHub Dark",value:"github-dark"}),w(x,{label:"VuePress",value:"vuepress"}),w(x,{label:"自定义样式",value:"custom"})]),_:1},8,["modelValue"]),r.value==="custom"?(ce(),Ee(C,{key:0,"show-file-list":!1,"before-upload":d,accept:".css"},{default:A(()=>[w(z,{type:"primary",plain:"",style:{"margin-left":"12px"}},{default:A(()=>[w(P,null,{default:A(()=>[w(X(qe))]),_:1}),g[2]||(g[2]=W(" 上传样式文件 ",-1))]),_:1})]),_:1})):Be("",!0)]),v("div",It,[w(z,{type:"primary",onClick:f},{default:A(()=>[w(P,null,{default:A(()=>[w(X(he))]),_:1}),g[3]||(g[3]=W(" 导出 HTML ",-1))]),_:1}),w(z,{type:"primary",onClick:S},{default:A(()=>[w(P,null,{default:A(()=>[w(X(he))]),_:1}),g[4]||(g[4]=W(" 导出 PDF ",-1))]),_:1})])]),v("div",Et,[v("div",Bt,[g[5]||(g[5]=v("div",{class:"panel-header"},[v("span",null,"编辑器")],-1)),w(Pe,{modelValue:e.value,"onUpdate:modelValue":g[1]||(g[1]=V=>e.value=V),type:"textarea",rows:20,placeholder:"在此输入 Markdown 文本...",onInput:b,class:"markdown-editor"},null,8,["modelValue"])]),v("div",Mt,[g[6]||(g[6]=v("div",{class:"panel-header"},[v("span",null,"预览")],-1)),v("div",{class:Me(["markdown-preview",t.value]),innerHTML:a.value},null,10,qt)])])])}}}),Ft=He(Dt,[["__scopeId","data-v-57de0c91"]]);export{Ft as default};
