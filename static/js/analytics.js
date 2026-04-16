// Mixpanel Analytics - Replace 'YOUR_PROJECT_TOKEN' with actual Mixpanel token
(function(f,b){if(!b.__SV)var e,g,i,h;function l(){var s=(window.performance||window.webkitPerformance).timing;if(!s)return{};var F=s.navigationStart;s={start:F,loadEventStart:s.loadEventStart,loadEventEnd:s.loadEventEnd};return window.chrome&&window.chrome.loadTimes?Object.assign(s,(window.chrome.loadTimes()||{}).toJSON()):s}try{var j=1,n=b.__SV,c=f.getElementsByTagName("script")[0];if(!c.parentNode)return;var k=f.createElement("script"),a=function(){b.mixpanel=b.mixpanel||[];b.mixpanel._i=[];b.mixpanel.init=function(w,v,x){function y(a,b){a[b]=function(){a.push([b].concat(Array.prototype.slice.call(arguments,0)))}}var z=0!=x;z||(b.mixpanel.args=z?[]:{});var A=b.mixpanel.args||[];A.push([w,v,x]);b.mixpanel.load&&b.mixpanel.load(w);b.mixpanel.SNIPPET_VERSION="2.52.1";y(b.mixpanel,"identify,track,reset_opt_in_out_opt_in,reset_opt_out,has_opted_in_opt_out,has_opted_out,reset_opt_in_out,clear_opt_in_outed,people,people.set,people.set_once,people.increment,people.append,people.union,people.track_charge,people.clear_charges,groups,group.set,group.set_once,group.increment,group.append,group.union,group.track_charge,group.clear_charges")};b.mixpanel.load=function(w){var v=b.document.createElement("script");v.type="text/javascript";v.async=!0;v.src="https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";v.onload=function(){b.mixpanel.init(w)};c.parentNode.insertBefore(v,c)}}a()})(document,window);mixpanel.init('YOUR_PROJECT_TOKEN'); // TODO: Replace with your Mixpanel project token

// Track page views
mixpanel.track_pageview();

// Utility to track clicks (catches zero-click drop-offs)
function trackClick(selector, eventName, properties = {}) {
  document.querySelectorAll(selector).forEach(el => {
    el.addEventListener('click', function(e) {
      mixpanel.track(eventName, properties);
    }, {once: false});
  });
}

// Track key funnel events proactively
document.addEventListener('DOMContentLoaded', function() {
  trackClick('.add-btn, .btn-cart', 'Add to Cart Click');
  trackClick('[data-method]', 'Payment Method Selected');
  trackClick('.confirm-btn', 'Payment Submitted');
  
  // Track form submits
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function() {
      mixpanel.track('Form Submitted', {form: form.id || form.className || 'unknown'});
    });
  });
});

// Export for manual calls
window.trackEvent = function(name, props) {
  mixpanel.track(name, props);
};

