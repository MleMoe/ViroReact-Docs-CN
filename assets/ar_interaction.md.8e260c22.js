import{_ as n,c as a,o as s,a as p}from"./app.551f901f.js";const m='{"title":"\u4EA4\u4E92","description":"","frontmatter":{"sidebarDepth":4},"headers":[{"level":2,"title":"AR \u547D\u4E2D\u68C0\u6D4B","slug":"ar-\u547D\u4E2D\u68C0\u6D4B"},{"level":2,"title":"\u56FA\u5B9A\u4E16\u754C\u62D6\u62FD","slug":"\u56FA\u5B9A\u4E16\u754C\u62D6\u62FD"},{"level":2,"title":"\u56FA\u5B9A\u5E73\u9762\u62D6\u62FD","slug":"\u56FA\u5B9A\u5E73\u9762\u62D6\u62FD"}],"relativePath":"ar/interaction.md","lastUpdated":1638858231801}',t={},o=p(`<h1 id="\u4EA4\u4E92" tabindex="-1">\u4EA4\u4E92 <a class="header-anchor" href="#\u4EA4\u4E92" aria-hidden="true">#</a></h1><p>Viro \u652F\u6301\u591A\u79CD\u673A\u5236\uFF0C\u7528\u6237\u53EF\u4EE5\u901A\u8FC7\u8FD9\u4E9B\u673A\u5236\u4E0E\u73B0\u5B9E\u4E16\u754C\u548C\u865A\u62DF UI \u8FDB\u884C\u4EA4\u4E92\u3002\u4E0B\u9762\u662F\u8BE6\u7EC6\u3002</p><h2 id="ar-\u547D\u4E2D\u68C0\u6D4B" tabindex="-1">AR \u547D\u4E2D\u68C0\u6D4B <a class="header-anchor" href="#ar-\u547D\u4E2D\u68C0\u6D4B" aria-hidden="true">#</a></h2><p><code>&lt;ViroARScene&gt;</code> \u6709\u591A\u79CD\u65B9\u6CD5\u7528\u4E8E\u9488\u5BF9\u73B0\u5B9E\u4E16\u754C\u8FDB\u884C\u201C\u547D\u4E2D\u6D4B\u8BD5\u201D\u3002\u8FD9\u4E9B\u547D\u4E2D\u6D4B\u8BD5\u53EF\u7528\u4E8E\uFF08\u5C3D Viro \u7684\u6700\u5927\u80FD\u529B\uFF09\u786E\u5B9A 2D \u5C4F\u5E55\u4E0A\u7684\u7ED9\u5B9A\u70B9\u5B58\u5728\u54EA\u4E9B\u771F\u5B9E\u4E16\u754C\u7684\u7279\u5F81\u3002\u8BF7\u6CE8\u610F\uFF0C\u7531\u4E8E\u89C6\u56FE\u4E0A\u7684\u5355\u4E2A 2D \u70B9\u5BF9\u5E94\u4E8E\u573A\u666F\u4E2D\u7684 3D \u5C04\u7EBF\uFF0C\u56E0\u6B64\u53EF\u80FD\u4F1A\u8FD4\u56DE\u591A\u4E2A\u7ED3\u679C\uFF08\u6BCF\u4E2A\u5728\u4E0D\u540C\u7684\u6DF1\u5EA6\uFF09\u3002\u7ED3\u679C\u53EF\u80FD\u662F\u951A\u70B9\u2014\u2014\u6BD4\u5982\u5E73\u9762\u2014\u2014\u6216\u8005\u5B83\u4EEC\u53EF\u80FD\u662F\u5C1A\u672A\u5B8C\u5168\u8BC6\u522B\u7684\u7279\u5F81\u70B9\u3002</p><p>\u5728\u4E0B\u9762\u7684\u793A\u4F8B\u4E2D\uFF0C\u6211\u4EEC\u4F7F\u7528\u5C04\u7EBF\u6267\u884C AR \u547D\u4E2D\u6D4B\u8BD5\u3002\u6709\u5173 AR \u547D\u4E2D\u6D4B\u8BD5\u7684\u66F4\u591A\u8BE6\u7EC6\u4FE1\u606F\uFF0C\u8BF7\u53C2\u9605 <a href="https://docs.viromedia.com/docs/viroarscene" target="_blank" rel="noopener noreferrer">ViroARScene</a> \u548C <a href="https://docs.viromedia.com/docs/viroarscene#ARHitTestResult" target="_blank" rel="noopener noreferrer">ARHitTestResult</a> \u53C2\u8003\u3002</p><div class="language-js"><pre><code><span class="token keyword">this</span><span class="token punctuation">.</span>refs<span class="token punctuation">[</span><span class="token string">&#39;arscene&#39;</span><span class="token punctuation">]</span>
  <span class="token punctuation">.</span><span class="token function">performARHitTestWithRay</span><span class="token punctuation">(</span>orientation<span class="token punctuation">.</span>forward<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">results</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> results<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> result <span class="token operator">=</span> results<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>result<span class="token punctuation">.</span>type <span class="token operator">==</span> <span class="token string">&#39;ExistingPlaneUsingExtent&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// We hit a plane, do something!</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="\u56FA\u5B9A\u4E16\u754C\u62D6\u62FD" tabindex="-1">\u56FA\u5B9A\u4E16\u754C\u62D6\u62FD <a class="header-anchor" href="#\u56FA\u5B9A\u4E16\u754C\u62D6\u62FD" aria-hidden="true">#</a></h2><p>\u901A\u5E38\u5728\u62D6\u52A8 <code>&lt;ViroNode&gt;</code> \u8282\u70B9\u65F6\uFF08\u901A\u8FC7\u8BBE\u7F6E\u5176 <code>onDrag</code> \u5C5E\u6027\uFF09\uFF0C\u8282\u70B9\u5728\u62D6\u52A8\u65F6\u4E0E\u7528\u6237\u4FDD\u6301\u56FA\u5B9A\u8DDD\u79BB\uFF0C\u5C31\u597D\u50CF\u7528\u6237\u6B63\u5728\u5C06\u8282\u70B9\u62D6\u8FC7\u7403\u4F53\u7684\u5185\u8868\u9762\u3002\u8FD9\u79F0\u4E3A\u56FA\u5B9A\u8DDD\u79BB\u62D6\u52A8\u3002</p><p>Viro \u8FD8\u652F\u6301\u5728 AR \u4E2D\u8FDB\u884C FixedToWorld \u62D6\u52A8\uFF0C\u5176\u4E2D\u62D6\u52A8\u8282\u70B9\u4E0E\u7528\u6237\u7684\u8DDD\u79BB\u4E0D\u662F\u56FA\u5B9A\u7684\uFF0C\u800C\u662F\u7531\u5176\u4E0E\u6700\u8FD1\u7684\u771F\u5B9E\u4E16\u754C\u5BF9\u8C61\u7684\u4EA4\u70B9\u51B3\u5B9A\u7684\u3002\u4F8B\u5982\uFF0C\u8FD9\u5BF9\u4E8E\u5728\u73B0\u5B9E\u4E16\u754C\u7684\u8868\u9762\u4E0A\u62D6\u52A8\u865A\u62DF\u5BF9\u8C61\u5F88\u6709\u7528\u3002\u8981\u542F\u7528\u6B64\u529F\u80FD\uFF0C\u8BF7\u5C06\u8282\u70B9\u7684 <code>dragType</code> \u5C5E\u6027\u8BBE\u7F6E\u4E3A <code>FixedToWorld</code>\u3002</p><h2 id="\u56FA\u5B9A\u5E73\u9762\u62D6\u62FD" tabindex="-1">\u56FA\u5B9A\u5E73\u9762\u62D6\u62FD <a class="header-anchor" href="#\u56FA\u5B9A\u5E73\u9762\u62D6\u62FD" aria-hidden="true">#</a></h2><p>\u56FA\u5B9A\u5230\u5E73\u9762\u62D6\u52A8\u80FD\u8BA9\u4F60\u81EA\u4E3B\u6307\u5B9A\u53EF\u4EE5\u62D6\u52A8 <code>&lt;ViroNode&gt;</code> \u7684\u5E73\u9762\u3002\u8BE5\u8282\u70B9\u5C06\u65E0\u6CD5\u79BB\u5F00\u8BE5\u5E73\u9762\u3002\u4F60\u8FD8\u53EF\u4EE5\u6307\u5B9A\u8282\u70B9\u53EF\u4EE5\u79FB\u52A8\u7684\u8DDD\u79BB\u76F8\u673A\u7684\u6700\u5927\u8DDD\u79BB\uFF0C\u4EE5\u9632\u6B62\u7528\u6237\u5C06\u8282\u70B9\u62D6\u5230\u65E0\u7A77\u8FDC\u5904\u3002\u4E3A\u6B64\uFF0C\u8BF7\u5C06\u8282\u70B9\u7684 <code>dragType</code> \u5C5E\u6027\u8BBE\u7F6E\u4E3A <code>FixedToPlane</code>\u3002\u7136\u540E\u8981\u5B9A\u4E49\u5E73\u9762\uFF0C\u8BBE\u7F6E <code>dragPlane</code> \u5C5E\u6027\u3002\u4F60\u53EF\u4EE5\u901A\u8FC7\u6307\u5B9A\u5E73\u9762\u4E0A\u7684\u4EFB\u4F55\u70B9\u548C\u5E73\u9762\u7684\u6CD5\u7EBF\u5411\u91CF\u6765\u5B9A\u4E49\u53EF\u6CBF\u5176\u62D6\u52A8\u8282\u70B9\u7684\u5E73\u9762\u3002</p><div class="language-js"><pre><code>dragPlane<span class="token operator">:</span> PropTypes<span class="token punctuation">.</span><span class="token function">shape</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  planePoint  <span class="token operator">:</span> PropTypes<span class="token punctuation">.</span><span class="token function">arrayOf</span><span class="token punctuation">(</span>PropTypes<span class="token punctuation">.</span>number<span class="token punctuation">)</span><span class="token punctuation">,</span>
  planeNormal <span class="token operator">:</span> PropTypes<span class="token punctuation">.</span><span class="token function">arrayOf</span><span class="token punctuation">(</span>PropTypes<span class="token punctuation">.</span>number<span class="token punctuation">)</span><span class="token punctuation">,</span>
  maxDistance <span class="token operator">:</span> PropTypes<span class="token punctuation">.</span>number
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
</code></pre></div><p>\u5728\u4E0B\u9762\u7684\u793A\u4F8B\u4E2D\uFF0C\u6211\u4EEC\u53EA\u5141\u8BB8 Box \u5728\u6211\u4EEC\u4E0B\u65B9 1 \u7C73\u7684\u6C34\u5E73\u9762\u4E0A\u62D6\u52A8\uFF0C\u5E76\u963B\u6B62\u5B83\u79FB\u52A8\u5230\u8DDD\u6211\u4EEC 5 \u7C73\u4EE5\u4E0A\u7684\u5730\u65B9\u3002</p><div class="language-js"><pre><code><span class="token operator">&lt;</span>ViroNode
  position<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
  dragType<span class="token operator">=</span><span class="token string">&#39;FixedToPlane&#39;</span>
  dragPlane<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> planePoint<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> planeNormal<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> maxDistance<span class="token operator">:</span> <span class="token number">5</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>ViroNode<span class="token operator">&gt;</span>
</code></pre></div>`,14),e=[o];function c(r,l,u,i,k,d){return s(),a("div",null,e)}var g=n(t,[["render",c]]);export{m as __pageData,g as default};