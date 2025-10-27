<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<base href="{{ config('app.url') }}" />

<head>
    <title>
        {{ isset($seo) && is_object($seo) ? $seo->meta_title : 'Online Gift Shop for Flowers, Hampers, Birthday Delivery | Noel Gifts' }}
    </title>
    <!-- Google Tag Manager -->
    {{--
    <script>
      (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, "script", "dataLayer", "GTM-5QKVXTR");
    </script>
    --}}
    <!-- End Google Tag Manager -->

    <!-- Google Tag Manager -->
    <script>
        (function(w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
                "gtm.start": new Date().getTime(),
                event: "gtm.js"
            });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != "dataLayer" ? "&l=" + l : "";
            j.async = true;
            j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, "script", "dataLayer", "GTM-5QLGSMQ");
    </script>
    <!-- End Google Tag Manager -->

    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <meta charset="utf-8" />
    <meta content="IE=edge" http-equiv="X-UA-Compatible" />
    <meta content="{{ str_replace('_', '-', app()->getLocale()) }}" name="language" />
    <meta content="yes" name="apple-mobile-web-app-capable" />
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" name="viewport" />

    @php$keyword = "flower gift, flowers and chocolates delivery singapore, same day delivery gifts, same day delivery
    gifts singapore, same day flower delivery singapore, hamper delivery singapore, hamper singapore, online gifts
    singapore, hamper delivery, gift shop, gifts singapore, gift hampers singapore, gifts to singapore, gift hampers,
    gifts online singapore, gift basket singapore, gift delivery, gift delivery singapore, birthday gift delivery
    singapore, birthday hamper singapore, birthday flowers singapore, birthday hamper, birthday hamper delivery
    singapore, birthday delivery ideas singapore, gourmet hamper singapore";
    $description = "An award-winning online
    gift shop in Singapore offering a wide range of gifts from flowers & chocolate to birthday hampers with same-day
    delivery available!"; @endphp
    <meta content="{{ isset($seo) && is_object($seo) ? $seo->meta_description : $description }}" name="description" />

    <meta name="keywords" content="{{ isset($seo) && is_object($seo) ? $seo->meta_keywords : $keyword }}" />

    @if (Request::is('home'))
        <link rel="canonical" href="{{ env('APP_URL') }}" />
    @elseif (isset($canonical_url) && $canonical_url != '')
        <link rel="canonical" href="{{ $canonical_url }}" />
    @else
        <link rel="canonical" href="{{ url()->current() }}" />
    @endif

    <link href="{{ config('app.url') }}" hreflang="x-default" rel="alternate" />
    <link href="{{ asset('assets/img/favicon.ico') }}" rel="icon" type="image/x-icon" />
    <link href="{{ asset('assets/img/favicon.ico') }}" rel="shortcut icon" type="image/x-icon" />
    <link href="{{ asset('assets/css/themify-icons.css') }}" media="all" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/css/fontawesome-5.154/css/all.css') }}" media="all" rel="stylesheet"
        type="text/css" />
    <script src="https://kit.fontawesome.com/e2af2e603c.js" crossorigin="anonymous"></script>
    <link href="{{ asset('assets/css/noel-custom-icons.css') }}" media="all" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/css/app.css') }}?t=22022022" media="all" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/plugins/NotificationStyles/css/ns-default.css') }}" rel="stylesheet"
        type="text/css" />
    <link href="{{ asset('assets/plugins/NotificationStyles/css/ns-style-bar.css') }}" rel="stylesheet"
        type="text/css" />

    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css" />
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/slick/slick-theme.css') }}" />


    <!--<link href="{{ asset('assets/plugins/modals/jquery.modal.min.css') }}" rel="stylesheet" type="text/css"/>-->
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />

    <link href="{{ asset('assets/css/dv9-popup.css') }}?t=20201028" media="all" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/css/custom.css') }}?t=20220602" media="all" rel="stylesheet" type="text/css" />

    <link rel="stylesheet" href="{{ asset('css/protip.min.css') }}" />

    <link href="{{ asset('assets/css/custom2.css') }}?t=20201028" media="all" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/css/mypage-style.css') }}?t=20240223" media="all" rel="stylesheet"
        type="text/css" />
    <!--link href="https://noel-dev.dv9.com/assets/css/bluewaterday-style.css?t=20240223" media="all" rel="stylesheet" type="text/css"-->

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css" />

    <style>
        .ui-widget-content .ui-icon {
            background-image: url("{{ asset('assets/js/jquery-ui-1.12.1/images/ui-icons_444444_256x240.png') }}");
        }

        .ui-widget-header .ui-icon {
            background-image: url("{{ asset('assets/js/jquery-ui-1.12.1/images/ui-icons_444444_256x240.png') }}");
        }

        /* FLOATING SIDEBAR */
        .ulfloat {
            clear: both;
            position: fixed;
            display: block;
            list-style-type: none;
            right: -3.2em;
            margin-top: 383px;
            -webkit-animation: slideright 1s forwards;
            -webkit-animation-delay: 1.5s;
            animation: slideright 1s forwards;
            animation-delay: 1.5s;
            z-index: 999999 !important;
        }

        @keyframes slideright {
            100% {
                right: -1.5em;
            }
        }

        .lifloat {
            margin-bottom: 40px;
            margin-right: -22px;
            padding: 7px;
            -webkit-transform: rotate(270deg);
            -moz-transform: rotate(270deg);
            -o-transform: rotate(270deg);
            background-color: #8a1b33;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;

            -webkit-transition: width .5s, background-color .1s;
            transition: width .5s, background-color .1s;

        }

        .lifloat a {
            font-size: 19px;
            text-transform: none;
            text-align: center;
            text-decoration: none;
            color: #ebebeb;
        }

        .lifloat:hover {
            background-color: #8a1b33;
            color: #fff;
        }
    </style>

    <script>
        var addOn = [];
        var addPrice = [];
    </script>

    <!--Start of Zendesk Chat Script-->
    <script type="text/javascript">
        window.$zopim ||
            (function(d, s) {
                var z = ($zopim = function(c) {
                        z._.push(c);
                    }),
                    $ = (z.s = d.createElement(s)),
                    e = d.getElementsByTagName(s)[0];
                z.set = function(o) {
                    z.set._.push(o);
                };
                z._ = [];
                z.set._ = [];
                $.async = !0;
                $.setAttribute("charset", "utf-8");
                $.src = "https://v2.zopim.com/?6rQMtuWQS8Fiko0ga1ja0BA4FbobBaco";
                z.t = +new Date();
                $.type = "text/javascript";
                e.parentNode.insertBefore($, e);
            })(document, "script");
    </script>
    <!--End of Zendesk Chat Script-->

    <!-- Facebook Pageview Pixel Code -->
    <script>
        !(function(f, b, e, v, n, t, s) {
            if (f.fbq) return;
            n = f.fbq = function() {
                n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
            };
            if (!f._fbq) f._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = "2.0";
            n.queue = [];
            t = b.createElement(e);
            t.async = !0;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s);
        })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
        fbq("init", "1670252499879383");
        fbq("track", "PageView");
    </script>
    <noscript><img height="1" width="1" style="display: none"
            src="https://www.facebook.com/tr?id=1670252499879383&ev=PageView&noscript=1" /></noscript>
    <!-- DO NOT MODIFY -->
    <!-- End Facebook Pixel Code -->

    <!-- Start Emarsys API -->
    <script type="text/javascript">
        var ScarabQueue = ScarabQueue || [];
        (function(id) {
            if (document.getElementById(id)) return;
            var js = document.createElement("script");
            js.id = id;
            js.src = "//cdn.scarabresearch.com/js/119B23462BF1CFFF/scarab-v2.js";
            var fs = document.getElementsByTagName("script")[0];
            fs.parentNode.insertBefore(js, fs);
        })("scarab-js-api");
    </script>
    <!-- END Emarsys API -->

    <!-- PushCrew SMART 20180129 -->
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            // Function to apply custom styles to the PushCrew button
            function applyCustomStyles() {
                setTimeout(function() {
                    // Select the PushCrew button element
                    var pushcrewButton = document.querySelector(
                        '.pushcrew-side-button.pushcrew-chicklet-position-tr');

                    // Check if the button element exists
                    if (pushcrewButton) {
                        // Change background color
                        pushcrewButton.style.backgroundColor = '#ff0000';
                        pushcrewButton.style.right = '0';
                        pushcrewButton.style.display = 'none';
                    }
                }, 100);
            }

            // Apply custom styles initially
            applyCustomStyles();

            // Apply custom styles again when the window is resized
            // window.addEventListener("resize", applyCustomStyles);
            // Create a MutationObserver to monitor changes to the style attribute of the PushCrew button
            var observer = new MutationObserver(function(mutationsList, observer) {
                for (var mutation of mutationsList) {
                    // Check if the style attribute has changed
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        // Reapply custom styles
                        applyCustomStyles();
                    }
                }
            });

            // Start observing changes to the style attribute of the PushCrew button
            if (pushcrewButton) {
                observer.observe(pushcrewButton, {
                    attributes: true
                });
            }
        });
    </script>

    {{-- <script type="text/javascript">
      (function (p, u, s, h) {
        p._pcq = p._pcq || [];
        p._pcq.push(["_currentTime", Date.now()]);
        s = u.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://cdn.pushcrew.com/js/eabf9b8b4280cd47c9f6a74eeb73be99.js";
        h = u.getElementsByTagName("script")[0];
        h.parentNode.insertBefore(s, h);
      })(window, document);
    </script> --}}
    <!-- END PushCrew SMART -->

    <!-- Global site tag (gtag.js) - Google AdWords: 990930408 from PurpleClick -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=AW-990930408"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", "AW-990930408");
        gtag("config", "AW-1029719229");
    </script>

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-5290728-3"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", "UA-5290728-3");
    </script>
    <script src="https://www.google.com/recaptcha/enterprise.js" async defer></script>
    <!-- END Global site tag (gtag.js) - Google Analytics -->

    <!-- Include jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <style>
        .border-bottomA {
            border-bottom: 5px solid #edb9bb !important;
        }

        .border-bottomB {
            border-bottom: 5px solid #d9676d !important;
        }

        .border-bottomC {
            border-bottom: 5px solid #c5161e !important;
        }

        .title {
            min-height: 65px;
        }

        .bg-red {
            background-color: #c5161e;
            max-width: 350px;
            margin: 0 auto;
            color: #ffffff;
        }

        /*******SLICK *******/
        .slider {
            width: 90%;
            margin: 0 auto;
        }

        .slick-slide {
            margin: 0px 10px;
        }

        .slick-slide img {
            width: 100%;
        }

        .slick-prev:before,
        .slick-next:before {
            color: black;
        }

        .slick-slide {
            transition: all ease-in-out 0.3s;
            /*opacity: 0.2;*/
        }

        .slick-active {
            /*opacity: 0.5;*/
        }

        .slick-current {
            opacity: 1;
        }

        .bg-promocode {
            background: #faf8e7 !important;
        }

        .numberTitle {
            font-size: 36px
        }

        .promoCode-container {
            background: #f4efc9;
            width: auto !important;
            text-align: center;
            padding: 25px 15px;
        }

        .promoCode-container h3,
        .promoCode-container span {

            text-align: center;

        }

        .promoCode-container h3 {
            font-size: 24px;
            margin-bottom: 10px
        }

        .tab-content {
            padding: 10px 20px;
        }

        .second-nav .nav a {
            border: 0 !important;
            background-color: transparent !important;
            color: #000;
        }

        .second-nav .nav li.active,
        .second-nav .nav li:hover {
            border-bottom: 2px solid #c5161e;
            color: #c5161e;
        }

        .second-nav .nav li {
            border-bottom: 2px solid transparent;
        }

        .second-nav .nav li a {
            width: 100%;
            text-align: center;
            font-size: 14px;
            max-width: 140px;
        }

        ul.nav.nav-tabs {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            overflow: hidden;
        }

        .nav-tabs li {
            /*flex-basis: 90px;
      min-width: 90px;*/
            display: flex;
            align-items: flex-start;
            margin: 0 !important;
            padding: 0 1%;
        }

        .tabs-wrapper {
            position: relative;
        }

        span.left,
        span.right {
            position: absolute;
            height: 30px;
            width: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #5453d2;
            border-radius: 50%;
            left: -50px;
            top: 8px;
            cursor: pointer;
            color: #ffffff;
        }

        span.right {
            right: -50px;
            left: unset;
        }

        .scroller-btn.inactive {
            opacity: 0.3;
            pointer-events: none;
        }

        .card-footer {
            background: none !important;
            border: none !important;
        }

        /* FLOATING SIDEBAR */
        .ulfloat {
            clear: both;
            position: fixed;
            display: block;
            list-style-type: none;
            right: -3.2em;
            margin-top: 383px;
            -webkit-animation: slideright 1s forwards;
            -webkit-animation-delay: 1.5s;
            animation: slideright 1s forwards;
            animation-delay: 1.5s;
            z-index: 999999 !important;
        }

        @keyframes slideright {
            100% {
                right: -1.5em;
            }
        }

        .lifloat {
            margin-bottom: 40px;
            margin-right: -22px;
            padding: 7px;
            -webkit-transform: rotate(270deg);
            -moz-transform: rotate(270deg);
            -o-transform: rotate(270deg);
            background-color: #8a1b33;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;

            -webkit-transition: width .5s, background-color .1s;
            transition: width .5s, background-color .1s;

        }

        .lifloat a {
            font-size: 19px;
            text-transform: none;
            text-align: center;
            text-decoration: none;
            color: #ebebeb;
        }

        .lifloat:hover {
            background-color: #8a1b33;
            color: #fff;
        }


        @media (min-width: 768px) {
            .bd-placeholder-img-lg {
                font-size: 3.5rem;
            }
        }

        @media (max-width:1200px) {


            .second-nav .nav li a {
                max-width: 100px
            }
        }

        @media (max-width:968px) {
            .second-nav .nav li a {
                max-width: 75px
            }
        }

        @media (max-width:701px) {
            a.tooltip {

                position: relative;

                &:hover,
                &:focus,
                &.active {


                    .second-nav-text {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                .second-nav-text.last-child {
                    right: calc(100% + 1rem);
                    left: auto;

                    &:before {
                        right: -5px;
                        left: auto;
                        top: 50%;
                    }
                }

                .second-nav-text {
                    position: absolute;
                    background-color: #c5161e;
                    /*white-space: nowrap;*/
                    padding: .5rem 1rem;
                    border-radius: 6px;
                    left: calc(100% + 1rem);
                    transform-origin: center left;
                    transform: scale(0);
                    opacity: 0;
                    transition: .15s ease;
                    top: -10px;
                    color: white;
                    z-index: 9;
                    font-size: 12px;
                    line-height: 14px;

                    &:before {
                        content: "";
                        display: block;
                        width: 12px;
                        height: 12px;
                        position: absolute;
                        background-color: #c5161e;
                        left: -5px;
                        top: 50%;
                        transform: translatey(-50%) rotate(45deg);
                        border-radius: 3px;
                    }
                }


            }

            /* .second-nav-text {
        display: none;
      }
      .ellipsis {

text-overflow: ellipsis;

/* Required for text-overflow to do anything
white-space: nowrap;
overflow: hidden;

}*/
        }

        #corporate-list .corporate-item.active {
            background-color: #f0f8ff;
            font-weight: bold;
            color: #0056b3;
        }
    </style>


    @stack('topscript')
</head>

<body>
    <ul class="ulfloat">
        <li class="lifloat"><a href="/contact-us">Contact Us </a></li>
    </ul>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5QKVXTR" height="0" width="0"
            style="display: none; visibility: hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5QLGSMQ" height="0" width="0"
            style="display: none; visibility: hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    <!-- Start Optimise media -->
    <script type="text/javascript">
        OMID = 2159947;
        OPID = 39552;
        ORef = escape(window.parent.location.href);
        !(function() {
            var a = document.createElement("script");
            (a.type = "text/javascript"),
            (a.async = !0),
            (a.src = "//track.omguk.com/e/qs/?action=Content&MID=" + OMID + "&PID=" + OPID + "&ref=" + ORef);
            var b = document.getElementsByTagName("body")[0];
            if (b) b.appendChild(a, b);
            else {
                var b = document.getElementsByTagName("script")[0];
                b.parentNode.insertBefore(a, b);
            }
        })();
    </script>
    <!-- End Optimise media -->

    <button style="bottom:100px !important; right:38px !important;" type="button" class="btn-top btn-back-to-top">
        <i class="ti-arrow-up"></i>
        <div class="btn-back-to-top-text">TOP</div>
    </button>
    <div id="site-wrapper">
        <!-- frontend.layouts.header //-->
        @include('frontend.layouts.header')

        <!-- Content //-->
        @yield('content')

        <!-- frontend.layouts.footer //-->
        @include('frontend.layouts.footer')
    </div>
    {{-- <button type="button" class="btn btn-success" data-toggle="modal" data-target="#recipientModal"
      >Lunch demo modal</button
    > --}}

    <button class="complimentaryPopup-btn" style="visibility: hidden"></button>
    <div class="lightbox" id="complimentaryPopup">
        <div class="lightbox-wrapper">
            <div class="close-btn" id="close">
                <!--?xml version="1.0" encoding="utf-8"?-->
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px" y="0px" viewBox="0 0 100 125" style="enable-background: new 0 0 100 125"
                    xml:space="preserve">
                    <g>
                        <polygon
                            points="66,31.2 50,47.2 34,31.2 31.2,34 47.2,50 31.2,66 34,68.8 50,52.8 66,68.8 68.8,66 52.8,50 68.8,34   " />
                        <path d="M50,8C26.8,8,8,26.8,8,50s18.8,42,42,42s42-18.8,42-42S73.2,8,50,8z M50,88c-21,0-38-17-38-38s17-38,38-38s38,17,38,38
                            S71,88,50,88z" />
                    </g>
                </svg>
            </div>
            <div class="header">
                <h2 class="small bold">Spice up your gift with these Items!</h2>
            </div>
            <form class="form" action="">
                <div class="swiper-container">
                    <div class="swiper-wrapper" id="complimentary-container"></div>
                </div>
                <div class="swiper-pagination"> </div>
                <div class="swiper-prev"><img src="assets/img/next.png" alt="" /></div>
                <div class="swiper-next"><img src="assets/img/next.png" alt="" /></div>
                <div class="bottom"><a class="button dark_blue" id="close">Continue Shopping</a></div>
            </form>
        </div>
    </div>

    <button class="recipientModal-btn" style="visibility: hidden"></button>

    <div class="lightbox lightbox-custom lightbox-confirmation" id="recipientModal">
        <div class="lightbox-wrapper">
            <div class="close-btn" id="close">
                <!--?xml version="1.0" encoding="utf-8"?-->
                <!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px" y="0px" viewBox="0 0 100 125" style="enable-background: new 0 0 100 125"
                    xml:space="preserve">
                    <g>
                        <polygon
                            points="66,31.2 50,47.2 34,31.2 31.2,34 47.2,50 31.2,66 34,68.8 50,52.8 66,68.8 68.8,66 52.8,50 68.8,34    ">
                        </polygon>
                        <path d="M50,8C26.8,8,8,26.8,8,50s18.8,42,42,42s42-18.8,42-42S73.2,8,50,8z M50,88c-21,0-38-17-38-38s17-38,38-38s38,17,38,38
            S71,88,50,88z"></path>
                    </g>
                </svg>
            </div>
            <div class="header">
                <h2 class="small bold">Confirmation</h2>
            </div>
            <div class="s8 cartMsgPopupbody">
                <div id="m-step-1">
                    <p>We have detected that you are adding more items to the cart.<br />Are you sending to a new
                        recipient?</p>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-success button btn-main btn-add-cart"
                            data-id="2">Yes</button>
                        <button type="button" class="btn btn-danger btn-secondary btn-add-cart"
                            data-id="1">No</button>
                    </div>
                </div>

                <div id="m-step-2" style="display: none">
                    <p>Please choose the recipient</p>

                    <select name="recipient" id="dd-recipient">
                        <option>- Select Recipient -</option>
                    </select>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-success btn-add-cart" data-id="3">Continue</button>
                        <button type="button" class="btn btn-danger btn-add-cart" data-id="4">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <button class="binNumberPopup-btn" style="visibility: hidden"></button>

    <div class="lightbox lightbox-custom lightbox-confirmation" id="binNumberModal">
        <div class="lightbox-wrapper">
            <div class="close-btn" id="close">
                <!--?xml version="1.0" encoding="utf-8"?-->
                <!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px" y="0px" viewBox="0 0 100 125" style="enable-background: new 0 0 100 125"
                    xml:space="preserve">
                    <g>
                        <polygon
                            points="66,31.2 50,47.2 34,31.2 31.2,34 47.2,50 31.2,66 34,68.8 50,52.8 66,68.8 68.8,66 52.8,50 68.8,34    ">
                        </polygon>
                        <path d="M50,8C26.8,8,8,26.8,8,50s18.8,42,42,42s42-18.8,42-42S73.2,8,50,8z M50,88c-21,0-38-17-38-38s17-38,38-38s38,17,38,38
                S71,88,50,88z"></path>
                    </g>
                </svg>
            </div>
            <div class="header">
                <h2 class="small bold">Bin Number</h2>
            </div>
            <div class="s8 cartMsgPopupbody">
                <div id="m-step-1">
                    <p>Please enter the first 6 digits of your card</p>

                    <input type="text" name="bin_number" id="bin_number" />

                    <div class="modal-footer">
                        <button type="button" class="btn btn-success button btn-main btn-add-bin">Submit</button>
                        <button type="button" class="btn btn-danger btn-secondary btn-close-bin">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="lightbox lightbox-custom lightbox-confirmation" id="scamModal">
        <div class="lightbox-wrapper">
            <div class="close-btn" id="close">
                <!--?xml version="1.0" encoding="utf-8"?-->
                <!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px" y="0px" viewBox="0 0 100 125" style="enable-background: new 0 0 100 125"
                    xml:space="preserve">
                    <g>
                        <polygon
                            points="66,31.2 50,47.2 34,31.2 31.2,34 47.2,50 31.2,66 34,68.8 50,52.8 66,68.8 68.8,66 52.8,50 68.8,34    ">
                        </polygon>
                        <path d="M50,8C26.8,8,8,26.8,8,50s18.8,42,42,42s42-18.8,42-42S73.2,8,50,8z M50,88c-21,0-38-17-38-38s17-38,38-38s38,17,38,38
            S71,88,50,88z"></path>
                    </g>
                </svg>
            </div>
            <div class="header">
                <h2 class="small bold">ADVISORY – Beware of scams & phishing emails</h2>
            </div>
            <div class="s8 cartMsgPopupbody">
                <div id="m-step-1">
                    <p style="text-align: left">
                        Here’s what you can do:<br />
                        ☑ Always ensure that you’re replying to an email with our official domain (@noel.com.sg)<br />
                        ☑ When in doubt, verify the information by contacting us directly<br />
                        ☒ Never divulge sensitive information to email senders with suspicious or misleading domain
                        names<br />
                        ☒ Do not click on any links or open any attachments from suspicious emails<br />
                        ☒ Never make payment to a PayPal account under a personal name<br />
                        <br />
                        Let us work together to keep safe from these threats.
                    </p>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-success button btn-main btn-add-cart"
                            data-id="2">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <button class="scamModal-btn" style="visibility: hidden"></button>

    <div class="lightbox lightbox-custom lightbox-confirmation" id="newstickerModal">
        <div class="lightbox-wrapper">
            <div class="close-btn" id="close">
                <!--?xml version="1.0" encoding="utf-8"?-->
                <!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px" y="0px" viewBox="0 0 100 125" style="enable-background: new 0 0 100 125"
                    xml:space="preserve">
                    <g>
                        <polygon
                            points="66,31.2 50,47.2 34,31.2 31.2,34 47.2,50 31.2,66 34,68.8 50,52.8 66,68.8 68.8,66 52.8,50 68.8,34    ">
                        </polygon>
                        <path d="M50,8C26.8,8,8,26.8,8,50s18.8,42,42,42s42-18.8,42-42S73.2,8,50,8z M50,88c-21,0-38-17-38-38s17-38,38-38s38,17,38,38
                S71,88,50,88z"></path>
                    </g>
                </svg>
            </div>
            <div class="header">
                <h2 class="small bold">Info</h2>
            </div>
            <div class="s8 cartMsgPopupbody">
                <div id="m-step-1"> @widget('block', ['slug' => 'newsticker_popup']) </div>
            </div>
        </div>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>

    <script src="{{ asset('assets/js/libs.js') }}"></script>
    <script src="{{ asset('assets/js/app.js') }}"></script>

    <!-- <script src="{{ asset('assets/js/jquery-ui-1.12.1/jquery-ui.min.js') }}"></script> -->
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.13.2/jquery-ui.min.js"></script>


    <script src="{{ asset('assets/plugins/NotificationStyles/js/modernizr.custom.js') }}"></script>
    <script src="{{ asset('assets/plugins/NotificationStyles/js/classie.js') }}"></script>
    <script src="{{ asset('assets/plugins/NotificationStyles/js/notificationFx.js') }}"></script>
    <script src="{{ asset('assets/plugins/NotificationStyles/js/snap.svg-min.js') }}"></script>
    {{--
    <script src="{{ asset('assets/css/fontawesome-free-5.15.4-web/js/all.min.js') }}"></script>
    --}}

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>
    <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>-->

    <script src="{{ asset('js/jquery.countdown.js') }}"></script>
    <script src="{{ asset('js/jquery.countdown.min.js') }}"></script>
    <!-------------slider------------------>
    <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.5.8/slick-theme.min.css">


    <script src="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js"></script>

    <script src="{{ asset('js/protip.min.js') }}"></script>

    <script
        src="https://www.google.com/recaptcha/api.js?render={{ env('GOOGLE_RECAPTCHA_KEY') }}&onload=onloadCallback&render=explicit">
    </script>

    @inject('countdown', 'App\Http\Controllers\Frontend\Checkout\DeliveryScheduleController') @php$timer = json_decode($countdown->checkingdate());
    $timer = strtotime($timer->day); @endphp
    <script type="text/javascript">
        $(document).ready(function() {
            $('.switch-popup-btn').click(function(e) {
                e.preventDefault();
                $('#switchPopup').fadeIn();

                $.ajax({
                    url: "{{ route('member.corporate') }}",
                    method: 'GET',
                    success: function(response) {
                        let corporateListHtml = '';
                        $('#corporate-list').empty();
                        let currentCorporateId = response.current_corporate_id;
                        response.corporates.forEach(function(c) {
                            let corporate = c.corporate
                            if (corporate != null) {

                                let activeClass = corporate.id === currentCorporateId ?
                                    'active' : '';

                                $('#corporate-list').append(
                                    `<li data-id="${corporate.id}" class="corporate-item ${activeClass}">${corporate.company_name}</li>`
                                    );
                            }

                        });
                        $('#corporateModal').fadeIn();
                    },
                    error: function() {
                        console.error('Failed to fetch corporate data');
                        $('#company-list').html('<li>Failed to load corporates.</li>');
                    }
                });
            });

            $('.close-btn').click(function() {
                $('#corporateModal').fadeOut();
            });

            $(window).click(function(event) {
                if ($(event.target).is('#corporateModal')) {
                    $('#corporateModal').fadeOut();
                }
            });

            $(document).on('click', '.corporate-item', function() {
                let corporateId = $(this).data('id');
                let corporateName = $(this).text();
                console.log(`Switching to corporate ID: ${corporateId}, Name: ${corporateName}`);

                $.ajax({
                    url: "{{ route('member.switch.corporate') }}",
                    type: "POST",
                    data: {
                        corporate_id: corporateId,
                        _token: '{{ csrf_token() }}'
                    },
                    success: function(response) {
                        window.location.reload();

                        $('#switchPopup').fadeOut();
                    },
                    error: function(xhr, status, error) {
                        console.error(xhr.responseText);
                        alert('Failed to switch corporate. Please try again.');
                    }
                });
            });
        });

        $(document).ready(function() {
            var is_modal_show = sessionStorage.getItem('alreadyShow');
            if (is_modal_show != 'alredy shown') {
                sessionStorage.setItem('alreadyShow', 'alredy shown');
                setTimeout(function() {
                    $('.scamModal-btn').click();
                }, 100);
            }
        });

        var mode = 0;
        var datePickerMinDate = new Date();
        var currentHour = datePickerMinDate.getHours();
        var currentMin = datePickerMinDate.getMinutes();
        var adjustDay = 0;

        @if (Request::ip() != '202.80.215.211')
            if (currentHour < 16) {
                adjustDay = 0;
            } else {
                adjustDay = 1;
                datePickerMinDate = new Date(datePickerMinDate.getTime() + ((24 * 60 * 60 * 1000) * adjustDay));
            }
        @endif

        var isMobile = ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/));

        function contactSelect(e) {
            var checked = false;
            if ($(e).is(':checked')) {
                checked = true;
            }
            $('.profile-personalcheck').prop('checked', checked);
        }

        function checkSelect() {
            var checked = false;
            $(".profile-personalcheck").each(function(index) {
                if ($(this).is(':checked')) {
                    checked = true;
                }
            });
            $('#contact_main_check').prop('checked', checked);
        }

        function onloadCallback() {

            grecaptcha.ready(function() {
                grecaptcha.execute('{{ env('GOOGLE_RECAPTCHA_KEY') }}', {
                    action: 'feedback'
                }).then(function(token) {
                    if (token) {
                        $('#g-recaptcha-response').val(token);
                    }
                });
            });

        }

        function reloadCaptcha() {
            grecaptcha.execute('{{ env('GOOGLE_RECAPTCHA_KEY') }}', {
                action: 'feedback'
            }).then(function(token) {
                if (token) {
                    $('#g-recaptcha-response').val(token);
                }
            });
        }

        $(document).ready(function() {
            var params = null;
            var cartTotal = 0;
            var recipientTotal = null;

            $.protip({
                size: 'tiny',
                scheme: 'white'
            });

            $('.cart-popup-btn').click(function(e) {
                if ($('#cart-total-badge').html() == 1) {
                    $('#cartPopup').remove();

                    e.preventDefault();
                    window.location.href = '{{ url('cart') }}';
                }
            });

            if (isMobile) {
                setTimeout(function() {

                    // $('.custom-header-wrapper').css('marginTop', 20);
                    $('.nav').removeClass('relative');

                    //$('.featured-slider').css('marginTop', $('.nav-head').height());

                    if ($('.newsticker-slider-custom-mobile').length > 0) {
                        var width = $(window).width();

                        if (width <= 991) {
                            var newstickerHeight = 0;
                            //var newstickerHeight = $('.newsticker-slider-custom-mobile').height();

                            var pageWrapperMargin = $('.nav-main-header').height();
                            // //var siteWrapperMargin = 205;

                            $('#page-wrapper').css('marginTop', pageWrapperMargin);
                            //$('#site-wrapper').css('marginTop', siteWrapperMargin + newstickerHeight);

                            $('#site-wrapper').addClass('with-newsticker-mobile');
                        }
                    }
                }, 400);

                @if (Request::is('/'))

                    if ($('.newsticker-slider-custom-mobile').length <= 0) {
                        console.log("in");
                        $('.nav').css('top', 0);
                    } else {

                        var width = $(window).width();

                        if (width <= 910) {
                            $('#site-wrapper').addClass('homepage');
                        }
                    }
                    // $('#openBtn').click(function(e) {

                    //     setTimeout(function() {
                    //         if ($('#openBtn').hasClass('open')) {
                    //             $('.nav').removeClass('relative');
                    //         } else {
                    //             $('.nav').addClass('relative');
                    //         }
                    //     }, 200);
                    // });
                @endif
            }

            setTimeout(function() {
                var pageWrapperMargin = $('.nav-main-header').height() - 1;

                var width = $(window).width();

                if (width <= 991) {
                    $('#page-wrapper').css('marginTop', pageWrapperMargin);
                }
            }, 400);

            $('#header-earliest-delivery').load('{{ url('reload-earliest-delivery') }}');



            $(".dd-datepicker").datepicker({
                dateFormat: 'dd/mm/yy',
                changeMonth: true,
                changeYear: true,
                minDate: new Date(datePickerMinDate.getTime())
            });


            if (window.matchMedia("(max-width: 767px)").matches || window.matchMedia("(min-width: 1921px)")
                .matches) {
                $('.dd-dob').attr('readonly', false);
                $('.dd-dob').attr('type', 'date');
            } else {
                $('.dd-dob').attr('type', 'dob');
                $('.dd-dob').attr('readonly', true);
                $(".dd-dob").datepicker({
                    dateFormat: 'dd/mm/yy',
                    changeMonth: true,
                    changeYear: true,
                    maxDate: new Date()
                });
            }
            // $( ".dd-dob" ).datepicker({
            //     dateFormat: 'dd/mm/yy',
            //     changeMonth: true,
            //     changeYear: true,
            //     maxDate: new Date(),
            //     yearRange: '1930:2022'
            // });

            $('.newsticker-slider').slick({
                dots: false,
                speed: 300,
                slidesToShow: 1,
                fade: true,
                cssEase: 'linear',
                infinite: true,
                autoplay: true,
                autoplaySpeed: 3000
            });

            $('.review-slider').slick({
                dots: true,
                arrows: false,
                speed: 300,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 3000
            });

            $(".regular").slick({
                dots: true,
                infinite: false,
                speed: 300,
                slidesToShow: 1,
                slidesToScroll: 1,

            });

            $(".bdayAlert").slick({
                arrow: true,
                dots: false,
                infinite: false,
                speed: 300,
                slidesToShow: 2,
                slidesToScroll: 1,
                responsive: [{
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            infinite: true,
                            dots: true,
                        },
                    },

                    // You can unslick at a given breakpoint now by adding:
                    // settings: "unslick"
                    // instead of a settings object
                ],
            });

            $(".wishlist").slick({
                dots: false,
                infinite: false,
                speed: 300,
                slidesToShow: 2,
                slidesToScroll: 1,
                responsive: [{
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            infinite: true,
                            dots: true,
                        },
                    },

                    // You can unslick at a given breakpoint now by adding:
                    // settings: "unslick"
                    // instead of a settings object
                ],
            });




            $(document).ready(function() {
                $("#toggle").click(function() {
                    var elem = $("#toggle").text();
                    if (elem == "FIND OUT MORE") {
                        //Stuff to do when btn is in the read more state
                        $("#toggle").text("SHOW LESS");
                        $("#toggle").toggleClass("up");
                        $("#seo-hidden-content").slideDown();
                    } else {
                        //Stuff to do when btn is in the read less state
                        $("#toggle").text("FIND OUT MORE");
                        $("#toggle").toggleClass("up");
                        $("#seo-hidden-content").slideUp();
                    }
                });
            });


            $(document).on('click', '.btn-cart', function(e) {
                e.preventDefault();
                let qty = $('#qty-view').val();
                $('#qty').val(qty);
                $('#qty2').val(qty);

                if ($('#selOpt').length > 0 && $('#selOpt').val() == "") {
                    ///showAlert('error', 'Please choose product option first');
                    alert("Please choose product option first!");

                    return false;
                }

                params = $(this).closest('form').serialize();

                $.get('{{ url('cart/check') }}', function(res) {
                    if (!res.cartTotal) {
                        params = params + "&recipientId=-1";

                        addToCart(params);

                    } else {

                        cartTotal = res.cartTotal;
                        recipientTotal = res.recipientTotal;

                        $('#dd-recipient').html(res.recipient);

                        $('.recipientModal-btn').click();
                    }

                    if ($(".sticky1").length) {
                        $(".sticky1").toggleClass("active");
                    }
                });

            });

            $(document).on('click', '.btn-add-cart', function(e) {
                e.preventDefault();

                mode = $(this).attr('data-id');

                if (mode == 1) {
                    // attach to current recipient
                    if (recipientTotal <= 1) {
                        params = params + "&recipientId=-1";

                        addToCart(params);

                        $('.close-btn').click();
                    } else {
                        $('#m-step-1').hide();
                        $('#m-step-2').show();
                    }

                } else if (mode == 2) {
                    // attach to new recipient
                    params = params + "&recipientId=-2";

                    addToCart(params);

                    $('.close-btn').click();
                } else if (mode == 3) {
                    // attach to choosen recipient
                    params = params + "&recipientId=" + $('#dd-recipient').val();

                    addToCart(params);

                    $('#m-step-1').show();
                    $('#m-step-2').hide();

                    $('.close-btn').click();
                } else if (mode == 4) {
                    $('#m-step-1').show();
                    $('#m-step-2').hide();
                }

            });

            $(document).on('click', '.outofstock-btn', function(e) {
                $('.sticky1').removeClass('active');
            })

            $(document).on('click', '.btn-cart-plus', function(e) {
                e.preventDefault();

                var cartItemId = $(this).attr('data-id');
                var elm = $(this).closest('.cart-items-main');
                var elmQty = $('.cart-qty-' + cartItemId);
                var qty = parseFloat(elmQty.html()) + 1;
                var csrf = '{{ csrf_token() }}';
                var method = "PUT";

                if (qty < 0) {
                    showAlert('error', "Qty must bigger than 0");

                    return;
                }

                if (elm.length > 0) {
                    recipientId = elm.attr('data-id');
                }

                $.post('{{ url('cart') }}/' + cartItemId, {
                    cartItemId: cartItemId,
                    qty: qty,
                    _token: csrf,
                    _method: method
                }, function(res) {
                    if (res.status == 200) {
                        $('#cart-total-badge').html(res.cartTotal);
                        $('#cart-summary-container').load("{{ url('cart/items') }}");

                        if (elm.length > 0) {
                            // reloadRecipient(recipientId);
                            reloadAllRecipient();

                            loadPWP();

                            $('.order-summary').load('{{ url('cart/order-summary') }}');

                            if (qty > 1) {
                                $('.btn-cart-split').show();
                            } else {
                                $('.btn-cart-split').hide();
                            }
                        }

                        showAlert('notice', res.message);
                    } else {
                        showAlert('error', res.message);
                    }
                });
            });

            $(document).on('click', '.btn-cart-min', function(e) {
                e.preventDefault();

                var cartItemId = $(this).attr('data-id');
                var elm = $(this).closest('.cart-items-main');
                var elmQty = $('.cart-qty-' + cartItemId);
                var qty = parseFloat(elmQty.html()) - 1;
                var csrf = '{{ csrf_token() }}';
                var method = "PUT";

                if (qty < 0) {
                    showAlert('error', "Qty must bigger than 0");

                    return;
                }

                if (elm.length > 0) {
                    recipientId = elm.attr('data-id');
                }

                $.post('{{ url('cart') }}/' + cartItemId, {
                    cartItemId: cartItemId,
                    qty: qty,
                    _token: csrf,
                    _method: method
                }, function(res) {
                    if (res.status == 200) {
                        $('#cart-total-badge').html(res.cartTotal);
                        $('#cart-summary-container').load("{{ url('cart/items') }}");

                        if (elm.length > 0) {

                            loadPWP();

                            // reloadRecipient(recipientId);
                            reloadAllRecipient();

                            $('.order-summary').load('{{ url('cart/order-summary') }}');

                            if (qty == 0) {
                                $('#recipient-box-trash').load("{{ url('cart/trashs') }}").show();
                            }

                            if (qty > 1) {
                                $('.btn-cart-split').show();
                            } else {
                                $('.btn-cart-split').hide();
                            }
                        }

                        showAlert('notice', res.message);
                    } else {
                        showAlert('error', res.message);
                    }
                });
            });

            $(document).on('click', '.btn-cart-remove', function(e) {

                e.preventDefault();

                const isConfirm = confirm(
                    "Your deleted item can be found at the bottom of the cart. You may drag the deleted item back to the cart"
                    );

                if (!isConfirm) {
                    return;
                }

                var cartItemId = $(this).attr('data-id');
                var elm = $(this).closest('.cart-items-main');
                var csrf = '{{ csrf_token() }}';
                var method = "DELETE";
                var recipientId = "";

                if (elm.length > 0) {
                    recipientId = elm.attr('data-id');
                }

                $.post('{{ url('cart') }}/' + cartItemId, {
                    cartItemId: cartItemId,
                    _token: csrf,
                    _method: method
                }, function(res) {
                    if (res.status == 200) {
                        $('#cart-total-badge').html(res.cartTotal);
                        $('#cart-summary-container').load("{{ url('cart/items') }}");

                        loadPWP();

                        if (elm.length > 0) {
                            // reloadRecipient(recipientId);
                            console.log("reload trash");

                            $('#recipient-box-trash').load("{{ url('cart/trashs') }}").show();

                            $('.order-summary').load('{{ url('cart/order-summary') }}');

                            setTimeout(function() {
                                reloadAllRecipient();
                            }, 500);

                        }

                        showAlert('notice', res.message);
                    }
                });
            });

            $(document).on('click', '.btn-promocode', function(e) {
                e.preventDefault();

                if ($('#promocode').val() == "") {
                    showAlert('error', "Promo code is required");

                    return false;
                }

                if (!is_alphaDash($('#promocode').val())) {
                    showAlert('error', "Invalid Promo Code");

                    return false;
                }

                $.post('{{ url('cart/promocode') }}', {
                        '_token': '{{ csrf_token() }}',
                        'promocode': $('#promocode').val()
                    },
                    function(res) {

                        if (res.status) {

                            reloadAllRecipient();

                            $('.order-summary').load('{{ url('cart/order-summary') }}');

                            if (res.complimentary) {
                                $('.complimentaryPopup-btn').click();
                            }

                            showAlert('notice', res.message);
                        } else {

                            if (typeof res.bin_number !== "undefined") {
                                $('.binNumberPopup-btn').click();
                            } else {
                                showAlert('error', res.message);
                            }

                        }
                    });

            });

            $(document).on('click', '.sticky1-fav', function(e) {
                    e.preventDefault();

                    @auth
                    var elm = $(this);
                    if ($(this).attr('data-selected') == 0) {
                        $.post('{{ url('member/wish-list') }}', {
                                _token: '{{ csrf_token() }}',
                                product_id: $(this).attr('data-id')
                            },
                            function(res) {

                                elm.addClass("sticky1-fav-active");
                                elm.attr('data-selected', 1);
                                showAlert('notice', "The product successfuly added into your favourites");
                            }
                        );
                    } else {
                        $.post('{{ url('member/wish-list') }}/' + $(this).attr('data-id'), {
                                _token: '{{ csrf_token() }}',
                                _method: 'DELETE',
                                product_id: $(this).attr('data-id'),
                            },
                            function(res) {
                                elm.removeClass("sticky1-fav-active");
                                elm.attr('data-selected', 0);
                                showAlert('notice', "The product successfuly removed from your favourites");
                            }
                        );
                    }
                @else
                    $('.cart_signup_login-btn').click();
                @endauth
            });

        $(document).on('click', '.btn-newsletter', function(e) {
            e.preventDefault();

            if ($(this).parent().find('.newsletter-email').val() == "") {
                showAlert('error', "Email is required");

                return false;
            }

            var email = $(this).parent().find('.newsletter-email');

            $.post('{{ url('newsletter') }}', {
                    '_token': '{{ csrf_token() }}',
                    'email': email.val()
                },
                function(res) {
                    email.val('');

                    if (res.status == 200) {
                        showAlert('notice', res.message);
                    } else {
                        showAlert('error', res.message);
                    }
                }).fail(function(err) {
                var e = err.responseJSON.errors;

                var msg = "";
                for (var arr in e) {
                    console.log(e[arr][0]);
                    msg += e[arr][0] + "<br >";
                }

                showAlert('error', msg);
            });

        });

        @if (Request::is('contact-us') || Request::is('corporate-services'))
            $(document).on('click', '.btn-contact-us', function(e) {
                e.preventDefault();

                var data = $('.contact-form').serialize();

                $.post("{{ url('contact-us') }}", data,
                    function(res) {
                        if (res.status == 200) {
                            $('.contact-form').trigger("reset");

                            showAlert('notice', res.message);
                        } else {
                            showAlert('error', res.message);
                        }

                        reloadCaptcha();
                    }).fail(function(err) {
                    var e = err.responseJSON.errors;

                    var msg = "";

                    for (const arr in e) {
                        msg += e[arr][0] + "\n";
                    }

                    reloadCaptcha();

                    showAlert('error', msg);
                });

            });
        @endif

        $(window).scroll(function() {
            if ($('.nav-menu-item.active').length > 0) {
                $('.nav-menu-item').removeClass('active');
            }
        });

        $('.btn-top').click(function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });


        $(document).on('click', '.complimentaryPopup-btn', function(e) {
            e.preventDefault();

            // selectedCartItemId = $(this).attr('data-cart-id');
            // selectedRecipientId = $(this).attr('data-recipient-id');

            // selectedAddOn = [];

            // $(this).parent().find('.cart-addons-item').each(function(idx, row) {
            //     selectedAddOn.push($(this).attr('data-id'));
            // });

            $('#complimentary-container').load('{{ url('cart/complimentary-item') }}', function() {

                // $('#btn-addon-central').click();

                // $('.swiper-slide').each(function(idx, row) {
                //     var addonId = $(this).attr('data-id');
                //     var found = selectedAddOn.find(function(addonArrId) {
                //         return addonArrId == addonId;
                //     });

                //     if (found) {
                //         $(this).click();
                //     }
                // });

                addonSwiper = new Swiper("#complimentaryPopup .swiper-container", {
                    loopFillGroupWithBlank: !1,
                    slidesPerView: 5,
                    slidesPerGroup: 5,
                    slidesPerColumn: 2,
                    navigation: {
                        nextEl: "#complimentaryPopup .swiper-next",
                        prevEl: "#complimentaryPopup .swiper-prev"
                    },
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: !0
                    },
                    breakpoints: {
                        991: {
                            slidesPerView: 3,
                            slidesPerGroup: 3
                        },
                        767: {
                            slidesPerView: 2,
                            slidesPerGroup: 2
                        },
                        575: {
                            slidesPerView: 1,
                            slidesPerGroup: 1,
                            slidesPerColumn: 1
                        }
                    }
                })
            });
        });

        $(document).on('drag', '.drag-handle', function() {
            console.log('a');
        })

        $(document).on('drop', '.drag-handle', function() {
            console.log('b');
        })

        $(document).on('click', '.btn-add-bin', function(e) {
            e.preventDefault();

            $.post('{{ url('cart/bin-number') }}', {
                'bin_number': $('#bin_number').val(),
                'promocode': $('#promocode').val(),
                '_token': '{{ csrf_token() }}'
            }, function(res) {
                if (res.status) {
                    $('.btn-promocode').click();
                    $('#binNumberModal').find('#close').click();
                    $('#bin_number').val('');
                } else {
                    showAlert('error', res.message);
                }
            });
        });

        $(document).on('click', '.btn-close-bin', function(e) {
            e.preventDefault();

            $('#bin_number').val('');
            $('#binNumberModal').find('#close').click();
        });

        var recipientModalLightbox = new Lightbox("#recipientModal", ".recipientModal-btn");

        var complimentaryPopupLightbox = new Lightbox("#complimentaryPopup", ".complimentaryPopup-btn");

        var binNumberModalLightbox = new Lightbox("#binNumberModal", ".binNumberPopup-btn");

        var newstickerModalLightbox = new Lightbox("#newstickerModal", ".newsticker-popup-btn");

        var sendEmailDetails = new Lightbox("#sendEmailModal", ".send-email-details");

        var voucherLists = new Lightbox("#modalVoucherLists", ".voucher_lists");

        //var scamModal = new Lightbox("#scamModal", ".scamModal-btn");

        $(".howToPopup-btn").fancybox({
            afterLoad: function() {

                $('.single-item').slick({
                    dots: true,
                    dotsClass: 'learn-cart-dots',
                    speed: 300,
                    slidesToShow: 1,
                    fade: true,
                    cssEase: 'linear',
                    appendArrows: $('.learn-cart-arrow-nav-wrapper'),
                    //prevArrow:('#learn-cart-prev'),
                    //nextArrow:('#learn-cart-next'),
                    adaptiveHeight: true
                });
            }
        });


        var wishListPopup = new Lightbox("#wishListPopup", ".wishListPopup-btn");
        });

        function setSortable() {

            setTimeout(function() {

                if (isMobile) {
                    $(".sortableBox").sortable({
                        //cancel: ".btn-cart-plus,.btn-cart-min,.btn-cart-remove",
                        delay: 200,
                        handle: '.drag-handle',
                        connectWith: ".connectedSortable",
                        start: function(event, ui) {
                            selectedItem = ui.item[0].dataset.id;
                        },
                        receive: function(event, ui) {
                            var recipientId = event.target.dataset.id;

                            if (typeof recipientId !== "undefined") {
                                $.post('{{ url('cart/recipient/items/') }}/' + recipientId, {
                                    _method: 'POST',
                                    _token: '{{ csrf_token() }}',
                                    cartItemId: selectedItem
                                }, function(res) {
                                    reloadRecipient(recipientId);

                                    $('#recipient-box-trash').load("{{ url('cart/trashs') }}")
                                        .show();

                                    loadPWP();

                                    $('#cart-summary-container').load(
                                        "{{ url('cart/items') }}");
                                    $('.order-summary').load(
                                    "{{ url('cart/order-summary') }}");

                                    if ($('#recipient-box-trash .cart-item').length <= 0) {
                                        $('#recipient-box-trash').hide();
                                    }
                                });
                            } else {
                                ui.sender.sortable("cancel");
                                alert(
                                    "To delete this item, you can click trash button at the top right");
                            }
                        }
                    }).disableSelection();
                } else {
                    $(".sortableBox").sortable({
                        cancel: ".btn-cart-plus,.btn-cart-min,.btn-cart-remove",
                        delay: 300,
                        connectWith: ".connectedSortable",
                        start: function(event, ui) {
                            selectedItem = ui.item[0].dataset.id;
                        },
                        receive: function(event, ui) {
                            var recipientId = event.target.dataset.id;

                            if (typeof recipientId !== "undefined") {
                                $.post('{{ url('cart/recipient/items/') }}/' + recipientId, {
                                    _method: 'POST',
                                    _token: '{{ csrf_token() }}',
                                    cartItemId: selectedItem
                                }, function(res) {
                                    reloadRecipient(recipientId);

                                    $('#recipient-box-trash').load("{{ url('cart/trashs') }}")
                                        .show();

                                    loadPWP();

                                    $('#cart-summary-container').load(
                                        "{{ url('cart/items') }}");
                                    $('.order-summary').load(
                                    "{{ url('cart/order-summary') }}");

                                    if ($('#recipient-box-trash .cart-item').length <= 0) {
                                        $('#recipient-box-trash').hide();
                                    }
                                });
                            } else {
                                ui.sender.sortable("cancel");
                                alert(
                                    "To delete this item, you can click trash button at the top right");
                            }
                        }
                    }).disableSelection();
                }

                AddonLightbox = new Lightbox("#addonPopup", ".s1-addon-btn");
            }, 300);
        }

        function addToCart(params) {

            if ($('#qty').val() < 0) {
                showAlert('error', "Qty must bigger than 0");

                return;
            }

            if (addOn.length > 0) {
                $.each(addOn, function(idx, row) {
                    params += "&addon[]=" + row;
                });
            }

            var elm = $('.cart-items-main');

            $.post("{{ url('cart') }}", params, function(res) {
                if (res.status == 200) {
                    $('#cart-total-badge').html(res.cartTotal);

                    $('#cart-summary-container').load("{{ url('cart/items') }}");

                    if (elm.length > 0) {

                        if (mode == 2) {
                            window.location.reload();
                        } else {
                            reloadAllRecipient();
                        }
                    }

                    showAlert('notice', res.message);
                } else {
                    showAlert('error', res.message);
                }
            });
        }

        function reloadRecipient(recipientId) {

            if (!recipientId) return;

            $.post('{{ url('delivery/recipients') }}', {
                _method: 'POST',
                _token: '{{ csrf_token() }}',
                recipientId: recipientId
            }, function(res) {

                $('#recipient-box-' + recipientId).html(res);

                setTimeout(function() {

                    reloadRecipientNo();
                    //var datePickerMinDate = new Date(2020, 4, 11);
                    $(".dd-datepicker").datepicker({
                        dateFormat: 'dd/mm/yy',
                        changeMonth: true,
                        changeYear: true,
                        minDate: new Date(datePickerMinDate.getTime())
                    });

                    //$('.addressTypeOptionSelect').change();

                    //$('.deliveryMethodOptionSelect').change();

                    setSortable();
                }, 300);

                $('#inputfirst_name').focus();

            });

        }

        function reloadAllRecipient() {
            var recipientId = "";
            $('.cart-recipient-item-wrapper').each(function(idx, row) {
                recipientId = $(this).attr('id').replace('recipient-box-', '');

                if (recipientId != "trash") {
                    reloadRecipient(recipientId);
                }
            });
        }

        function reloadRecipientNo() {
            var no = 1;
            $('.recipient-no').each(function(e) {
                $(this).html(no + '.');

                no++;
            });
        }

        function showAlert(type, message) {
            // create the notification
            var notification = new NotificationFx({
                message: '<span class="icon icon-megaphone"></span><p>' + message + '</p>',
                layout: 'bar',
                effect: 'slidetop',
                ttl: 3000,
                type: type, // notice, warning or error
            });

            // show the notification
            notification.show();

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

        }

        function RemoveVoucher(vid) {
            $.ajax({
                url: "{{ url('/cart/voucher/delete') }}/" + vid,
                type: "GET",
                dataType: "json",
                async: true,
                success: handleResponseRemoveVoucher
            });
        }

        function handleResponseRemoveVoucher(result) {

            console.log(result);
            if (result.status == "1") {
                console.log("update order summary");
                $('.order-summary').load('{{ url('cart/order-summary') }}');

                $('#voucher-container-' + result.vid).remove();
            }

        }

        function loadPWP() {
            $('#pwp').load("{{ url('cart/purchase-with-purchase') }}", function() {
                pwpSwiper = new Swiper("#pwp .swiper-container", {
                    slidesPerView: 3,
                    navigation: {
                        nextEl: "#pwp .swiper-next",
                        prevEl: "#pwp .swiper-prev"
                    },
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: !0
                    },
                    breakpoints: {
                        991: {
                            slidesPerView: 3,
                        },
                        767: {
                            slidesPerView: 2,
                        },
                        575: {
                            slidesPerView: 1,
                        }
                    }
                });
            });
        }

        function is_alphaDash(str) {
            regexp = /^[a-z0-9_\-]+$/i;

            if (regexp.test(str)) {
                return true;
            } else {
                return false;
            }
        }

        @if ($message = Session::get('success'))
            $(document).ready(function() {
                showAlert('notice', '{{ $message }}');
            });
        @endif

        @if ($message = Session::get('error'))
            $(document).ready(function() {
                showAlert('error', '{{ $message }}');
            });
        @endif

        @if ($message = Session::get('warning'))
            $(document).ready(function() {
                showAlert('warning', '{{ $message }}');
            });
        @endif
    </script>
    @stack('bottomscript')

    <!-- Emarsys Integration Start Here //-->
    <script type="text/javascript">
        @stack('emarsys')
        @if (!isset($order))
            @inject('AnalyticController', 'App\Http\Controllers\Frontend\Analytics\AnalyticController')
            @php
                $EmarsysResult = $AnalyticController->getEmarsys();
            @endphp
            {!! $EmarsysResult !!}
        @endif
        ScarabQueue.push(['go']);
    </script>
    <!-- Emarsys Integration End Here //-->

    @if (Request::is('home') || Request::is('/'))
        <script language="javascript" type="text/javascript">
            var ssSessionId = "";
            if (ssGetURLParameter("utm_source") != null) {
                ssSessionId = ssGetURLParameter("utm_source");
            }

            var gclid = "";
            if (ssGetURLParameter("gclid") != null) {
                gclid = ssGetURLParameter("gclid");
            }

            if (ssSessionId.toLowerCase() == "optimise") {
                ssSetCookie(ssSessionId);
            } else if ((ssSessionId.toLowerCase() != "optimise" && ssSessionId.toLowerCase() != "") || gclid != "") {
                if (checkCookie("optimise")) eraseCookie("optimise");
            }

            function readCookie(name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(";");
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == " ") c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
                }
                return null;
            }

            function eraseCookie(name) {
                document.cookie = name + "=" + name + ";expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
            }

            function checkCookie(name) {
                return readCookie(name) != null;
            }

            function ssGetURLParameter(name) {
                return (
                    decodeURIComponent(
                        (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(location.search) || [, ""])[1]
                        .replace(
                            /\+/g,
                            "%20"
                        )
                    ) || null
                );
            }

            function ssSetCookie(cValue) {
                document.cookie = cValue + "=" + cValue + ";expires= " + ssCalculateExpireDate(30) + "; path=/";
            }

            function ssCalculateExpireDate(days) {
                var d = new Date();
                d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
                d.toUTCString();
                return d;
            }
        </script>
    @endif

    <script>
        $(window).scroll(function() {
            var scroll = $(window).scrollTop();

            if (scroll >= 190) {
                $(".nav-menu.desktop").addClass("stick-top");
            } else {
                $(".nav-menu.desktop").removeClass("stick-top");
            }
        });
    </script>

    <!-- SF Chatbot -->
    <script type='text/javascript'>
        function initEmbeddedMessaging() {
            try {
                embeddedservice_bootstrap.settings.language = 'en_US'; // For example, enter 'en' or 'en-US'

                embeddedservice_bootstrap.init(
                    '00D2w00000RsLcc',
                    'NoelGiftMIAW',
                    'https://noelgiftsinternational.my.site.com/ESWNoelGiftMIAW1695103069549', {
                        scrt2URL: 'https://noelgiftsinternational.my.salesforce-scrt.com'
                    }
                );
            } catch (err) {
                console.error('Error loading Embedded Messaging: ', err);
            }
        };
    </script>
    <script type='text/javascript'
        src='https://noelgiftsinternational.my.site.com/ESWNoelGiftMIAW1695103069549/assets/js/bootstrap.min.js'
        onload='initEmbeddedMessaging()'></script>
    <!-- End Chatbot -->


</body>

</html>
