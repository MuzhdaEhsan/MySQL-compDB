<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/manifest.js') }}" defer></script>
    <script src="{{ asset('js/vendor.js') }}" defer></script>
    <script src="{{ asset('js/app.js') }}" defer></script>
    <script src="{{ asset('js/scripts.js') }}" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/all.min.js" crossorigin="anonymous"></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    @stack('scripts')
</head>

<body>
    <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <!-- Navbar Brand-->
        <a class="navbar-brand ps-3" href="/">Competency Database</a>
        <!-- Sidebar Toggle-->
        <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i
                class="fas fa-bars"></i></button>

        <!-- Navbar-->
        <ul class="navbar-nav ms-auto me-3 me-lg-4">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown"
                    aria-expanded="false"><i class="fas fa-user fa-fw"></i>
                    {{ auth()->user()->isAdmin()
                        ? 'Admin'
                        : 'Staff' }}
                    - {{ auth()->user()->name }}</a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="/settings">Settings</a></li>
                    <li>
                        <hr class="dropdown-divider" />
                    </li>
                    <li>
                        <a class="dropdown-item" href="{{ route('logout') }}" onclick="event.preventDefault();
                        document.getElementById('logout-form').submit();">
                            {{ __('Logout') }}
                        </a>
                        <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                            @csrf
                        </form>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>

    {{-- Sidebar --}}
    <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
            <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div class="sb-sidenav-menu">
                    <div class="nav">
                        <div class="sb-sidenav-menu-heading">Dashboard</div>
                        <a class="nav-link {{ str_starts_with(request()->path(), '/') ? 'active' : '' }}" href="/">
                            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                            Dashboard
                        </a>

                        <div class="sb-sidenav-menu-heading">Resources</div>
                        <a class="nav-link {{ str_starts_with(request()->path(), 'competencies') ? 'active' : '' }}"
                            href="/competencies">
                            <div class="sb-nav-link-icon"><i class="fas fa-chart-area"></i></div>
                            Competencies
                        </a>
                        <a class="nav-link {{ str_starts_with(request()->path(), 'attributes') ? 'active' : '' }}"
                            href="/attributes">
                            <div class="sb-nav-link-icon"><i class="fas fa-atom"></i></div>
                            Attributes
                        </a>
                        <a class="nav-link {{ str_starts_with(request()->path(), 'skills') ? 'active' : '' }}"
                            href="/skills">
                            <div class="sb-nav-link-icon"><i class="fas fa-laptop-code"></i></div>
                            Skills
                        </a>
                        <a class="nav-link {{ str_starts_with(request()->path(), 'knowledge') ? 'active' : '' }}"
                            href="/knowledge">
                            <div class="sb-nav-link-icon"><i class="fas fa-school"></i></div>
                            Knowledge
                        </a>
                        <a class="nav-link {{ str_starts_with(request()->path(), 'courses') ? 'active' : '' }}"
                            href="/courses">
                            <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
                            Courses
                        </a>

                        {{-- Users and Logs links are available to admins only --}}
                        @if (auth()->user()->isAdmin())
                            <div class="sb-sidenav-menu-heading">Admin Resources</div>
                            <a class="nav-link {{ str_starts_with(request()->path(), 'users') ? 'active' : '' }}"
                                href="/users">
                                <div class="sb-nav-link-icon"><i class="fas fa-users"></i></div>
                                Users
                            </a>
                            <a class="nav-link {{ str_starts_with(request()->path(), 'logs') ? 'active' : '' }}"
                                href="/logs">
                                <div class="sb-nav-link-icon"><i class="fas fa-history"></i></div>
                                Logs
                            </a>
                        @endif
                    </div>
                </div>
            </nav>
        </div>
        <div id="layoutSidenav_content">
            {{-- Main area --}}
            <main>
                <div class="container-fluid px-4">
                    @include('layouts.flash-status')
                    @include('layouts.form-errors')
                    @yield('content')
                </div>
            </main>
            <footer class="py-4 bg-light mt-auto">
                <div class="container-fluid px-4">
                    <div class="d-flex align-items-center justify-content-center small">
                        <div class="text-muted footer-text"></div>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</body>

</html>
