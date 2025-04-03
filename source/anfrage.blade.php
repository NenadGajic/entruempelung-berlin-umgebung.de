@extends('_layouts.main')

@section('body')
    <div class="breadcrumb__area">
        <div class="container">
            <div class="row">
                <div class="col-xl-12">
                    <div class="breadcrumb__area-content">
                        <h2>Online Anfrage</h2>
                        <ul>
                            <li><a href="{{ $page->baseUrl }}">Home</a><i>/</i></li>
                            <li>Online Anfrage</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="request__quote section-padding-three">
        <div class="container">
            <div class="row">
                <div class="col-xl-12">
                    <form action="#">
                        <div class="row">
                            <div class="col-md-6 mt-25">
                                <div class="request__quote-item">
                                    <label>First Name<span> *</span></label>
                                    <input type="text" name="name" placeholder="Michael" required>
                                </div>
                            </div>
                            <div class="col-md-6 mt-25">
                                <div class="request__quote-item">
                                    <label>Last Name</label>
                                    <input type="text" placeholder="Brown">
                                </div>
                            </div>
                            <div class="col-md-6 mt-25">
                                <div class="request__quote-item">
                                    <label>Email Address<span> *</span></label>
                                    <input type="email" placeholder="michaelbrown@example.com" required>
                                </div>
                            </div>
                            <div class="col-md-6 mt-25">
                                <div class="request__quote-item">
                                    <label>Number<span> *</span></label>
                                    <input type="text" placeholder="+44 7911 123456" required>
                                </div>
                            </div>
                            <div class="col-md-6 mt-25">
                                <div class="request__quote-item">
                                    <label>Company/Organization<span> *</span></label>
                                    <input type="text" placeholder="Tesla" required>
                                </div>
                            </div>
                            <div class="col-md-6 mt-25">
                                <div class="request__quote-item">
                                    <label>Website<span> *</span></label>
                                    <input type="url" placeholder="https://tesla.com" required>
                                </div>
                            </div>
                            <div class="col-md-12 mt-25">
                                <p class="mb-10">What services can we provide you?<span> *</span></p>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="request__quote-services">
                                            <label><input class="mr-10" type="checkbox">Optimization (SEO)</label>
                                            <label><input class="mr-10" type="checkbox">Web Design</label>
                                            <label><input class="mr-10" type="checkbox">Web Hosting / Maintenance</label>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="request__quote-services">
                                            <label><input class="mr-10" type="checkbox">Content Writing</label>
                                            <label><input class="mr-10" type="checkbox">Search Engine Marketing</label>
                                            <label><input class="mr-10" type="checkbox">Social Media</label>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="request__quote-services">
                                            <label><input class="mr-10" type="checkbox">ADA Compliance</label>
                                            <label><input class="mr-10" type="checkbox">Photography / Video</label>
                                            <label><input class="mr-10" type="checkbox">Email Marketing</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 mt-25">
                                <div class="request__quote-item">
                                    <label>Message<span> *</span></label>
                                    <textarea name="message" placeholder="I'm interested in your services. Please contact me."></textarea>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <button class="default_button mt-25" type="submit">Submit Now<i class="flaticon-right-up"></i></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
