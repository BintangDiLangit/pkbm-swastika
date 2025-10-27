<div class="registerarea sp_top_90">
    <div class="container">
        <div class="row">
            <div class="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12" data-aos="fade-up">
                <div class="registerarea__wraper">
                    <div class="section__title registerarea__section__title">
                        <div class="section__title__button">
                            <div class="default__small__button">Pendaftaran</div>
                        </div>
                        <div class="section__title__heading heading__underline">
                            <h2>Hubungi <span>Kami </span> <small>Sekarang . . .</small>
                            </h2>
                        </div>
                    </div>
                    <div class="registerarea__content">
                        <div class="registerarea__video">
                            <div class="video__pop__btn">
                                <a class="video-btn" href="https://www.youtube.com/watch?v=vHdclsdkp28">
                                    <img loading="lazy" src="{{ asset('assets/img/icon/video.png') }}"
                                        alt=""></a>
                            </div>
                            <div class="registerarea__para">
                                <p>Play video berikut untuk tata cara pendaftaran atau kamu bisa langsung isi form
                                    di kanan untuk bertanya</p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>


            <div class="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12" data-aos="fade-up">
                <div class="registerarea__form">
                    <div class="registerarea__form__heading">
                        <h4>Isi Datamu</h4>
                    </div>
                    <form id="registerForm">
                        <input class="register__input" type="text" id="namaLengkap" placeholder="Nama Lengkap"
                            required>
                        <div class="row">
                            <div class="col-xl-6">
                                <input class="register__input" type="text" id="email" placeholder="Alamat Email"
                                    required>
                            </div>
                            <div class="col-xl-6">
                                <input class="register__input" type="text" id="nomorWA"
                                    placeholder="Nomor WA : (0812...)" required>
                            </div>
                        </div>
                        <input class="register__input" type="text" id="alamat" placeholder="Alamat Tempat Tinggal"
                            required>
                        <textarea class="register__input textarea" id="pesan" cols="30" rows="10"
                            placeholder="Isi Pesan / Pertanyaan" required></textarea>
                        <div class="registerarea__button">
                            <a class="default__button" href="#" id="submitForm">Hubungi Sekarang
                                <i class="icofont-long-arrow-right"></i>
                            </a>
                        </div>
                    </form>
                </div>
            </div>

            <script>
                document.getElementById('submitForm').addEventListener('click', function(event) {
                    event.preventDefault();

                    var namaLengkap = document.getElementById('namaLengkap').value;
                    var email = document.getElementById('email').value;
                    var nomorWA = document.getElementById('nomorWA').value;
                    var alamat = document.getElementById('alamat').value;
                    var pesan = document.getElementById('pesan').value;

                    var whatsappMessage =
                        `Nama Lengkap: ${namaLengkap}\nEmail: ${email}\nNomor WA: ${nomorWA}\nAlamat: ${alamat}\nPesan: ${pesan}`;
                    var whatsappUrl =
                        `https://api.whatsapp.com/send?phone=6281333019903&text=${encodeURIComponent(whatsappMessage)}`;

                    window.open(whatsappUrl, '_blank');

                    var scriptURL = `https://script.google.com/macros/s/{{ env('SPREADSHEET_ID') }}/exec`;
                    var formData = new FormData();
                    formData.append('namaLengkap', namaLengkap);
                    formData.append('email', email);
                    formData.append('nomorWA', nomorWA);
                    formData.append('alamat', alamat);
                    formData.append('pesan', pesan);

                    fetch(scriptURL, {
                            method: 'POST',
                            body: formData
                        })
                        .then(response => console.log('Success!', response))
                        .catch(error => console.error('Error!', error.message));
                });
            </script>



        </div>
    </div>
    <div class="registerarea__img">
        <img loading="lazy" class="register__1" src="{{ asset('assets/img/register/register__1.png') }}" alt="register">
        <img loading="lazy" class="register__2" src="{{ asset('assets/img/register/register__2.png') }}" alt="register">
        <img loading="lazy" class="register__3" src="{{ asset('assets/img/register/register__3.png') }}" alt="register">
    </div>
</div>
