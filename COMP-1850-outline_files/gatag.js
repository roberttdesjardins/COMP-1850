// This javascript tags file downloads and external links in Google Analytics.
// You need to be using the Google Analytics New Tracking Code (ga.js)
// for this script to work.
// To use, place this file on all pages just above the Google Analytics tracking code.
// All outbound links and links to non-html files should now be automatically tracked.
//
// This script has been provided by Goodwebpractices.com
// Thanks to ShoreTel, MerryMan and Colm McBarron
//
// www.goodwebpractices.com
/*jslint browser:true, indent: 3 */
/*jslint nomen: true*/
/*global _gaq, pageTracker */
/*jslint nomen: false*/
function gatag_track(lnk) {
   "use strict";
   /*jslint nomen: true*/
   if (typeof pageTracker === 'object' && typeof pageTracker._trackPageview === 'function') {
      pageTracker._trackPageview(lnk);
   } else if (typeof _gaq === 'object') {
      // using Google Analytics async queue
      _gaq.push('_trackPageview', lnk);
   }
   /*jslint nomen: false*/
}

function gatag_startListening(obj, evnt, func) {
   "use strict";
   if (obj.addEventListener) {
      obj.addEventListener(evnt, func, false);
   } else if (obj.attachEvent) {
      obj.attachEvent("on" + evnt, func);
   }
}

function gatag_trackMailto(evnt) {
   "use strict";
   var href = (typeof evnt.srcElement === 'object' && typeof evnt.srcElement.href === 'string') ? evnt.srcElement.href : this.href,
      mailto = "/mailto/" + href.substring(7);
   gatag_track(mailto);
}

function gatag_trackExternalLinks(evnt) {
   "use strict";
   var e = evnt.srcElement || this, lnk;
   while (e.tagName !== "A") {
      e = e.parentNode;
   }
   lnk = (e.pathname.charAt(0) === "/") ? e.pathname : "/" + e.pathname;
   if (e.search && e.pathname.indexOf(e.search) === -1) {
      lnk += e.search;
   }
   // VKI Following line was  if (e.hostname !== location.host) lnk = "/external/" + e.hostname + lnk;
   // Changed hostname to host because of ports
   //if (e.host !== location.host) lnk = "/external/" + e.host + lnk;
   // BCIT - backing out VKI change - doesn't work in IE
   if (e.hostname !== location.host) {
      lnk = "/external/" + e.hostname + lnk;
   }
   gatag_track(lnk);
}

function gatag_setup() {
   "use strict";
   if (document.getElementsByTagName) {
      // Initialize external link handlers
      var hrefs = document.getElementsByTagName("a"), href, path, isDoc, l;
      for (l = 0; l < hrefs.length; l += 1) {
         // try {} catch{} block added by erikvold VKI
         try {
            href = hrefs[l]; // VKI 110617  Facilitates debugging
            // protocol, host, hostname, port, pathname, search, hash
            if (href.protocol === "mailto:") {
               gatag_startListening(href, "click", gatag_trackMailto);
            // } else if (href.host === location.host) { // VKI.  Was href.hostname == location.host
            } else if (href.hostname === location.host) {// BCIT - backing out VKI change - doesn't work in IE
               path = href.pathname + href.search;
               isDoc = path.match(/\.(?:avi|bat|csv|dll|doc|docx|dot|dotx|eps|exe|inf|mov|mp3|mpg|pdf|png|pps|ppsx|ppt|pptx|pub|ram|rar|rtf|svg|swf|txt|vsd|vxd|wav|wma|wmv|wvx|xls|xlsx|zip)($|\&|\?)/);
               if (isDoc) {
                  gatag_startListening(href, "click", gatag_trackExternalLinks);
               }
            } else if ((href.host !== '') || href.href.indexOf('javascript') !== 0) { // VKI 110617
               gatag_startListening(href, "click", gatag_trackExternalLinks);
            }
         } catch (ignore) {}
      }
   }
}

