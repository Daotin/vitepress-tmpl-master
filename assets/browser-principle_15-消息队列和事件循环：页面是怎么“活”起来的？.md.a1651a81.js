import{_ as a,o as t,c as r,V as e}from"./chunks/framework.ff44d2fd.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"browser-principle/15-消息队列和事件循环：页面是怎么“活”起来的？.md","filePath":"browser-principle/15-消息队列和事件循环：页面是怎么“活”起来的？.md","lastUpdated":1712814842000}'),o={name:"browser-principle/15-消息队列和事件循环：页面是怎么“活”起来的？.md"},p=e('<h2 id="渲染进程很繁忙" tabindex="-1">渲染进程很繁忙 <a class="header-anchor" href="#渲染进程很繁忙" aria-label="Permalink to &quot;渲染进程很繁忙&quot;">​</a></h2><p>渲染进程的主线程需要处理各种各样的任务，JS脚本，DOM渲染，布局，CSS计算，事件等等，V8引擎也是在主线程上运行的。</p><p>渲染进程里面除了主线程，还有IO线程，负责和其他线程进行IPC通信，还有一些辅助线程，比如DOM预解析线程，垃圾回收线程等。</p><h2 id="消息队列-事件循环来帮忙" tabindex="-1">消息队列+事件循环来帮忙 <a class="header-anchor" href="#消息队列-事件循环来帮忙" aria-label="Permalink to &quot;消息队列+事件循环来帮忙&quot;">​</a></h2><p><img src="https://i.loli.net/2019/09/21/INlSHM26d49Zrqh.png" alt="image.png"></p><ul><li><p>添加一个消息队列；</p></li><li><p>IO 线程中产生的新任务添加进消息队列尾部；</p></li><li><p>渲染主线程会循环地从消息队列头部中读取任务，执行任务。</p></li></ul><p>如果是其他进程发过来消息，那么<strong>渲染进程专门有一个 IO 线程用来接收其他进程传进来的消息</strong>，接收到消息之后，会将这些消息组装成任务发送给渲染主线程，然后加入到消息队列中等待执行。</p><h2 id="主线程退出" tabindex="-1">主线程退出 <a class="header-anchor" href="#主线程退出" aria-label="Permalink to &quot;主线程退出&quot;">​</a></h2><p>当所有任务执行完成后，主线程如何退出？</p><p>Chrome 是这样解决的，确定要退出当前页面时，页面主线程会设置一个退出标志的变量，在每次执行完一个任务时，判断是否有设置退出标志。（相当于立Flag）</p><h2 id="单线程的缺点" tabindex="-1">单线程的缺点 <a class="header-anchor" href="#单线程的缺点" aria-label="Permalink to &quot;单线程的缺点&quot;">​</a></h2><p><strong>1、如何处理高优先级任务</strong></p><p>通常我们把消息队列中的任务称为<strong>宏任务</strong>，每个宏任务中都包含了一个<strong>微任务队列</strong>，在执行宏任务的过程中，如果有类似 DOM 变化需要及时响应的高优先级任务，那么就会将该变化添加到微任务队列中，这样就不会影响到当前宏任务的继续执行，因此也就解决了执行效率的问题。</p><p>等当前宏任务中的主要功能都直接完成之后，这时候，渲染引擎并不着急去执行下一个宏任务，而是看当前宏任务中的微任务队列中是否有微任务，如果有则执行当前宏任务中的微任务，因为类似 DOM 变化的事件都保存在这些微任务队列中，这样也就解决了实时性问题。</p><p><strong>2、如何解决单个任务执行过长</strong></p><p>如果有个 JavaScript 任务因执行时间过久，占用了动画单帧的时间，这样会给用户制造了卡顿的感觉，这当然是极不好的用户体验。针对这种情况，JavaScript 可以通过<strong>回调功能</strong>来规避这种问题，也就是让要执行的 JavaScript 任务滞后执行。</p>',16),_=[p];function i(n,s,l,c,h,d){return t(),r("div",null,_)}const u=a(o,[["render",i]]);export{m as __pageData,u as default};
