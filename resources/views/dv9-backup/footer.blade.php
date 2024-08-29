<div class="footer">
    <div class="cont cont-large">
        <div class="footer-row" id="desktopfooter">
            @widget('Block', ['slug' => 'footer_page_links'])

            <div class="footer-col span-2">
                @widget('FooterNewsletter')

                @widget('Block', ['slug' => 'footer_contact_info'])
            </div>
        </div>

        <div class="footer-row-xs" id="mobilefooter">
            <div class="footer-col span-2 footer-row-xs-newsletter">
                @widget('FooterNewsletter')
            </div>

            @widget('Block', ['slug' => 'footer_page_link_mobile'])

            <div class="footer-col span-2 footer-row-xs-contact">
                @widget('Block', ['slug' => 'footer_contact_info'])
            </div>
        </div>
        <div class="footer-excerpt">
            <div class="logo" title="Footer"><img src="{{ asset('assets/img/logo-2.jpg') }}" alt=""></div>
            <div class="content">
                <div class="links"><a href="/service-policy">Terms &amp; Conditions</a> | <a
                        href="/privacy-statement">Privacy Policy</a> | <a href="/site-map">Site Map</a></div>
                <h6 class="copyright">Copyright &copy; 2024 Noel Gifts International Ltd. All rights reserved.</h6>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
<!-- Modal End -->

<div class="lightbox" id="cartSingUp">
    <div class="lightbox-container">
        <div class="wrapper signup_login">
            <div class="signup_login-left">
                <div class="signup_login-left--bot">
                    <h2 class="title">Are You New?</h2>
                    <div class="info">
                        <!--p>Receive 10% off your first purchase as a new customer!</p-->
                        <!--<p styla="font-weight:600">10% OFF your first purchase</p>-->
                        <p>Sign up and Receive <strong style="font-weight: 600;">10% off your first purchase</strong> as
                            a new customer</p>
                        <p class="small">
                            Terms &amp; Conditions Apply<!--?xml version="1.0" encoding="utf-8"-->
                            <!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                            <svg version="1.1" id="Isolation_Mode" xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125"
                                style="enable-background:new 0 0 100 125;" xml:space="preserve">
                                <style type="text/css">
                                    .st0-questionmarksvg {
                                        font-family: 'Montserrat-Regular';
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
                        <h6 class="small light info-message">T&amp;C: The promo code will be automatically reflected in
                            the "Promo Code" section in your Profile page once you have successfully signed up.
                            Discount is only valid for regular priced items, excluding Best Buy, Houseproud, Festive
                            Hampers (Mid-Autumn Festival, Hari Raya, Deepavali, Christmas, Chinese New Year and
                            Valentine's Day) and International Orders.
                            Not valid in conjunction with other discounts, rewards and privileges.
                            No minimum purchase is required.</h6>
                    </div>
                </div>
                <!--h2 class="title">Why do we need you to log in/sign up?</h2-->
                <h2 class="title" style="margin-bottom: 10px !important">Why Sign Up / Log In?</h2>
                <h5 style="font-style: italic !important;margin-bottom:25px !important">Enjoy convenience & exclusive
                    perks not to be missed...</h5>

                <ul>
                    <li>Faster checkout process</li>
                    <li>Incredible savings & promotions</li>
                    <li>Access Exclusive Partner Rewards & Benefits</li>
                    <li>Access your address book</li>
                    <li>Save your cart</li>
                    <li>View your order history</li>
                    <li>Check delivery status</li>
                    <li>Earn and redeem reward points</li>
                </ul>
            </div>
            <div class="signup_login-right">
                <form class="form login" method="POST" name="login-form" id="login-form" enctype="multipart/form-data"
                    action="{{ route('login') }}">
                    <input type="hidden" id="back_login_url" name="back_login_url" value="{{ url()->current() }}" />
                    @csrf
                    <div class="form-grp header-grp">
                        <div class="form-row header">
                            <h2 class="form-field bold title">Login</h2>
                        </div>
                        <div class="form-row social-auth">

                            <a href="{{ url('/redirect/facebook') }}" class="form-field button fb">
                                <!DOCTYPE svg
                                    PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
                                <svg version="1.1" class="facebook-svg" xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="60.734px"
                                    height="60.733px" viewBox="0 0 60.734 60.733"
                                    style="enable-background:new 0 0 60.734 60.733;" xml:space="preserve">
                                    <g>
                                        <path
                                            d="M57.378,0.001H3.352C1.502,0.001,0,1.5,0,3.353v54.026c0,1.853,1.502,3.354,3.352,3.354h29.086V37.214h-7.914v-9.167h7.914
                            v-6.76c0-7.843,4.789-12.116,11.787-12.116c3.355,0,6.232,0.251,7.071,0.36v8.198l-4.854,0.002c-3.805,0-4.539,1.809-4.539,4.462
                            v5.851h9.078l-1.187,9.166h-7.892v23.52h15.475c1.852,0,3.355-1.503,3.355-3.351V3.351C60.731,1.5,59.23,0.001,57.378,0.001z" />
                                    </g>

                                </svg>
                                Login with facebook
                            </a>


                            <a href="{{ url('/redirect/google') }}" class="form-field button google">
                                <svg version="1.1" class="google-svg" xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512"
                                    style="enable-background:new 0 0 512 512;" xml:space="preserve">
                                    <g>
                                        <g>
                                            <polygon
                                                points="448,224 448,160 416,160 416,224 352,224 352,256 416,256 416,320 448,320 448,256 512,256 512,224    " />
                                        </g>
                                    </g>
                                    <g>
                                        <g>
                                            <path d="M160,224v64h90.528c-13.216,37.248-48.8,64-90.528,64c-52.928,0-96-43.072-96-96c0-52.928,43.072-96,96-96
                            c22.944,0,45.024,8.224,62.176,23.168l42.048-48.256C235.424,109.824,198.432,96,160,96C71.776,96,0,167.776,0,256
                            s71.776,160,160,160s160-71.776,160-160v-32H160z" />
                                        </g>
                                    </g>
                                </svg>
                                Login with Google
                            </a>

                        </div>
                    </div>
                    <div class="form-grp input-grp">
                        <div class="alert alert-primary" role="alert" id="login-message"></div>

                        <div class="form-row">
                            <input id="login_email" type="email"
                                class="form-field @error('email') is-invalid @enderror" name="email"
                                placeholder="Email" value="{{ old('email') ?? '' }}" required autocomplete="email"
                                autofocus>
                        </div>
                        <div class="form-row">
                            <input id="login_password" type="password"
                                class="form-field @error('password') is-invalid @enderror" value=""
                                name="password" placeholder="Password" required autocomplete="current-password">
                        </div>
                        <div class="form-row">
                            <div class="form-field checkbox">
                                <div class="checkbox-group">
                                    <input type="checkbox" name="account_type" value="2" />
                                    <div class="tick"><!--?xml version="1.0" encoding="utf-8"-->
                                        <!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                            viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;"
                                            xml:space="preserve">
                                            <path d="M461.6,109.6l-54.9-43.3c-1.7-1.4-3.8-2.4-6.2-2.4c-2.4,0-4.6,1-6.3,2.5L194.5,323c0,0-78.5-75.5-80.7-77.7
  s-5.1-5.9-9.5-5.9s-6.4,3.1-8.7,5.4c-1.7,1.8-29.7,31.2-43.5,45.8c-0.8,0.9-1.3,1.4-2,2.1c-1.2,1.7-2,3.6-2,5.7c0,2.2,0.8,4,2,5.7
  l2.8,2.6c0,0,139.3,133.8,141.6,136.1s5.1,5.2,9.2,5.2c4,0,7.3-4.3,9.2-6.2l249.1-320c1.2-1.7,2-3.6,2-5.8
  C464,113.5,463,111.4,461.6,109.6z" />
                                        </svg>

                                    </div>
                                    <h5 class="checkbox-label grey light">Tick to login for a corporate account</h5>
                                </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <input type="hidden" name="g-recaptcha-response" id="g-recaptcha-response" />

                            <input class="form-field button" type="buton" value="Submit" onclick="submitLogin()">
                        </div>
                    </div>
                    <div class="form-grp footer-grp">
                        <div class="form-row">
                            <h5 class="form-field"><a href="{{ route('password.request') }}">Forget password</a></h5>
                        </div>
                        <div class="form-row">
                            <h5 class="form-field">New to Noel? <a id="goToSignupForm">Create an account</a></h5>
                        </div>
                        <div class="form-row">
                            <h5 class="form-field"> <a href="{{ url('checkout/guest') }}">Checkout as Guest</a></h5>
                        </div>
                    </div>
                </form>
                <form class="form signup" method="POST" name="signup-form" id="signup-form"
                    enctype="multipart/form-data" action="{{ route('register') }}">
                    @csrf
                    <input type="hidden" id="back_url" name="back_url" value="{{ url()->current() }}" />
                    <div class="form-grp header-grp">
                        <div class="form-row header">
                            <h2 class="form-field bold title">Sign up</h2>
                        </div>
                        <div class="form-row social-auth"><a href="{{ url('/redirect/facebook') }}"
                                class="form-field button fb">
                                <!--?xml version="1.0" encoding="iso-8859-1"-->
                                <!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->

                                <svg version="1.1" class="facebook-svg" xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="60.734px"
                                    height="60.733px" viewBox="0 0 60.734 60.733"
                                    style="enable-background:new 0 0 60.734 60.733;" xml:space="preserve">
                                    <g>
                                        <path
                                            d="M57.378,0.001H3.352C1.502,0.001,0,1.5,0,3.353v54.026c0,1.853,1.502,3.354,3.352,3.354h29.086V37.214h-7.914v-9.167h7.914
                v-6.76c0-7.843,4.789-12.116,11.787-12.116c3.355,0,6.232,0.251,7.071,0.36v8.198l-4.854,0.002c-3.805,0-4.539,1.809-4.539,4.462
                v5.851h9.078l-1.187,9.166h-7.892v23.52h15.475c1.852,0,3.355-1.503,3.355-3.351V3.351C60.731,1.5,59.23,0.001,57.378,0.001z">
                                        </path>
                                    </g>

                                </svg>
                                Sign up with facebook</a><a href="{{ url('/redirect/google') }}"
                                class="form-field button google">
                                <!--?xml version="1.0" encoding="iso-8859-1"-->
                                <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                                <svg version="1.1" class="google-svg" xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512"
                                    style="enable-background:new 0 0 512 512;" xml:space="preserve">
                                    <g>
                                        <g>
                                            <polygon
                                                points="448,224 448,160 416,160 416,224 352,224 352,256 416,256 416,320 448,320 448,256 512,256 512,224    ">
                                            </polygon>
                                        </g>
                                    </g>
                                    <g>
                                        <g>
                                            <path d="M160,224v64h90.528c-13.216,37.248-48.8,64-90.528,64c-52.928,0-96-43.072-96-96c0-52.928,43.072-96,96-96
                c22.944,0,45.024,8.224,62.176,23.168l42.048-48.256C235.424,109.824,198.432,96,160,96C71.776,96,0,167.776,0,256
                s71.776,160,160,160s160-71.776,160-160v-32H160z"></path>
                                        </g>
                                    </g>
                                </svg>
                                Sign Up with Google</a></div>
                        <div class="form-row info-div">
                            <p class="bold">Receive 10% off your first purchase as a new customer!</p>
                            <p class="small">
                                Terms &amp; Conditions Apply<!--?xml version="1.0" encoding="utf-8"-->
                                <!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                                <svg version="1.1" id="Isolation_Mode" xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125"
                                    style="enable-background:new 0 0 100 125;" xml:space="preserve">
                                    <style type="text/css">
                                        .st0-questionmarksvg {
                                            font-family: 'Montserrat-Regular';
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
                            <h6 class="small light info-message">T&amp;C: Discount will be applied automatically on
                                eligible items upon sign up. Valid for regular price items, excluding Best Buy, Add-Ons,
                                Houseproud Electronic Gifts, Valentine’s and Festive Collections (Mid-Autumn Festival,
                                Deepavali, Hari Raya, Christmas and Chinese New Year). Not valid for International
                                Orders. Not valid on Delivery Fee and Personalization services. Not valid in conjunction
                                with other discounts, rewards and privileges. No min purchase is required. Payment by
                                credit card or bank transfers only.</h6>
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
                                autofocus>
                        </div>
                        <div class="form-row">
                            <input id="register_email" type="email"
                                class="form-field @error('email') is-invalid @enderror" name="email"
                                value="{{ old('email') ?? '' }}" placeholder="Email" required autocomplete="email">
                        </div>
                        <!-- <div class="form-row register_dob">
                    <input id="register_dob" type="text" class="form-field dd-dob" name="dob" value="" placeholder="Date of Birth" required autocomplete="dob">
                  </div>
                  <div class="form-row register_industry" style="display:none">
                    <select class="form-field" name="industry_code">
                      <option value="">Industry</option>
                      @if (isset($industries))
                        @foreach ($industries as $industry)
<option value="{{ $industry->industry_code }}">{{ $industry->industry_name }}</option>
@endforeach
                      @endif
                    </select>
                  </div> -->
                        <div class="form-row">
                            <input id="register_password" type="password"
                                class="form-field @error('password') is-invalid @enderror" value=""
                                name="password" placeholder="Password" required autocomplete="new-password">
                        </div>
                        <div class="form-row">
                            <input id="register_password-confirm" type="password" class="form-field"
                                name="password_confirmation" value="" placeholder="Retype Password" required
                                autocomplete="new-password">
                        </div>
                        <!-- <div class="form-row register_doc" style="display:none">
                    <input id="register_doc" type="file" class="form-field" name="doc" value="" placeholder="Date of Birth" required autocomplete="new-password">
                  </div> -->
                        <div class="form-row">
                            <div class="form-field checkbox">
                                <div class="checkbox-group">
                                    <input type="checkbox" id="register_account_type" name="account_type"
                                        value="2" />
                                    <div class="tick"><!--?xml version="1.0" encoding="utf-8"-->
                                        <!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                            viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;"
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
                        <div class="form-row row-industries">
                            <select id="register_industry_code" class="form-field" name="industry_code">
                                @foreach ($industries as $industries)
                                    <option value="{{ $industries->industry_code }}">{{ $industries->industry_name }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-row">
                            <input type="hidden" name="g-recaptcha-response" id="g-recaptcha-response" />
                            <input class="form-field button" type="button" value="Sign Up"
                                onclick="submitSignup()">
                        </div>
                    </div>
                    <div class="form-grp footer-grp">
                        <div class="form-row">
                            <h5 class="form-field">Already have an account? <a id="goToLoginForm">Log in</a></h5>
                        </div>
                        <div class="form-row">
                            <h5 class="form-field"><a href="{{ url('checkout/guest') }}">Checkout as Guest</a></h5>
                        </div>
                    </div>
                </form>
            </div>
            <div id="close"><!--?xml version="1.0" encoding="utf-8"-->
                <!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;"
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

<div class="lightbox lightbox-custom" id="onlineCartMsgPopup">
    <div class="lightbox-wrapper">
        <div class="close-btn" id="close"><!--?xml version="1.0" encoding="utf-8"?-->
            <!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve">
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
            <h2 class="small bold">Online Cart Help</h2>
        </div>
        <div class="s8 onlineCartMsgPopupBody"></div>
    </div>
</div>


@push('bottomscript')
    <script type="text/javascript" charset="utf-8">
        $(document).ready(function() {

            function isFormValid() {
                var isValid = true;

                // Your validation logic here
                // For example, check each input field
                $('#demo-form input[type="text"][required]:visible,#demo-form textarea[required]:visible').each(
                    function() {
                        if ($(this).val().trim() === '') {
                            isValid = false;
                            // You can add more specific validation messages or styling here
                        }
                    });

                return isValid;
            }

            $('#submitbutton').on('click', function() {
                // Add the loading class and disable the button
                $(this).toggleClass('button--loading', true);
                $(this).prop('disabled', true);

                // Check if the form is valid
                if (!isFormValid()) {
                    // Remove the loading class and enable the button
                    $(this).toggleClass('button--loading', false);
                    $(this).prop('disabled', false);
                } else {
                    // Submit the form
                    $('#demo-form').submit();
                }
            });

            if ($(window).width() < 960) {
                $("#desktopfooter").empty();
            } else {
                $("#mobilefooter").empty();
            }
            var dtToday = new Date();
            var month = dtToday.getMonth() + 1;
            var day = dtToday.getDate();
            var year = dtToday.getFullYear();
            if (month < 10)
                month = '0' + month.toString();
            if (day < 10)
                day = '0' + day.toString();
            var maxDate = year + '-' + month + '-' + day;

            $("input[name='delivery_date_to']").attr('min', maxDate);
            $("input[name='delivery_date_from']").attr('min', maxDate);
            $("input[name='old_delivery_date_to']").attr('min', maxDate);
            $("input[name='old_delivery_date_from']").attr('min', maxDate);

            if ($("#accountCheckbox").is(":checked")) {
                $(".presaleInquiry").hide();
                $(".postsaleAmendment").show();
                $(".order-number").show();
                $(".b_address").hide();
                $('input[name=order_amendment]').prop('required', true);
                $('input[name=inquiry_type]').prop('required', false);
                console.log("j");
            } else {
                $(".presaleInquiry").show();
                $(".postsaleAmendment").hide();
                $('input[name=order_amendment]').prop('required', false);
                $('input[name=inquiry_type]').prop('required', true);
            }

            $("input[name='delivery_date_to'],input[name='delivery_date_from'],input[name='old_delivery_date_to'],input[name='old_delivery_date_from']")
                .change(function() {
                    $(".j_date_warning").removeClass('shake');
                    $(".old_j_date_warning").removeClass('shake');
                    $(".both_j_date_warning").removeClass('shake');

                    var date = new Date();
                    var fromDate = $("input[name='delivery_date_from']").val();
                    var toDate = $("input[name='delivery_date_to']").val();
                    var oldFromDate = $("input[name='old_delivery_date_from']").val();
                    var oldToDate = $("input[name='old_delivery_date_to']").val();

                    var m = date.getMonth() + 1;
                    var d = date.getDate();
                    var y = date.getFullYear();
                    var today = y + '-' + m + '-' + d;
                    if (toDate != "" && fromDate != "") {
                        if (toDate < fromDate) {
                            $(".j_date_warning").removeAttr('hidden');
                            var toDate = $("input[name='delivery_date_to']").val("");
                            var fromDate = $("input[name='delivery_date_from']").val("");
                            $(".j_date_warning").addClass('shake');
                        } else {

                            $(".j_date_warning").attr('hidden', true);
                        }
                    }

                    if (oldToDate != "" && oldFromDate != "") {
                        if (oldToDate < oldFromDate) {
                            $(".old_j_date_warning").removeAttr('hidden');
                            var oldToDate = $("input[name='old_delivery_date_from']").val("");
                            var oldFromDate = $("input[name='old_delivery_date_to']").val("");
                            $(".old_j_date_warning").addClass('shake');
                        } else {

                            $(".old_j_date_warning").attr('hidden', true);
                        }
                    }

                    // if (toDate != "" && fromDate != "" && oldToDate != "" && oldFromDate != "") {
                    //   if (toDate < oldToDate || fromDate < oldFromDate) {
                    //     $(".both_j_date_warning").removeAttr('hidden');
                    //     var toDate = $("input[name='delivery_date_to']").val("");
                    //     var fromDate = $("input[name='delivery_date_from']").val("");
                    //     var oldToDate = $("input[name='old_delivery_date_from']").val("");
                    //     var oldFromDate = $("input[name='old_delivery_date_to']").val("");
                    //     $(".both_j_date_warning").addClass('shake');
                    //   }else{
                    //     $(".both_j_date_warning").attr('hidden', true);
                    //   }
                    // }

                });

            $("#accountCheckbox").change(function() {
                if (this.checked) {
                    // Jika checkbox dicentang, sembunyikan div
                    $(".presaleInquiry").hide();
                    $(".postsaleAmendment").show();
                    $(".order-number").show();
                    $(".b_address").hide();
                    $('input[name=order_amendment]').prop('required', true);
                    $('input[name=inquiry_type]').prop('required', false);
                    console.log("j");
                } else {
                    // Jika checkbox tidak dicentang, tampilkan div
                    $(".presaleInquiry").show();
                    $(".postsaleAmendment").hide();
                    $('input[name=order_amendment]').prop('required', false);
                    $('input[name=inquiry_type]').prop('required', true);
                }
            });

            var urlLengkap = window.location.href;
            if (urlLengkap != 'https://noel-dev.dv9.com/buy-now') {
                // Saat ini berada di URL https://noel-dev.dv9.com/buy-now
                console.log('Saat ini berada di URL ' + urlLengkap + '');
                $.ajax({
                    type: 'POST',
                    url: "{{ url('remove-buy-now') }}",
                    data: {
                        "_token": "{{ csrf_token() }}"
                    },
                    success: function(response) {
                        // Tanggapan dari server
                        if (response.message === 'ok') {
                            // Pesan adalah "ok", maka reload halaman
                            location.reload();
                        } else {
                            console.log('Pesan respons:', response.message);
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.error('Terjadi kesalahan:', textStatus, errorThrown);
                    }
                });
            }

            $("select[name='inquiry_type']").change(function() {
                $("input[name='order_number']").attr("required", false);
                $("input[name='estimate_delivery_date']").attr("type", "text");
                var selectedValue = $(this).val();
                if (selectedValue == "Product Inquiry" || selectedValue == "Promo Code Issues" ||
                    selectedValue == "Flower Subscription Inquiry") {
                    $(".occasion").hide();
                    $(".budget").hide();
                    $(".qty").hide();
                    $(".d_address").hide();
                    $(".order-number").hide();
                    $(".delivery_date").hide();
                    $(".old_delivery_date").hide();
                    $(".delivery_timing").hide();
                    $(".old_delivery_timing").hide();

                    if (selectedValue == "Product Inquiry") {
                        $(".delivery_location").show();
                        $(".estimate_delivery_date").show();
                        $(".product_preferences").show();
                    } else {
                        $(".delivery_location").hide();
                        $(".estimate_delivery_date").hide();
                        $(".product_preferences").hide();
                    }

                    $(".fullname").attr("placeholder", "Name*");
                    $(".email").attr("placeholder", "Email*");
                    $(".contact").attr("placeholder", "Mobile Number*");
                    $(".comment").attr("placeholder", "Comment*");
                    $(".b_address_input").attr("placeholder", "Billing Address");
                    $(".order").attr("placeholder", "Order Number*");
                    $(".delivery").attr("placeholder", "Delivery Address");
                    $(".occasion-select").text("Occasion");
                } else if (selectedValue == "Sales Inquiry" || selectedValue == "Request For Quote") {
                    $(".occasion").show();
                    $(".budget").show();
                    $(".qty").hide();
                    $(".d_address").hide();
                    $(".order-number").hide();
                    $(".delivery_date").hide();
                    $(".old_delivery_date").hide();
                    $(".delivery_timing").hide();
                    $(".old_delivery_timing").hide();
                    $(".delivery_location").show();
                    $(".estimate_delivery_date").show();
                    $(".product_preferences").show();

                    $(".fullname").attr("placeholder", "Name*");
                    $(".email").attr("placeholder", "Email*");
                    $(".contact").attr("placeholder", "Mobile Number*");
                    $(".comment").attr("placeholder", "Comment*");
                    $(".b_address_input").attr("placeholder", "Billing Address");
                    $(".order").attr("placeholder", "Order Number*");
                    $(".delivery").attr("placeholder", "Delivery Address");
                    $(".occasion-select").text("Occasion");
                } else if (selectedValue == "Overseas Delivery Inquiry" || selectedValue ==
                    "Bulk Order Inquiry") {
                    $(".occasion").show();
                    $(".budget").show();
                    $(".qty").show();
                    $(".d_address").show();
                    $(".order-number").hide();
                    $(".delivery_date").hide();
                    $(".old_delivery_date").hide();
                    $(".delivery_timing").hide();
                    $(".old_delivery_timing").hide();
                    $(".delivery_location").show();
                    $(".estimate_delivery_date").show();
                    $(".product_preferences").show();

                    if (selectedValue == "Bulk Order Inquiry") {
                        $(".delivery_location").hide();
                    }

                    $(".fullname").attr("placeholder", "Name*");
                    $(".email").attr("placeholder", "Email*");
                    $(".contact").attr("placeholder", "Mobile Number*");
                    $(".comment").attr("placeholder", "Comment*");
                    $(".b_address_input").attr("placeholder", "Billing Address");
                    $(".order").attr("placeholder", "Order Number*");
                    $(".delivery").attr("placeholder", "Delivery Address");
                    $(".occasion-select").text("Occasion");
                } else if (selectedValue == "Customisation Gifting Request") {
                    $(".occasion").show();
                    $(".budget").show();
                    $(".qty").show();
                    $(".d_address").hide();
                    $(".order-number").hide();
                    $(".delivery_date").hide();
                    $(".old_delivery_date").hide();
                    $(".delivery_timing").hide();
                    $(".old_delivery_timing").hide();
                    $(".delivery_location").show();
                    $(".estimate_delivery_date").show();
                    $(".product_preferences").show();

                    $(".fullname").attr("placeholder", "Name*");
                    $(".email").attr("placeholder", "Email*");
                    $(".contact").attr("placeholder", "Mobile Number*");
                    $(".comment").attr("placeholder", "Comment*");
                    $(".b_address_input").attr("placeholder", "Billing Address");
                    $(".order").attr("placeholder", "Order Number*");
                    $(".delivery").attr("placeholder", "Delivery Address");
                    $(".occasion-select").text("Occasion");
                } else if (selectedValue == "Corporate Services Inquiry") {
                    $(".occasion").hide();
                    $(".budget").hide();
                    $(".qty").show();
                    $(".d_address").hide();
                    $(".order-number").hide();
                    $(".delivery_date").hide();
                    $(".old_delivery_date").hide();
                    $(".delivery_timing").hide();
                    $(".old_delivery_timing").hide();
                    $(".delivery_location").show();
                    $(".estimate_delivery_date").show();
                    $(".product_preferences").show();

                    $(".fullname").attr("placeholder", "Name*");
                    $(".email").attr("placeholder", "Email*");
                    $(".contact").attr("placeholder", "Mobile Number*");
                    $(".comment").attr("placeholder", "Comment*");
                    $(".b_address_input").attr("placeholder", "Billing Address");
                    $(".order").attr("placeholder", "Order Number*");
                    $(".delivery").attr("placeholder", "Delivery Address");
                    $(".occasion-select").text("Occasion");
                } else if (selectedValue == "Request For Catalogue") {
                    $(".occasion").show();
                    $(".budget").hide();
                    $(".qty").hide();
                    $(".d_address").hide();
                    $(".order-number").hide();
                    $(".delivery_date").hide();
                    $(".old_delivery_date").hide();
                    $(".delivery_timing").hide();
                    $(".old_delivery_timing").hide();
                    $(".delivery_location").hide();
                    $(".estimate_delivery_date").hide();
                    $(".product_preferences").hide();

                    $(".fullname").attr("placeholder", "Name*");
                    $(".email").attr("placeholder", "Email*");
                    $(".contact").attr("placeholder", "Mobile Number*");
                    $(".comment").attr("placeholder", "Comment*");
                    $(".delivery").attr("placeholder", "Delivery Address*");
                    $(".occasion-select").text("Occasion*");
                    $(".b_address_input").attr("placeholder", "Billing Address");
                    $(".order").attr("placeholder", "Order Number*");
                }
            });

            $("select[name='order_amendment']").change(function() {
                var selectedValue = $(this).val();

                $("input[name='order_number']").attr("required", true);
                if (selectedValue == "Amendment on Delivery Date/Timing" || selectedValue ==
                    "Amendment on Delivery Address" || selectedValue == "Amendment on Message card" ||
                    selectedValue == "Change of Item") {
                    $(".order-number").show();
                    $(".occasion").hide();
                    $(".budget").hide();
                    $(".qty").hide();
                    $(".d_address").hide();
                    $(".b_address").hide();
                    $(".uploadFoto").hide();
                    $(".delivery_date").hide();
                    $(".old_delivery_date").hide();
                    $(".delivery_timing").hide();
                    $(".old_delivery_timing").hide();

                    if (selectedValue == "Amendment on Delivery Date/Timing") {
                        $(".delivery_date").show();
                        $(".old_delivery_date").show();

                        $(".delivery_timing").show();
                        $(".old_delivery_timing").show();

                        $("input[name='old_delivery_date_from']").attr("required", true);
                        $("input[name='old_delivery_date_to']").attr("required", true);
                        $("input[name='delivery_date_from']").attr("required", true);
                        $("input[name='delivery_date_to']").attr("required", true);
                        $("select[name='old_delivery_timing']").attr("required", true);
                        $("select[name='new_delivery_timing']").attr("required", true);

                    } else if (selectedValue == "Amendment on Message card" || selectedValue ==
                        "Amendment on Delivery Address") {

                        $(".old_delivery_date").show();

                        $(".old_delivery_timing").show();


                        $("input[name='old_delivery_date_from']").attr("required", true);
                        $("input[name='old_delivery_date_to']").attr("required", true);
                        $("select[name='old_delivery_timing']").attr("required", true);

                    } else {
                        $("input[name='old_delivery_date_from']").attr("required", false);
                        $("input[name='old_delivery_date_to']").attr("required", false);
                        $("input[name='delivery_date_from']").attr("required", false);
                        $("input[name='delivery_date_to']").attr("required", false);
                        $("select[name='old_delivery_timing']").attr("required", false);
                        $("select[name='new_delivery_timing']").attr("required", false);
                        $(".date_show").hide();
                        $(".delivery_date").hide();
                        $(".old_delivery_date").hide();
                        $(".timing_show").hide();
                        $(".delivery_timing").hide();
                        $(".old_delivery_timing").hide();
                    }



                    // if (selectedValue == "Amendment on Delivery Timing") {
                    //     $(".timing_show").show();

                    //     if($("#change_timing").is(":checked")){
                    //       $(".delivery_timing").show();
                    // $(".old_delivery_timing").show();
                    //     }else{
                    //       $(".delivery_timing").hide();
                    // $(".old_delivery_timing").hide();
                    //     }

                    //     $("#change_timing").change(function () {
                    //       if (this.checked) {
                    //         $(".delivery_timing").show();
                    // $(".old_delivery_timing").show();
                    //       } else {
                    //         $(".delivery_timing").hide();
                    // $(".old_delivery_timing").hide();
                    //       }
                    //     });

                    //   }else{
                    //     $(".timing_show").hide();
                    //     $(".delivery_timing").hide();
                    //  $(".old_delivery_timing").hide();

                    //   }

                    if (selectedValue == "Amendment on Delivery Address") {
                        $(".new_delivery_address").show();

                        $("input[name='new_delivery_address']").attr("required", true);
                    } else {
                        $(".new_delivery_address").hide();

                        $("input[name='new_delivery_address']").attr("required", false);
                    }



                    $(".fullname").attr("placeholder", "Name*");
                    $(".email").attr("placeholder", "Email*");
                    $(".contact").attr("placeholder", "Mobile Number*");
                    $(".comment").attr("placeholder", "Comment*");
                    $(".b_address_input").attr("placeholder", "Billing Address");
                    $(".order").attr("placeholder", "Order Number*");
                    $(".delivery").attr("placeholder", "Delivery Address");
                    $(".occasion-select").text("Occasion");
                } else if (selectedValue == "Feedback on product related" || selectedValue ==
                    "Feedback on service quality" || selectedValue == "Feedback on delivery Service" ||
                    selectedValue == "General Feedback" || selectedValue == "Compliments") {
                    $(".occasion").hide();
                    $(".budget").hide();
                    $(".qty").hide();
                    $(".d_address").hide();
                    $(".order-number").show();
                    $(".b_address").hide();
                    $(".uploadFoto").show();
                    $(".delivery_date").hide();
                    $(".delivery_date").hide();
                    $(".old_delivery_date").hide();
                    $(".delivery_timing").hide();
                    $(".old_delivery_timing").hide();

                    if (selectedValue == "Feedback on product related") {
                        $(".fullname").attr("placeholder", "Name*");
                        $(".email").attr("placeholder", "Email*");
                        $(".contact").attr("placeholder", "Mobile Number*");
                        $(".comment").attr("placeholder", "Comment*");
                        $(".b_address_input").attr("placeholder", "Billing Address");
                        $(".order").attr("placeholder", "Order Number*");
                        $(".delivery").attr("placeholder", "Delivery Address");
                        $(".occasion-select").text("Occasion");
                        $(".textUpImage").text("Upload Image(s) *");
                    } else {
                        $(".fullname").attr("placeholder", "Name*");
                        $(".email").attr("placeholder", "Email*");
                        $(".contact").attr("placeholder", "Mobile Number*");
                        $(".comment").attr("placeholder", "Comment*");
                        $(".b_address_input").attr("placeholder", "Billing Address");
                        $(".order").attr("placeholder", "Order Number*");
                        $(".delivery").attr("placeholder", "Delivery Address");
                        $(".occasion-select").text("Occasion");
                        $(".textUpImage").text("(Optional) Upload Image(s)");
                    }
                } else if (selectedValue == "Online Order Payment Issues" || selectedValue ==
                    "Order Cancellation") {
                    $(".occasion").hide();
                    $(".budget").hide();
                    $(".qty").hide();
                    $(".d_address").hide();
                    $(".b_address").hide();
                    $(".order-number").show();
                    $(".uploadFoto").hide();
                    $(".delivery_date").hide();
                    $(".delivery_date").hide();
                    $(".old_delivery_date").hide();
                    $(".delivery_timing").hide();
                    $(".old_delivery_timing").hide();

                    if (selectedValue == "Online Order Payment Issues") {
                        $(".fullname").attr("placeholder", "Name*");
                    } else {
                        $(".fullname").attr("placeholder", "Name*");
                    }

                    $(".email").attr("placeholder", "Email*");
                    $(".contact").attr("placeholder", "Mobile Number*");
                    $(".comment").attr("placeholder", "Comment*");
                    $(".b_address_input").attr("placeholder", "Billing Address");
                    $(".order").attr("placeholder", "Order Number*");
                    $(".delivery").attr("placeholder", "Delivery Address");
                    $(".occasion-select").text("Occasion");
                } else if (selectedValue == "Billing Issues") {
                    $(".occasion").hide();
                    $(".budget").hide();
                    $(".qty").hide();
                    $(".d_address").hide();
                    $(".b_address").show();
                    $(".order-number").show();
                    $(".uploadFoto").hide();
                    $(".delivery_date").hide();
                    $(".delivery_date").hide();
                    $(".old_delivery_date").hide();
                    $(".delivery_timing").hide();
                    $(".old_delivery_timing").hide();

                    $(".fullname").attr("placeholder", "Name*");
                    $(".email").attr("placeholder", "Email*");
                    $(".contact").attr("placeholder", "Mobile Number*");
                    $(".comment").attr("placeholder", "Comment*");
                    $(".b_address_input").attr("placeholder", "Billing Address*");
                    $(".order").attr("placeholder", "Order Number*");
                    $(".delivery").attr("placeholder", "Delivery Address");
                    $(".occasion-select").text("Occasion");
                }
            });

            if ($("select[name='inquiry_type']").val() != null) {
                $("select[name='inquiry_type']").change();
            } else {
                console.log("null");
            }

            if ($("select[name='order_amendment']").val() != null) {
                $("select[name='order_amendment']").change();
            } else {
                console.log("null");
            }

            setTimeout(function() {
                $('#error-message').fadeOut('fast');
            }, 3000); // 5000 milidetik (5 detik)

            $('#login_email, #login_password').keyup(function(event) {
                console.log(event.keyCode);
                if (event.keyCode == 13 && $('#login_email').val() != "" && $('#login_password').val() !=
                    "") {
                    submitLogin();
                }
            });

            $('input[name=account_type]').change(function(event) {
                if ($(this).is(":checked")) {
                    $(".register_dob").hide()
                    $(".register_doc").show()
                    $(".register_industry").show()
                } else {
                    $(".register_dob").show()
                    $(".register_doc").hide()
                    $(".register_industry").hide()
                }

            });

            $("#footerCollaspeBtn4").click(function() {
                $("#footerCollaspe4").slideToggle(), $(this).toggleClass("open")
            });
            $("#footerCollaspeBtn5").click(function() {
                $("#footerCollaspe5").slideToggle(), $(this).toggleClass("open")
            });

            $('input[name=account_type]').change(function(event) {
                if ($(this).is(":checked")) {
                    $(".register_dob").hide()
                    $(".register_doc").show()
                    $(".register_industry").show()
                } else {
                    $(".register_dob").show()
                    $(".register_doc").hide()
                    $(".register_industry").hide()
                }
            });

            // $(document).on('click', '#online-cart-help-link', function(e) {

            // });

            onlineCartMsgPopupLightbox = new Lightbox("#onlineCartMsgPopup", ".online-cart-help-link"), $(
                ".online-cart-help-link").click(function(event) {
                $.get('{{ url('cart/help') }}', function(res) {
                    $('.onlineCartMsgPopupBody').html(res.msg);
                    $("#onlineCartMsgPopup").show();
                })
            });
        });

        function submitSignup() {

            var formData = $("#signup-form").serialize();

            //$("#quickviewPopup").html("Loading...");
            $('#sign-message').html('Loading....').slideDown(800);
            $.ajax({
                url: "{{ url('register') }}",
                type: "POST",
                dataType: "json",
                async: false,
                data: formData,
                success: handleResponseSignUpForm
            });

        }

        function handleResponseSignUpForm(data) {
            console.log(data);
            if (data.status == 0) {
                reloadCaptcha();
                var msg = data.messages.join("<br>");
                $('#sign-message').html(msg).delay(5000).slideUp(800);
            } else {
                $('#sign-message').html('success');
                //alert('redirect to: '.data.url);
                if (data.type == 2) {
                    window.location.href = "../member/profile";
                } else {
                    window.location.href = $('#back_url').val();
                }
            }
        }

        function submitLogin() {
            var formData = $("#login-form").serialize();

            //$("#quickviewPopup").html("Loading...");
            $('#login-message').html('Loading....').slideDown(800);
            $.ajax({
                url: "{{ url('login') }}",
                type: "POST",
                dataType: "json",
                async: false,
                data: formData,
                success: handleResponseLoginForm
            });

        }

        function handleResponseLoginForm(data) {
            // console.log(data);
            if (data.status == 1) {
                $('#login-message').html('success');
                //alert('redirect to: '.data.url);
                window.location.href = data.last_url;
            } else {
                var msg = data.messages.join("<br>");
                $('#login-message').html(msg).delay(5000).slideUp(800);


            }
        }
    </script>
@endpush
