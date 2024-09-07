@extends('layouts.master')
@section('title')
    PKBM Swastika
@endsection
@section('hero_banner')
    <div class="herobannerarea herobannerarea__2 herobannerarea__university">

        <div class="swiper university__slider">

            <div class="herobannerarea__slider__wrap swiper-wrapper">

                <div class="swiper-slide herobannerarea__single__slider"
                    style="background: url({{ asset('assets/img/herobanner/university_1.jpg') }});">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-xl-9 col-lg-10 col-md-12 col-sm-12 col-12" data-aos="fade-up">
                                <div class="herobannerarea__content__wraper text-center">


                                    <div class="herobannerarea__title">
                                        <div class="herobannerarea__small__title">
                                            <span>PKBM</span>
                                        </div>
                                        <div class="herobannerarea__title__heading__2 herobannerarea__title__heading__3">
                                            <h2>SWASTIKA</h2>
                                        </div>
                                    </div>


                                    <div class="herobannerarea__text herobannerarea__text__2">
                                        <p>Pusat Kegiatan Belajar Masyarakat
                                            Swastika
                                            - Kec. Karangploso, Kab. Malang
                                        </p>
                                    </div>
                                    <div class="hreobannerarea__button__2">
                                        <a class="default__button" href="#">Lebih lanjut tentang Swastika</a>
                                    </div>

                                    <div class="footerarea__icon footerarea__icon__2">
                                        <p>Media Sosial :</p>
                                        <ul>
                                            <li><a href="http://facebook.com/"><i class="icofont-facebook"></i></a></li>
                                            <li><a href="http://twitter.com/"><i class="icofont-twitter"></i></a>
                                            </li>
                                            <li><a href="http://vimeo.com/"><i class="icofont-vimeo"></i></a></li>
                                            <li><a href="http://linkedin.com/"><i class="icofont-linkedin"></i></a></li>
                                            <li><a href="http://skype.com/"><i class="icofont-skype"></i></a></li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="swiper-slide herobannerarea__single__slider"
                    style="background: url({{ asset('assets/img/herobanner/university_2.jpg') }});">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-xl-9 col-lg-10 col-md-12 col-sm-12 col-12" data-aos="fade-up">
                                <div class="herobannerarea__content__wraper text-center">


                                    <div class="herobannerarea__title">
                                        <div class="herobannerarea__small__title">
                                            <span>Solusi Pendidikan</span>
                                        </div>
                                        <div class="herobannerarea__title__heading__2 herobannerarea__title__heading__3">
                                            <h2>Pilihan yang tepat untuk masa depan cerah Anda</h2>
                                        </div>
                                    </div>
                                    <div class="hreobannerarea__button__2">
                                        <a class="default__button" href="#">Lebih lanjut tentang Swastika</a>
                                    </div>

                                    <div class="footerarea__icon footerarea__icon__2">
                                        <p>Media Sosial :</p>
                                        <ul>
                                            <li><a href="http://facebook.com/"><i class="icofont-facebook"></i></a></li>
                                            <li><a href="http://twitter.com/"><i class="icofont-twitter"></i></a>
                                            </li>
                                            <li><a href="http://vimeo.com/"><i class="icofont-vimeo"></i></a></li>
                                            <li><a href="http://linkedin.com/"><i class="icofont-linkedin"></i></a></li>
                                            <li><a href="http://skype.com/"><i class="icofont-skype"></i></a></li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="swiper-slide herobannerarea__single__slider"
                    style="background: url({{ asset('assets/img/herobanner/university_3.jpg') }});">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-xl-9 col-lg-10 col-md-12 col-sm-12 col-12" data-aos="fade-up">
                                <div class="herobannerarea__content__wraper text-center">


                                    <div class="herobannerarea__title">
                                        <div class="herobannerarea__small__title">
                                            <span>Solusi Bersertifikasi</span>
                                        </div>
                                        <div class="herobannerarea__title__heading__2 herobannerarea__title__heading__3">
                                            <h2>Ayo bangun Gelar luar biasa Anda dengan Swastika</h2>
                                        </div>
                                    </div>

                                    <div class="hreobannerarea__button__2">
                                        <a class="default__button" href="#">Lebih lanjut tentang Swastika</a>
                                    </div>

                                    <div class="footerarea__icon footerarea__icon__2">
                                        <p>Media Sosial :</p>
                                        <ul>
                                            <li><a href="http://facebook.com/"><i class="icofont-facebook"></i></a></li>
                                            <li><a href="http://twitter.com/"><i class="icofont-twitter"></i></a>
                                            </li>
                                            <li><a href="http://vimeo.com/"><i class="icofont-vimeo"></i></a></li>
                                            <li><a href="http://linkedin.com/"><i class="icofont-linkedin"></i></a></li>
                                            <li><a href="http://skype.com/"><i class="icofont-skype"></i></a></li>
                                        </ul>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>


        <div thumbsSlider="" class="swiper university__slider__thumb">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img loading="lazy" src="{{ asset('assets/img/herobanner/university_1.jpg') }}" />
                </div>
                <div class="swiper-slide">
                    <img loading="lazy" src="{{ asset('assets/img/herobanner/university_2.jpg') }}" />
                </div>
                <div class="swiper-slide">
                    <img loading="lazy" src="{{ asset('assets/img/herobanner/university_3.jpg') }}" />
                </div>
            </div>
        </div>


        <div class="slider__controls__wrap slider__controls__pagination slider__controls__arrows">
            <div class="swiper-button-next arrow-btn"></div>
            <div class="swiper-button-prev arrow-btn"></div>
            <div class="swiper-pagination"></div>
        </div>

        <div class="herobannerarea__icon__2">
            <img loading="lazy" class="herobanner__common__img herobanner__img__1"
                src="{{ asset('assets/img/herobanner/herobanner__1.png') }}" alt="photo">
            <img loading="lazy" class="herobanner__common__img herobanner__img__2"
                src="{{ asset('assets/img/herobanner/herobanner__2.png') }}" alt="photo">
            <img loading="lazy" class="herobanner__common__img herobanner__img__3"
                src="{{ asset('assets/img/herobanner/herobanner__3.png') }}" alt="photo">
            <!--<img loading="lazy"  class="herobanner__common__img herobanner__img__4" src="{{ asset('assets/img/herobanner/herobanner__4.png') }}" alt="photo">-->
            <img loading="lazy" class="herobanner__common__img herobanner__img__5"
                src="{{ asset('assets/img/herobanner/herobanner__5.png') }}" alt="photo">
        </div>

    </div>
@endsection
@section('content')
    <!-- animate condtent start-->
    @include('components.landing.animate-content-start')
    <!-- animate condtent end-->

    <!-- aboutarea__2__section__start -->
    @include('components.landing.about')
    <!-- aboutarea__2__section__end -->



    {{-- @include('components.landing.best-categories') --}}



    <!-- about__tap__section__start -->
    @include('components.landing.about-tap')
    <!-- .about__tap__section__end -->

    <!-- counter__section__start -->
    @include('components.landing.counter')
    <!-- counter__section__end-->


    <!-- .about__tap__section__end -->


    <!-- register__section__start-->
    @include('components.landing.register-area')
    <!-- register__section__end-->




    <!-- tution__section__start -->
    @include('components.landing.tuition')
    <!-- tution__section__end -->



    <!-- eventlistarea__section__start  -->
    <!-- eventlistarea__section__end  -->


    <!-- team__section__start -->

    <!-- testmonialarea__section__atart -->
    @include('components.landing.testimonial')
    <!-- testmonialarea__section__end-->

    <!-- brand__section__start -->
    <!-- brand__section__end -->

    <!-- blog__section__start -->
    @include('components.landing.blog-area')
    <!-- blog__section__end -->

    @include('components.landing.gallery')
@endsection
