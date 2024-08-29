@extends('frontend.layouts.app') @section('content')
    <style type="text/css">
        .signup_login {
            background-color: #fff;
            max-width: calc(100% - 30px);
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
        }

        .signup_login-left {
            /*width: 362px;*/
            padding: 0 55px;
            background-image: url(https://www.noelgifts.com/assets/img/singup-login-bg.jpg);
            background-size: cover;
            padding: 0 30px;
            color: #fff;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;


        }

        .signup_login-right {
            padding: 60px 30px;
            width: 100%;
            border: solid 1px #d0d0d0;
        }

        .signup_login-left--bot {
            border-bottom: 1px solid #999;
            margin-bottom: 30px;
            padding-bottom: 30px;
        }

        .signup_login-left--bot .title {
            margin-bottom: 15px;
        }

        .signup_login-left--bot .info {
            cursor: pointer;
        }

        .signup_login-left--bot .info p {
            font-size: 0.875rem;
            letter-spacing: 0.03125rem;
            line-height: 1.18125rem;
            font-weight: 300;
            color: white;
        }

        .signup_login-left--bot .info p.small {
            font-size: 0.625rem;
            margin-top: 5px;
            line-height: 0.675rem;
            display: inline;
        }

        .signup_login-left--bot .info-message {
            padding: 31px;
            width: 255px;
            background-color: #f4f4f4;
            position: absolute;
            top: 73px;
            pointer-events: none;
            opacity: 0;
            z-index: 2;
            -webkit-transition: all 0.3s ease-in-out;
            -o-transition: all 0.3s ease-in-out;
            transition: all 0.3s ease-in-out;
            -webkit-transition-delay: 0s;
            -o-transition-delay: 0s;
            transition-delay: 0s;
            -webkit-transform: translateX(-50%);
            -ms-transform: translateX(-50%);
            transform: translateX(-50%);
            right: -850%;
            color: #000;
            font-size: 0.625rem;
        }

        h6.small {
            font-size: 0.75rem;
            letter-spacing: 0.03125rem;
            line-height: 1.0125rem;
        }

        .light {
            font-weight: 300;
        }

        .signup_login-left--bot .info-message:after {
            content: '';
            position: absolute;
            top: -7px;
            left: 50%;
            -webkit-transform: translateX(-50%);
            -ms-transform: translateX(-50%);
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-bottom: 8px solid #f4f4f4;
        }

        .signup_login-left .title {
            font-size: 1.5625rem;
            letter-spacing: 0.01875rem;
            line-height: 2.10938rem;
            margin-bottom: 25px;
        }

        .signup_login-left ul {
            padding-left: 30px;
        }

        .signup_login-left li {
            margin-bottom: 15px;
            font-size: 0.875rem;
            letter-spacing: 0.03125rem;
            line-height: 1.18125rem;
            font-weight: 300;
        }

        .signup_login-left li:before {
            content: '';
            width: 13px;
            height: 13px;
            background-image: url(https://www.noelgifts.com/assets/img/checkmark.png);
            background-size: contain;
            background-repeat: no-repeat;
            position: absolute;
            top: 3px;
            left: -28px;
        }

        .signup_login .header-grp {
            border-bottom: 1px solid #eee;
            padding-bottom: 19px;
            margin-bottom: 19px;
        }

        .form-row.header {
            -ms-flex-wrap: nowrap;
            flex-wrap: nowrap;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
        }

        .signup_login .form .title {
            font-size: 1.875rem;
            letter-spacing: 0.01875rem;
            line-height: 2.53125rem;
        }

        .form-row.header .title {
            width: 90%;
        }

        .form-field {
            width: 100%;
            margin-bottom: 14px;
        }

        .bold,
        b,
        strong {
            font-weight: bold;
        }

        .form .info-div {
            cursor: pointer;
            margin-bottom: 20px;
            display: block;
        }

        .form-row {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
        }

        .form .info-div p {
            font-size: 0.875rem;
            letter-spacing: 0.03125rem;
            line-height: 1.18125rem;
            font-weight: 300;
        }

        .form .info-div p.small {
            font-size: 0.625rem;
            margin-top: 5px;
            line-height: 0.675rem;
            display: inline;
        }

        .form .info-div .info-message {
            padding: 31px;
            width: 255px;
            background-color: #f4f4f4;
            position: absolute;
            top: 66px;
            pointer-events: none;
            opacity: 0;
            z-index: 2;
            -webkit-transition: all 0.3s ease-in-out;
            -o-transition: all 0.3s ease-in-out;
            transition: all 0.3s ease-in-out;
            -webkit-transition-delay: 0s;
            -o-transition-delay: 0s;
            transition-delay: 0s;
            -webkit-transform: translateX(-50%);
            -ms-transform: translateX(-50%);
            transform: translateX(-50%);
            right: none;
            color: #000;
            bottom: inherit;
            font-size: 0.625rem;
            left: 50%;
        }

        .signup_login .input-grp {
            margin-bottom: 10px;
        }

        .form .alert {
            color: #c5161d;
            font-size: 0.875rem;
            letter-spacing: 0.0125rem;
            line-height: 1.18125rem;
        }

        .form-row {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
        }

        .signup_login .footer-grp {
            margin-bottom: 0;
        }

        .signup_login-left--bot .info svg {
            position: absolute;
            width: 14px;
            height: 14px;
            right: -16px;
            top: 1px;
            color: white;
        }

        #close {
            position: absolute;
            width: 19px;
            height: 19px;
            top: 30px;
            right: 25px;
            cursor: pointer;
        }
    </style>
    <div class="s22-block-inner">
        <div class="cont cont-small">
            <div class="wrapper signup_login">
                <div class="signup_login-left">
                    <div class="signup_login-left--bot">
                        <h2 class="title">Are You New?</h2>
                        <div class="info">
                            <p>Receive 10% off your first purchase as a new customer!</p>
                            <p class="small">
                                Terms &amp; Conditions Apply<!--?xml version="1.0" encoding="utf-8"-->
                                <svg version="1.1" id="Isolation_Mode" xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125"
                                    style="enable-background: new 0 0 100 125;" xml:space="preserve">
                                    <style type="text/css">
                                        .st0-questionmarksvg {
                                            font-family: "Montserrat-Regular";
                                        }

                                        .st1-questionmarksvg {
                                            font-size: 70.4693px;
                                        }
                                    </style>
                                    <g>
                                        <path d="M50,8C26.8,8,8,26.8,8,50s18.8,42,42,42s42-18.8,42-42S73.2,8,50,8z M50,88c-21,0-38-17-38-38s17-38,38-38s38,17,38,38
                S71,88,50,88z" />
                                        <text transform="matrix(1 0 0 1 35 74.1113)"
                                            class="st0-questionmarksvg st1-questionmarksvg">?</text>
                                    </g>
                                </svg>
                            </p>
                            <h6 class="small light info-message">
                                T&amp;C: The promo code will be automatically reflected in the "Promo Code" section in your
                                Profile page once you have successfully signed up. Discount is only valid for regular priced
                                items, excluding Best Buy,
                                Houseproud, Festive Hampers (Mid-Autumn Festival, Hari Raya, Deepavali, Christmas, Chinese
                                New Year and Valentine's Day) and International Orders. Not valid in conjunction with other
                                discounts, rewards and privileges. No
                                minimum purchase is required.

                            </h6>
                        </div>
                    </div>
                    <h2 class="title">Why do we need you to log in/sign up?</h2>
                    <ul>
                        <li>Faster checkout process</li>
                        <li>Access your address book</li>
                        <li>Save your cart</li>
                        <li>View your order history</li>
                        <li>Check delivery status</li>
                        <li>Earn and redeem reward points</li>
                    </ul>
                </div>
                <div class="signup_login-right">
                    <form class="form signup" method="POST" name="signup-form" id="signup-form"
                        action="{{ route('register') }}">
                        @csrf
                        <input type="hidden" id="back_url" name="back_url" value="{{ url()->current() }}" />
                        <div class="form-grp header-grp">
                            <div class="form-row header">
                                <h2 class="form-field bold title">Sign up </h2>
                            </div>
                            <div class="form-row info-div">
                                <p class="bold">Receive 10% off your first purchase as a new customer!</p>
                                <p class="small">
                                    Terms &amp; Conditions Apply<!--?xml version="1.0" encoding="utf-8"-->
                                    <!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                                    <svg version="1.1" id="Isolation_Mode" xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125"
                                        style="enable-background: new 0 0 100 125;" xml:space="preserve">
                                        <style type="text/css">
                                            .st0-questionmarksvg {
                                                font-family: "Montserrat-Regular";
                                            }

                                            .st1-questionmarksvg {
                                                font-size: 70.4693px;
                                            }
                                        </style>
                                        <g>
                                            <path d="M50,8C26.8,8,8,26.8,8,50s18.8,42,42,42s42-18.8,42-42S73.2,8,50,8z M50,88c-21,0-38-17-38-38s17-38,38-38s38,17,38,38
                S71,88,50,88z" />
                                            <text transform="matrix(1 0 0 1 35 74.1113)"
                                                class="st0-questionmarksvg st1-questionmarksvg">?</text>
                                        </g>
                                    </svg>
                                </p>
                                <h6 class="small light info-message">
                                    <!--T&amp;C: Discount will be applied automatically on eligible items upon sign up. Valid for regular price items, excluding Best Buy, Add-Ons, Houseproud Electronic Gifts, Valentine’s and Festive Collections (Mid-Autumn
                            Festival, Deepavali, Hari Raya, Christmas and Chinese New Year). Not valid for International Orders. Not valid on Delivery Fee and Personalization services. Not valid in conjunction with other discounts, rewards and
                            privileges. No min purchase is required. Payment by credit card or bank transfers only.-->
                                    T&amp;C: The promo code will be automatically reflected in the "Promo Code" section in
                                    your Profile page once you have successfully signed up. Discount is only valid for
                                    regular priced items, excluding Best Buy,
                                    Houseproud, Festive Hampers (Mid-Autumn Festival, Hari Raya, Deepavali, Christmas,
                                    Chinese New Year and Valentine's Day) and International Orders. Not valid in conjunction
                                    with other discounts, rewards and privileges. No minimum purchase is required.
                                </h6>
                            </div>
                            <div class="form-row social-auth">
                                <!-- <a href="{{ url('/redirect/facebook') }}" class="form-field button fb">
                <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
                <svg version="1.1" class="facebook-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    width="60.734px" height="60.733px" viewBox="0 0 60.734 60.733" style="enable-background:new 0 0 60.734 60.733;"
                    xml:space="preserve">
                <g>
                    <path d="M57.378,0.001H3.352C1.502,0.001,0,1.5,0,3.353v54.026c0,1.853,1.502,3.354,3.352,3.354h29.086V37.214h-7.914v-9.167h7.914
                    v-6.76c0-7.843,4.789-12.116,11.787-12.116c3.355,0,6.232,0.251,7.071,0.36v8.198l-4.854,0.002c-3.805,0-4.539,1.809-4.539,4.462
                    v5.851h9.078l-1.187,9.166h-7.892v23.52h15.475c1.852,0,3.355-1.503,3.355-3.351V3.351C60.731,1.5,59.23,0.001,57.378,0.001z"/>
                </g>

                </svg>
                Sign up with facebook
            </a>
            <a href="{{ url('/redirect/google') }}" class="form-field button google">
                <svg version="1.1" class="google-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                <g>
                    <g>
                    <polygon points="448,224 448,160 416,160 416,224 352,224 352,256 416,256 416,320 448,320 448,256 512,256 512,224    "/>
                    </g>
                </g>
                <g>
                    <g>
                    <path d="M160,224v64h90.528c-13.216,37.248-48.8,64-90.528,64c-52.928,0-96-43.072-96-96c0-52.928,43.072-96,96-96
                        c22.944,0,45.024,8.224,62.176,23.168l42.048-48.256C235.424,109.824,198.432,96,160,96C71.776,96,0,167.776,0,256
                        s71.776,160,160,160s160-71.776,160-160v-32H160z"/>
                    </g>
                </g>
                </svg>
                Sign Up with Google
            </a> -->
                            </div>
                        </div>

                        <div class="form-grp input-grp">
                            <div class="alert alert-primary" role="alert" id="sign-message"></div>
                            <div class="form-row">
                                <input id="register_name" type="text"
                                    class="form-field @error('name') is-invalid @enderror" name="name"
                                    value="{{ old('name') ?? '' }}" placeholder="Name" required autocomplete="name"
                                    autofocus />
                            </div>
                            <div class="form-row">
                                <input id="register_email" type="email"
                                    class="form-field @error('email') is-invalid @enderror" name="email"
                                    value="{{ old('email') ?? '' }}" placeholder="Email" required autocomplete="email" />
                            </div>
                            <div class="form-row">
                                <input id="register_password" type="password"
                                    class="form-field @error('password') is-invalid @enderror" value=""
                                    name="password" placeholder="Password" required autocomplete="new-password" />
                            </div>
                            <div class="form-row">
                                <input id="register_password-confirm" type="password" class="form-field"
                                    name="password_confirmation" value="" placeholder="Retype Password" required
                                    autocomplete="new-password" />
                            </div>
                            <div class="form-row">
                                <div class="form-field checkbox">
                                    <div class="checkbox-group">
                                        <input type="checkbox" id="register_account_type" name="account_type"
                                            value="2" />
                                        <div class="tick">
                                            <!--?xml version="1.0" encoding="utf-8"-->
                                            <!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                                            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                viewBox="0 0 512 512" style="enable-background: new 0 0 512 512;"
                                                xml:space="preserve">
                                                <path d="M461.6,109.6l-54.9-43.3c-1.7-1.4-3.8-2.4-6.2-2.4c-2.4,0-4.6,1-6.3,2.5L194.5,323c0,0-78.5-75.5-80.7-77.7
    s-5.1-5.9-9.5-5.9s-6.4,3.1-8.7,5.4c-1.7,1.8-29.7,31.2-43.5,45.8c-0.8,0.9-1.3,1.4-2,2.1c-1.2,1.7-2,3.6-2,5.7c0,2.2,0.8,4,2,5.7
    l2.8,2.6c0,0,139.3,133.8,141.6,136.1s5.1,5.2,9.2,5.2c4,0,7.3-4.3,9.2-6.2l249.1-320c1.2-1.7,2-3.6,2-5.8
    C464,113.5,463,111.4,461.6,109.6z" />
                                            </svg>
                                        </div>
                                        <h5 class="checkbox-label grey light">Tick to sign up for a corporate account</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row row-industries" style="display: none;">
                                <select id="register_industry_code" class="form-field" name="industry_code">
                                    @foreach ($industries as $industries)
                                        <option value="{{ $industries->industry_code }}">{{ $industries->industry_name }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>

                            <div class="form-row">
                                <div class="captcha">
                                    <span>{!! captcha_img() !!}</span>
                                    <button type="button" class="btn btn-danger" class="reload" id="reload"> ↻
                                    </button>
                                </div>
                            </div>
                            <div class="form-row">

                                <input type="hidden" class="form-field" name="g-recaptcha-response"
                                    id="g-recaptcha-response" />
                                <input class="form-field button" type="button" value="Sign Up"
                                    onclick="submitSignup()" />
                            </div>
                        </div>
                        <!-- <div class="form-grp footer-grp">
                    <div class="form-row">
                        <h5 class="form-field">Already have an account? <a id="goToLoginForm">Log in</a></h5>
                    </div>
                    <div class="form-row">
                        <h5 class="form-field"><a href="{{ url('checkout/guest') }}">Checkout as Guest</a></h5>
                    </div>
                </div> -->
                    </form>
                </div>
                <div id="close">
                    <!--?xml version="1.0" encoding="utf-8"-->
                    <!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px" y="0px" viewBox="0 0 100 125" style="enable-background: new 0 0 100 125;"
                        xml:space="preserve">
                        <g>
                            <polygon
                                points="66,31.2 50,47.2 34,31.2 31.2,34 47.2,50 31.2,66 34,68.8 50,52.8 66,68.8 68.8,66 52.8,50 68.8,34  " />
                            <path d="M50,8C26.8,8,8,26.8,8,50s18.8,42,42,42s42-18.8,42-42S73.2,8,50,8z M50,88c-21,0-38-17-38-38s17-38,38-38s38,17,38,38
    S71,88,50,88z" />
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    </div>

    <script type="text/javascript">
        $('#reload').click(function() {
            $.ajax({
                type: 'GET',
                url: 'reload-captcha',
                success: function(data) {
                    $(".captcha span").html(data.captcha);
                }
            });
        });
    </script>
@endsection
