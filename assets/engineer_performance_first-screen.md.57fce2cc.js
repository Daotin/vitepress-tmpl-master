import{_ as s,o as a,c as n,V as l}from"./chunks/framework.ff44d2fd.js";const u=JSON.parse('{"title":"首屏优化","description":"","frontmatter":{},"headers":[],"relativePath":"engineer/performance/first-screen.md","filePath":"engineer/performance/first-screen.md","lastUpdated":1689052576000}'),p={name:"engineer/performance/first-screen.md"},o=l(`<h1 id="首屏优化" tabindex="-1">首屏优化 <a class="header-anchor" href="#首屏优化" aria-label="Permalink to &quot;首屏优化&quot;">​</a></h1><p>对于 SaaS 系统，一般来说首屏即是登录页，登录有什么地方可以优化的呢？</p><p>一般在登录页，会有一个很大的图片，而如果网络不好的话，加载的速度会很慢，所以优化登录页面的图片加载速度是很关键的。</p><h2 id="优化登录背景图片" tabindex="-1">优化登录背景图片 <a class="header-anchor" href="#优化登录背景图片" aria-label="Permalink to &quot;优化登录背景图片&quot;">​</a></h2><p>1、尽量使用 <code>webp</code> 的格式</p><p>WebP 的优势在于它具有更优的图像数据压缩算法，在拥有肉眼无法识别差异的图像质量前提下，带来更小的图片体积，同时具备了无损和有损的压缩模式、Alpha 透明以及动画的特性，在 JPEG 和 PNG 上的转化效果都非常优秀、稳定和统一。</p><p>2、先使用一个小的占位图片，等大图片加载完毕后，再替换成大图片</p><blockquote><p>可以采用工具（<a href="https://blurha.sh/%EF%BC%89" target="_blank" rel="noreferrer">https://blurha.sh/）</a> 生成图片的模糊缩略图。</p></blockquote><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 等到图片加载完成</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">url</span><span style="color:#6A737D;"> 图片链接</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">waitForImageLoad</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">url</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Promise</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">request</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">inject</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> img </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Image</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    img.src </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> url;</span></span>
<span class="line"><span style="color:#E1E4E8;">    img.</span><span style="color:#B392F0;">addEventListener</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;load&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">request</span><span style="color:#E1E4E8;">(url);</span></span>
<span class="line"><span style="color:#E1E4E8;">      img.</span><span style="color:#B392F0;">remove</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre></div><p>具体的使用方式：</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> LoginBg </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@/assets/images/login/login-bg.webp?url&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { waitForImageLoad } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@/utils&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">onMounted</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 优化图片加载完成后再替换首页图片</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">dom</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">querySelector</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;.login-wrap&quot;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HTMLElement</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">waitForImageLoad</span><span style="color:#E1E4E8;">(LoginBg);</span></span>
<span class="line"><span style="color:#E1E4E8;">    dom</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">.style.backgroundImage </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`url(\${</span><span style="color:#E1E4E8;">LoginBg</span><span style="color:#9ECBFF;">})\`</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (error) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">error</span><span style="color:#E1E4E8;">(error);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre></div><p>这样在第一次加载登录界面的时候，就会很快打开界面。</p>`,12),e=[o];function t(r,c,E,y,i,F){return a(),n("div",null,e)}const g=s(p,[["render",t]]);export{u as __pageData,g as default};