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
