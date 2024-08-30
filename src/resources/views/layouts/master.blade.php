<!doctype html>
<html class="no-js" lang="zxx">

@include('layouts.head')


<body class="body__wrapper">
    <!-- pre loader area start -->
    <div id="back__preloader">
        <div id="back__circle_loader"></div>
        <div class="back__loader_logo">
            <img loading="lazy" src="{{ asset('assets/img/pre.png') }}" alt="Preload">
        </div>
    </div>
    </div>
    <!-- pre loader area end -->

    <!-- Dark/Light area start -->
    {{-- <div class="mode_switcher my_switcher">
        <button id="light--to-dark-button" class="light align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="ionicon dark__mode" viewBox="0 0 512 512">
                <path
                    d="M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216 88.68 0 166.73-51.57 200-128-26.39 11.49-57.38 16-88 16-119.29 0-216-96.71-216-216z"
                    fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="32" />
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" class="ionicon light__mode" viewBox="0 0 512 512">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10"
                    stroke-width="32"
                    d="M256 48v48M256 416v48M403.08 108.92l-33.94 33.94M142.86 369.14l-33.94 33.94M464 256h-48M96 256H48M403.08 403.08l-33.94-33.94M142.86 142.86l-33.94-33.94" />
                <circle cx="256" cy="256" r="80" fill="none" stroke="currentColor" stroke-linecap="round"
                    stroke-miterlimit="10" stroke-width="32" />
            </svg>

            <span class="light__mode">Light</span>
            <span class="dark__mode">Dark</span>
        </button>
    </div> --}}
    <!-- Dark/Light area end -->

    <main class="main_wrapper overflow-hidden">


        <!-- topbar__section__stert -->
        <div class="topbararea">
            <div class="container">
                <div class="row">
                    <div class="col-xl-5 col-lg-5">
                        <div class="topbar__left">
                            <ul>
                                <li>
                                    Hubungi Kami: +62 8510 4755 189
                                </li>
                                <li>
                                    - Email : yppi-malang@gmail.com
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-xl-7 col-lg-7">
                        <div class="topbar__right">
                            <div class="topbar__icon">
                                <i class="icofont-location-pin"></i>
                            </div>
                            <div class="topbar__text">
                                <p>Perum Agrogriyatama Regency No B5 Tawangargo, Karangploso, Kab. Malang</p>
                            </div>
                            <div class="topbar__list">
                                <ul>
                                    <li>
                                        <a href="#"><i class="icofont-facebook"></i></a>
                                    </li>
                                    <li>
                                        <a href="#"><i class="icofont-twitter"></i></a>
                                    </li>
                                    <li>
                                        <a href="#"><i class="icofont-instagram"></i></a>
                                    </li>
                                    <li>
                                        <a href="#"><i class="icofont-youtube-play"></i></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- topbar__section__end -->


        <!-- headar section start -->
        @include('layouts.navbar')
        <!-- header section end -->

        <!-- Mobile Menu Start Here -->
        @include('components.landing.mobile-menu')
        <!-- Mobile Menu end Here -->

        <!-- theme fixed shadow -->
        <div>
            <div class="theme__shadow__circle"></div>
            <div class="theme__shadow__circle shadow__right"></div>
        </div>
        <!-- theme fixed shadow -->

        <!-- herobannerarea__section__start -->
        @yield('hero_banner')
        <!-- herobannerarea__section__end-->

        @yield('content')

        <!-- footer__section__start -->
        @include('layouts.footer')
        <!-- footer__section__end -->

    </main>






    @include('layouts.script')


</body>

</html>
