 <!-- JS here -->
 <script src="{{ asset('assets/js/vendor/modernizr-3.5.0.min.js') }}"></script>
 <script src="{{ asset('assets/js/vendor/jquery-3.6.0.min.js') }}"></script>
 <script src="{{ asset('assets/js/popper.min.js') }}"></script>
 <script src="{{ asset('assets/js/bootstrap.min.js') }}"></script>
 <script src="{{ asset('assets/js/isotope.pkgd.min.js') }}"></script>
 <script src="{{ asset('assets/js/slick.min.js') }}"></script>
 <script src="{{ asset('assets/js/jquery.meanmenu.min.js') }}"></script>
 <script src="{{ asset('assets/js/ajax-form.js') }}"></script>
 <script src="{{ asset('assets/js/wow.min.js') }}"></script>
 <script src="{{ asset('assets/js/jquery.scrollUp.min.js') }}"></script>
 <script src="{{ asset('assets/js/imagesloaded.pkgd.min.js') }}"></script>
 <script src="{{ asset('assets/js/jquery.magnific-popup.min.js') }}"></script>
 <script src="{{ asset('assets/js/waypoints.min.js') }}"></script>
 <script src="{{ asset('assets/js/jquery.counterup.min.js') }}"></script>
 <script src="{{ asset('assets/js/plugins.js') }}"></script>
 <script src="{{ asset('assets/js/swiper-bundle.min.js') }}"></script>
 <script src="{{ asset('assets/js/main.js') }}"></script>

 <script>
     // On page load or when changing themes, best to add inline in `head` to avoid FOUC
     if (localStorage.getItem("theme-color") === "dark" || (!("theme-color" in localStorage) && window.matchMedia(
             "(prefers-color-scheme: dark)").matches)) {
         document.getElementById("light--to-dark-button")?.classList.add("dark--mode");
     }
     if (localStorage.getItem("theme-color") === "light") {
         document.getElementById("light--to-dark-button")?.classList.remove("dark--mode");
     }
 </script>
