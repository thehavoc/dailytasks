<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" type="image/png" href="{{ asset('favicon.ico') }}"/>

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div id="app">
        <nav class="navbar navbar-default navbar-static-top">
            <div class="container">
                <div class="navbar-header">

                    <!-- Collapsed Hamburger -->
                    <CollapseButton id="app-navbar-collapse" classes="navbar-toggle collapsed">
                        <span class="sr-only">Toggle Navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>                        
                    </CollapseButton>

                    <!-- Branding Image -->
                    <a class="navbar-brand" href="{{ url('/') }}">
                        {{ config('app.name', 'Laravel') }}
                    </a>
                </div>

                <div class="collapse navbar-collapse" id="app-navbar-collapse">
                    @if (Auth::guest())
                        <!-- Right Side Of Navbar -->
                        <Navigation :items="{{ $rightMainNav }}" classes="navbar-right"></Navigation>

                    @else
                        <!-- Left Side Of Navbar -->
                        <Navigation :items="{{ $leftMainNav }}"></Navigation>
                    
                        <!-- Right Side Of Navbar -->
                        <Navigation :items="{{ $profileMainMenu }}" classes="navbar-right"></Navigation>

                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">        
                            {{ csrf_field() }}        
                        </form>
                    @endif
                </div>
            </div>
        </nav>

        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="panel panel-default">                
                        <div class="panel-body">
                            @if (isset($title))
                                <h4 class="page-title">{{ $title }}</h4>
                            @endif
                            
                            @yield('content')
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Notification></Notification>      
    </div>

    <!-- Scripts -->
    <script>
        window.baseUrl = "<?php echo url('/') ?>/";
    </script>
    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
