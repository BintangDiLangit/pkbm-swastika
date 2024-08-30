@extends('layouts.master')
@section('title')
    PKBM Swastika
@endsection
@section('hero_banner')
    <div class="breadcrumbarea">

        <div class="container">
            <div class="row">
                <div class="col-xl-12">
                    <div class="breadcrumb__content__wraper" data-aos="fade-up">
                        <div class="breadcrumb__title">
                            <h2 class="heading">Page Not Found</h2>
                        </div>
                    </div>



                </div>
            </div>
        </div>

        <div class="shape__icon__2">
            <img loading="lazy" class=" shape__icon__img shape__icon__img__1"
                src="{{ asset('assets/img/herobanner/herobanner__1.png') }}" alt="photo">
            <img loading="lazy" class=" shape__icon__img shape__icon__img__2"
                src="{{ asset('assets/img/herobanner/herobanner__2.png') }}" alt="photo">
            <img loading="lazy" class=" shape__icon__img shape__icon__img__3"
                src="{{ asset('assets/img/herobanner/herobanner__3.png') }}" alt="photo">
            <img loading="lazy" class=" shape__icon__img shape__icon__img__4"
                src="{{ asset('assets/img/herobanner/herobanner__5.png') }}" alt="photo">
        </div>

    </div>
@endsection
@section('content')
    <div class="errorarea sp_top_100 sp_bottom_100">
        <div class="container">
            <div class="row">
                <div class="col-xl-8 col-lg-10 col-sm-12 col-12 m-auto">
                    <div class="errorarea__inner" data-aos="fade-up">
                        <div class="error__img">
                            <img loading="lazy" src="{{ asset('assets/img/icon/error__1.png') }}" alt="error">
                        </div>
                        <div class="error__text">
                            <h3>Oops... It looks like you ‘re lost !</h3>
                            <p>Oops! The page you are looking for does not exist. It might have been moved or deleted</p>
                        </div>
                        <div class="error__button">
                            <a class="default__button" href="/">Back To Home
                                <i class="icofont-simple-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
