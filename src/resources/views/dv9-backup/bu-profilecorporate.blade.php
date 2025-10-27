@extends('frontend.member.layout', ['class1' => 'account_personal-page', 'class2' => 's7'])
@section('member-content')
    <div class="s7-right">
        <style>
            .account_personal-page .close {
                width: 28px;
                height: 28px;
                cursor: pointer;
                position: absolute;
                top: 5px;
                right: 10px;
            }
        </style>
        <div class="s7-right-head">
            <h1 class="black italic">Standard Corporate Account</h1>
        </div>
        <form class="s7-form alt-form form" method="POST" action="{{ route('member.profile.store') }}"
            enctype="multipart/form-data" autocomplete="disable">
            @method('PUT')
            @csrf
            <div class="form-grp">
                @if ($errors->any())
                    <div class="alert alert-danger">
                        <ul>
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                <div class="form-row key-message">
                    <h5>Please upload a completed <span class="underline">Verified Corporate Account Document </span>to
                        verify your business account.</h5>
                </div>
                <div class="form-row">
                    <div class="s7-upload">
                        <!-- <label class="file-label"> -->
                        <!-- <a><h5>Upload File  -->
                        <input class="form-field" type="file" name="new_document"
                            value="{{ old('doc', $user->doc ?? '') }}" />
                        <!-- </h5></a> -->
                        <!-- <br /> -->
                        <!-- </label> -->
                    </div>
                </div>


                {{-- @if ($user->corporate()->count() > 0 && $user->corporate->document != '') --}}
                @if ($user->doc != '')
                    <div class="form-row">
                        <h5>File Received: <span class="underline"><a href="member/download-document">
                                    {{ $user->doc }}</a></span></h5>
                        <br />
                        <br />
                    </div>
                @endif

                <div class="form-row">
                    <div class="form-field head-row">
                        <h2>Company Information</h2>
                        <div class="icon">
                            <?xml version="1.0" encoding="utf-8"?>
                            <!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 98 97.8"
                                style="enable-background:new 0 0 98 97.8;" xml:space="preserve">
                                <style type="text/css">
                                    .st0 {
                                        stroke: #000000;
                                        stroke-miterlimit: 10;
                                    }
                                </style>
                                <path class="st0" d="M91,97H7c-1.1,0-2-0.9-2-2V43c0-1.1,0.9-2,2-2h84c1.1,0,2,0.9,2,2v52C93,96.1,92.1,97,91,97z M9,93h80V45H9V93z
        " />
                                <path class="st0" d="M95,45H3c-1.1,0-2-0.9-2-2V27c0-1.1,0.9-2,2-2h92c1.1,0,2,0.9,2,2v16C97,44.1,96.1,45,95,45z M5,41h88V29H5V41z
        " />
                                <path class="st0" d="M41,45h4v48h-4V45z" />
                                <path class="st0" d="M53,45h4v48h-4V45z" />
                                <path class="st0" d="M41,29h4v12h-4V29z" />
                                <path class="st0" d="M53,29h4v12h-4V29z" />
                                <path class="st0" d="M49,29c-1.1,0-2-0.9-2-2C47,7.1,37.9,5,34,5c-6.1,0-6.8,3.2-6.8,5.9c0,5.7,9,14.1,11.8,14.1c1.1,0,2,0.9,2,2
        s-0.9,2-2,2c-5,0-15.8-10.3-15.8-18.1C23.2,4.6,27.1,1,34,1c4,0,17,1.9,17,26C51,28.1,50.1,29,49,29z" />
                                <path class="st0" d="M59,29c-1.1,0-2-0.9-2-2s0.9-2,2-2c2.8,0,11.8-8.4,11.8-14.1C70.8,8.2,70.1,5,64,5c-3.9,0-13,2.1-13,22
        c0,1.1-0.9,2-2,2s-2-0.9-2-2C47,2.9,60,1,64,1c6.9,0,10.8,3.6,10.8,9.9C74.8,18.7,64,29,59,29z" />
                            </svg>

                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <label>Company Name*</label>
                    <input class="form-field field-required" type="text" name="company_name"
                        value="{{ old('company_name', $user->corporate->company_name ?? '') }}" />
                </div>
                <div class="form-row">
                    <div class="form-field col_2">
                        <label>Registration Number</label>
                        <input type="text" name="corporate_rcb"
                            value="{{ old('corporate_rcb', $user->corporate->corporate_rcb ?? '') }}">
                    </div>
                    <div class="form-field col_2">
                        <label>Contact Number</label>
                        <div class="phone">
                            <input type="tel" name="co_work_telephone_prefix" style="width:85px" placeholder="+65"
                                value="{{ old('co_work_telephone_prefix', $user->corporate->co_work_telephone_prefix ?? '+65') }}">&nbsp;
                            <input type="tel" name="co_work_telephone"
                                value="{{ old('co_work_telephone', $user->corporate->co_work_telephone ?? '') }}" />
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-field col_2">
                        <label>Country*</label>
                        <select name="country_id" class="field-required">

                            <option value=""> -- Select --</option>
                            @foreach ($country_options as $key => $val)
                                <option value="{{ $key }}"
                                    {{ old('country_id', $user->corporate->country_id ?? 'SG') == $key ? 'selected' : '' }}>
                                    {{ $val }}</option>
                            @endforeach

                        </select>
                    </div>
                    <div class="form-field col_2">
                        <label>Postal Code*</label>
                        <input type="text" name="postal_code" class="field-required"
                            value="{{ old('postal_code', $user->corporate->postal_code ?? '') }}">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-field col_2">
                        <label>Street*</label>
                        <input type="text" name="street1" class="field-required"
                            value="{{ old('street1', $user->corporate->street1 ?? '') }}">
                    </div>
                    <div class="form-field col_2">
                        <label>Building</label>
                        <input type="text" name="building"
                            value="{{ old('building', $user->corporate->building ?? '') }}" maxlength="40"
                            autocomplete="disable" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-field col_2">
                        <label>Block</label>
                        <input type="text" name="block" value="{{ old('block', $user->corporate->block ?? '') }}"
                            maxlength="10" autocomplete="disable" />
                    </div>
                    <div class="form-field col_2">
                        <label>Unit Number</label>
                        <input type="text" name="unit" value="{{ old('unit', $user->corporate->unit ?? '') }}"
                            maxlength="10" autocomplete="disable" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-field col_2">
                        <label>Cost Center Number</label>
                        <input type="text" name="cost_center_no"
                            value="{{ old('cost_center_no', $user->corporate->cost_center_no ?? '') }}">
                    </div>
                    <div class="form-field col_2">
                        <label>Purchase Order</label>
                        <input type="text" name="purchase_order"
                            value="{{ old('purchase_order', $user->corporate->purchase_order ?? '') }}">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-field">
                        <label>Contract Number</label>
                        <input type="text" name="contract_no"
                            value="{{ old('contract_no', $user->corporate->contract_no ?? '') }}">
                    </div>
                </div>
            </div>
            <div class="form-grp">
                <div class="form-row">
                    <div class="form-field head-row">
                        <h2>Authorised Purchaser</h2>
                        <div class="icon">
                            <?xml version="1.0" encoding="utf-8"?>
                            <!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 74.7 67.4"
                                style="enable-background:new 0 0 74.7 67.4;" xml:space="preserve">
                                <style type="text/css">
                                    .st0-user {
                                        stroke: #000000;
                                        stroke-width: 3;
                                        stroke-miterlimit: 10;
                                    }
                                </style>
                                <g transform="translate(0,-962.36216)">
                                    <path class="st0-user" d="M36.9,964.1c-3.2,0.1-6.3,1.3-8.8,3.3c-2.5,2-4.4,4.6-5.6,7.5c-2.4,5.8-2,12.3-0.4,18.2
        c0.9,3.3,2.3,6.7,4.6,9.5c2.3,2.8,5.6,4.9,9.3,5.2c2.1,0.2,4.1-0.2,6-1c1.9-0.8,3.5-2,4.9-3.4c2.8-2.9,4.5-6.5,5.6-10.2
        c1.8-6,2.1-12.7-0.4-18.6c-1.3-2.9-3.3-5.6-5.9-7.5C43.5,965.1,40.2,964,36.9,964.1z M37,966.1c2.8-0.1,5.6,0.9,7.9,2.5
        c2.3,1.7,4.1,4,5.3,6.7c2.3,5.3,2,11.5,0.4,17.2c-1,3.5-2.6,6.9-5.1,9.4c-1.2,1.3-2.7,2.3-4.3,3c-1.6,0.7-3.3,1-5,0.9
        c-3-0.3-5.9-2.1-7.9-4.5c-2-2.5-3.3-5.5-4.2-8.7c-1.5-5.6-1.8-11.7,0.3-16.9c1.1-2.6,2.8-5,5-6.7C31.6,967.3,34.3,966.2,37,966.1
        L37,966.1z" />
                                    <path class="st0-user" d="M37.4,1006c-9.4,0-17.9,2.2-24.4,5.9c-6.4,3.7-10.8,9-11.5,15.1c-0.1,0.5,0.3,1.1,0.9,1.1
        c0.5,0.1,1.1-0.3,1.1-0.9c0,0,0,0,0-0.1c0.5-5.3,4.4-10.1,10.5-13.6c6.1-3.5,14.3-5.7,23.4-5.7c9,0,17.3,2.2,23.3,5.7
        c6.1,3.5,9.9,8.3,10.4,13.6c0.1,0.5,0.5,1,1.1,0.9c0.5-0.1,1-0.5,0.9-1.1c0,0,0,0,0,0c-0.6-6.1-5-11.4-11.4-15.1
        C55.3,1008.3,46.8,1006,37.4,1006z" />
                                </g>
                            </svg>

                        </div>
                    </div>
                </div>
                <div class="form-row salutation">
                    <div class="form-field col_2">
                        <label>Title*</label>
                        <select name="title" class="field-required">
                            <option value="" disabled> -- Select -- </option>
                            @foreach (config('local.title_options') as $val)
                                <option value="{{ $val }}"
                                    {{ old('title', $user->title ?? '') == $val ? 'selected' : '' }}>{{ $val }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-field col_2">
                        <label>Full Name*</label>
                        <input type="text" class="field-required" name="name"
                            value="{{ old('name', $user->name ?? '') }}" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-field">
                        <label>Position</label>
                        <input type="text" name="position" value="{{ old('position', $user->position ?? '') }}" />
                    </div>
                </div>
                <div class="form-row dob">
                    <div class="form-field day">
                        <label>Date of Birth</label>
                        <select name="dob_day">
                            <option value="">-- Select --</option>
                            @for ($x = 1; $x <= 31; $x++)
                                <option value="{{ $x }}"
                                    {{ old('dob_day', $user->dob_day ?? '') == $x ? 'selected' : '' }}>
                                    {{ $x }}</option>
                            @endfor
                        </select>

                    </div>
                    <div class="form-field month">
                        <label class="placeholder">&nbsp;</label>

                        <select name="dob_month">
                            <option value="">-- Select --</option>
                            @for ($x = 1; $x <= 12; $x++)
                                @php
                                    $month = date('F', strtotime("2018-$x-01"));
                                @endphp
                                <option value="{{ $x }}"
                                    {{ old('dob_month', $user->dob_month ?? '') == $x ? 'selected' : '' }}>
                                    {{ $month }}</option>
                            @endfor
                        </select>
                    </div>
                    <div class="form-field year">
                        <label class="placeholder">&nbsp;</label>
                        <select name="dob_year">
                            <option value="">-- Select --</option>
                            @for ($x = 1940; $x < 2018; $x++)
                                <option value="{{ $x }}"
                                    {{ old('dob_year', $user->dob_year ?? '') == $x ? 'selected' : '' }}>
                                    {{ $x }}</option>
                            @endfor
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-field">
                        <label>Email*</label>
                        <input type="email" class="field-required" name="email"
                            value="{{ old('email', $user->email ?? '') }}" readonly="true">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-field col_2">
                        <label>Mobile Number*</label>
                        <div class="phone">
                            <input type="tel" name="home_telephone_prefix" class="field-required" style="width:85px"
                                placeholder="+65"
                                value="{{ old('home_telephone_prefix', $user->home_telephone_prefix ?? '+65') }}"
                                maxlength="4" autocomplete="disable">&nbsp;
                            <input type="tel" name="home_telephone" class="field-required"
                                value="{{ old('home_telephone', $user->home_telephone ?? '') }}" maxlength="20"
                                autocomplete="disable" />
                        </div>
                    </div>
                    <div class="form-field col_2">
                        <label>Other Contact Number</label>
                        <div class="phone">
                            <input type="tel" name="work_telephone_prefix" style="width:85px" placeholder="+65"
                                value="{{ old('work_telephone_prefix', $user->work_telephone_prefix ?? '+65') }}"
                                maxlength="4" autocomplete="disable">&nbsp;
                            <input type="tel" name="work_telephone"
                                value="{{ old('work_telephone', $user->work_telephone ?? '') }}" maxlength="20"
                                autocomplete="disable" />
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-field">
                        <label>Gender</label>
                        <div class="radio_btns">
                            <div class="radio_btn">
                                <input type="radio" name="gender" value="1"
                                    {{ old('gender', $user->gender ?? '') == 1 ? 'checked' : '' }}>
                                <label>Male</label>
                            </div>
                            <div class="radio_btn">
                                <input type="radio" name="gender" value="2"
                                    {{ old('gender', $user->gender ?? '') == 2 ? 'checked' : '' }}>
                                <label>Female</label>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-field checkbox">
                        <input type="checkbox" id="contact_main_check" name="contact_main_check"
                            onclick="contactSelect(this);" value="1"
                            {{ old('contact_main_check', $user->contact_main_check ?? '') == 1 ? 'checked' : '' }}>
                        <div class="tick">
                            <?xml version="1.0" encoding="utf-8"?>
                            <!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512"
                                style="enable-background:new 0 0 512 512;" xml:space="preserve">
                                <path d="M461.6,109.6l-54.9-43.3c-1.7-1.4-3.8-2.4-6.2-2.4c-2.4,0-4.6,1-6.3,2.5L194.5,323c0,0-78.5-75.5-80.7-77.7
        s-5.1-5.9-9.5-5.9s-6.4,3.1-8.7,5.4c-1.7,1.8-29.7,31.2-43.5,45.8c-0.8,0.9-1.3,1.4-2,2.1c-1.2,1.7-2,3.6-2,5.7c0,2.2,0.8,4,2,5.7
        l2.8,2.6c0,0,139.3,133.8,141.6,136.1s5.1,5.2,9.2,5.2c4,0,7.3-4.3,9.2-6.2l249.1-320c1.2-1.7,2-3.6,2-5.8
        C464,113.5,463,111.4,461.6,109.6z" />
                            </svg>

                        </div>
                        <h5 class="checkbox-label grey">I wish to receive updates on Noel's latest promotions &amp; special
                            deals via:</h5>
                    </div>
                </div>
                <div class="form-row">

                    <div class="form-field checkbox groups">
                        <div class="checkbox-group">
                            <input type="checkbox" class="profile-personalcheck" name="contact_email_check"
                                onclick="checkSelect();" value="1"
                                {{ old('contact_email_check', $user->contact_email_check ?? '') == 1 ? 'checked' : '' }}>
                            <div class="tick">
                                <?xml version="1.0" encoding="utf-8"?>
                                <!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512"
                                    style="enable-background:new 0 0 512 512;" xml:space="preserve">
                                    <path d="M461.6,109.6l-54.9-43.3c-1.7-1.4-3.8-2.4-6.2-2.4c-2.4,0-4.6,1-6.3,2.5L194.5,323c0,0-78.5-75.5-80.7-77.7
        s-5.1-5.9-9.5-5.9s-6.4,3.1-8.7,5.4c-1.7,1.8-29.7,31.2-43.5,45.8c-0.8,0.9-1.3,1.4-2,2.1c-1.2,1.7-2,3.6-2,5.7c0,2.2,0.8,4,2,5.7
        l2.8,2.6c0,0,139.3,133.8,141.6,136.1s5.1,5.2,9.2,5.2c4,0,7.3-4.3,9.2-6.2l249.1-320c1.2-1.7,2-3.6,2-5.8
        C464,113.5,463,111.4,461.6,109.6z" />
                                </svg>

                            </div>
                            <h5 class="checkbox-label grey">Email</h5>
                        </div>
                        <div class="checkbox-group">
                            <input type="checkbox" class="profile-personalcheck" name="contact_call_check"
                                onclick="checkSelect();" value="1"
                                {{ old('contact_call_check', $user->contact_call_check ?? '') == 1 ? 'checked' : '' }}>
                            <div class="tick">
                                <?xml version="1.0" encoding="utf-8"?>
                                <!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512"
                                    style="enable-background:new 0 0 512 512;" xml:space="preserve">
                                    <path d="M461.6,109.6l-54.9-43.3c-1.7-1.4-3.8-2.4-6.2-2.4c-2.4,0-4.6,1-6.3,2.5L194.5,323c0,0-78.5-75.5-80.7-77.7
        s-5.1-5.9-9.5-5.9s-6.4,3.1-8.7,5.4c-1.7,1.8-29.7,31.2-43.5,45.8c-0.8,0.9-1.3,1.4-2,2.1c-1.2,1.7-2,3.6-2,5.7c0,2.2,0.8,4,2,5.7
        l2.8,2.6c0,0,139.3,133.8,141.6,136.1s5.1,5.2,9.2,5.2c4,0,7.3-4.3,9.2-6.2l249.1-320c1.2-1.7,2-3.6,2-5.8
        C464,113.5,463,111.4,461.6,109.6z" />
                                </svg>

                            </div>
                            <h5 class="checkbox-label grey">Phone</h5>
                        </div>
                        <div class="checkbox-group">
                            <input type="checkbox" class="profile-personalcheck" name="contact_direct_mailer_check"
                                onclick="checkSelect();" value="1"
                                {{ old('contact_direct_mailer_check', $user->contact_direct_mailer_check ?? '') == 1 ? 'checked' : '' }}>
                            <div class="tick">
                                <?xml version="1.0" encoding="utf-8"?>
                                <!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512"
                                    style="enable-background:new 0 0 512 512;" xml:space="preserve">
                                    <path d="M461.6,109.6l-54.9-43.3c-1.7-1.4-3.8-2.4-6.2-2.4c-2.4,0-4.6,1-6.3,2.5L194.5,323c0,0-78.5-75.5-80.7-77.7
        s-5.1-5.9-9.5-5.9s-6.4,3.1-8.7,5.4c-1.7,1.8-29.7,31.2-43.5,45.8c-0.8,0.9-1.3,1.4-2,2.1c-1.2,1.7-2,3.6-2,5.7c0,2.2,0.8,4,2,5.7
        l2.8,2.6c0,0,139.3,133.8,141.6,136.1s5.1,5.2,9.2,5.2c4,0,7.3-4.3,9.2-6.2l249.1-320c1.2-1.7,2-3.6,2-5.8
        C464,113.5,463,111.4,461.6,109.6z" />
                                </svg>

                            </div>
                            <h5 class="checkbox-label grey">Direct Mailer</h5>
                        </div>
                        <div class="checkbox-group">
                            <input type="checkbox" class="profile-personalcheck" name="contact_mobile_msg_check"
                                onclick="checkSelect();" value="1"
                                {{ old('contact_mobile_msg_check', $user->contact_mobile_msg_check ?? '') == 1 ? 'checked' : '' }}>
                            <div class="tick">
                                <?xml version="1.0" encoding="utf-8"?>
                                <!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512"
                                    style="enable-background:new 0 0 512 512;" xml:space="preserve">
                                    <path d="M461.6,109.6l-54.9-43.3c-1.7-1.4-3.8-2.4-6.2-2.4c-2.4,0-4.6,1-6.3,2.5L194.5,323c0,0-78.5-75.5-80.7-77.7
        s-5.1-5.9-9.5-5.9s-6.4,3.1-8.7,5.4c-1.7,1.8-29.7,31.2-43.5,45.8c-0.8,0.9-1.3,1.4-2,2.1c-1.2,1.7-2,3.6-2,5.7c0,2.2,0.8,4,2,5.7
        l2.8,2.6c0,0,139.3,133.8,141.6,136.1s5.1,5.2,9.2,5.2c4,0,7.3-4.3,9.2-6.2l249.1-320c1.2-1.7,2-3.6,2-5.8
        C464,113.5,463,111.4,461.6,109.6z" />
                                </svg>

                            </div>
                            <h5 class="checkbox-label grey">Mobile Messaging<br>(Whatsapp, SMS)</h5>
                        </div>
                    </div>
                </div>
            </div>
            @if ($user->referral_id === 0)
                @each('frontend.member.profile-corporate-other-autho-form', $authors_list, 'autho')
                <div id="newAuthorisedAccountContainer"></div>
                <div class="form-grp" style="margin-bottom:0;border:none;">
                    <div class="form-row">
                        <div class="form-field"><a href="#" onclick="AddNewAuthorisedAccount();return false;">
                                <h5>Add new authorised purchaser</h5>
                            </a>
                        </div>
                    </div>
                </div>
            @endif
            <div class="form-grp">
                <div class="form-row">
                    <div class="form-field head-row">
                        <h2>Change password</h2>
                        <div class="icon">
                            <?xml version="1.0" encoding="utf-8"?>
                            <!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 65.8 91.8"
                                style="enable-background:new 0 0 65.8 91.8;" xml:space="preserve">
                                <style type="text/css">
                                    .st0 {
                                        stroke: #000000;
                                        stroke-miterlimit: 10;
                                    }
                                </style>
                                <path class="st0" d="M56.6,35.1h-3V21.5c0-11.5-9.3-20.8-20.8-20.8S12,10,12,21.5V35H9c-4.7,0-8.5,3.8-8.5,8.5v39.3
        c0,4.7,3.8,8.5,8.5,8.5h47.6c4.7,0,8.5-3.8,8.5-8.5V43.6C65.1,38.9,61.2,35.1,56.6,35.1z M17,21.5C17,12.8,24,5.7,32.8,5.7
        s15.8,7.1,15.8,15.8V35H17V21.5z M60.1,82.8c0,1.9-1.6,3.5-3.5,3.5H9c-1.9,0-3.5-1.6-3.5-3.5V43.6c0-1.9,1.6-3.5,3.5-3.5h47.6
        c1.9,0,3.5,1.6,3.5,3.5V82.8z" />
                            </svg>

                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-field">
                        <label>Current Password..</label>
                        <input type="password" name="current_password" autocomplete="new-password" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-field">
                        <label>New Password</label>
                        <input type="password" name="new_password" autocomplete="new-password" />
                    </div>
                </div>
                <div class="form-row">
                    <input class="form-field button" type="submit" value="Save Changes">
                </div>
            </div>
        </form>

        <div id="newAuthorisedAccountRow" style="display:none;">
            @include('frontend.member.profile-corporate-other-autho-form')
        </div>
    </div>
@endsection

@push('bottomscript')
    <script type="text/javascript" charset="utf-8">
        function AddNewAuthorisedAccount() {
            var content = $('#newAuthorisedAccountRow').html();

            $('#newAuthorisedAccountContainer').append(content);
        }

        function RemoveAuthorisedAccount(sel) {

            var autho_id = sel.attr('data-id');
            console.log('current autho_id is: ' + autho_id);

            if (autho_id > 0) {
                $.ajax({
                    url: "{{ url('member/profile/delete/purchaser') }}/" + autho_id,
                    type: "GET",
                    dataType: "json",
                    async: false,
                    success: handleResponseDeletePurchaser
                });



            } else {

                sel.closest('div.form-grp').remove()

            }
        }

        function handleResponseDeletePurchaser(data) {

            if (data.status == "1") {
                $('.autho-row-' + data.id).closest('div.form-grp').remove();
            }

            alert(data.message);



        }
    </script>
@endpush
