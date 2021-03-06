import linkIcon from './img/link.png';
import emailIcon from './img/email.png';
import googleIcon from './img/mapMarker.png';
// import facebookIcon from './img/facebook.png';

import '../App.css';

function Footer() {
    return (
        <div id="footerContainer">
            <footer class="bg-dark text-white">
                <div class="container p-4">

                    <section id="footerIconSection" class="mb-4" >
                        {/* <!-- Website --> */}
                        <a class="btn btn-outline-light btn-floating m-2" href="http://epid.gov.lk/web" role="button"><img src={linkIcon} className="footerIcon" alt="" /></a>

                        {/* <!-- Email --> */}
                        <a class="btn btn-outline-light btn-floating m-2" href="mailto:epidunit@sltnet.lk" role="button"><img src={emailIcon} className="footerIcon" alt="" /></a>

                        {/* <!-- Google --> */}
                        <a class="btn btn-outline-light btn-floating m-2" href="https://goo.gl/maps/oRcnUjN8mmhRVEzP9" role="button"><img src={googleIcon} className="footerIcon" alt="" /></a>

                        {/* <!-- Facebook -->
                        <a class="btn btn-outline-light btn-floating m-2" href="#!" role="button"><img src={facebookIcon} className="footerIcon" alt="" /></a> */}

                    </section>


                    {/* <!-- Section: Form -->
                <section class="">
                <form action="">
                    <!--Grid row-->
                    <div class="row d-flex justify-content-center">
                    <!--Grid column-->
                    <div class="col-auto">
                        <p class="pt-2">
                        <strong>Sign up for our newsletter</strong>
                        </p>
                    </div>
                    <!--Grid column-->

                    <!--Grid column-->
                    <div class="col-md-5 col-12">
                        <div class="form-outline form-white mb-4">
                        <input type="email" id="form5Example2" class="form-control" />
                        <label class="form-label" for="form5Example2">Email address</label>
                        </div>
                    </div>
                    <!--Grid column-->

                    <!--Grid column-->
                    <div class="col-auto">
                        <button type="submit" class="btn btn-outline-light mb-4">
                        Subscribe
                        </button>
                    </div>
                    <!--Grid column-->
                    </div>
                    <!--Grid row-->
                </form>
                </section>
                <!-- Section: Form --> */}


                    {/* <!-- Section: Text --> */}
                    {/* <section class="mb-4">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                    distinctio earum repellat quaerat voluptatibus placeat nam,
                    commodi optio pariatur est quia magnam eum harum corrupti dicta,
                    aliquam sequi voluptate quas.
                </p>
                </section> */}
                    {/* <!-- Section: Text --> */}


                    {/* <!-- Section: Links -->
                <section class="">
                <!--Grid row-->
                <div class="row">
                    <!--Grid column-->
                    <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                    <h5 class="text-uppercase">Links</h5>

                    <ul class="list-unstyled mb-0">
                        <li>
                        <a href="#!" class="text-white">Link 1</a>
                        </li>
                        <li>
                        <a href="#!" class="text-white">Link 2</a>
                        </li>
                        <li>
                        <a href="#!" class="text-white">Link 3</a>
                        </li>
                        <li>
                        <a href="#!" class="text-white">Link 4</a>
                        </li>
                    </ul>
                    </div>
                    <!--Grid column-->

                    <!--Grid column-->
                    <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                    <h5 class="text-uppercase">Links</h5>

                    <ul class="list-unstyled mb-0">
                        <li>
                        <a href="#!" class="text-white">Link 1</a>
                        </li>
                        <li>
                        <a href="#!" class="text-white">Link 2</a>
                        </li>
                        <li>
                        <a href="#!" class="text-white">Link 3</a>
                        </li>
                        <li>
                        <a href="#!" class="text-white">Link 4</a>
                        </li>
                    </ul>
                    </div>
                    <!--Grid column-->

                    <!--Grid column-->
                    <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                    <h5 class="text-uppercase">Links</h5>

                    <ul class="list-unstyled mb-0">
                        <li>
                        <a href="#!" class="text-white">Link 1</a>
                        </li>
                        <li>
                        <a href="#!" class="text-white">Link 2</a>
                        </li>
                        <li>
                        <a href="#!" class="text-white">Link 3</a>
                        </li>
                        <li>
                        <a href="#!" class="text-white">Link 4</a>
                        </li>
                    </ul>
                    </div>
                    <!--Grid column-->

                    <!--Grid column-->
                    <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                    <h5 class="text-uppercase">Links</h5>

                    <ul class="list-unstyled mb-0">
                        <li>
                        <a href="#!" class="text-white">Link 1</a>
                        </li>
                        <li>
                        <a href="#!" class="text-white">Link 2</a>
                        </li>
                        <li>
                        <a href="#!" class="text-white">Link 3</a>
                        </li>
                        <li>
                        <a href="#!" class="text-white">Link 4</a>
                        </li>
                    </ul>
                    </div>
                    <!--Grid column-->
                </div>
                <!--Grid row-->
                </section>
                <!-- Section: Links --> */}

                </div>
                {/* <!-- Grid container --> */}

                {/* <!-- Copyright --> */}
                <div class="text-center p-3">
                    ?? 2021 Copyright:
                    <a class="text-white" href="http://epid.gov.lk/web">Epidemiology Unit</a>
                </div>
                {/* <!-- Copyright --> */}

            </footer>
            {/* // <!-- Footer --> */}
        </div>
    );
}
export default Footer;