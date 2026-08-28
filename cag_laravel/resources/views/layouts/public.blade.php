<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'Comptroller and Auditor General of India')</title>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- TailwindCSS CDN for styling -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        cag: {
                            navy: '#0b2545',
                            blue: '#134074',
                            light: '#8da9c4',
                            cream: '#eef4f8',
                            gold: '#d4af37'
                        }
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-gray-50 font-sans text-gray-800 antialiased flex flex-col min-h-screen">

    <!-- Header Navigation -->
    <header class="bg-cag-navy text-white shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
            <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-cag-navy text-xl shadow">
                    CAG
                </div>
                <div>
                    <h1 class="font-bold text-lg leading-tight">Comptroller and Auditor General of India</h1>
                    <p class="text-xs text-cag-light">Supreme Audit Institution of India</p>
                </div>
            </div>
            
            <nav class="hidden md:flex items-center space-x-6 text-sm font-medium">
                <a href="{{ route('home') }}" class="hover:text-cag-gold transition">Home</a>
                <a href="{{ route('about') }}" class="hover:text-cag-gold transition">About Us</a>
                <a href="{{ route('reports.index') }}" class="hover:text-cag-gold transition">Audit Reports</a>
                <a href="{{ route('presence') }}" class="hover:text-cag-gold transition">Our Presence</a>
                <a href="{{ route('career.recruitment') }}" class="hover:text-cag-gold transition">Recruitment</a>
                <a href="{{ route('career.tenders') }}" class="hover:text-cag-gold transition">Tenders</a>
                <a href="/admin" target="_blank" class="bg-cag-gold text-cag-navy px-3 py-1.5 rounded font-semibold text-xs hover:bg-yellow-500 transition">Admin Portal ↗</a>
            </nav>
        </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow">
        @yield('content')
    </main>

    <!-- Footer -->
    <footer class="bg-cag-navy text-cag-light mt-12 border-t border-cag-blue">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
            <div>
                <h3 class="text-white font-semibold text-base mb-3">CAG India</h3>
                <p class="text-xs text-gray-300 leading-relaxed">Promoting accountability, transparency and good governance through high quality auditing and accounting.</p>
            </div>
            <div>
                <h4 class="text-white font-medium mb-3">Quick Links</h4>
                <ul class="space-y-1.5 text-xs">
                    <li><a href="{{ route('about') }}" class="hover:text-white">About Us</a></li>
                    <li><a href="{{ route('reports.index') }}" class="hover:text-white">Audit Reports</a></li>
                    <li><a href="{{ route('presence') }}" class="hover:text-white">Office Locations</a></li>
                </ul>
            </div>
            <div>
                <h4 class="text-white font-medium mb-3">Engagements</h4>
                <ul class="space-y-1.5 text-xs">
                    <li><a href="{{ route('career.recruitment') }}" class="hover:text-white">Recruitment Notices</a></li>
                    <li><a href="{{ route('career.tenders') }}" class="hover:text-white">Tenders</a></li>
                </ul>
            </div>
            <div>
                <h4 class="text-white font-medium mb-3">Contact</h4>
                <p class="text-xs leading-relaxed">Pocket 9, Deen Dayal Upadhyaya Marg,<br>New Delhi - 110124</p>
            </div>
        </div>
        <div class="bg-black/30 py-3 text-center text-xs text-gray-400">
            © {{ date('Y') }} Comptroller and Auditor General of India. All rights reserved.
        </div>
    </footer>

</body>
</html>
